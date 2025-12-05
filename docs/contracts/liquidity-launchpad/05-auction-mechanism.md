---
id: CCA
title: Continuous Clearing Auction
sidebar_position: 2
---

# Continuous Clearing Auction (CCA)

**Repository:** [github.com/Uniswap/continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction)

The Continuous Clearing Auction (CCA) is a novel auction mechanism that generalizes the uniform-price auction into continuous time. It provides fair price discovery for bootstrapping initial liquidity while eliminating timing games and encouraging early participation (see [whitepaper](/whitepaper_cca.pdf)).

## Overview

Bootstrapping initial liquidity for new tokens is challenging. Traditional approaches suffer from various weaknesses:
- **Fixed-price sales** lead to mispricing and priority races, creating thin or unstable liquidity
- **Dutch auctions** create timing games and favor professionals over genuine participants
- **One-shot auctions** enable demand reduction and last-minute sniping
- **Bonding curves** are path-dependent and vulnerable to manipulation
- **Centralized market makers** require trust and extract significant value

CCA addresses these issues through a unique approach: **automatic bid spreading over time** combined with **continuous price discovery**.

## Deployment Addresses

### ContinuousClearingAuctionFactory

| Network  | Address                                    | Commit Hash                              | Version          |
| -------- | ------------------------------------------ | ---------------------------------------- | ---------------- |
| Mainnet  | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
| Unichain | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
| Base     | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
| Sepolia  | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |

### Mechanism overview

For a detailed overview, please read the [whitepaper](/whitepaper_cca.pdf).

The most important element to understand about a Continuous Clearing Auction (CCA) is that tokens are sold over time to the current set of active participants. Participants are comprised of two things, a budget and a max price. 

The clearing price of the auction in a block is the price which all bidders in that block pay. This is the same concept as in uniform price auctions. But in CCA this price is gradually discovered over time. Every block, some number of tokens (as defined by the configured release schedule) are allocated to bids with higher max prices, then those with lower max prices. 

Because we require users to specify a maximum price, there exists a clearing price for which there are not enough "active" participants in the auction to purchase all of the tokens that are being sold, since a bid is removed from the auction once it falls below the clearingPrice. The current price of the auction will always be just below this price, ensuring that all of the supply can be sold to the current set of bids.

At a high level it has these benefits:
- No participant can concentrate demand at a single moment
- Timing of bid submission matters less than valuation
- Early bidders naturally gain more exposure to lower prices
- Sniping and last-minute gaming become ineffective

## Technical overview

### Auction Configuration

The auction and its supply curve are configured through the AuctionFactory which deploys individual Auction contracts with configurable parameters.

```solidity
interface IAuctionFactory {
    function initializeDistribution(
        address token,
        uint256 amount,
        bytes calldata configData
    ) external returns (address);
}

/// @notice Parameters for the auction
/// @dev token and totalSupply are passed as constructor arguments
struct AuctionParameters {
    address currency; // token to raise funds in. Use address(0) for ETH
    address tokensRecipient; // address to receive leftover tokens
    address fundsRecipient; // address to receive all raised funds
    uint64 startBlock; // Block which the first step starts
    uint64 endBlock; // When the auction finishes
    uint64 claimBlock; // Block when the auction can claimed
    uint256 tickSpacing; // Fixed granularity for prices
    address validationHook; // Optional hook called before a bid
    uint256 floorPrice; // Starting floor price for the auction
    uint128 requiredCurrencyRaised; // Amount of currency required to be raised for the auction to graduate
    bytes auctionStepsData; // Packed bytes describing token issuance schedule
}

constructor(
    address _token,
    uint128 _totalSupply,
    AuctionParameters memory _parameters
) {}
```

The factory decodes `configData` into `AuctionParameters` and deploys the Auction contract via CREATE2.

## Warnings

It is imperative that bidders and users of the Auction carefully validate the parameters of the auction before participating. An auction can be configured to have an excessively high floor price which would result in a loss of funds.

Auction launchers should be aware of the following limitations regarding total supply and maximum bid prices:

- The maximum total supply that can be sold in the auction is 1e30 wei of `token`. For a token with 18 decimals, this is 1 trillion tokens.
- The auction also ensures that the total currency raised does not exceed the maximum allowable liquidity for a Uniswap v4 liquidity position. The lowest bound for this is 2^107 wei (given the smallest possible tick spacing of 1).

Given a total supply of:

- 1 trillion 18 decimal tokens (1e30), the maximum bid price is 2^110. The max ratio of currency to token is 2^(110-96) = 2^14 = 16384.
- 1 billion 6 decimal tokens (1e15), the maximum bid price is 2^160. The max ratio of currency to token is 2^(160-96) = 2^64 = 18446744073709551616.

We strongly recommend that the `currency` is chosen to be more valuable than `token`, and that the total supply is not excessively large.

## Types

### Q96 Fixed-Point Math

The auction uses Q96 fixed-point arithmetic for price and demand representation:

```solidity
library FixedPoint96 {
    uint8 internal constant RESOLUTION = 96;
    uint256 internal constant Q96 = 0x1000000000000000000000000; // 2^96
}
```

- **Price**: Stored as as a Q96 fixed point number to allow for fractional prices
- **Demand**: Currency amounts are scaled by Q96 to prevent significant precision loss in calculations

#### MPS terms (Milli-Basis Points)

**MPS = 1e7** (10 million), each representing one thousandth of a basis point:

```solidity
library ConstantsLib {
    uint24 public constant MPS = 1e7; // 10,000,000
}
```

#### ValueX7

A custom uint256 type that represents values which have either been implicitly or explicitly multiplied by 1e7 (ConstantsLib.MPS). These values will be suffixed in the code with `_X7` for clarity.

```solidity
/// @notice A ValueX7 is a uint256 value that has been multiplied by MPS
/// @dev X7 values are used for supply values to avoid intermediate division by MPS
type ValueX7 is uint256;
```

### Auction steps (supply issuance schedule)

The auction steps define the supply issuance schedule. The auction steps are packed into a bytes array and passed to the constructor along with the other parameters. Each step is a packed `uint64` with the first 24 bits being the per-block issuance rate in MPS (milli-bips), and the last 40 bits being the number of blocks to sell over.

```solidity
/// AuctionStepLib.sol

function parse(bytes8 data) internal pure returns (uint24 mps, uint40 blockDelta) {
    mps = uint24(bytes3(data));
    blockDelta = uint40(uint64(data));
}
```

For example, to sell 1 basis point of supply per block for 100 blocks, then 2 basis points for the next 100 blocks, the packed `uint64` would be:

```solidity
uint24 mps = 1000; // 1000 mps = 1 basis point
uint40 blockDelta = 100; // 100 blocks
bytes8 packed1 = uint64(mps) | (uint64(blockDelta) << 24);

mps = 2000; // 2000 mps = 2 basis points
blockDelta = 100; // 100 blocks
bytes8 packed2 = uint64(mps) | (uint64(blockDelta) << 24);

bytes packed = abi.encodePacked(packed1, packed2);
```

The data is deployed to an external SSTORE2 contract for cheaper reads over the lifetime of the auction.

### Validation Hooks

Optional validation hooks allow custom logic to be executed before bids are accepted, enabling features like allowlists, rate limiting, or complex validation rules.

```solidity
interface IValidationHook {
    function validate(
        uint256 maxPrice,
        uint128 amount,
        address owner,
        address sender,
        bytes calldata hookData
    ) external;
}
```

Any validation hook set in the auction parameters is called during `_submitBid()`. It MUST revert to prevent a bit from being submitted in the auction.

## Contract Entrypoints

### submitBid()

Users can submit bids specifying the currency amount they want to spend. The bid id is returned to the user and can be used to claim tokens or exit the bid. The `prevTickPrice` parameter is used to determine the location of the tick to insert the bid into. The hint must be the price of the tick immediately preceding it in the linked list of prices.

- For convenience, if the `prevTickPrice` is not provided, the contract will iterate through every tick starting from the floor price until it reaches the correct position.
- This will be gas intensive and should not be used unless the caller is sure that `maxPrice` is already initialized, as it will not perform the search.

A bid's `maxPrice` is the maximum price the bidder is willing to pay.
The `amount` is the amount of currency the user is bidding, and `owner` is the address of the user who will receive any purchased tokens or refunded currency.

The Auction enforces the following rules on bid prices:

- Bids must be strictly above the current clearing price
- The maximum bid price must be below the computed MAX_BID_PRICE based on the total supply of the auction.

```solidity
interface IContinuousClearingAuction {
    function submitBid(
        uint256 maxPrice,
        uint128 amount,
        address owner,
        uint256 prevTickPrice,
        bytes calldata hookData
    ) external payable returns (uint256 bidId);

    /// @notice Optional function if the maxPrice is already initialized or if the caller doesn't care about gas efficiency.
    function submitBid(
        uint256 maxPrice,
        uint128 amount,
        address owner,
        bytes calldata hookData
    ) external payable returns (uint256 bidId);
}

event BidSubmitted(uint256 indexed id, address indexed owner, uint256 price, uint256 amount);
event TickInitialized(uint256 price);
```

### checkpoint()

The auction is checkpointed once every block with a new bid. The checkpoint is a snapshot of the auction state up to (NOT including) that block. Checkpoints ultimately determine the token allocations for each bid.

```solidity
interface IContinuousClearingAuction {
    function checkpoint() external returns (Checkpoint memory _checkpoint);
}

event CheckpointUpdated(uint256 indexed blockNumber, uint256 clearingPrice, uint24 cumulativeMps);
```

### exitBid()

Users can use `exitBid` to exit their bid after the auction has ended, or to receive a refund of their currency if the auction has not graduated. This function requires that the bid has a max price above the final clearing price of the auction. This means that the bid was never outbid or partially filled.

```solidity
interface IContinuousClearingAuction {
    /// @notice Exit a bid where max price is above final clearing price
    function exitBid(uint256 bidId) external;
}

event BidExited(uint256 indexed bidId, address indexed owner, uint256 tokensFilled, uint256 currencyRefunded);
```

### exitPartiallyFilledBid()

Exiting partially filled bids is more complex than fully filled ones. The `exitPartiallyFilledBid` function requires the user to provide two checkpoint hints (`lastFullyFilledCheckpointBlock`, `outbidBlock`). These are used to determine the checkpoints immediately before and after the period of time in which the bid was partially filled (auction.clearingPrice == bid.maxPrice).

- `lastFullyFilledCheckpointBlock`: Last checkpoint where clearing price is strictly < bid.maxPrice
- `outbidBlock`: First checkpoint where clearing price is strictly > bid.maxPrice, or 0 if the final clearing price is equal to the bid's max price at the end of the auction, since it was never outbid.

Checkpoints also store a cumulative value (`currencyRaisedAtClearingPriceQ96_X7`) which tracks the amount of currency raised from bids at the clearing price. This is reset every time the clearing price changes, but this is used to determine the user's pro-rata share of the tokens sold at the clearing price.

### Decision tree for determining when to use `exitBid` vs `exitPartiallyFilledBid`:

![Exit Bid Diagram](./images/exitBidDiagram.png)

## View functions / getters

### isGraduated()

Auctions are graduated if the currency raised meets or exceeds the required threshold set by the auction launcher on deployment.

A core invariant of the auction is that no bids can be exited before the auction has graduated.

```solidity
interface IContinuousClearingAuction {
    /// @notice Whether the auction has graduated (currency raised >= required)
    function isGraduated() external view returns (bool);
}
```

### sweepCurrency() and sweepUnsoldTokens()

After an auction ends, raised currency and unsold tokens can be withdrawn to the designated recipients in the auction deployment parameters.

```solidity
interface IContinuousClearingAuction {
    /// @notice Withdraw all raised currency (only for graduated auctions)
    function sweepCurrency() external;

    /// @notice Withdraw any unsold tokens
    function sweepUnsoldTokens() external;
}

event CurrencySwept(address indexed fundsRecipient, uint256 currencyAmount);
event TokensSwept(address indexed tokensRecipient, uint256 tokensAmount);
```

Note:

- `sweepCurrency()` is only callable by anyone after the auction ends, and only for graduated auctions
- `sweepUnsoldTokens()` is callable by anyone after the auction ends and will sweep different amounts depending on graduation.
- For graduated auctions: sweeps all tokens that were not sold per the supply issuance schedule
- For non-graduated auctions: sweeps total supply of tokens

### Warning

Do NOT send more tokens than intended in `totalSupply` to the auction. They will not be recoverable.

### claimTokens()

Users can claim purchased tokens after the auction's claim block. The bid must be exited before claiming tokens, and the auction must have graduated.

```solidity
interface IContinuousClearingAuction {
    function claimTokens(uint256 bidId) external;
}

event TokensClaimed(uint256 indexed bidId, address indexed owner, uint256 tokensFilled);
```

Anyone can call this function for any valid bid id.

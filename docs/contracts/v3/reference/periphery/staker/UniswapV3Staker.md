---
sidebar_label: Uniswap V3 Staker Contract
sidebar_position: 2
---

# Uniswap V3 Staker Contract

Below is the technical reference for the staker contract, [`UniswapV3Staker.sol`](https://github.com/Uniswap/uniswap-v3-staker/blob/main/contracts/UniswapV3Staker.sol). A technical guide for interacting with this staking contract will be released soon.

## Functions

### stakes

```solidity
  function stakes(
    uint256 tokenId,
    bytes32 incentiveId
  ) public view override returns (uint160 secondsPerLiquidityInsideInitialX128, uint128 liquidity)
```

Returns information about a staked liquidity NFT

#### Parameters:

| Name          | Type    | Description                                           |
| :------------ | :------ | :---------------------------------------------------- |
| `tokenId`     | uint256 | The ID of the staked token                            |
| `incentiveId` | bytes32 | The ID of the incentive for which the token is staked |

#### Return Values:

| Name                                   | Type    | Description                                                                      |
| :------------------------------------- | :------ | :------------------------------------------------------------------------------- |
| `secondsPerLiquidityInsideInitialX128` | uint160 | secondsPerLiquidity represented as a UQ32.128                                    |
| `liquidity`                            | bytes32 | The amount of liquidity in the NFT as of the last time the rewards were computed |

### constructor

```solidity
  function constructor(
    contract IUniswapV3Factory _factory,
    contract INonfungiblePositionManager _nonfungiblePositionManager,
    uint256 _maxIncentiveStartLeadTime,
    uint256 _maxIncentiveDuration
  ) public
```

#### Parameters:

| Name                          | Type                                 | Description                                                                  |
| :---------------------------- | :----------------------------------- | :--------------------------------------------------------------------------- |
| `_factory`                    | contract IUniswapV3Factory           | the Uniswap V3 factory                                                       |
| `_nonfungiblePositionManager` | contract INonfungiblePositionManager | the NFT position manager contract address                                    |
| `_maxIncentiveStartLeadTime`  | uint256                              | the max duration of an incentive in seconds                                  |
| `_maxIncentiveDuration`       | uint256                              | the max amount of seconds into the future the incentive startTime can be set |

### createIncentive

```solidity
  function createIncentive(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 reward
  ) external
```

Creates a new liquidity mining incentive program

#### Parameters:

| Name     | Type                                 | Description                                   |
| :------- | :----------------------------------- | :-------------------------------------------- |
| `key`    | struct IUniswapV3Staker.IncentiveKey | Details of the incentive to create            |
| `reward` | uint256                              | The amount of reward tokens to be distributed |

### endIncentive

```solidity
  function endIncentive(
    struct IUniswapV3Staker.IncentiveKey key
  ) external returns (uint256 refund)
```

Ends an incentive after the incentive end time has passed and all stakes have been withdrawn

#### Parameters:

| Name  | Type                                 | Description                     |
| :---- | :----------------------------------- | :------------------------------ |
| `key` | struct IUniswapV3Staker.IncentiveKey | Details of the incentive to end |

#### Return Values:

| Name     | Type    | Description                                             |
| :------- | :------ | :------------------------------------------------------ |
| `refund` | uint256 | The remaining reward tokens when the incentive is ended |

### onERC721Received

```solidity
  function onERC721Received(
  ) external returns (bytes4)
```

Upon receiving a Uniswap V3 ERC721, creates the token deposit setting owner to `from`. Also stakes token
in one or more incentives if properly formatted `data` has a length > 0.

Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
by `operator` from `from`, this function is called.
It must return its Solidity selector to confirm the token transfer.
If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.

### transferDeposit

```solidity
  function transferDeposit(
    uint256 tokenId,
    address to
  ) external
```

Transfers ownership of a deposit from the sender to the given recipient

#### Parameters:

| Name      | Type    | Description                                       |
| :-------- | :------ | :------------------------------------------------ |
| `tokenId` | uint256 | The ID of the token (and the deposit) to transfer |
| `to`      | address | The new owner of the deposit                      |

### withdrawToken

```solidity
  function withdrawToken(
    uint256 tokenId,
    address to,
    bytes data
  ) external
```

Withdraws a Uniswap V3 LP token `tokenId` from this contract to the recipient `to`

#### Parameters:

| Name      | Type    | Description                                                                                       |
| :-------- | :------ | :------------------------------------------------------------------------------------------------ |
| `tokenId` | uint256 | The unique identifier of an Uniswap V3 LP token                                                   |
| `to`      | address | The address where the LP token will be sent                                                       |
| `data`    | bytes   | An optional data array that will be passed along to the `to` address via the NFT safeTransferFrom |

### stakeToken

```solidity
  function stakeToken(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 tokenId
  ) external
```

Stakes a Uniswap V3 LP token

#### Parameters:

| Name      | Type                                 | Description                                         |
| :-------- | :----------------------------------- | :-------------------------------------------------- |
| `key`     | struct IUniswapV3Staker.IncentiveKey | The key of the incentive for which to stake the NFT |
| `tokenId` | uint256                              | The ID of the token to stake                        |

### unstakeToken

```solidity
  function unstakeToken(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 tokenId
  ) external
```

Unstakes a Uniswap V3 LP token

#### Parameters:

| Name      | Type                                 | Description                                           |
| :-------- | :----------------------------------- | :---------------------------------------------------- |
| `key`     | struct IUniswapV3Staker.IncentiveKey | The key of the incentive for which to unstake the NFT |
| `tokenId` | uint256                              | The ID of the token to unstake                        |

### claimReward

```solidity
  function claimReward(
    contract IERC20Minimal rewardToken,
    address to,
    uint256 amountRequested
  ) external override returns (uint256 reward)
```

Transfers `amountRequested` of accrued `rewardToken` rewards from the contract to the recipient `to`

#### Parameters:

| Name              | Type                   | Description                                                                    |
| :---------------- | :--------------------- | :----------------------------------------------------------------------------- |
| `rewardToken`     | contract IERC20Minimal | The token being distributed as a reward                                        |
| `to`              | address                | The address where claimed rewards will be sent to                              |
| `amountRequested` | uint256                | The amount of reward tokens to claim. Claims entire reward amount if set to 0. |

#### Return Values:

| Name     | Type    | Description                         |
| :------- | :------ | :---------------------------------- |
| `reward` | uint256 | The amount of reward tokens claimed |

### getRewardInfo

```solidity
  function getRewardInfo(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 tokenId
  ) external view override returns (uint256 reward, uint160 secondsInsideX128)
```

Calculates the reward amount that will be received for the given stake

#### Parameters:

| Name      | Type                                 | Description              |
| :-------- | :----------------------------------- | :----------------------- |
| `key`     | struct IUniswapV3Staker.IncentiveKey | The key of the incentive |
| `tokenId` | uint256                              | The ID of the token      |

#### Return Values:

| Name                | Type    | Description                                                    |
| :------------------ | :------ | :------------------------------------------------------------- |
| `reward`            | uint256 | The reward accrued to the NFT for the given incentive thus far |
| `secondsInsideX128` | uint160 | The seconds inside the tick range                              |

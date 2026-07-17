---
id: Strategies
title: Strategies
sidebar_position: 6
---

# Understanding liquidity strategies

Liquidity strategies are modular contracts for different price discovery and liquidity mechanisms. The stock contracts shipped with the Uniswap Liquidity Launchpad deploy new Continuous Clearing Auction (CCA) auctions and create Uniswap v4 LP pools with the proceeds.

This is only one of many possible strategies. We expect there to be many different strategies for different use cases.

## LBPStrategyBase
The LBPStrategyBase is an abstract base contract for liquidity bootstrapping (LBP) strategies. It provides core functionality for deploying auctions and initializing LP pools.

### Overview
Contracts inheriting from this base contract will be able to:
- Deploy a new Continuous Clearing Auction (CCA) auction
- Create a Uniswap v4 LP pool with the proceeds from the auction
- Send the LP position to a specified `positionRecipient`
- Sweep any leftover tokens or raised funds to a configured `operator`

The amount of tokens and currency used for the LP pool will vary depending on the final price of the auction and how much currency was raised.

The following functions are left virtual to be implemented by the inheriting contract:
- `_createPositionPlan`: Creates the calldata for Uniswap v4 Position Manager (POSM)
- `_getTokenTransferAmount`: Calculates the amount of tokens to transfer to POSM
- `_getCurrencyTransferAmount`: Calculates the amount of currency to transfer to POSM

For example, if only a full range position is desired, the inheriting contract should create a full range position plan and transfer the full amount of tokens and currency to Position Manager. See [FullRangeLBPStrategy](TODO) for an example implementation.

### Constructor parameters
The LBPStrategyBase constructor takes the following parameters:
```solidity
/// LBPStrategyBase.constructor
constructor(
    address _token,
    uint128 _totalSupply,
    MigratorParameters memory _migratorParams,
    bytes memory _auctionParams,
    IPositionManager _positionManager,
    IPoolManager _poolManager
)
```
- `_token`: The address of the token to be bootstrapped.
- `_totalSupply`: The total amount of tokens to be used for both the auction and LP pool.
- `_migratorParams`: The parameters for the pool migration.
- `_auctionParams`: The parameters for the created auction.
- `_positionManager`: The v4 position manager.
- `_poolManager`: The v4 pool manager.

During construction, the contract validates its parameters and calculates the number of tokens to send to the auction vs. reserve for the LP pool. This split is customizable within `MigratorParameters`:
```solidity
// src/types/MigratorParameters.sol

struct MigratorParameters {
    uint64 migrationBlock;
    address currency;
    uint24 poolLPFee;
    int24 poolTickSpacing;
    uint24 tokenSplitToAuction;
    address auctionFactory;
    address positionRecipient;
    uint64 sweepBlock;
    address operator;
    uint128 maxCurrencyAmountForLP;
}
```
- `migrationBlock`: The block number when `migrate()` can be called.
- `currency`: The currency that the token will be paired with in the v4 pool (currency that the auction raised funds in).
- `poolLPFee`: The LP fee that the v4 pool will use.
- `poolTickSpacing`: The tick spacing that the v4 pool will use.
- `tokenSplitToAuction`: The percentage of the total supply of the token that will be sent to the auction, expressed in mps (1e7 = 100%).
- `auctionFactory`: The Auction factory that will be used to create the auction.
- `positionRecipient`: The address that will receive the position.
- `sweepBlock`: The block number when the operator can sweep currency and tokens from the pool.
- `operator`: The address that is able to sweep currency and tokens from the pool.
- `maxCurrencyAmountForLP`: The maximum amount of currency that can be used for LP.

### migrate
The `migrate()` function initializes the liquidity pool in v4. It validates that the auction has concluded, calculates the amount of tokens and currency to transfer to Position Manager, and calls POSM to create the pool and position.

This function can be called by anyone after the configured `migrationBlock`.

### sweepToken() and sweepCurrency()
The `sweepToken()` and `sweepCurrency()` functions sweep any leftover tokens or raised funds to a configured `operator`. In many cases, these will be amounts intended for the team.

Sweeping can only be done after the configured `sweepBlock`, which must be after the `migrationBlock`.

Users should ensure there is enough time between `migrationBlock` and `sweepBlock` for the pool to be initialized and the tokens to be transferred to the position recipient before amounts are swept.

## FullRangeLBPStrategy
The FullRangeLBPStrategy is a simple implementation of the LBPStrategyBase contract that creates a full range position in the liquidity pool. It takes no additional constructor parameters.

## AdvancedLBPStrategy
The AdvancedLBPStrategy is a more advanced implementation of the LBPStrategyBase contract that allows for the creation of one-sided liquidity positions in addition to the full range one. It takes the following additional constructor parameters:
```solidity
constructor(
    ... // constructor parameters for LBPStrategyBase
    bool _createOneSidedTokenPosition,
    bool _createOneSidedCurrencyPosition
)
```
- `_createOneSidedTokenPosition`: True if a one-sided token position should be created.
- `_createOneSidedCurrencyPosition`: True if a one-sided currency position should be created.

If either of these are set to `true`, the contract will create a one-sided liquidity position in either token or currency with any remaining tokens or currency after the full range position is created.

The operator should not expect to receive any swept tokens or currency after the migration.

## GovernedLBPStrategy
The GovernedLBPStrategy is an extension of the FullRangeLBPStrategy that prevents swapping on the LP pool until approved by governance (or some other permissioned actor).

It takes the following additional constructor parameters:
```solidity
constructor(
    ... // constructor parameters for FullRangeLBPStrategy
    address _governance
)
```
- `_governance`: The address that is allowed to approve swaps on the LP pool.

## Writing a custom strategy
To create a custom strategy, inherit from the LBPStrategyBase contract to get the core functionality associated with creating an auction and LP pool.

Implement the `_createPositionPlan` function to create the calldata for the Uniswap v4 Position Manager (POSM) to create the position. Also implement `_getTokenTransferAmount` and `_getCurrencyTransferAmount` as needed to ensure the correct amount of tokens and currency are transferred.

Be aware of the following considerations:
- `LBPStrategyBase` does not require that `migrate()` is called before `sweepToken()` or `sweepCurrency()`. Any strategy written should ensure there is ample time between the end of the auction and the migration so the pool can be initialized and the tokens can be transferred to the position recipient before amounts are sent to the operator.
- `migrate()` can fail to create a full range position in rare cases. Be sure to validate the returned values from the auction.


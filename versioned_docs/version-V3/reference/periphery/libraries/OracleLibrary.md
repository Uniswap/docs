Provides functions to integrate with V3 pool oracle

## Functions

### consult

```solidity
  function consult(
    address pool,
    uint32 period
  ) internal view returns (int24 arithmeticMeanTick, uint128 harmonicMeanLiquidity)
```

Calculates time-weighted means of tick and liquidity for a given Uniswap V3 pool

#### Parameters:

| Name     | Type    | Description                                                              |
| :------- | :------ | :----------------------------------------------------------------------- |
| `pool`   | address | Address of Uniswap V3 pool that we want to observe                       |
| `period` | uint32  | Number of seconds in the past to start calculating time-weighted average |

#### Return Values:

| Name                      | Type    | Description                                                                       |
| :------------------------ | :------ | :-------------------------------------------------------------------------------- |
| `arithmeticMeanTick` | int24 | The arithmetic mean tick from (block.timestamp - secondsAgo) to block.timestamp |
| `harmonicMeanLiquidity` | uint128 | The harmonic mean liquidity from (block.timestamp - secondsAgo) to block.timestamp |


### getQuoteAtTick

```solidity
  function getQuoteAtTick(
    int24 tick,
    uint128 baseAmount,
    address baseToken,
    address quoteToken
  ) internal pure returns (uint256 quoteAmount)
```

Given a tick and a token amount, calculates the amount of token received in exchange

#### Parameters:

| Name         | Type    | Description                                                             |
| :----------- | :------ | :---------------------------------------------------------------------- |
| `tick`       | int24   | Tick value used to calculate the quote                                  |
| `baseAmount` | uint128 | Amount of token to be converted                                         |
| `baseToken`  | address | Address of an ERC20 token contract used as the baseAmount denomination  |
| `quoteToken` | address | Address of an ERC20 token contract used as the quoteAmount denomination |

#### Return Values:

| Name          | Type    | Description                                               |
| :------------ | :------ | :-------------------------------------------------------- |
| `quoteAmount` | uint256 | Amount of quoteToken received for baseAmount of baseToken |

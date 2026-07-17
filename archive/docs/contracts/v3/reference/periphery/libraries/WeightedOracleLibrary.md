Provides functions to integrate with different tier oracles of the same V3 pair

## Functions

### consult

```solidity
  function consult(
    address pool,
    uint32 period
  ) internal view returns (struct WeightedOracleLibrary.PeriodObservation observation)
```

Fetches a time-weighted observation for a given Uniswap V3 pool

#### Parameters:

| Name     | Type    | Description                                                                      |
| :------- | :------ | :------------------------------------------------------------------------------- |
| `pool`   | address | Address of the pool that we want to observe                                      |
| `period` | uint32  | Number of seconds in the past to start calculating the time-weighted observation |

#### Return Values:

| Name          | Type    | Description                                                                                   |
| :------------ | :------ | :-------------------------------------------------------------------------------------------- |
| `observation` | address | An observation that has been time-weighted from (block.timestamp - period) to block.timestamp |

### getArithmeticMeanTickWeightedByLiquidity

```solidity
  function getArithmeticMeanTickWeightedByLiquidity(
    struct WeightedOracleLibrary.PeriodObservation[] observations
  ) internal pure returns (int24 arithmeticMeanWeightedTick)
```

Given some time-weighted observations, calculates the arithmetic mean tick, weighted by liquidity

In most scenarios, each entry of `observations` should share the same `period` and underlying `pool` tokens.
If `period` differs across observations, the result becomes difficult to interpret and is likely biased/manipulable.
If the underlying `pool` tokens differ across observations, extreme care must be taken to ensure that both prices and liquidity values are comparable.
Even if prices are commensurate (e.g. two different USD-stable assets against ETH), liquidity values may not be, as decimals can differ between tokens.

#### Parameters:

| Name           | Type                                             | Description                          |
| :------------- | :----------------------------------------------- | :----------------------------------- |
| `observations` | struct WeightedOracleLibrary.PeriodObservation[] | A list of time-weighted observations |

#### Return Values:

| Name                         | Type                                             | Description                                                                                      |
| :--------------------------- | :----------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `arithmeticMeanWeightedTick` | struct WeightedOracleLibrary.PeriodObservation[] | The arithmetic mean tick, weighted by the observations' time-weighted harmonic average liquidity |

Allows computing rewards given some parameters of stakes and incentives


## Functions
### computeRewardAmount
```solidity
  function computeRewardAmount(
    uint256 totalRewardUnclaimed,
    uint160 totalSecondsClaimedX128,
    uint256 startTime,
    uint256 endTime,
    uint128 liquidity,
    uint160 secondsPerLiquidityInsideInitialX128,
    uint160 secondsPerLiquidityInsideX128,
    uint256 currentTime
  ) internal pure returns (uint256 reward, uint160 secondsInsideX128)
```
Compute the amount of rewards owed given parameters of the incentive and stake


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`totalRewardUnclaimed` | uint256 | The total amount of unclaimed rewards left for an incentive
|`totalSecondsClaimedX128` | uint160 | How many full liquidity-seconds have been already claimed for the incentive
|`startTime` | uint256 | When the incentive rewards began in epoch seconds
|`endTime` | uint256 | When rewards are no longer being dripped out in epoch seconds
|`liquidity` | uint128 | The amount of liquidity, assumed to be constant over the period over which the snapshots are measured
|`secondsPerLiquidityInsideInitialX128` | uint160 | The seconds per liquidity of the liquidity tick range as of the beginning of the period
|`secondsPerLiquidityInsideX128` | uint160 | The seconds per liquidity of the liquidity tick range as of the current block timestamp
|`currentTime` | uint256 | The current block timestamp, which must be greater than or equal to the start time

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`reward`| uint256 | The amount of rewards owed
|`secondsInsideX128`| uint160 | The total liquidity seconds inside the position's range for the duration of the stake

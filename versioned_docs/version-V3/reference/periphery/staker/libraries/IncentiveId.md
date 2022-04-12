## Functions

### compute

```solidity
  function compute(
    struct IUniswapV3Staker.IncentiveKey key
  ) internal pure returns (bytes32 incentiveId)
```

Calculate the key for a staking incentive

#### Parameters:

| Name  | Type                                 | Description                                             |
| :---- | :----------------------------------- | :------------------------------------------------------ |
| `key` | struct IUniswapV3Staker.IncentiveKey | The components used to compute the incentive identifier |

#### Return Values:

| Name          | Type    | Description                      |
| :------------ | :------ | :------------------------------- |
| `incentiveId` | bytes32 | The identifier for the incentive |

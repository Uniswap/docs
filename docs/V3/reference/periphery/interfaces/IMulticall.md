Enables calling multiple methods in a single call to the contract


## Functions
### multicall
```solidity
  function multicall(
    bytes[] data
  ) external returns (bytes[] results)
```
Call multiple functions in the current contract and return the data from all of them if they all succeed

The `msg.value` should not be trusted for any method callable from multicall.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`data` | bytes[] | The encoded function data for each of the calls to make to this contract

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`results`| bytes[] | The results from each of the calls passed in via data

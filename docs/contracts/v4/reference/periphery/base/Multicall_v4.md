# Multicall_v4
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/base/Multicall_v4.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IMulticall_v4](contracts/v4/reference/periphery/interfaces/IMulticall_v4.md)

Enables calling multiple methods in a single call to the contract


## Functions
### multicall

Call multiple functions in the current contract and return the data from all of them if they all succeed

*The `msg.value` is passed onto all subcalls, even if a previous subcall has consumed the ether.
Subcalls can instead use `address(this).value` to see the available ETH, and consume it using {value: x}.*


```solidity
function multicall(bytes[] calldata data) external payable returns (bytes[] memory results);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes[]`|The encoded function data for each of the calls to make to this contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`results`|`bytes[]`|The results from each of the calls passed in via data|



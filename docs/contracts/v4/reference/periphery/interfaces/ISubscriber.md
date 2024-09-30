# ISubscriber
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/interfaces/ISubscriber.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface that a Subscriber contract should implement to receive updates from the v4 position manager


## Functions
### notifySubscribe


```solidity
function notifySubscribe(uint256 tokenId, bytes memory data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the token ID of the position|
|`data`|`bytes`|additional data passed in by the caller|


### notifyUnsubscribe

Called when a position unsubscribes from the subscriber

*This call's gas is capped at `unsubscribeGasLimit` (set at deployment)*

*Because of EIP-150, solidity may only allocate 63/64 of gasleft()*


```solidity
function notifyUnsubscribe(uint256 tokenId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the token ID of the position|


### notifyModifyLiquidity


```solidity
function notifyModifyLiquidity(uint256 tokenId, int256 liquidityChange, BalanceDelta feesAccrued) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the token ID of the position|
|`liquidityChange`|`int256`|the change in liquidity on the underlying position|
|`feesAccrued`|`BalanceDelta`|the fees to be collected from the position as a result of the modifyLiquidity call|


### notifyTransfer


```solidity
function notifyTransfer(uint256 tokenId, address previousOwner, address newOwner) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the token ID of the position|
|`previousOwner`|`address`|address of the old owner|
|`newOwner`|`address`|address of the new owner|



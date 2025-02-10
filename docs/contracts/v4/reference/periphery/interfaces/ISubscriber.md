# ISubscriber
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/interfaces/ISubscriber.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface that a Subscriber contract should implement to receive updates from the v4 position manager


## Functions
### notifySubscribe

Called when a position subscribes to this subscriber contract


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


### notifyBurn

Called when a position is burned


```solidity
function notifyBurn(uint256 tokenId, address owner, PositionInfo info, uint256 liquidity, BalanceDelta feesAccrued)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the token ID of the position|
|`owner`|`address`|the current owner of the tokenId|
|`info`|`PositionInfo`|information about the position|
|`liquidity`|`uint256`|the amount of liquidity decreased in the position, may be 0|
|`feesAccrued`|`BalanceDelta`|the fees accrued by the position if liquidity was decreased|


### notifyModifyLiquidity

Called when a position modifies its liquidity or collects fees

*Note that feesAccrued can be artificially inflated by a malicious user
Pools with a single liquidity position can inflate feeGrowthGlobal (and consequently feesAccrued) by donating to themselves;
atomically donating and collecting fees within the same unlockCallback may further inflate feeGrowthGlobal/feesAccrued*


```solidity
function notifyModifyLiquidity(uint256 tokenId, int256 liquidityChange, BalanceDelta feesAccrued) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the token ID of the position|
|`liquidityChange`|`int256`|the change in liquidity on the underlying position|
|`feesAccrued`|`BalanceDelta`|the fees to be collected from the position as a result of the modifyLiquidity call|



# IPositionManager
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/interfaces/IPositionManager.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[INotifier](contracts/v4/reference/periphery/interfaces/INotifier.md), [IImmutableState](contracts/v4/reference/periphery/interfaces/IImmutableState.md)

Interface for the PositionManager contract


## Functions
### modifyLiquidities

Unlocks Uniswap v4 PoolManager and batches actions for modifying liquidity

*This is the standard entrypoint for the PositionManager*


```solidity
function modifyLiquidities(bytes calldata unlockData, uint256 deadline) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`unlockData`|`bytes`|is an encoding of actions, and parameters for those actions|
|`deadline`|`uint256`|is the deadline for the batched actions to be executed|


### modifyLiquiditiesWithoutUnlock

Batches actions for modifying liquidity without unlocking v4 PoolManager

*This must be called by a contract that has already unlocked the v4 PoolManager*


```solidity
function modifyLiquiditiesWithoutUnlock(bytes calldata actions, bytes[] calldata params) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`actions`|`bytes`|the actions to perform|
|`params`|`bytes[]`|the parameters to provide for the actions|


### nextTokenId

Used to get the ID that will be used for the next minted liquidity position


```solidity
function nextTokenId() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The next token ID|


### getPositionLiquidity

*this value can be processed as an amount0 and amount1 by using the LiquidityAmounts library*


```solidity
function getPositionLiquidity(uint256 tokenId) external view returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|the position's liquidity, as a liquidityAmount|


### getPoolAndPositionInfo


```solidity
function getPoolAndPositionInfo(uint256 tokenId) external view returns (PoolKey memory, PositionInfo);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PoolKey`|PositionInfo a uint256 packed value holding information about the position including the range (tickLower, tickUpper)|
|`<none>`|`PositionInfo`|poolKey the pool key of the position|


## Errors
### NotApproved
Thrown when the caller is not approved to modify a position


```solidity
error NotApproved(address caller);
```

### DeadlinePassed
Thrown when the block.timestamp exceeds the user-provided deadline


```solidity
error DeadlinePassed(uint256 deadline);
```

### PoolManagerMustBeLocked
Thrown when calling transfer, subscribe, or unsubscribe when the PoolManager is unlocked.

*This is to prevent hooks from being able to trigger notifications at the same time the position is being modified.*


```solidity
error PoolManagerMustBeLocked();
```


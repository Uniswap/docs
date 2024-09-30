# PositionManager
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/PositionManager.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IPositionManager](contracts/v4/reference/periphery/interfaces/IPositionManager.md), [ERC721Permit_v4](contracts/v4/reference/periphery/base/ERC721Permit_v4.md), [PoolInitializer](contracts/v4/reference/periphery/base/PoolInitializer.md), [Multicall_v4](contracts/v4/reference/periphery/base/Multicall_v4.md), [DeltaResolver](contracts/v4/reference/periphery/base/DeltaResolver.md), [ReentrancyLock](contracts/v4/reference/periphery/base/ReentrancyLock.md), [BaseActionsRouter](contracts/v4/reference/periphery/base/BaseActionsRouter.md), [Notifier](contracts/v4/reference/periphery/base/Notifier.md), [Permit2Forwarder](contracts/v4/reference/periphery/base/Permit2Forwarder.md)

The PositionManager (PosM) contract is responsible for creating liquidity positions on v4.
PosM mints and manages ERC721 tokens associated with each position.


## State Variables
### nextTokenId
Used to get the ID that will be used for the next minted liquidity position

*The ID of the next token that will be minted. Skips 0*


```solidity
uint256 public nextTokenId = 1;
```


### positionInfo

```solidity
mapping(uint256 tokenId => PositionInfo info) public positionInfo;
```


### poolKeys

```solidity
mapping(bytes25 poolId => PoolKey poolKey) public poolKeys;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager, IAllowanceTransfer _permit2, uint256 _unsubscribeGasLimit)
    BaseActionsRouter(_poolManager)
    Permit2Forwarder(_permit2)
    ERC721Permit_v4("Uniswap V4 Positions NFT", "UNI-V4-POSM")
    Notifier(_unsubscribeGasLimit);
```

### checkDeadline

Reverts if the deadline has passed


```solidity
modifier checkDeadline(uint256 deadline);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deadline`|`uint256`|The timestamp at which the call is no longer valid, passed in by the caller|


### onlyIfApproved

Reverts if the caller is not the owner or approved for the ERC721 token

*either msg.sender or msgSender() is passed in as the caller
msgSender() should ONLY be used if this is called from within the unlockCallback, unless the codepath has reentrancy protection*


```solidity
modifier onlyIfApproved(address caller, uint256 tokenId) override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`caller`|`address`|The address of the caller|
|`tokenId`|`uint256`|the unique identifier of the ERC721 token|


### modifyLiquidities

Unlocks Uniswap v4 PoolManager and batches actions for modifying liquidity

*This is the standard entrypoint for the PositionManager*


```solidity
function modifyLiquidities(bytes calldata unlockData, uint256 deadline)
    external
    payable
    isNotLocked
    checkDeadline(deadline);
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
function modifyLiquiditiesWithoutUnlock(bytes calldata actions, bytes[] calldata params) external payable isNotLocked;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`actions`|`bytes`|the actions to perform|
|`params`|`bytes[]`|the parameters to provide for the actions|


### msgSender

function that returns address considered executor of the actions

*The other context functions, _msgData and _msgValue, are not supported by this contract
In many contracts this will be the address that calls the initial entry point that calls `_executeActions`
`msg.sender` shouldn't be used, as this will be the v4 pool manager contract that calls `unlockCallback`
If using ReentrancyLock.sol, this function can return _getLocker()*


```solidity
function msgSender() public view override returns (address);
```

### _handleAction


```solidity
function _handleAction(uint256 action, bytes calldata params) internal virtual override;
```

### _increase

*Calling increase with 0 liquidity will credit the caller with any underlying fees of the position*


```solidity
function _increase(uint256 tokenId, uint256 liquidity, uint128 amount0Max, uint128 amount1Max, bytes calldata hookData)
    internal
    onlyIfApproved(msgSender(), tokenId);
```

### _decrease

*Calling decrease with 0 liquidity will credit the caller with any underlying fees of the position*


```solidity
function _decrease(uint256 tokenId, uint256 liquidity, uint128 amount0Min, uint128 amount1Min, bytes calldata hookData)
    internal
    onlyIfApproved(msgSender(), tokenId);
```

### _mint


```solidity
function _mint(
    PoolKey calldata poolKey,
    int24 tickLower,
    int24 tickUpper,
    uint256 liquidity,
    uint128 amount0Max,
    uint128 amount1Max,
    address owner,
    bytes calldata hookData
) internal;
```

### _burn

*this is overloaded with ERC721Permit_v4._burn*


```solidity
function _burn(uint256 tokenId, uint128 amount0Min, uint128 amount1Min, bytes calldata hookData)
    internal
    onlyIfApproved(msgSender(), tokenId);
```

### _settlePair


```solidity
function _settlePair(Currency currency0, Currency currency1) internal;
```

### _takePair


```solidity
function _takePair(Currency currency0, Currency currency1, address recipient) internal;
```

### _close


```solidity
function _close(Currency currency) internal;
```

### _clearOrTake

*integrators may elect to forfeit positive deltas with clear
if the forfeit amount exceeds the user-specified max, the amount is taken instead*


```solidity
function _clearOrTake(Currency currency, uint256 amountMax) internal;
```

### _sweep

Sweeps the entire contract balance of specified currency to the recipient


```solidity
function _sweep(Currency currency, address to) internal;
```

### _modifyLiquidity


```solidity
function _modifyLiquidity(
    PositionInfo info,
    PoolKey memory poolKey,
    int256 liquidityChange,
    bytes32 salt,
    bytes calldata hookData
) internal returns (BalanceDelta liquidityDelta, BalanceDelta feesAccrued);
```

### _pay


```solidity
function _pay(Currency currency, address payer, uint256 amount) internal override;
```

### _setSubscribed

an internal helper used by Notifier


```solidity
function _setSubscribed(uint256 tokenId) internal override;
```

### _setUnsubscribed

an internal helper used by Notifier


```solidity
function _setUnsubscribed(uint256 tokenId) internal override;
```

### transferFrom

*overrides solmate transferFrom in case a notification to subscribers is needed*


```solidity
function transferFrom(address from, address to, uint256 id) public virtual override;
```

### getPoolAndPositionInfo


```solidity
function getPoolAndPositionInfo(uint256 tokenId) public view returns (PoolKey memory poolKey, PositionInfo info);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`PoolKey`|the pool key of the position|
|`info`|`PositionInfo`|poolKey the pool key of the position|


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


### _getLiquidity


```solidity
function _getLiquidity(uint256 tokenId, PoolKey memory poolKey, int24 tickLower, int24 tickUpper)
    internal
    view
    returns (uint128 liquidity);
```


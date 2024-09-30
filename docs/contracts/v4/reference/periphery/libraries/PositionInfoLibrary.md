# PositionInfoLibrary
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/libraries/PositionInfoLibrary.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## State Variables
### EMPTY_POSITION_INFO

```solidity
PositionInfo internal constant EMPTY_POSITION_INFO = PositionInfo.wrap(0);
```


### MASK_UPPER_200_BITS

```solidity
uint256 internal constant MASK_UPPER_200_BITS = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000000000;
```


### MASK_8_BITS

```solidity
uint256 internal constant MASK_8_BITS = 0xFF;
```


### MASK_24_BITS

```solidity
uint24 internal constant MASK_24_BITS = 0xFFFFFF;
```


### SET_UNSUBSCRIBE

```solidity
uint256 internal constant SET_UNSUBSCRIBE = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00;
```


### SET_SUBSCRIBE

```solidity
uint256 internal constant SET_SUBSCRIBE = 0x01;
```


### TICK_LOWER_OFFSET

```solidity
uint8 internal constant TICK_LOWER_OFFSET = 8;
```


### TICK_UPPER_OFFSET

```solidity
uint8 internal constant TICK_UPPER_OFFSET = 32;
```


## Functions
### poolId

*This poolId is NOT compatible with the poolId used in UniswapV4 core. It is truncated to 25 bytes, and just used to lookup PoolKey in the poolKeys mapping.*


```solidity
function poolId(PositionInfo info) internal pure returns (bytes25 _poolId);
```

### tickLower


```solidity
function tickLower(PositionInfo info) internal pure returns (int24 _tickLower);
```

### tickUpper


```solidity
function tickUpper(PositionInfo info) internal pure returns (int24 _tickUpper);
```

### hasSubscriber


```solidity
function hasSubscriber(PositionInfo info) internal pure returns (bool _hasSubscriber);
```

### setSubscribe

*this does not actually set any storage*


```solidity
function setSubscribe(PositionInfo info) internal pure returns (PositionInfo _info);
```

### setUnsubscribe

*this does not actually set any storage*


```solidity
function setUnsubscribe(PositionInfo info) internal pure returns (PositionInfo _info);
```

### initialize

Creates the default PositionInfo struct

*Called when minting a new position*


```solidity
function initialize(PoolKey memory _poolKey, int24 _tickLower, int24 _tickUpper)
    internal
    pure
    returns (PositionInfo info);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_poolKey`|`PoolKey`|the pool key of the position|
|`_tickLower`|`int24`|the lower tick of the position|
|`_tickUpper`|`int24`|the upper tick of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`info`|`PositionInfo`|packed position info, with the truncated poolId and the hasSubscriber flag set to false|



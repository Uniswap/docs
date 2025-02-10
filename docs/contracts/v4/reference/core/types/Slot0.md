# Slot0
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Slot0.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

*Slot0 is a packed version of solidity structure.
Using the packaged version saves gas by not storing the structure fields in memory slots.
Layout:
24 bits empty | 24 bits lpFee | 12 bits protocolFee 1->0 | 12 bits protocolFee 0->1 | 24 bits tick | 160 bits sqrtPriceX96
Fields in the direction from the least significant bit:
The current price
uint160 sqrtPriceX96;
The current tick
int24 tick;
Protocol fee, expressed in hundredths of a bip, upper 12 bits are for 1->0, and the lower 12 are for 0->1
the maximum is 1000 - meaning the maximum protocol fee is 0.1%
the protocolFee is taken from the input first, then the lpFee is taken from the remaining input
uint24 protocolFee;
The current LP fee of the pool. If the pool is dynamic, this does not include the dynamic fee flag.
uint24 lpFee;*


```solidity
type Slot0 is bytes32;
```

# Slot0Library
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Slot0.sol)

Library for getting and setting values in the Slot0 type


## State Variables
### MASK_160_BITS

```solidity
uint160 internal constant MASK_160_BITS = 0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
```


### MASK_24_BITS

```solidity
uint24 internal constant MASK_24_BITS = 0xFFFFFF;
```


### TICK_OFFSET

```solidity
uint8 internal constant TICK_OFFSET = 160;
```


### PROTOCOL_FEE_OFFSET

```solidity
uint8 internal constant PROTOCOL_FEE_OFFSET = 184;
```


### LP_FEE_OFFSET

```solidity
uint8 internal constant LP_FEE_OFFSET = 208;
```


## Functions
### sqrtPriceX96


```solidity
function sqrtPriceX96(Slot0 _packed) internal pure returns (uint160 _sqrtPriceX96);
```

### tick


```solidity
function tick(Slot0 _packed) internal pure returns (int24 _tick);
```

### protocolFee


```solidity
function protocolFee(Slot0 _packed) internal pure returns (uint24 _protocolFee);
```

### lpFee


```solidity
function lpFee(Slot0 _packed) internal pure returns (uint24 _lpFee);
```

### setSqrtPriceX96


```solidity
function setSqrtPriceX96(Slot0 _packed, uint160 _sqrtPriceX96) internal pure returns (Slot0 _result);
```

### setTick


```solidity
function setTick(Slot0 _packed, int24 _tick) internal pure returns (Slot0 _result);
```

### setProtocolFee


```solidity
function setProtocolFee(Slot0 _packed, uint24 _protocolFee) internal pure returns (Slot0 _result);
```

### setLpFee


```solidity
function setLpFee(Slot0 _packed, uint24 _lpFee) internal pure returns (Slot0 _result);
```


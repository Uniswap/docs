# TickOverflowSafetyEchidnaTest
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/TickOverflowSafetyEchidnaTest.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## State Variables
### MIN_TICK

```solidity
int24 private constant MIN_TICK = -16;
```


### MAX_TICK

```solidity
int24 private constant MAX_TICK = 16;
```


### pool

```solidity
Pool.State private pool;
```


### tick

```solidity
int24 private tick = 0;
```


### feeGrowthGlobal0X128

```solidity
uint256 feeGrowthGlobal0X128 = type(uint256).max / 2;
```


### feeGrowthGlobal1X128

```solidity
uint256 feeGrowthGlobal1X128 = type(uint256).max / 2;
```


### totalLiquidity

```solidity
int256 totalLiquidity = 0;
```


### totalGrowth0

```solidity
uint256 private totalGrowth0 = 0;
```


### totalGrowth1

```solidity
uint256 private totalGrowth1 = 0;
```


## Functions
### increaseFeeGrowthGlobal0X128


```solidity
function increaseFeeGrowthGlobal0X128(uint256 amount) external;
```

### increaseFeeGrowthGlobal1X128


```solidity
function increaseFeeGrowthGlobal1X128(uint256 amount) external;
```

### setPosition


```solidity
function setPosition(int24 tickLower, int24 tickUpper, int128 liquidityDelta) external;
```

### moveToTick


```solidity
function moveToTick(int24 target) external;
```


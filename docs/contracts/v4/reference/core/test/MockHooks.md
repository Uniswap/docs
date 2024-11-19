# MockHooks
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/test/MockHooks.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IHooks](contracts/v4/reference/core/interfaces/IHooks.md)


## State Variables
### beforeInitializeData

```solidity
bytes public beforeInitializeData;
```


### afterInitializeData

```solidity
bytes public afterInitializeData;
```


### beforeAddLiquidityData

```solidity
bytes public beforeAddLiquidityData;
```


### afterAddLiquidityData

```solidity
bytes public afterAddLiquidityData;
```


### beforeRemoveLiquidityData

```solidity
bytes public beforeRemoveLiquidityData;
```


### afterRemoveLiquidityData

```solidity
bytes public afterRemoveLiquidityData;
```


### beforeSwapData

```solidity
bytes public beforeSwapData;
```


### afterSwapData

```solidity
bytes public afterSwapData;
```


### beforeDonateData

```solidity
bytes public beforeDonateData;
```


### afterDonateData

```solidity
bytes public afterDonateData;
```


### returnValues

```solidity
mapping(bytes4 => bytes4) public returnValues;
```


### lpFees

```solidity
mapping(PoolId => uint16) public lpFees;
```


## Functions
### beforeInitialize


```solidity
function beforeInitialize(address, PoolKey calldata, uint160) external override returns (bytes4);
```

### afterInitialize


```solidity
function afterInitialize(address, PoolKey calldata, uint160, int24) external override returns (bytes4);
```

### beforeAddLiquidity


```solidity
function beforeAddLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    bytes calldata hookData
) external override returns (bytes4);
```

### afterAddLiquidity


```solidity
function afterAddLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata hookData
) external override returns (bytes4, BalanceDelta);
```

### beforeRemoveLiquidity


```solidity
function beforeRemoveLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    bytes calldata hookData
) external override returns (bytes4);
```

### afterRemoveLiquidity


```solidity
function afterRemoveLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata hookData
) external override returns (bytes4, BalanceDelta);
```

### beforeSwap


```solidity
function beforeSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, bytes calldata hookData)
    external
    override
    returns (bytes4, BeforeSwapDelta, uint24);
```

### afterSwap


```solidity
function afterSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, BalanceDelta, bytes calldata hookData)
    external
    override
    returns (bytes4, int128);
```

### beforeDonate


```solidity
function beforeDonate(address, PoolKey calldata, uint256, uint256, bytes calldata hookData)
    external
    override
    returns (bytes4);
```

### afterDonate


```solidity
function afterDonate(address, PoolKey calldata, uint256, uint256, bytes calldata hookData)
    external
    override
    returns (bytes4);
```

### setReturnValue


```solidity
function setReturnValue(bytes4 key, bytes4 value) external;
```

### setlpFee


```solidity
function setlpFee(PoolKey calldata key, uint16 value) external;
```


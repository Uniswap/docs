# PoolManager
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/PoolManager.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IPoolManager](contracts/v4/reference/core/interfaces/IPoolManager.md), [ProtocolFees](contracts/v4/reference/core/ProtocolFees.md), [NoDelegateCall](contracts/v4/reference/core/NoDelegateCall.md), [ERC6909Claims](contracts/v4/reference/core/ERC6909Claims.md), [Extsload](contracts/v4/reference/core/Extsload.md), [Exttload](contracts/v4/reference/core/Exttload.md)

Holds the state for all pools


## State Variables
### MAX_TICK_SPACING

```solidity
int24 private constant MAX_TICK_SPACING = TickMath.MAX_TICK_SPACING;
```


### MIN_TICK_SPACING

```solidity
int24 private constant MIN_TICK_SPACING = TickMath.MIN_TICK_SPACING;
```


### _pools

```solidity
mapping(PoolId id => Pool.State) internal _pools;
```


## Functions
### onlyWhenUnlocked

This will revert if the contract is locked


```solidity
modifier onlyWhenUnlocked();
```

### constructor


```solidity
constructor(address initialOwner) ProtocolFees(initialOwner);
```

### unlock

All interactions on the contract that account deltas require unlocking. A caller that calls `unlock` must implement
`IUnlockCallback(msg.sender).unlockCallback(data)`, where they interact with the remaining functions on this contract.

*The only functions callable without an unlocking are `initialize` and `updateDynamicLPFee`*


```solidity
function unlock(bytes calldata data) external override returns (bytes memory result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|Any data to pass to the callback, via `IUnlockCallback(msg.sender).unlockCallback(data)`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`bytes`|The data returned by the call to `IUnlockCallback(msg.sender).unlockCallback(data)`|


### initialize

Initialize the state for a given pool ID

*A swap fee totaling MAX_SWAP_FEE (100%) makes exact output swaps impossible since the input is entirely consumed by the fee*


```solidity
function initialize(PoolKey memory key, uint160 sqrtPriceX96) external noDelegateCall returns (int24 tick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool key for the pool to initialize|
|`sqrtPriceX96`|`uint160`|The initial square root price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The initial tick of the pool|


### modifyLiquidity

Modify the liquidity for the given pool

*Poke by calling with a zero liquidityDelta*


```solidity
function modifyLiquidity(PoolKey memory key, IPoolManager.ModifyLiquidityParams memory params, bytes calldata hookData)
    external
    onlyWhenUnlocked
    noDelegateCall
    returns (BalanceDelta callerDelta, BalanceDelta feesAccrued);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool to modify liquidity in|
|`params`|`IPoolManager.ModifyLiquidityParams`|The parameters for modifying the liquidity|
|`hookData`|`bytes`|The data to pass through to the add/removeLiquidity hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`callerDelta`|`BalanceDelta`|The balance delta of the caller of modifyLiquidity. This is the total of both principal, fee deltas, and hook deltas if applicable|
|`feesAccrued`|`BalanceDelta`|The balance delta of the fees generated in the liquidity range. Returned for informational purposes|


### swap

Swap against the given pool

*Swapping on low liquidity pools may cause unexpected swap amounts when liquidity available is less than amountSpecified.
Additionally note that if interacting with hooks that have the BEFORE_SWAP_RETURNS_DELTA_FLAG or AFTER_SWAP_RETURNS_DELTA_FLAG
the hook may alter the swap input/output. Integrators should perform checks on the returned swapDelta.*


```solidity
function swap(PoolKey memory key, IPoolManager.SwapParams memory params, bytes calldata hookData)
    external
    onlyWhenUnlocked
    noDelegateCall
    returns (BalanceDelta swapDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool to swap in|
|`params`|`IPoolManager.SwapParams`|The parameters for swapping|
|`hookData`|`bytes`|The data to pass through to the swap hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`swapDelta`|`BalanceDelta`|The balance delta of the address swapping|


### _swap

Internal swap function to execute a swap, take protocol fees on input token, and emit the swap event


```solidity
function _swap(Pool.State storage pool, PoolId id, Pool.SwapParams memory params, Currency inputCurrency)
    internal
    returns (BalanceDelta);
```

### donate

Donate the given currency amounts to the in-range liquidity providers of a pool

*Calls to donate can be frontrun adding just-in-time liquidity, with the aim of receiving a portion donated funds.
Donors should keep this in mind when designing donation mechanisms.*


```solidity
function donate(PoolKey memory key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    external
    onlyWhenUnlocked
    noDelegateCall
    returns (BalanceDelta delta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The key of the pool to donate to|
|`amount0`|`uint256`|The amount of currency0 to donate|
|`amount1`|`uint256`|The amount of currency1 to donate|
|`hookData`|`bytes`|The data to pass through to the donate hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`delta`|`BalanceDelta`|BalanceDelta The delta of the caller after the donate|


### sync

Writes the current ERC20 balance of the specified currency to transient storage
This is used to checkpoint balances for the manager and derive deltas for the caller.

*This MUST be called before any ERC20 tokens are sent into the contract, but can be skipped
for native tokens because the amount to settle is determined by the sent value.
However, if an ERC20 token has been synced and not settled, and the caller instead wants to settle
native funds, this function can be called with the native currency to then be able to settle the native currency*


```solidity
function sync(Currency currency) external;
```

### take

Called by the user to net out some value owed to the user

*Will revert if the requested amount is not available, consider using `mint` instead*


```solidity
function take(Currency currency, address to, uint256 amount) external onlyWhenUnlocked;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`Currency`|The currency to withdraw from the pool manager|
|`to`|`address`|The address to withdraw to|
|`amount`|`uint256`|The amount of currency to withdraw|


### settle

Called by the user to pay what is owed


```solidity
function settle() external payable onlyWhenUnlocked returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|paid The amount of currency settled|


### settleFor

Called by the user to pay on behalf of another address


```solidity
function settleFor(address recipient) external payable onlyWhenUnlocked returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address to credit for the payment|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|paid The amount of currency settled|


### clear

WARNING - Any currency that is cleared, will be non-retrievable, and locked in the contract permanently.
A call to clear will zero out a positive balance WITHOUT a corresponding transfer.

*This could be used to clear a balance that is considered dust.
Additionally, the amount must be the exact positive balance. This is to enforce that the caller is aware of the amount being cleared.*


```solidity
function clear(Currency currency, uint256 amount) external onlyWhenUnlocked;
```

### mint

Called by the user to move value into ERC6909 balance

*The id is converted to a uint160 to correspond to a currency address
If the upper 12 bytes are not 0, they will be 0-ed out*


```solidity
function mint(address to, uint256 id, uint256 amount) external onlyWhenUnlocked;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to mint the tokens to|
|`id`|`uint256`|The currency address to mint to ERC6909s, as a uint256|
|`amount`|`uint256`|The amount of currency to mint|


### burn

Called by the user to move value from ERC6909 balance

*The id is converted to a uint160 to correspond to a currency address
If the upper 12 bytes are not 0, they will be 0-ed out*


```solidity
function burn(address from, uint256 id, uint256 amount) external onlyWhenUnlocked;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The address to burn the tokens from|
|`id`|`uint256`|The currency address to burn from ERC6909s, as a uint256|
|`amount`|`uint256`|The amount of currency to burn|


### updateDynamicLPFee

Updates the pools lp fees for the a pool that has enabled dynamic lp fees.

*A swap fee totaling MAX_SWAP_FEE (100%) makes exact output swaps impossible since the input is entirely consumed by the fee*


```solidity
function updateDynamicLPFee(PoolKey memory key, uint24 newDynamicLPFee) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The key of the pool to update dynamic LP fees for|
|`newDynamicLPFee`|`uint24`|The new dynamic pool LP fee|


### _settle


```solidity
function _settle(address recipient) internal returns (uint256 paid);
```

### _accountDelta

Adds a balance delta in a currency for a target address


```solidity
function _accountDelta(Currency currency, int128 delta, address target) internal;
```

### _accountPoolBalanceDelta

Accounts the deltas of 2 currencies to a target address


```solidity
function _accountPoolBalanceDelta(PoolKey memory key, BalanceDelta delta, address target) internal;
```

### _getPool

Implementation of the _getPool function defined in ProtocolFees


```solidity
function _getPool(PoolId id) internal view override returns (Pool.State storage);
```

### _isUnlocked

Implementation of the _isUnlocked function defined in ProtocolFees


```solidity
function _isUnlocked() internal view override returns (bool);
```


# IPoolManager
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/interfaces/IPoolManager.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IProtocolFees](contracts/v4/reference/core/interfaces/IProtocolFees.md), [IERC6909Claims](contracts/v4/reference/core/interfaces/IERC6909Claims.md), [IExtsload](contracts/v4/reference/core/interfaces/IExtsload.md), [IExttload](contracts/v4/reference/core/interfaces/IExttload.md)

Interface for the PoolManager


## Functions
### unlock

All interactions on the contract that account deltas require unlocking. A caller that calls `unlock` must implement
`IUnlockCallback(msg.sender).unlockCallback(data)`, where they interact with the remaining functions on this contract.

*The only functions callable without an unlocking are `initialize` and `updateDynamicLPFee`*


```solidity
function unlock(bytes calldata data) external returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|Any data to pass to the callback, via `IUnlockCallback(msg.sender).unlockCallback(data)`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The data returned by the call to `IUnlockCallback(msg.sender).unlockCallback(data)`|


### initialize

Initialize the state for a given pool ID

*A swap fee totaling MAX_SWAP_FEE (100%) makes exact output swaps impossible since the input is entirely consumed by the fee*


```solidity
function initialize(PoolKey memory key, uint160 sqrtPriceX96, bytes calldata hookData) external returns (int24 tick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool key for the pool to initialize|
|`sqrtPriceX96`|`uint160`|The initial square root price|
|`hookData`|`bytes`|The data to pass through to the initialize hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The initial tick of the pool|


### modifyLiquidity

Modify the liquidity for the given pool

*Poke by calling with a zero liquidityDelta*


```solidity
function modifyLiquidity(PoolKey memory key, ModifyLiquidityParams memory params, bytes calldata hookData)
    external
    returns (BalanceDelta callerDelta, BalanceDelta feesAccrued);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool to modify liquidity in|
|`params`|`ModifyLiquidityParams`|The parameters for modifying the liquidity|
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
function swap(PoolKey memory key, SwapParams memory params, bytes calldata hookData)
    external
    returns (BalanceDelta swapDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool to swap in|
|`params`|`SwapParams`|The parameters for swapping|
|`hookData`|`bytes`|The data to pass through to the swap hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`swapDelta`|`BalanceDelta`|The balance delta of the address swapping|


### donate

Donate the given currency amounts to the in-range liquidity providers of a pool

*Calls to donate can be frontrun adding just-in-time liquidity, with the aim of receiving a portion donated funds.
Donors should keep this in mind when designing donation mechanisms.*

*This function donates to in-range LPs at slot0.tick. In certain edge-cases of the swap algorithm, the `sqrtPrice` of
a pool can be at the lower boundary of tick `n`, but the `slot0.tick` of the pool is already `n - 1`. In this case a call to
`donate` would donate to tick `n - 1` (slot0.tick) not tick `n` (getTickAtSqrtPrice(slot0.sqrtPriceX96)).
Read the comments in `Pool.swap()` for more information about this.*


```solidity
function donate(PoolKey memory key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    external
    returns (BalanceDelta);
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
|`<none>`|`BalanceDelta`|BalanceDelta The delta of the caller after the donate|


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

*Can also be used as a mechanism for _free_ flash loans*


```solidity
function take(Currency currency, address to, uint256 amount) external;
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
function settle() external payable returns (uint256 paid);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`paid`|`uint256`|The amount of currency settled|


### settleFor

Called by the user to pay on behalf of another address


```solidity
function settleFor(address recipient) external payable returns (uint256 paid);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address to credit for the payment|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`paid`|`uint256`|The amount of currency settled|


### clear

WARNING - Any currency that is cleared, will be non-retrievable, and locked in the contract permanently.
A call to clear will zero out a positive balance WITHOUT a corresponding transfer.

*This could be used to clear a balance that is considered dust.
Additionally, the amount must be the exact positive balance. This is to enforce that the caller is aware of the amount being cleared.*


```solidity
function clear(Currency currency, uint256 amount) external;
```

### mint

Called by the user to move value into ERC6909 balance

*The id is converted to a uint160 to correspond to a currency address
If the upper 12 bytes are not 0, they will be 0-ed out*


```solidity
function mint(address to, uint256 id, uint256 amount) external;
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
function burn(address from, uint256 id, uint256 amount) external;
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


## Events
### Initialize
Emitted when a new pool is initialized


```solidity
event Initialize(
    PoolId indexed id,
    Currency indexed currency0,
    Currency indexed currency1,
    uint24 fee,
    int24 tickSpacing,
    IHooks hooks,
    uint160 sqrtPriceX96,
    int24 tick
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`PoolId`|The abi encoded hash of the pool key struct for the new pool|
|`currency0`|`Currency`|The first currency of the pool by address sort order|
|`currency1`|`Currency`|The second currency of the pool by address sort order|
|`fee`|`uint24`|The fee collected upon every swap in the pool, denominated in hundredths of a bip|
|`tickSpacing`|`int24`|The minimum number of ticks between initialized ticks|
|`hooks`|`IHooks`|The hooks contract address for the pool, or address(0) if none|
|`sqrtPriceX96`|`uint160`|The price of the pool on initialization|
|`tick`|`int24`|The initial tick of the pool corresponding to the intialized price|

### ModifyLiquidity
Emitted when a liquidity position is modified


```solidity
event ModifyLiquidity(
    PoolId indexed id, address indexed sender, int24 tickLower, int24 tickUpper, int256 liquidityDelta, bytes32 salt
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`PoolId`|The abi encoded hash of the pool key struct for the pool that was modified|
|`sender`|`address`|The address that modified the pool|
|`tickLower`|`int24`|The lower tick of the position|
|`tickUpper`|`int24`|The upper tick of the position|
|`liquidityDelta`|`int256`|The amount of liquidity that was added or removed|
|`salt`|`bytes32`|The extra data to make positions unique|

### Swap
Emitted for swaps between currency0 and currency1


```solidity
event Swap(
    PoolId indexed id,
    address indexed sender,
    int128 amount0,
    int128 amount1,
    uint160 sqrtPriceX96,
    uint128 liquidity,
    int24 tick,
    uint24 fee
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`PoolId`|The abi encoded hash of the pool key struct for the pool that was modified|
|`sender`|`address`|The address that initiated the swap call, and that received the callback|
|`amount0`|`int128`|The delta of the currency0 balance of the pool|
|`amount1`|`int128`|The delta of the currency1 balance of the pool|
|`sqrtPriceX96`|`uint160`|The sqrt(price) of the pool after the swap, as a Q64.96|
|`liquidity`|`uint128`|The liquidity of the pool after the swap|
|`tick`|`int24`|The log base 1.0001 of the price of the pool after the swap|
|`fee`|`uint24`|The swap fee in hundredths of a bip|

### Donate
Emitted for donations


```solidity
event Donate(PoolId indexed id, address indexed sender, uint256 amount0, uint256 amount1);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`PoolId`|The abi encoded hash of the pool key struct for the pool that was donated to|
|`sender`|`address`|The address that initiated the donate call|
|`amount0`|`uint256`|The amount donated in currency0|
|`amount1`|`uint256`|The amount donated in currency1|

## Errors
### CurrencyNotSettled
Thrown when a currency is not netted out after the contract is unlocked


```solidity
error CurrencyNotSettled();
```

### PoolNotInitialized
Thrown when trying to interact with a non-initialized pool


```solidity
error PoolNotInitialized();
```

### AlreadyUnlocked
Thrown when unlock is called, but the contract is already unlocked


```solidity
error AlreadyUnlocked();
```

### ManagerLocked
Thrown when a function is called that requires the contract to be unlocked, but it is not


```solidity
error ManagerLocked();
```

### TickSpacingTooLarge
Pools are limited to type(int16).max tickSpacing in #initialize, to prevent overflow


```solidity
error TickSpacingTooLarge(int24 tickSpacing);
```

### TickSpacingTooSmall
Pools must have a positive non-zero tickSpacing passed to #initialize


```solidity
error TickSpacingTooSmall(int24 tickSpacing);
```

### CurrenciesOutOfOrderOrEqual
PoolKey must have currencies where address(currency0) < address(currency1)


```solidity
error CurrenciesOutOfOrderOrEqual(address currency0, address currency1);
```

### UnauthorizedDynamicLPFeeUpdate
Thrown when a call to updateDynamicLPFee is made by an address that is not the hook,
or on a pool that does not have a dynamic swap fee.


```solidity
error UnauthorizedDynamicLPFeeUpdate();
```

### SwapAmountCannotBeZero
Thrown when trying to swap amount of 0


```solidity
error SwapAmountCannotBeZero();
```

### NonzeroNativeValue
Thrown when native currency is passed to a non native settlement


```solidity
error NonzeroNativeValue();
```

### MustClearExactPositiveDelta
Thrown when `clear` is called with an amount that is not exactly equal to the open currency delta.


```solidity
error MustClearExactPositiveDelta();
```

## Structs
### ModifyLiquidityParams

```solidity
struct ModifyLiquidityParams {
    int24 tickLower;
    int24 tickUpper;
    int256 liquidityDelta;
    bytes32 salt;
}
```

### SwapParams

```solidity
struct SwapParams {
    bool zeroForOne;
    int256 amountSpecified;
    uint160 sqrtPriceLimitX96;
}
```


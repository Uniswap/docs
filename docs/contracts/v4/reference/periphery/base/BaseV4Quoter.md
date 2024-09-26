# BaseV4Quoter
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/BaseV4Quoter.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[SafeCallback](/src/base/SafeCallback.sol/abstract.SafeCallback.md)


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager) SafeCallback(_poolManager);
```

### selfOnly

*Only this address may call this function. Used to mimic internal functions, using an
external call to catch and parse revert reasons*


```solidity
modifier selfOnly();
```

### _unlockCallback


```solidity
function _unlockCallback(bytes calldata data) internal override returns (bytes memory);
```

### _swap

if amountSpecified < 0, the swap is exactInput, otherwise exactOutput

*Execute a swap and return the balance delta*


```solidity
function _swap(PoolKey memory poolKey, bool zeroForOne, int256 amountSpecified, bytes calldata hookData)
    internal
    returns (BalanceDelta swapDelta);
```

## Errors
### NotEnoughLiquidity

```solidity
error NotEnoughLiquidity(PoolId poolId);
```

### NotSelf

```solidity
error NotSelf();
```

### UnexpectedCallSuccess

```solidity
error UnexpectedCallSuccess();
```


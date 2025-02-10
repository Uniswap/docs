# V4Router
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/V4Router.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IV4Router](contracts/v4/reference/periphery/interfaces/IV4Router.md), [BaseActionsRouter](contracts/v4/reference/periphery/base/BaseActionsRouter.md), [DeltaResolver](contracts/v4/reference/periphery/base/DeltaResolver.md)

Abstract contract that contains all internal logic needed for routing through Uniswap v4 pools

*the entry point to executing actions in this contract is calling `BaseActionsRouter._executeActions`
An inheriting contract should call _executeActions at the point that they wish actions to be executed*


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager) BaseActionsRouter(_poolManager);
```

### _handleAction


```solidity
function _handleAction(uint256 action, bytes calldata params) internal override;
```

### _swapExactInputSingle


```solidity
function _swapExactInputSingle(IV4Router.ExactInputSingleParams calldata params) private;
```

### _swapExactInput


```solidity
function _swapExactInput(IV4Router.ExactInputParams calldata params) private;
```

### _swapExactOutputSingle


```solidity
function _swapExactOutputSingle(IV4Router.ExactOutputSingleParams calldata params) private;
```

### _swapExactOutput


```solidity
function _swapExactOutput(IV4Router.ExactOutputParams calldata params) private;
```

### _swap


```solidity
function _swap(PoolKey memory poolKey, bool zeroForOne, int256 amountSpecified, bytes calldata hookData)
    private
    returns (int128 reciprocalAmount);
```


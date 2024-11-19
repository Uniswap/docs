# CustomRevert
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/libraries/CustomRevert.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Contains functions for reverting with custom errors with different argument types efficiently

*To use this library, declare `using CustomRevert for bytes4;` and replace `revert CustomError()` with
`CustomError.selector.revertWith()`*

*The functions may tamper with the free memory pointer but it is fine since the call context is exited immediately*


## Functions
### revertWith

*Reverts with the selector of a custom error in the scratch space*


```solidity
function revertWith(bytes4 selector) internal pure;
```

### revertWith

*Reverts with a custom error with an address argument in the scratch space*


```solidity
function revertWith(bytes4 selector, address addr) internal pure;
```

### revertWith

*Reverts with a custom error with an int24 argument in the scratch space*


```solidity
function revertWith(bytes4 selector, int24 value) internal pure;
```

### revertWith

*Reverts with a custom error with a uint160 argument in the scratch space*


```solidity
function revertWith(bytes4 selector, uint160 value) internal pure;
```

### revertWith

*Reverts with a custom error with two int24 arguments*


```solidity
function revertWith(bytes4 selector, int24 value1, int24 value2) internal pure;
```

### revertWith

*Reverts with a custom error with two uint160 arguments*


```solidity
function revertWith(bytes4 selector, uint160 value1, uint160 value2) internal pure;
```

### revertWith

*Reverts with a custom error with two address arguments*


```solidity
function revertWith(bytes4 selector, address value1, address value2) internal pure;
```

### bubbleUpAndRevertWith

bubble up the revert message returned by a call and revert with a wrapped ERC-7751 error

*this method can be vulnerable to revert data bombs*


```solidity
function bubbleUpAndRevertWith(address revertingContract, bytes4 revertingFunctionSelector, bytes4 additionalContext)
    internal
    pure;
```

## Errors
### WrappedError
*ERC-7751 error for wrapping bubbled up reverts*


```solidity
error WrappedError(address target, bytes4 selector, bytes reason, bytes details);
```


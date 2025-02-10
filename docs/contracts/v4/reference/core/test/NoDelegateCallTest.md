# NoDelegateCallTest
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/test/NoDelegateCallTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[NoDelegateCall](contracts/v4/reference/core/NoDelegateCall.md)


## Functions
### canBeDelegateCalled


```solidity
function canBeDelegateCalled() public view returns (uint256);
```

### cannotBeDelegateCalled


```solidity
function cannotBeDelegateCalled() public view noDelegateCall returns (uint256);
```

### getGasCostOfCanBeDelegateCalled


```solidity
function getGasCostOfCanBeDelegateCalled() external view returns (uint256);
```

### getGasCostOfCannotBeDelegateCalled


```solidity
function getGasCostOfCannotBeDelegateCalled() external view returns (uint256);
```

### callsIntoNoDelegateCallFunction


```solidity
function callsIntoNoDelegateCallFunction() external view;
```

### noDelegateCallPrivate


```solidity
function noDelegateCallPrivate() private view noDelegateCall;
```


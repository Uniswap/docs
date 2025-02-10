# NativeWrapper
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/base/NativeWrapper.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ImmutableState](contracts/v4/reference/periphery/base/ImmutableState.md)

Used for wrapping and unwrapping native


## State Variables
### WETH9
The address for WETH9


```solidity
IWETH9 public immutable WETH9;
```


## Functions
### constructor


```solidity
constructor(IWETH9 _weth9);
```

### _wrap

*The amount should already be <= the current balance in this contract.*


```solidity
function _wrap(uint256 amount) internal;
```

### _unwrap

*The amount should already be <= the current balance in this contract.*


```solidity
function _unwrap(uint256 amount) internal;
```

### receive


```solidity
receive() external payable;
```

## Errors
### InvalidEthSender
Thrown when an unexpected address sends ETH to this contract


```solidity
error InvalidEthSender();
```


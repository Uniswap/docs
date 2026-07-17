# NoDelegateCall
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/NoDelegateCall.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Base contract that provides a modifier for preventing delegatecall to methods in a child contract


## State Variables
### original
*The original address of this contract*


```solidity
address private immutable original;
```


## Functions
### constructor


```solidity
constructor();
```

### checkNotDelegateCall

*Private method is used instead of inlining into modifier because modifiers are copied into each method,
and the use of immutable means the address bytes are copied in every place the modifier is used.*


```solidity
function checkNotDelegateCall() private view;
```

### noDelegateCall

Prevents delegatecall into the modified method


```solidity
modifier noDelegateCall();
```

## Errors
### DelegateCallNotAllowed

```solidity
error DelegateCallNotAllowed();
```


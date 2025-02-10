# toBeforeSwapDelta
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/types/BeforeSwapDelta.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


```solidity
function toBeforeSwapDelta(int128 deltaSpecified, int128 deltaUnspecified)
    pure
    returns (BeforeSwapDelta beforeSwapDelta);
```

# BeforeSwapDelta
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/types/BeforeSwapDelta.sol)


```solidity
type BeforeSwapDelta is int256;
```

# BeforeSwapDeltaLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/types/BeforeSwapDelta.sol)

Library for getting the specified and unspecified deltas from the BeforeSwapDelta type


## State Variables
### ZERO_DELTA
A BeforeSwapDelta of 0


```solidity
BeforeSwapDelta public constant ZERO_DELTA = BeforeSwapDelta.wrap(0);
```


## Functions
### getSpecifiedDelta

extracts int128 from the upper 128 bits of the BeforeSwapDelta
returned by beforeSwap


```solidity
function getSpecifiedDelta(BeforeSwapDelta delta) internal pure returns (int128 deltaSpecified);
```

### getUnspecifiedDelta

extracts int128 from the lower 128 bits of the BeforeSwapDelta
returned by beforeSwap and afterSwap


```solidity
function getUnspecifiedDelta(BeforeSwapDelta delta) internal pure returns (int128 deltaUnspecified);
```


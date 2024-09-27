# NonzeroDeltaCount
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/NonzeroDeltaCount.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

This is a temporary library that allows us to use transient storage (tstore/tload)
for the nonzero delta count.
TODO: This library can be deleted when we have the transient keyword support in solidity.


## State Variables
### NONZERO_DELTA_COUNT_SLOT

```solidity
bytes32 internal constant NONZERO_DELTA_COUNT_SLOT = 0x7d4b3164c6e45b97e7d87b7125a44c5828d005af88f9d751cfd78729c5d99a0b;
```


## Functions
### read


```solidity
function read() internal view returns (uint256 count);
```

### increment


```solidity
function increment() internal;
```

### decrement

Potential to underflow. Ensure checks are performed by integrating contracts to ensure this does not happen.
Current usage ensures this will not happen because we call decrement with known boundaries (only up to the number of times we call increment).


```solidity
function decrement() internal;
```


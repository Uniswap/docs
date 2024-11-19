# PositionInfo
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/PositionInfoLibrary.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

*PositionInfo is a packed version of solidity structure.
Using the packaged version saves gas and memory by not storing the structure fields in memory slots.
Layout:
200 bits poolId | 24 bits tickUpper | 24 bits tickLower | 8 bits hasSubscriber
Fields in the direction from the least significant bit:
A flag to know if the tokenId is subscribed to an address
uint8 hasSubscriber;
The tickUpper of the position
int24 tickUpper;
The tickLower of the position
int24 tickLower;
The truncated poolId. Truncates a bytes32 value so the most signifcant (highest) 200 bits are used.
bytes25 poolId;
Note: If more bits are needed, hasSubscriber can be a single bit.*


```solidity
type PositionInfo is uint256;
```


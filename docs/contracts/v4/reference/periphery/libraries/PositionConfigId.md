# PositionConfigId
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/libraries/PositionConfigId.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

A configId is set per tokenId
The lower 255 bits are used to store the truncated hash of the corresponding PositionConfig
The upper bit is used to signal if the tokenId has a subscriber


```solidity
struct PositionConfigId {
    bytes32 id;
}
```


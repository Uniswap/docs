# PositionConfigLibrary
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/PositionConfig.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Library to calculate the PositionConfigId from the PositionConfig struct


## Functions
### toId


```solidity
function toId(PositionConfig calldata config) internal pure returns (bytes32 id);
```

# PositionConfig
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/PositionConfig.sol)


```solidity
struct PositionConfig {
    PoolKey poolKey;
    int24 tickLower;
    int24 tickUpper;
}
```


# PositionConfigLibrary
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/PositionConfig.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Library to calculate the PositionConfigId from the PositionConfig struct


## Functions
### toId


```solidity
function toId(PositionConfig calldata config) internal pure returns (bytes32 id);
```

# PositionConfig
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/PositionConfig.sol)


```solidity
struct PositionConfig {
    PoolKey poolKey;
    int24 tickLower;
    int24 tickUpper;
}
```


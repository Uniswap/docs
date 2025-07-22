# PositionConfigId
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/PositionConfigId.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

A configId is set per tokenId
The lower 255 bits are used to store the truncated hash of the corresponding PositionConfig
The upper bit is used to signal if the tokenId has a subscriber


```solidity
struct PositionConfigId {
    bytes32 id;
}
```

# PositionConfigIdLibrary
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/PositionConfigId.sol)


## State Variables
### MASK_UPPER_BIT

```solidity
bytes32 constant MASK_UPPER_BIT = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
```


### DIRTY_UPPER_BIT

```solidity
bytes32 constant DIRTY_UPPER_BIT = 0x8000000000000000000000000000000000000000000000000000000000000000;
```


## Functions
### getConfigId

returns the truncated hash of the PositionConfig for a given tokenId


```solidity
function getConfigId(PositionConfigId storage _configId) internal view returns (bytes32 configId);
```

### setConfigId

*We only set the config on mint, guaranteeing that the most significant bit is unset, so we can just assign the entire 32 bytes to the id.*


```solidity
function setConfigId(PositionConfigId storage _configId, bytes32 configId) internal;
```

### setSubscribe


```solidity
function setSubscribe(PositionConfigId storage configId) internal;
```

### setUnsubscribe


```solidity
function setUnsubscribe(PositionConfigId storage configId) internal;
```

### hasSubscriber


```solidity
function hasSubscriber(PositionConfigId storage configId) internal view returns (bool subscribed);
```


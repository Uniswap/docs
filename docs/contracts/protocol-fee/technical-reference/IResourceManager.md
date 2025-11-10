# IResourceManager
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/interfaces/base/IResourceManager.sol)

The interface for managing the resource token and its threshold value


## Functions
### RESOURCE

The resource token required by parent IReleaser


```solidity
function RESOURCE() external view returns (ERC20);
```

### RESOURCE_RECIPIENT

The recipient of the `RESOURCE` tokens


```solidity
function RESOURCE_RECIPIENT() external view returns (address);
```

### threshold

The minimum threshold of `RESOURCE` tokens required to perform a release


```solidity
function threshold() external view returns (uint256);
```

### thresholdSetter

The address authorized to set the `threshold` value


```solidity
function thresholdSetter() external view returns (address);
```

### setThresholdSetter

Set the address authorized to set the `threshold` value

only callable by `owner`


```solidity
function setThresholdSetter(address newThresholdSetter) external;
```

### setThreshold

Set the minimum threshold of `RESOURCE` tokens required to perform a release

only callable by `thresholdSetter`
the `thresholdSetter` should take explicit care when updating the threshold
* lowering the threshold may create instantaneous value leakage
* front-running a release with an increased threshold may cause economic loss
to the releaser/searcher


```solidity
function setThreshold(uint256 newThreshold) external;
```

## Errors
### Unauthorized
Thrown when an unauthorized address attempts to call a restricted function


```solidity
error Unauthorized();
```


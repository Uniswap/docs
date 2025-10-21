# ResourceManager
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/base/ResourceManager.sol)

**Inherits:**
[IResourceManager](/technical-reference/IResourceManager), Owned

A contract that holds immutable state for the resource token and the resource recipient
address. It also maintains logic for managing the threshold of the resource token.


## State Variables
### threshold
The minimum threshold of `RESOURCE` tokens required to perform a release


```solidity
uint256 public threshold;
```


### thresholdSetter
The address authorized to set the `threshold` value


```solidity
address public thresholdSetter;
```


### RESOURCE
The resource token required by parent IReleaser


```solidity
ERC20 public immutable RESOURCE;
```


### RESOURCE_RECIPIENT
The recipient of the `RESOURCE` tokens


```solidity
address public immutable RESOURCE_RECIPIENT;
```


## Functions
### onlyThresholdSetter

Ensures only the threshold setter can call the setThreshold function


```solidity
modifier onlyThresholdSetter();
```

### constructor

*At construction the thresholdSetter defaults to 0 and its on the owner to set.*


```solidity
constructor(address _resource, uint256 _threshold, address _owner, address _recipient)
  Owned(_owner);
```

### setThresholdSetter

Set the address authorized to set the `threshold` value

*only callable by `owner`*


```solidity
function setThresholdSetter(address _thresholdSetter) external onlyOwner;
```

### setThreshold

Set the minimum threshold of `RESOURCE` tokens required to perform a release

*only callable by `thresholdSetter`
the `thresholdSetter` should take explicit care when updating the threshold
* lowering the threshold may create instantaneous value leakage
* front-running a release with an increased threshold may cause economic loss
to the releaser/searcher*


```solidity
function setThreshold(uint256 _threshold) external onlyThresholdSetter;
```


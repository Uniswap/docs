# AssetSink
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/AssetSink.sol)

**Inherits:**
Owned, [IAssetSink](/technical-reference/IAssetSink)

Sink for protocol fees

*Fees accumulate passively in this contract from external sources.
Stored fees can be released by an authorized releaser contract.*

**Note:**
security-contact: security@uniswap.org


## State Variables
### releaser
*The releaser has exclusive access to the `release()` function*


```solidity
address public releaser;
```


## Functions
### onlyReleaser

Ensures only the releaser can call the release function


```solidity
modifier onlyReleaser();
```

### constructor

*creates an asset sink where the deployer is the initial owner
during deployment, the deployer SHOULD set the releaser address and
transfer ownership*


```solidity
constructor() Owned(msg.sender);
```

### release

Release assets to a specified recipient

*only callable by `releaser`*


```solidity
function release(Currency[] calldata assets, address recipient) external onlyReleaser;
```

### setReleaser

Set the address of the IReleaser contract

*only callable by `owner`*


```solidity
function setReleaser(address _releaser) external onlyOwner;
```

### receive


```solidity
receive() external payable;
```


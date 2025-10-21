# FirepitDestination
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/crosschain/FirepitDestination.sol)

**Inherits:**
[Nonce](/technical-reference/Nonce), Owned

a contract for receiving crosschain messages. Validates messages and releases assets
from the AssetSink


## State Variables
### allowableSource
the source contract that is allowed to originate messages to this contract i.e.
FirepitSource

*updatable by owner*


```solidity
address public allowableSource;
```


### allowableCallers
the local contract(s) that are allowed to call this contract, i.e. Message Relayers

*updatable by owner*


```solidity
mapping(address callers => bool allowed) public allowableCallers;
```


### ASSET_SINK

```solidity
AssetSink public immutable ASSET_SINK;
```


### MINIMUM_RELEASE_GAS

```solidity
uint256 public constant MINIMUM_RELEASE_GAS = 100_000;
```


## Functions
### constructor


```solidity
constructor(address _owner, address _assetSink) Owned(_owner);
```

### onlyAllowed


```solidity
modifier onlyAllowed();
```

### claimTo

Calls Asset Sink to release assets to a destination

*only callable by the messenger via the authorized L1 source contract*


```solidity
function claimTo(uint256 _nonce, Currency[] calldata assets, address claimer)
  external
  onlyAllowed
  handleNonce(_nonce);
```

### setAllowableCallers


```solidity
function setAllowableCallers(address callers, bool isAllowed) external onlyOwner;
```

### setAllowableSource


```solidity
function setAllowableSource(address source) external onlyOwner;
```

## Events
### FailedRelease

```solidity
event FailedRelease(uint256 indexed _nonce, address indexed _claimer);
```


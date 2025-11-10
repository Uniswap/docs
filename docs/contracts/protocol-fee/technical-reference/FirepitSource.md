# FirepitSource
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/crosschain/FirepitSource.sol)

**Inherits:**
[ResourceManager](/home/toda/dev/phoenix-fees/forge-docs/src/src/base/ResourceManager.sol/abstract.ResourceManager.md), [Nonce](/home/toda/dev/phoenix-fees/forge-docs/src/src/base/Nonce.sol/abstract.Nonce.md)


## State Variables
### DEFAULT_BRIDGE_ID

```solidity
uint256 public constant DEFAULT_BRIDGE_ID = 0
```


## Functions
### constructor

TODO: Move threshold to constructor. It should not default to 0.


```solidity
constructor(address _owner, address _resource)
  ResourceManager(_resource, 69_420, _owner, address(0xdead));
```

### _sendReleaseMessage


```solidity
function _sendReleaseMessage(
  uint256 bridgeId,
  uint256 destinationNonce,
  Currency[] calldata assets,
  address claimer,
  bytes memory addtlData
) internal virtual;
```

### release

Torches the RESOURCE by sending it to the burn address and sends a cross-domain
message to release the assets


```solidity
function release(uint256 _nonce, Currency[] calldata assets, address claimer, uint32 l2GasLimit)
  external
  handleNonce(_nonce);
```


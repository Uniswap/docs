# OPStackFirepitSource
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/crosschain/OPStackFirepitSource.sol)

**Inherits:**
[FirepitSource](/home/toda/dev/phoenix-fees/forge-docs/src/src/crosschain/FirepitSource.sol/abstract.FirepitSource.md)


## State Variables
### MESSENGER

```solidity
IL1CrossDomainMessenger public immutable MESSENGER
```


### L2_TARGET

```solidity
address public immutable L2_TARGET
```


## Functions
### constructor


```solidity
constructor(address _resource, address _messenger, address _l2Target)
  FirepitSource(msg.sender, _resource);
```

### _sendReleaseMessage


```solidity
function _sendReleaseMessage(
  uint256, // bridgeId
  uint256 destinationNonce,
  Currency[] calldata assets,
  address claimer,
  bytes memory addtlData
) internal override;
```


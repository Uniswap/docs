# OPStackFirepitSource
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/crosschain/OPStackFirepitSource.sol)

**Inherits:**
[FirepitSource](/technical-reference/FirepitSource)


## State Variables
### MESSENGER

```solidity
IL1CrossDomainMessenger public immutable MESSENGER;
```


### L2_TARGET

```solidity
address public immutable L2_TARGET;
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
  uint256,
  uint256 destinationNonce,
  Currency[] calldata assets,
  address claimer,
  bytes memory addtlData
) internal override;
```


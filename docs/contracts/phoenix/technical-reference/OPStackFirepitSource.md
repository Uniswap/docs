# OPStackFirepitSource
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/crosschain/OPStackFirepitSource.sol)

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


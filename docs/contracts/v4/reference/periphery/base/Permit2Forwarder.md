# Permit2Forwarder
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/base/Permit2Forwarder.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

PermitForwarder allows permitting this contract as a spender on permit2

*This contract does not enforce the spender to be this contract, but that is the intended use case*


## State Variables
### permit2
the Permit2 contract to forward approvals


```solidity
IAllowanceTransfer public immutable permit2;
```


## Functions
### constructor


```solidity
constructor(IAllowanceTransfer _permit2);
```

### permit

allows forwarding a single permit to permit2

*this function is payable to allow multicall with NATIVE based actions*


```solidity
function permit(address owner, IAllowanceTransfer.PermitSingle calldata permitSingle, bytes calldata signature)
    external
    payable
    returns (bytes memory err);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|the owner of the tokens|
|`permitSingle`|`IAllowanceTransfer.PermitSingle`|the permit data|
|`signature`|`bytes`|the signature of the permit; abi.encodePacked(r, s, v)|


### permitBatch

allows forwarding batch permits to permit2

*this function is payable to allow multicall with NATIVE based actions*


```solidity
function permitBatch(address owner, IAllowanceTransfer.PermitBatch calldata _permitBatch, bytes calldata signature)
    external
    payable
    returns (bytes memory err);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|the owner of the tokens|
|`_permitBatch`|`IAllowanceTransfer.PermitBatch`|a batch of approvals|
|`signature`|`bytes`|the signature of the permit; abi.encodePacked(r, s, v)|



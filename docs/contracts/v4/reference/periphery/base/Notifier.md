# Notifier
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/Notifier.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[INotifier](/src/interfaces/INotifier.sol/interface.INotifier.md)

Notifier is used to opt in to sending updates to external contracts about position modifications or transfers


## State Variables
### NO_SUBSCRIBER

```solidity
ISubscriber private constant NO_SUBSCRIBER = ISubscriber(address(0));
```


### unsubscribeGasLimit
Returns and determines the maximum allowable gas-used for notifying unsubscribe


```solidity
uint256 public immutable unsubscribeGasLimit;
```


### subscriber
Returns the subscriber for a respective position


```solidity
mapping(uint256 tokenId => ISubscriber subscriber) public subscriber;
```


## Functions
### constructor


```solidity
constructor(uint256 _unsubscribeGasLimit);
```

### onlyIfApproved

Only allow callers that are approved as spenders or operators of the tokenId

*to be implemented by the parent contract (PositionManager)*


```solidity
modifier onlyIfApproved(address caller, uint256 tokenId) virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`caller`|`address`|the address of the caller|
|`tokenId`|`uint256`|the tokenId of the position|


### _setUnsubscribed


```solidity
function _setUnsubscribed(uint256 tokenId) internal virtual;
```

### _setSubscribed


```solidity
function _setSubscribed(uint256 tokenId) internal virtual;
```

### subscribe

Enables the subscriber to receive notifications for a respective position

*Calling subscribe when a position is already subscribed will revert*


```solidity
function subscribe(uint256 tokenId, address newSubscriber, bytes calldata data)
    external
    payable
    onlyIfApproved(msg.sender, tokenId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|
|`newSubscriber`|`address`|the address of the subscriber contract|
|`data`|`bytes`|caller-provided data that's forwarded to the subscriber contract|


### unsubscribe

Removes the subscriber from receiving notifications for a respective position

*Callers must specify a high gas limit (remaining gas should be higher than unsubscriberGasLimit) such that the subscriber can be notified*


```solidity
function unsubscribe(uint256 tokenId) external payable onlyIfApproved(msg.sender, tokenId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|


### _unsubscribe


```solidity
function _unsubscribe(uint256 tokenId) internal;
```

### _notifyModifyLiquidity


```solidity
function _notifyModifyLiquidity(uint256 tokenId, int256 liquidityChange, BalanceDelta feesAccrued) internal;
```

### _notifyTransfer


```solidity
function _notifyTransfer(uint256 tokenId, address previousOwner, address newOwner) internal;
```

### _call


```solidity
function _call(address target, bytes memory encodedCall) internal returns (bool success);
```


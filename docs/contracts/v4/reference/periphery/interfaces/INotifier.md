# INotifier
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/interfaces/INotifier.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

This interface is used to opt in to sending updates to external contracts about position modifications or transfers


## Functions
### subscriber

Returns the subscriber for a respective position


```solidity
function subscriber(uint256 tokenId) external view returns (ISubscriber subscriber);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`subscriber`|`ISubscriber`|the subscriber contract|


### subscribe

Enables the subscriber to receive notifications for a respective position

*Calling subscribe when a position is already subscribed will revert*

*payable so it can be multicalled with NATIVE related actions*


```solidity
function subscribe(uint256 tokenId, address newSubscriber, bytes calldata data) external payable;
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

*payable so it can be multicalled with NATIVE related actions*

*Must always allow a user to unsubscribe. In the case of a malicious subscriber, a user can always unsubscribe safely, ensuring liquidity is always modifiable.*


```solidity
function unsubscribe(uint256 tokenId) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|the ERC721 tokenId|


### unsubscribeGasLimit

Returns and determines the maximum allowable gas-used for notifying unsubscribe


```solidity
function unsubscribeGasLimit() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 the maximum gas limit when notifying a subscriber's `notifyUnsubscribe` function|


## Events
### Subscription
Emitted on a successful call to subscribe


```solidity
event Subscription(uint256 indexed tokenId, address indexed subscriber);
```

### Unsubscription
Emitted on a successful call to unsubscribe


```solidity
event Unsubscription(uint256 indexed tokenId, address indexed subscriber);
```

## Errors
### NotSubscribed
Thrown when unsubscribing without a subscriber


```solidity
error NotSubscribed();
```

### NoCodeSubscriber
Thrown when a subscriber does not have code


```solidity
error NoCodeSubscriber();
```

### GasLimitTooLow
Thrown when a user specifies a gas limit too low to avoid valid unsubscribe notifications


```solidity
error GasLimitTooLow();
```

### Wrap__SubscriptionReverted
Wraps the revert message of the subscriber contract on a reverting subscription


```solidity
error Wrap__SubscriptionReverted(address subscriber, bytes reason);
```

### Wrap__ModifyLiquidityNotificationReverted
Wraps the revert message of the subscriber contract on a reverting modify liquidity notification


```solidity
error Wrap__ModifyLiquidityNotificationReverted(address subscriber, bytes reason);
```

### Wrap__TransferNotificationReverted
Wraps the revert message of the subscriber contract on a reverting transfer notification


```solidity
error Wrap__TransferNotificationReverted(address subscriber, bytes reason);
```

### AlreadySubscribed
Thrown when a tokenId already has a subscriber


```solidity
error AlreadySubscribed(uint256 tokenId, address subscriber);
```


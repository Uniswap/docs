# ITokenJar
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/interfaces/ITokenJar.sol)

The interface for releasing assets from the contract


## Functions
### releaser

The releaser has exclusive access to the `release()` function


```solidity
function releaser() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address of the current IReleaser|


### setReleaser

Set the address of the IReleaser contract

only callabe by `owner`


```solidity
function setReleaser(address _releaser) external;
```

### release

Release assets to a specified recipient

only callable by `releaser`


```solidity
function release(Currency[] calldata assets, address recipient) external;
```

## Errors
### Unauthorized
Thrown when an unauthorized address attempts to call a restricted function


```solidity
error Unauthorized();
```


# Firepit
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/releasers/Firepit.sol)

**Inherits:**
[ExchangeReleaser](/technical-reference/ExchangeReleaser)

An ExchangeReleaser with recipient set to the burn address address(0xdead) and a limit
on the number of currencies that can be released at any time.

**Note:**
security-contact: security@uniswap.org


## State Variables
### MAX_RELEASE_LENGTH
Maximum number of different assets that can be released in a single call


```solidity
uint256 public constant MAX_RELEASE_LENGTH = 20;
```


## Functions
### constructor


```solidity
constructor(address _resource, uint256 _threshold, address _assetSink)
  ExchangeReleaser(_resource, _threshold, _assetSink, address(0xdead));
```

### release

Releases assets to a specified recipient if the resource threshold is met


```solidity
function release(uint256 _nonce, Currency[] calldata assets, address recipient) external override;
```
**Parameters**

| Name        | Type         | Description                                                                                                                       |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `_nonce`    | `uint256`    | The nonce for the release, must equal to the contract nonce otherwise revert                                                      |
| `assets`    | `Currency[]` | The list of assets (addresses) to release, which may have length limits Native tokens (Ether) are represented as the zero address |
| `recipient` | `address`    | The address to receive the released assets, paid out by Asset Sink                                                                |


## Errors
### TooManyAssets
Thrown when attempting to release too many assets at once


```solidity
error TooManyAssets();
```


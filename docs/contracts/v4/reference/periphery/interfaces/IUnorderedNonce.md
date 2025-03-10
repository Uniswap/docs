# IUnorderedNonce
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/interfaces/IUnorderedNonce.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for the UnorderedNonce contract


## Functions
### nonces

mapping of nonces consumed by each address, where a nonce is a single bit on the 256-bit bitmap

*word is at most type(uint248).max*


```solidity
function nonces(address owner, uint256 word) external view returns (uint256);
```

### revokeNonce

Revoke a nonce by spending it, preventing it from being used again

*Used in cases where a valid nonce has not been broadcasted onchain, and the owner wants to revoke the validity of the nonce*

*payable so it can be multicalled with native-token related actions*


```solidity
function revokeNonce(uint256 nonce) external payable;
```

## Errors
### NonceAlreadyUsed

```solidity
error NonceAlreadyUsed();
```


---
id: supporting-meta-transactions
title: Supporting meta transactions
---

All Uniswap V2 pool tokens support meta-transaction approvals via the [permit](../../reference/smart-contracts/pair-erc-20#permit) function. This obviates the need for a blocking approve transaction before programmatic interactions with pool tokens can occur.

# ERC-712

In vanilla ERC-20 token contracts, owners may only register approvals by directly calling a function which uses `msg.sender` to permission itself. With meta-approvals, ownership and permissioning are derived from a signature passed into the function by the caller (sometimes referred to as the relayer). Because signing data with Ethereum private keys can be a tricky endeavor, Uniswap V2 relies on [ERC-712](https://eips.ethereum.org/EIPS/eip-712), a signature standard with widespread community support, to ensure user safety and wallet compatibility.

## Domain Separator

```solidity
keccak256(
  abi.encode(
    keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
    keccak256(bytes(name)),
    keccak256(bytes('1')),
    chainId,
    address(this)
  )
);
```

- `name` is always `Uniswap V2`, see [name](../../reference/smart-contracts/pair-erc-20#name).
- `chainId` is determined from the [ERC-1344](https://ethereum-magicians.org/t/eip-1344-add-chain-id-opcode/1131) `chainid` opcode.
- `address(this)` is the address of the pair, see [Pair Addresses](../../../../sdk/v2/guides/getting-pair-addresses).

## Permit Typehash

```solidity
keccak256('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)');`
```

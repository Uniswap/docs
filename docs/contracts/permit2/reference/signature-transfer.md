---
id: signature-transfer
title: SignatureTransfer
sidebar_position: 1
---

> [**Source Code**](https://github.com/Uniswap/permit2/blob/main/src/SignatureTransfer.sol)

## Overview

The main entry points on this contract are:

- `permitTransferFrom`
    - Use permitTransferFrom when you want to transfer a token from an owner through signature validation.
- `permitWitnessTransferFrom`
    - Use permitWitnessTransferFrom when you want to transfer a token from an owner through signature validation, but you would also like to validate other data. Any other data you wish to be validated can be passed through with the `witness` param.

Each of these functions is overloaded with a batched version that allows users to transfer multiple tokens with 1 transaction.

## Functions

### Single `permitTransferFrom`

Use the `permitTransferFrom` to transfer just one token.

**Function signature**

```solidity
function permitTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external
```

**Parameters**

- permit - Construct `PermitTransferFrom` struct with the following:

```solidity
struct PermitTransferFrom {
        TokenPermissions permitted;
        // a unique value for every token owner's signature to prevent signature replays
        uint256 nonce;
        // deadline on the permit signature
        uint256 deadline;
    }

struct TokenPermissions {
        // ERC20 token address
        address token;
        // the maximum amount that can be spent
        uint256 amount;
    }
```

- transferDetails - information about recipient and amount

```solidity
struct SignatureTransferDetails {
        // recipient address
        address to;
        // spender requested amount
        uint256 requestedAmount;
    }
```

- owner - the signer of the permit message and owner of the tokens
- signature - the signature over the permit data. Supports EOA signatures, compact signatures defined by [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098), and contract signatures defined by [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)

### Batched `permitTransferFrom`

Use `permitTransferFrom` with the batched parameters when you want to transfer multiple tokens from an owner.

**Function Signature**

```solidity
function permitTransferFrom(
        PermitBatchTransferFrom memory permit,
        SignatureTransferDetails[] calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external
```

**Parameters**

- permit - Construct `PermitBatchTransferFrom` with the following:

```solidity
struct PermitBatchTransferFrom {
        // the tokens and corresponding amounts permitted for a transfer
        TokenPermissions[] permitted;
        // a unique value for every token owner's signature to prevent signature replays
        uint256 nonce;
        // deadline on the permit signature
        uint256 deadline;
    }

struct TokenPermissions {
        // ERC20 token address
        address token;
        // the maximum amount that can be spent
        uint256 amount;
    }
```

- transferDetails - parameterized by the spender with information about the token transfer.
    - The length of the `SignatureTransferDetails` array must equal the length of the `TokenPermissions` array passed in with `PermitBatchTransferFrom` struct. The token to be transferred specified in the `TokenPermissions` array should match the index of the `SignatureTransferDetails` array.
    - Note that if a spender is permitted to a token but does not need to transfer that token, they can specify that the `requestedAmount` is 0 so that the transfer is skipped.
- owner - the signer of the permit message and owner of the tokens

```solidity
struct SignatureTransferDetails {
        // recipient address
        address to;
        // spender requested amount
        uint256 requestedAmount;
    }
```

- signature - the signature over the permit data. Supports EOA signatures, compact signatures defined by [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098), and contract signatures defined by [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)

### Single `permitWitnessTransferFrom`

**Function Signature**

```solidity
function permitWitnessTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes32 witness,
        string calldata witnessTypeString,
        bytes calldata signature
    ) external
```

**Parameters**

- permit - constructed with the same type as defined above in the single permitTransferFrom case
- transferDetails constructed with same type as defined above in the single permitTransferFrom case
- owner - the signer of the permit message and owner of the tokens
- witness - arbitrary data passed through that was signed by the user. Is used to reconstruct the signature. Pass through this data if you want the permit signature recovery also to validate other data.
- witnessTypeString - a string that defines the typed data that the witness was hashed from. It must also include the `TokenPermissions` struct and comply with [EIP-712](https://eips.ethereum.org/EIPS/eip-712) struct ordering. See an example below.
- signature - the signature over the permit data. Supports EOA signatures, compact signatures defined by [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098), and contract signatures defined by [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)

### Batch `permitWitnessTransferFrom`

**Function Signature**

```solidity
function permitWitnessTransferFrom(
        PermitBatchTransferFrom memory permit,
        SignatureTransferDetails[] calldata transferDetails,
        address owner,
        bytes32 witness,
        string calldata witnessTypeString,
        bytes calldata signature
    ) external
```

**Parameters**

- permit - constructed with the same type in the batched case of `permitTransferFrom`
- transferDetails - constructed with the same type in the batched case of `permitTransferFrom`
- owner - the signer of the permit message and owner of the tokens
- witness - arbitrary data passed through that was signed by the user. Is used to reconstruct the signature. Pass through this data if you want the permit signature recovery to also validate other data.
- witnessTypeString - a string that defines the typed data that the witness was hashed from. It must also include the `TokenPermissions` struct and comply with [EIP-712](https://eips.ethereum.org/EIPS/eip-712) struct ordering. See an example below.
- signature - the signature over the permit data. Supports EOA signatures, compact signatures defined by [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098), and contract signatures defined by [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)

**Example `permitWitnessTransferFrom` parameters**

If an integrating contract would also like the signer to verify information about a trade, an integrating contract may ask the signer to also sign an `ExampleTrade` object that we define below:

```solidity
struct ExampleTrade {
	address exampleTokenAddress;
	uint256 exampleMinimumAmountOut;
}
```

Following EIP-712, the typehash for the data would be defined by:

```solidity
bytes32 _EXAMPLE_TRADE_TYPEHASH = keccak256('ExampleTrade(address exampleTokenAddress,uint256 exampleMinimumAmountOut)');
```

The `witness` that should be passed along with the permit message should be:

```solidity
 bytes32 witness = keccak256(
            abi.encode(_EXAMPLE_TRADE_TYPEHASH, exampleTrade.exampleTokenAddress, exampleTrade.exampleMinimumAmountOut));
```

And the `witnessTypeString` to be passed in should be:

```solidity
string constant witnessTypeString = "ExampleTrade witness)ExampleTrade(address exampleTokenAddress,uint256 exampleMinimumAmountOut)TokenPermissions(address token,uint256 amount)"
```

It’s important to note that when hashing multiple typed structs, the ordering of the structs in the type string matters. Referencing EIP-712:

> If the struct type references other struct types (and these in turn reference even more struct types), then the set of referenced struct types is collected, sorted by name and appended to the encoding. An example encoding is `Transaction(Person from,Person to,Asset tx)Asset(address token,uint256 amount)Person(address wallet,string name)`
> 

## Nonce Schema

Instead of using incrementing nonces, we introduce non-monotonic, or unordered nonces with a `nonceBitmap`. 

The `nonceBitmap` maps an owner's address to a uint248 value, which we will call `wordPos` which is the index of the desired bitmap. There are 2**248 possible indices and this 2**248 possible bitmaps where each bitmap holds 256 bits. A bit must be flipped on to prevent replays of users’ signatures. Bits that are dirtied may not be used again.

```solidity
// nonceBitmap[ownerAddress][wordPosition] retrieves a uint256 bitmap
mapping(address => mapping(uint248 => uint256)) public nonceBitmap;
```

Users will sign a `uint256 nonce` value where the first 248 bits correspond to the word position of the bitmap to dirty and the last 8 bits correspond to the actual bit position being flipped on.

```solidity
uint248 wordPos = uint248(nonce >> 8);
uint8 bitPos = uint8(nonce);
```

```solidity
uint256 bitmap = nonceBitmap[wordPos][bitPos]
```

## Security Considerations

An integrating contract must check that tokens are released by a triggering call from the signer, or that the signer meant for their signature to be released by someone else.

<aside>
💡 Consider this scenario:

A signer called Bob signs a permit to transfer 100 USDC with a router contract as the permissioned spender. The router contract never checks who the caller is but spends any permit messages on the Permit2 contract. An attacker Eve can steal Bob’s signature, pass it through to the router with herself as the recipient, and transfer Bob’s tokens to herself.

</aside>

Universal Router protects against this by checking that the `msg.sender` from inside the routing contract is the supposed spender by passing `msg.sender` in as the `owner`  param in any permit calls and by passing in `msg.sender` as the `from` param in any transfer calls.

---
id: allowance-transfer
title: AllowanceTransfer
sidebar_position: 2
---

> [**Source Code**](https://github.com/Uniswap/permit2/blob/main/src/AllowanceTransfer.sol)

The main entry points on this contract are:

- `approve`
    - Use approve when you do not want to set token permissions through signature validation.
- `permit`
    - Use permit when you do want to set token permissions through signature validation.
- `transferFrom`
    - Use transferFrom when you want to transfer a token and have the necessary permissions to do so.

### `approve`

**Function Signature**

```solidity
function approve(address token, address spender, uint160 amount, uint48 expiration) external
```

**Parameters**

- token - the token address to approve
- spender - the spender address to approve
- amount - the approved amount of the token, `type(uint160).max` is treated as an unlimited allowance
- expiration - the timestamp at which the approval is no longer valid, passing in `0` will expire the permissions at `block.timestamp`

### Single `permit`

**Function Signature**

```solidity
function permit(address owner, PermitSingle memory permitSingle, bytes calldata signature) external;
```

**Parameters**

- owner - the address of the token’s owner
- permitSingle - constructed with the following:

```solidity
struct PermitSingle {
        // the permit data for a single token allowance
        PermitDetails details;
        // address permissioned on the allowed tokens
        address spender;
        // deadline on the permit signature
        uint256 sigDeadline;
    }

struct PermitDetails {
        // ERC20 token address
        address token;
        // the maximum amount allowed to spend
        uint160 amount;
        // timestamp at which a spender's token allowances become invalid
        uint48 expiration;
        // an incrementing value indexed per owner,token,and spender for each signature
        uint48 nonce;
    }
```

- signature - the signature over the permit data. Supports EOA signatures, compact signatures defined by [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098), and contract signatures defined by [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)

### Batched `permit`

**Function Signature**

```solidity
function permit(address owner, PermitBatch memory permitBatch, bytes calldata signature) external;
```

**Parameters**

- owner - the address of the token’s owner
- permitBatch - constructed with the following:

```solidity
struct PermitBatch {
        // the permit data for multiple token allowances
        PermitDetails[] details;
        // address permissioned on the allowed tokens
        address spender;
        // deadline on the permit signature
        uint256 sigDeadline;
    }
struct PermitDetails {
        // ERC20 token address
        address token;
        // the maximum amount allowed to spend
        uint160 amount;
        // timestamp at which a spender's token allowances become invalid
        uint48 expiration;
        // an incrementing value indexed per owner,token,and spender for each signature
        uint48 nonce;
    }
```

- signature - the signature over the permit data. Supports EOA signatures, compact signatures defined by [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098), and contract signatures defined by [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)

### Single `transferFrom`

**Function Signature**

```solidity
function transferFrom(address from, address to, uint160 amount, address token) external;
```

**Parameters**

- from - the address to transfer the token from
- to -  the address of the recipient
- amount - the amount of the token to transfer, the maximum amount is `type(uint160).max`
- token - the address of the token to be transferred

### Batched `transferFrom`

**Function Signature**

```solidity
function transferFrom(AllowanceTransferDetails[] calldata transferDetails) external;
```

**Parameters**

- transferDetails - constructed with the following

```solidity
struct AllowanceTransferDetails {
        // the owner of the token
        address from;
        // the recipient of the token
        address to;
        // the amount of the token
        uint160 amount;
        // the token to be transferred
        address token;
    }
```

### Nonce Schema

The nonces used to protect against replay attacks of signatures are similar to standard incrementing nonces. However, we pack nonces with an allowed amount, and an allowed duration. This means that nonces are incremented *per owner*, *per token*, and *per spender.* Which further implies that you could sign two different permits at the same time with the same nonces and they *won’t* cancel each other out so long as the token or spender differ.

The mapping nonces are packed in is defined as follows:

```solidity
mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance;
```

and indexed as follows:

```solidity
PackedAllowance allowanceInformation = allowance[ownerAddress][tokenAddress][spenderAddress];
uint48 nonce = allowanceInformation.nonce;
```

### **Security Considerations**

Similar to the security considerations outlined in SignatureTransfer, integrating contracts need to perform valid safety checks on the caller and pass in correct addresses for the `from` argument in any transfer calls.

All amounts on the `AllowanceTransfer` contract are of type `uint160` so make sure integrating contracts safely downcast if they have to. See how Permit2Lib downcasts safely.
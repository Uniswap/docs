# UNIMinter
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/UNIMinter.sol)

**Inherits:**
Owned

**Author:**
Uniswap

A smart contract that manages the minting rights for UNI token, enabling proportional
distribution to multiple recipients

*This contract holds the minter role and allows annual minting with configurable share
allocations*

**Note:**
security-contact: security@uniswap.org


## State Variables
### MINT_CAP_PERCENT
The mint cap in percentage terms (2% annual inflation)


```solidity
uint16 private constant MINT_CAP_PERCENT = 2;
```


### MINT_PERIOD
The time between mints


```solidity
uint48 private constant MINT_PERIOD = uint48(365 days);
```


### MAX_SHARES
The total number of shares representing 100% of mintable tokens

*Unallocated shares result in reduced inflation*


```solidity
uint16 private constant MAX_SHARES = 10_000;
```


### UNI
The UNI token contract address on mainnet


```solidity
IUNI public constant UNI = IUNI(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984);
```


### totalShares
Total number of currently allocated shares

*Always less than or equal to MAX_SHARES*


```solidity
uint16 public totalShares;
```


### shares
Array containing all active share allocations

*Iterate through this array to distribute minted tokens*


```solidity
Share[] public shares;
```


## Functions
### constructor

Creates a new UNIMinter instance


```solidity
constructor(address _owner) Owned(_owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The initial admin address (UNI DAO) that can manage share allocations|


### mint

Executes the annual mint and distributes tokens proportionally to share holders

*Can be called by anyone once per year. Mints based on allocated shares only, unallocated
shares reduce inflation*

*The underlying UNI token contract reverts if called with > 2% of total supply*


```solidity
function mint() external;
```

### grantShares

Grants shares of the UNI inflation to a recipient

*Only callable by owner (UNI DAO). Reverts if total shares would exceed MAX_SHARES*


```solidity
function grantShares(address _recipient, uint16 _amount, uint16 _revocationDelayDays)
  external
  onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_recipient`|`address`|The address that will receive the minted UNI tokens|
|`_amount`|`uint16`|The number of shares to allocate (out of MAX_SHARES total)|
|`_revocationDelayDays`|`uint16`|The number of days notice required for a revocation of this share|


### initiateRevokeShares

Initiates the revocation process for a recipient's shares

*Only callable by owner. Sets a timestamp after which revocation can be completed*


```solidity
function initiateRevokeShares(uint256 _index) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_index`|`uint256`|The index in the shares array of the allocation to revoke|


### revokeShares

Completes or updates share revocation based on timing relative to next mint

*Can be called by anyone to update a share based on its pending revocation timing:
- If revocation completes before next mint: share is entirely removed
- If revocation extends into next mint period: share amount is reduced proportionally
to time remaining until revocation (e.g., 90 days into 365-day period = ~25% of shares)
- revokeShares must be called to update amounts for pending revocation*


```solidity
function revokeShares(uint256 _index) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_index`|`uint256`|The index in the shares array of the allocation to revoke or update|


### setMinter

Transfers the UNI minter role to a new address

*Only callable by owner. This is a critical operation that permanently transfers
the ability to mint UNI tokens to the new address. Once transferred, this contract
will no longer be able to mint UNI tokens unless the role is transferred back.*


```solidity
function setMinter(address _minter) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minter`|`address`|The address of the new minter contract or EOA|


## Errors
### InvalidRevocation
Thrown when attempting to complete revocation before the delay period has elapsed, or
when attempting to re-revoke a share that has already been adjusted.


```solidity
error InvalidRevocation();
```

### NotPendingRevocation
Thrown when attempting to complete revocation for shares without a pending revocation


```solidity
error NotPendingRevocation();
```

### InsufficientShares
Thrown when granting shares would exceed the maximum allowed


```solidity
error InsufficientShares();
```

### NoShares
Thrown when attempting to mint with no configured shares


```solidity
error NoShares();
```

## Structs
### Share
Structure to hold recipient share information


```solidity
struct Share {
  address recipient;
  uint16 amount;
  uint16 revocationDelayDays;
  uint48 pendingRevocationTime;
  bool adjustedForRevocation;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address that will receive minted UNI tokens|
|`amount`|`uint16`|The number of shares allocated to this recipient (out of MAX_SHARES)|
|`revocationDelayDays`|`uint16`|The number of days notice required for a revocation of this share|
|`pendingRevocationTime`|`uint48`|The timestamp when revocation can be completed, or 0 if not pending|
|`adjustedForRevocation`|`bool`|Whether the share amounts have already been adjusted for revocation|


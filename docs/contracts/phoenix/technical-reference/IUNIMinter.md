# IUNIMinter
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/interfaces/IUNIMinter.sol)


## Functions
### UNI

The UNI token contract address on mainnet


```solidity
function UNI() external view returns (IUNI);
```

### totalUnits

Total number of currently allocated units via splits

*Always less than or equal to MAX_UNITS*


```solidity
function totalUnits() external view returns (uint16);
```

### splits

Access the Splits array by index


```solidity
function splits(uint256 index) external view returns (address, uint16, uint16, uint48, bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Split unpacked: recipient, units, revocationDelayDays, pendingRevocationTime, adjustedForRevocation|
|`<none>`|`uint16`||
|`<none>`|`uint16`||
|`<none>`|`uint48`||
|`<none>`|`bool`||


### mint

Executes the annual mint and distributes tokens proportionally to split recipients

*Can be called by anyone once per year. Mints based on allocated splits only, unallocated
splits reduce inflation*

*The underlying UNI token contract reverts if called with > 2% of total supply*


```solidity
function mint() external;
```

### grantSplit

Grants a split of the UNI inflation to a recipient

*Only callable by owner (UNI DAO). Reverts if total splits would exceed MAX_UNITS*


```solidity
function grantSplit(address _recipient, uint16 _unit, uint16 _revocationDelayDays) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_recipient`|`address`|The address that will receive the minted UNI tokens|
|`_unit`|`uint16`|The number of splits to allocate (out of MAX_UNITS total)|
|`_revocationDelayDays`|`uint16`|The number of days notice required for a revocation of this split|


### initiateRevokeSplit

Initiates the revocation process for a recipient's split

*Only callable by owner. Sets a timestamp after which revocation can be completed*


```solidity
function initiateRevokeSplit(uint256 _index) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_index`|`uint256`|The index in the splits array of the allocation to revoke|


### revokeSplit

Completes or updates split revocation based on timing relative to next mint

*Can be called by anyone to update a split based on its pending revocation timing:
- If revocation completes before next mint: split is entirely removed
- If revocation extends into next mint period: split units are reduced proportionally
to time remaining until revocation (e.g., 90 days into 365-day period = ~25% of units)
- revokeSplit must be called to update units for pending revocation*


```solidity
function revokeSplit(uint256 _index) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_index`|`uint256`|The index in the splits array of the allocation to revoke or update|


### setMinter

Transfers the UNI minter role to a new address

*Only callable by owner. This is a critical operation that permanently transfers
the ability to mint UNI tokens to the new address. Once transferred, this contract
will no longer be able to mint UNI tokens unless the role is transferred back.*


```solidity
function setMinter(address _minter) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minter`|`address`|The address of the new minter contract or EOA|


## Errors
### InvalidRevocation
Thrown when attempting to complete revocation before the delay period has elapsed, or
when attempting to re-revoke a split that has already been adjusted.


```solidity
error InvalidRevocation();
```

### NotPendingRevocation
Thrown when attempting to complete revocation for splits without a pending revocation


```solidity
error NotPendingRevocation();
```

### InsufficientUnits
Thrown when granting units would exceed the maximum allowed


```solidity
error InsufficientUnits();
```

### NoUnits
Thrown when attempting to mint with no units configured to splits


```solidity
error NoUnits();
```

## Structs
### Split
Structure to hold recipient split information


```solidity
struct Split {
  address recipient;
  uint16 units;
  uint16 revocationDelayDays;
  uint48 pendingRevocationTime;
  bool adjustedForRevocation;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address that will receive minted UNI tokens|
|`units`|`uint16`|The number of units allocated to this recipient (out of MAX_UNITS)|
|`revocationDelayDays`|`uint16`|The number of days notice required for a revocation of this split|
|`pendingRevocationTime`|`uint48`|The timestamp when revocation can be completed, or 0 if not pending|
|`adjustedForRevocation`|`bool`|Whether the split units have already been adjusted for revocation|


# UNIMinter
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/UNIMinter.sol)

**Inherits:**
[IUNIMinter](./IUNIMinter), Owned

**Author:**
Uniswap

A smart contract that manages the minting rights for UNI token, enabling proportional
distribution to multiple recipients

*This contract holds the minter role and allows annual minting with configurable allocations*

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


### MAX_UNITS
The total number of units representing 100% of mintable tokens

*Unallocated units result in reduced inflation*


```solidity
uint16 private constant MAX_UNITS = 10_000;
```


### UNI
The UNI token contract address on mainnet


```solidity
IUNI public constant UNI = IUNI(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984);
```


### totalUnits
Total number of currently allocated units via splits

*Always less than or equal to MAX_UNITS*


```solidity
uint16 public totalUnits;
```


### splits
Access the Splits array by index


```solidity
Split[] public splits;
```


## Functions
### constructor

Creates a new UNIMinter instance


```solidity
constructor(address _owner) Owned(_owner);
```
**Parameters**

| Name     | Type      | Description                                                           |
| -------- | --------- | --------------------------------------------------------------------- |
| `_owner` | `address` | The initial admin address (UNI DAO) that can manage split allocations |


### mint

Executes the annual mint and distributes tokens proportionally to split recipients

*Can be called by anyone once per year. Mints based on allocated splits only, unallocated
splits reduce inflation*


```solidity
function mint() external;
```

### grantSplit

Grants a split of the UNI inflation to a recipient

*Only callable by owner (UNI DAO). Reverts if total splits would exceed MAX_UNITS*


```solidity
function grantSplit(address _recipient, uint16 _units, uint16 _revocationDelayDays)
  external
  onlyOwner;
```
**Parameters**

| Name                   | Type      | Description                                                       |
| ---------------------- | --------- | ----------------------------------------------------------------- |
| `_recipient`           | `address` | The address that will receive the minted UNI tokens               |
| `_units`               | `uint16`  |                                                                   |
| `_revocationDelayDays` | `uint16`  | The number of days notice required for a revocation of this split |


### initiateRevokeSplit

Initiates the revocation process for a recipient's split

*Only callable by owner. Sets a timestamp after which revocation can be completed*


```solidity
function initiateRevokeSplit(uint256 _index) external onlyOwner;
```
**Parameters**

| Name     | Type      | Description                                               |
| -------- | --------- | --------------------------------------------------------- |
| `_index` | `uint256` | The index in the splits array of the allocation to revoke |


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

| Name     | Type      | Description                                                         |
| -------- | --------- | ------------------------------------------------------------------- |
| `_index` | `uint256` | The index in the splits array of the allocation to revoke or update |


### setMinter

Transfers the UNI minter role to a new address

*Only callable by owner. This is a critical operation that permanently transfers
the ability to mint UNI tokens to the new address. Once transferred, this contract
will no longer be able to mint UNI tokens unless the role is transferred back.*


```solidity
function setMinter(address _minter) external onlyOwner;
```
**Parameters**

| Name      | Type      | Description                                   |
| --------- | --------- | --------------------------------------------- |
| `_minter` | `address` | The address of the new minter contract or EOA |



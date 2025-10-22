# UNIVesting
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/UNIVesting.sol)

**Inherits:**
[IUNIVesting](/technical-reference/IUNIVesting), Owned

A contract for vesting UNI tokens over configurable time periods

*This contract allows for the vesting of UNI tokens with periodic claiming
functionality. It integrates with the UNI token's minting schedule to coordinate
vesting windows with minting cycles.*

**Note:**
security-contact: security@uniswap.org


## State Variables
### UNI
The UNI token contract.


```solidity
IUNI public immutable UNI;
```


### periodDuration
The duration of each period, ie. 30 days.


```solidity
uint256 public immutable periodDuration;
```


### totalVestingPeriod
The total vesting period, ie. 365 days.


```solidity
uint256 public immutable totalVestingPeriod;
```


### totalPeriods
The total number of periods in the vesting window, ie 12.


```solidity
uint256 public immutable totalPeriods;
```


### mintingAllowedAfterCheckpoint
The checkpoint of the minting allowed after timestamp set on the UNI token contract.
Stored to keep track of minting windows.

*Vesting should not be allowed to start if the minting window has not changed.*


```solidity
uint256 public mintingAllowedAfterCheckpoint;
```


### amountVesting
The amount of tokens that are being vested in this window.


```solidity
uint256 public amountVesting;
```


### startTime
The start time of the vesting window.


```solidity
uint256 public startTime;
```


### claimed
If positive, it's the amount of tokens that have been claimed in this vesting window.
It will be negative if there are tokens leftover from previous vesting windows, and a NEW
vesting window has begun.


```solidity
int256 public claimed;
```


## Functions
### constructor

Constructs a new UNIVesting contract


```solidity
constructor(address _uni, uint256 _periodDuration) Owned(msg.sender);
```
**Parameters**

| Name              | Type      | Description                                                    |
| ----------------- | --------- | -------------------------------------------------------------- |
| `_uni`            | `address` | The address of the UNI token contract                          |
| `_periodDuration` | `uint256` | The duration of each vesting period in seconds (e.g., 30 days) |


### start

Starts the vesting window.

*The vesting window can only be started if the minting window has updated on the UNI token
contract, and if there is not currently an active vest.*


```solidity
function start() external;
```

### claim

Claims the vested tokens for a recipient.

*Only callable by the owner.*


```solidity
function claim(address recipient) external onlyOwner;
```
**Parameters**

| Name        | Type      | Description                         |
| ----------- | --------- | ----------------------------------- |
| `recipient` | `address` | The address to claim the tokens to. |


### claimable

The total amount of tokens that are claimable.

*This COULD return a value greater than `amountVesting` if multiple vesting windows have
been started and have leftover tokens.*


```solidity
function claimable() public view returns (uint256);
```

### totalVested

The total amount of tokens that have been vested in this window.

*Bounded by 0 and `amountVesting`.*


```solidity
function totalVested() public view returns (uint256);
```


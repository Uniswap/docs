# IUNIVesting
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/interfaces/IUNIVesting.sol)

Interface for the UNIVesting contract


## Functions
### UNI

The UNI token contract.


```solidity
function UNI() external view returns (IUNI);
```

### periodDuration

The duration of each period, ie. 30 days.


```solidity
function periodDuration() external view returns (uint256);
```

### totalVestingPeriod

The total vesting period, ie. 365 days.


```solidity
function totalVestingPeriod() external view returns (uint256);
```

### totalPeriods

The total number of periods in the vesting window, ie 12.


```solidity
function totalPeriods() external view returns (uint256);
```

### mintingAllowedAfterCheckpoint

The checkpoint of the minting allowed after timestamp set on the UNI token contract.
Stored to keep track of minting windows.

*Vesting should not be allowed to start if the minting window has not changed.*


```solidity
function mintingAllowedAfterCheckpoint() external view returns (uint256);
```

### amountVesting

The amount of tokens that are being vested in this window.


```solidity
function amountVesting() external view returns (uint256);
```

### startTime

The start time of the vesting window.


```solidity
function startTime() external view returns (uint256);
```

### claimed

If positive, it's the amount of tokens that have been claimed in this vesting window.
It will be negative if there are tokens leftover from previous vesting windows, and a NEW
vesting window has begun.


```solidity
function claimed() external view returns (int256);
```

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

*It's possible that this sets the
claimed amount to zero, if the only claimable tokens are leftover from a previous vest.*


```solidity
function claim(address recipient) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address to claim the tokens to.|


### claimable

The total amount of tokens that are claimable.

*This COULD return a value greater than `amountVesting` if multiple vesting windows have
been started and have leftover tokens.*


```solidity
function claimable() external view returns (uint256);
```

### totalVested

The total amount of tokens that have been vested in this window.

*Bounded by 0 and `amountVesting`.*


```solidity
function totalVested() external view returns (uint256);
```

## Errors
### MintingWindowClosed
Thrown when the minting timestamp has not been updated, but a vesting window is being
started.


```solidity
error MintingWindowClosed();
```

### NothingToVest
Thrown if trying to intiate a vesting window with no balance.


```solidity
error NothingToVest();
```

### ActiveVestingWindow
Thrown if the vesting window is not complete.


```solidity
error ActiveVestingWindow();
```


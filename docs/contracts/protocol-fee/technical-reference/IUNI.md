# IUNI
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/interfaces/IUNI.sol)

**Inherits:**
IERC20

Interface for the UNI token contract extending ERC20 functionality

*This interface extends IERC20 with UNI-specific minting and governance functions*


## Functions
### minter

Returns the address that has minting privileges for UNI tokens


```solidity
function minter() external view returns (address);
```
**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `address` | The address of the current minter |


### mintingAllowedAfter

Returns the timestamp after which minting is allowed


```solidity
function mintingAllowedAfter() external view returns (uint256);
```
**Returns**

| Name     | Type      | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| `<none>` | `uint256` | The timestamp after which the next mint is allowed |


### mint

Mints new UNI tokens to a specified address

*Only callable by the designated minter*


```solidity
function mint(address dst, uint256 rawAmount) external;
```
**Parameters**

| Name        | Type      | Description                                    |
| ----------- | --------- | ---------------------------------------------- |
| `dst`       | `address` | The address to receive the newly minted tokens |
| `rawAmount` | `uint256` | The amount of tokens to mint (in wei)          |


### setMinter

Sets a new minter address

*Only callable by the current minter, permanently transfers minting rights*


```solidity
function setMinter(address minter) external;
```
**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `minter` | `address` | The address of the new minter |


### minimumTimeBetweenMints

Returns the minimum time that must elapse between minting operations

*Used to enforce a delay between token minting*


```solidity
function minimumTimeBetweenMints() external view returns (uint32);
```
**Returns**

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| `<none>` | `uint32` | The minimum time between mints in seconds |



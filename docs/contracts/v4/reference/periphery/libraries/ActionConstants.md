# ActionConstants
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/ActionConstants.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Common constants used in actions

*Constants are gas efficient alternatives to their literal values*


## State Variables
### OPEN_DELTA
used to signal that an action should use the input value of the open delta on the pool manager
or of the balance that the contract holds


```solidity
uint128 internal constant OPEN_DELTA = 0;
```


### CONTRACT_BALANCE
used to signal that an action should use the contract's entire balance of a currency
This value is equivalent to 1<<255, i.e. a singular 1 in the most significant bit.


```solidity
uint256 internal constant CONTRACT_BALANCE = 0x8000000000000000000000000000000000000000000000000000000000000000;
```


### MSG_SENDER
used to signal that the recipient of an action should be the msgSender


```solidity
address internal constant MSG_SENDER = address(1);
```


### ADDRESS_THIS
used to signal that the recipient of an action should be the address(this)


```solidity
address internal constant ADDRESS_THIS = address(2);
```



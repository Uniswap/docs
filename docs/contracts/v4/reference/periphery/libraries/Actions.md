# Actions
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/Actions.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Library to define different pool actions.

*These are suggested common commands, however additional commands should be defined as required
Some of these actions are not supported in the Router contracts or Position Manager contracts, but are left as they may be helpful commands for other peripheral contracts.*


## State Variables
### INCREASE_LIQUIDITY

```solidity
uint256 internal constant INCREASE_LIQUIDITY = 0x00;
```


### DECREASE_LIQUIDITY

```solidity
uint256 internal constant DECREASE_LIQUIDITY = 0x01;
```


### MINT_POSITION

```solidity
uint256 internal constant MINT_POSITION = 0x02;
```


### BURN_POSITION

```solidity
uint256 internal constant BURN_POSITION = 0x03;
```


### INCREASE_LIQUIDITY_FROM_DELTAS

```solidity
uint256 internal constant INCREASE_LIQUIDITY_FROM_DELTAS = 0x04;
```


### MINT_POSITION_FROM_DELTAS

```solidity
uint256 internal constant MINT_POSITION_FROM_DELTAS = 0x05;
```


### SWAP_EXACT_IN_SINGLE

```solidity
uint256 internal constant SWAP_EXACT_IN_SINGLE = 0x06;
```


### SWAP_EXACT_IN

```solidity
uint256 internal constant SWAP_EXACT_IN = 0x07;
```


### SWAP_EXACT_OUT_SINGLE

```solidity
uint256 internal constant SWAP_EXACT_OUT_SINGLE = 0x08;
```


### SWAP_EXACT_OUT

```solidity
uint256 internal constant SWAP_EXACT_OUT = 0x09;
```


### DONATE

```solidity
uint256 internal constant DONATE = 0x0a;
```


### SETTLE

```solidity
uint256 internal constant SETTLE = 0x0b;
```


### SETTLE_ALL

```solidity
uint256 internal constant SETTLE_ALL = 0x0c;
```


### SETTLE_PAIR

```solidity
uint256 internal constant SETTLE_PAIR = 0x0d;
```


### TAKE

```solidity
uint256 internal constant TAKE = 0x0e;
```


### TAKE_ALL

```solidity
uint256 internal constant TAKE_ALL = 0x0f;
```


### TAKE_PORTION

```solidity
uint256 internal constant TAKE_PORTION = 0x10;
```


### TAKE_PAIR

```solidity
uint256 internal constant TAKE_PAIR = 0x11;
```


### CLOSE_CURRENCY

```solidity
uint256 internal constant CLOSE_CURRENCY = 0x12;
```


### CLEAR_OR_TAKE

```solidity
uint256 internal constant CLEAR_OR_TAKE = 0x13;
```


### SWEEP

```solidity
uint256 internal constant SWEEP = 0x14;
```


### WRAP

```solidity
uint256 internal constant WRAP = 0x15;
```


### UNWRAP

```solidity
uint256 internal constant UNWRAP = 0x16;
```


### MINT_6909

```solidity
uint256 internal constant MINT_6909 = 0x17;
```


### BURN_6909

```solidity
uint256 internal constant BURN_6909 = 0x18;
```



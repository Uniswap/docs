# CurrencyReserves
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/CurrencyReserves.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## State Variables
### RESERVES_OF_SLOT
bytes32(uint256(keccak256("ReservesOf")) - 1)


```solidity
bytes32 constant RESERVES_OF_SLOT = 0x1e0745a7db1623981f0b2a5d4232364c00787266eb75ad546f190e6cebe9bd95;
```


### CURRENCY_SLOT
bytes32(uint256(keccak256("Currency")) - 1)


```solidity
bytes32 constant CURRENCY_SLOT = 0x27e098c505d44ec3574004bca052aabf76bd35004c182099d8c575fb238593b9;
```


## Functions
### getSyncedCurrency


```solidity
function getSyncedCurrency() internal view returns (Currency currency);
```

### resetCurrency


```solidity
function resetCurrency() internal;
```

### syncCurrencyAndReserves


```solidity
function syncCurrencyAndReserves(Currency currency, uint256 value) internal;
```

### getSyncedReserves


```solidity
function getSyncedReserves() internal view returns (uint256 value);
```


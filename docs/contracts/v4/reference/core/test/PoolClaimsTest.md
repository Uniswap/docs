# PoolClaimsTest
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/test/PoolClaimsTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[PoolTestBase](contracts/v4/reference/core/test/PoolTestBase.md)


## Functions
### constructor


```solidity
constructor(IPoolManager _manager) PoolTestBase(_manager);
```

### deposit

Convert ERC20 into a claimable 6909


```solidity
function deposit(Currency currency, address user, uint256 amount) external payable;
```

### withdraw

Redeem claimable 6909 for ERC20


```solidity
function withdraw(Currency currency, address user, uint256 amount) external payable;
```

### unlockCallback


```solidity
function unlockCallback(bytes calldata rawData) external returns (bytes memory);
```

## Structs
### CallbackData

```solidity
struct CallbackData {
    address sender;
    address user;
    Currency currency;
    uint256 amount;
    bool deposit;
}
```


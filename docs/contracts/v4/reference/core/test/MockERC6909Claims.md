# MockERC6909Claims
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/MockERC6909Claims.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ERC6909Claims](contracts/v4/reference/core/ERC6909Claims.md)

Mock contract for testing ERC6909Claims


## Functions
### mint

mocked mint logic


```solidity
function mint(address to, uint256 id, uint256 amount) public;
```

### burn

mocked burn logic


```solidity
function burn(uint256 id, uint256 amount) public;
```

### burnFrom

mocked burn logic without checking sender allowance


```solidity
function burnFrom(address from, uint256 id, uint256 amount) public;
```


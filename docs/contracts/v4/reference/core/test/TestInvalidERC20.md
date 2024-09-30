# TestInvalidERC20
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/TestInvalidERC20.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IERC20Minimal](contracts/v4/reference/core/interfaces/IERC20Minimal.md)


## State Variables
### balanceOf

```solidity
mapping(address => uint256) public override balanceOf;
```


### allowance

```solidity
mapping(address => mapping(address => uint256)) public override allowance;
```


## Functions
### constructor


```solidity
constructor(uint256 amountToMint);
```

### mint


```solidity
function mint(address to, uint256 amount) public;
```

### transfer


```solidity
function transfer(address recipient, uint256 amount) external override returns (bool);
```

### approve


```solidity
function approve(address spender, uint256 amount) external override returns (bool);
```

### transferFrom


```solidity
function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool);
```


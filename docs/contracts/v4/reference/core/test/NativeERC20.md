# NativeERC20
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/NativeERC20.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
Test

*This token contract simulates the ERC20 representation of a native token where on `transfer` and `transferFrom` the native balances are modified using a precompile*


## State Variables
### name

```solidity
string public name = "NativeERC20";
```


### symbol

```solidity
string public symbol = "NERC20";
```


### decimals

```solidity
uint8 public decimals = 18;
```


### allowance

```solidity
mapping(address => mapping(address => uint256)) public allowance;
```


## Functions
### totalSupply


```solidity
function totalSupply() public view returns (uint256);
```

### approve


```solidity
function approve(address guy, uint256 wad) public returns (bool);
```

### transfer


```solidity
function transfer(address dst, uint256 wad) public returns (bool);
```

### transferFrom


```solidity
function transferFrom(address src, address dst, uint256 wad) public returns (bool);
```

### balanceOf


```solidity
function balanceOf(address account) external view returns (uint256);
```

## Events
### Approval

```solidity
event Approval(address indexed src, address indexed guy, uint256 wad);
```

### Transfer

```solidity
event Transfer(address indexed src, address indexed dst, uint256 wad);
```


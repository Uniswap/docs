# VestingLib
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/libraries/VestingLib.sol)

Library for vesting calculations

**Note:**
security-contact: security@uniswap.org


## Functions
### sub

if b is negative: a - (-b)
otherwise: a - b


```solidity
function sub(uint256 a, int256 b) internal pure returns (uint256);
```

### add


```solidity
function add(int256 a, uint256 b) internal pure returns (int256);
```


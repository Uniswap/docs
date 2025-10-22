# VestingLib
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/libraries/VestingLib.sol)

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


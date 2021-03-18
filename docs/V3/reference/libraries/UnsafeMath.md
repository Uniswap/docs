Contains methods that perform common math functions but do not do any overflow or underflow checks


## Functions
### divRoundingUp
```solidity
  function divRoundingUp(
  ) internal returns (uint256 z)
```
Returns ceil(x / y)

panics if y == 0



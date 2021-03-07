
## `UnsafeMath`

Contains methods that perform common math functions but do not do any overflow or underflow checks



 ```solidity 
 function divRoundingUp(
     uint256 x, uint256 y<br/>
   )(internal) returns (uint256 z)
 ``` 

Returns ceil(x / y)

panics if y == 0





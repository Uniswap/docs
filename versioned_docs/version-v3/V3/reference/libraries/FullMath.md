
## `FullMath`

Facilitates multiplication and division that can have overflow of an intermediate value without any loss of precision

Handles "phantom overflow" i.e., allows multiplication and division where an intermediate value overflows 256 bits


 ```solidity 
 function mulDiv(
     uint256 a, uint256 b, uint256 denominator<br/>
   )(internal) returns (uint256 result)
 ``` 

Calculates floor(a×b÷denominator) with full precision. Throws if result overflows a uint256 or denominator == 0

Credit to Remco Bloemen under MIT license https://xn--2-umb.com/21/muldiv

a: The multiplicand

b: The multiplier

denominator: The divisor


result: The 256-bit result


 ```solidity 
 function mulDivRoundingUp(
     uint256 a, uint256 b, uint256 denominator<br/>
   )(internal) returns (uint256 result)
 ``` 

/ @notice Calculates ceil(a×b÷denominator) with full precision. Throws if result overflows a uint256 or denominator == 0



a: The multiplicand

b: The multiplier

denominator: The divisor


result: The 256-bit result



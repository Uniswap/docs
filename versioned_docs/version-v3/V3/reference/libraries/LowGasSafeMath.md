
## `LowGasSafeMath`

Contains methods for doing math operations that revert on overflow or underflow for minimal gas cost



 ```solidity 
 function add(
     uint256 x, uint256 y<br/>
   )(internal) returns (uint256 z)
 ``` 

Returns x + y, reverts if sum overflows uint256




z: The sum of x and y

 ```solidity 
 function sub(
     uint256 x, uint256 y<br/>
   )(internal) returns (uint256 z)
 ``` 

Returns x - y, reverts if underflows




z: The difference of x and y

 ```solidity 
 function mul(
     uint256 x, uint256 y<br/>
   )(internal) returns (uint256 z)
 ``` 

Returns x * y, reverts if overflows




z: The product of x and y

 ```solidity 
 function add(
     int256 x, int256 y<br/>
   )(internal) returns (int256 z)
 ``` 

Returns x + y, reverts if overflows or underflows




z: The sum of x and y

 ```solidity 
 function sub(
     int256 x, int256 y<br/>
   )(internal) returns (int256 z)
 ``` 

Returns x - y, reverts if overflows or underflows




z: The difference of x and y



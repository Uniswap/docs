
## `LowGasSafeMath`

Optimized overflow and underflow safe math operations


Contains methods for doing math operations that revert on overflow or underflow for minimal gas cost




### `add(uint256 x, uint256 y) → uint256 z` (internal)

Returns x + y, reverts if sum overflows uint256





z: The sum of x and y

### `sub(uint256 x, uint256 y) → uint256 z` (internal)

Returns x - y, reverts if underflows





z: The difference of x and y

### `mul(uint256 x, uint256 y) → uint256 z` (internal)

Returns x * y, reverts if overflows





z: The product of x and y

### `add(int256 x, int256 y) → int256 z` (internal)

Returns x + y, reverts if overflows or underflows





z: The sum of x and y

### `sub(int256 x, int256 y) → int256 z` (internal)

Returns x - y, reverts if overflows or underflows





z: The difference of x and y



Supports quoting the calculated amounts from exact input or exact output swaps

These functions are not marked view because they rely on calling non-view functions and reverting
to compute the result. They are also not gas efficient and should not be called on-chain.

## Functions
### quoteExactInput
```solidity
  function quoteExactInput(
    bytes path,
    uint256 amountIn
  ) external returns (uint256 amountOut)
```
Returns the amount out received for a given exact input swap without executing the swap


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`path` | bytes | The path of the swap, i.e. each token pair and the pool fee
|`amountIn` | uint256 | The amount of the first token to swap

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountOut`| uint256 | The amount of the last token that would be received
### quoteExactInputSingle
```solidity
  function quoteExactInputSingle(
    address tokenIn,
    address tokenOut,
    uint24 fee,
    uint256 amountIn,
    uint160 sqrtPriceLimitX96
  ) external returns (uint256 amountOut)
```
Returns the amount out received for a given exact input but for a swap of a single pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenIn` | address | The token being swapped in
|`tokenOut` | address | The token being swapped out
|`fee` | uint24 | The fee of the token pool to consider for the pair
|`amountIn` | uint256 | The desired input amount
|`sqrtPriceLimitX96` | uint160 | The price limit of the pool that cannot be exceeded by the swap

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountOut`| uint256 | The amount of `tokenOut` that would be received
### quoteExactOutput
```solidity
  function quoteExactOutput(
    bytes path,
    uint256 amountOut
  ) external returns (uint256 amountIn)
```
Returns the amount in required for a given exact output swap without executing the swap


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`path` | bytes | The path of the swap, i.e. each token pair and the pool fee
|`amountOut` | uint256 | The amount of the last token to receive

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountIn`| uint256 | The amount of first token required to be paid
### quoteExactOutputSingle
```solidity
  function quoteExactOutputSingle(
    address tokenIn,
    address tokenOut,
    uint24 fee,
    uint256 amountOut,
    uint160 sqrtPriceLimitX96
  ) external returns (uint256 amountIn)
```
Returns the amount in required to receive the given exact output amount but for a swap of a single pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenIn` | address | The token being swapped in
|`tokenOut` | address | The token being swapped out
|`fee` | uint24 | The fee of the token pool to consider for the pair
|`amountOut` | uint256 | The desired output amount
|`sqrtPriceLimitX96` | uint160 | The price limit of the pool that cannot be exceeded by the swap

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountIn`| uint256 | The amount required as the input for the swap in order to receive `amountOut`

Functions for swapping tokens via Uniswap V3

## Parameter Structs

### ExactInputSingleParams
```solidity
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }
```
### ExactInputParams
```solidity
   struct ExactInputParams {
        bytes path;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
    }
```
### ExactInputSingleParams
```solidity
    struct ExactOutputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountOut;
        uint256 amountInMaximum;
        uint160 sqrtPriceLimitX96;
    }
```
### ExactOutputParams
```solidity
    struct ExactOutputParams {
        bytes path;
        address recipient;
        uint256 deadline;
        uint256 amountOut;
        uint256 amountInMaximum;
    }
```

## Functions
### exactInputSingle
```solidity
  function exactInputSingle(
    struct ISwapRouter.ExactInputSingleParams params
  ) external returns (uint256 amountOut)
```
Swaps `amountIn` of one token for as much as possible of another token


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct ISwapRouter.ExactInputSingleParams | The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountOut`| struct ISwapRouter.ExactInputSingleParams | The amount of the received token

### exactInput
```solidity
  function exactInput(
    struct ISwapRouter.ExactInputParams params
  ) external returns (uint256 amountOut)
```
Swaps `amountIn` of one token for as much as possible of another along the specified path


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct ISwapRouter.ExactInputParams | The parameters necessary for the multi-hop swap, encoded as `ExactInputParams` in calldata

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountOut`| struct ISwapRouter.ExactInputParams | The amount of the received token

### exactOutputSingle
```solidity
  function exactOutputSingle(
    struct ISwapRouter.ExactOutputSingleParams params
  ) external returns (uint256 amountIn)
```
Swaps as little as possible of one token for `amountOut` of another token


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct ISwapRouter.ExactOutputSingleParams | The parameters necessary for the swap, encoded as `ExactOutputSingleParams` in calldata

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountIn`| struct ISwapRouter.ExactOutputSingleParams | The amount of the input token

### exactOutput
```solidity
  function exactOutput(
    struct ISwapRouter.ExactOutputParams params
  ) external returns (uint256 amountIn)
```
Swaps as little as possible of one token for `amountOut` of another along the specified path (reversed)


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct ISwapRouter.ExactOutputParams | The parameters necessary for the multi-hop swap, encoded as `ExactOutputParams` in calldata

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amountIn`| struct ISwapRouter.ExactOutputParams | The amount of the input token

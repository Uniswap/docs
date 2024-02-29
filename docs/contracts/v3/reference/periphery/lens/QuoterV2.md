Allows getting the expected amount out or amount in for a given swap without executing the swap

These functions are not gas efficient and should _not_ be called on chain. Instead, optimistically execute
the swap and check the amounts in the callback.

## Functions

### constructor

```solidity
  function constructor(
  ) public
```

### uniswapV3SwapCallback

```solidity
  function uniswapV3SwapCallback(
    int256 amount0Delta,
    int256 amount1Delta,
    bytes data
  ) external view override
```

Called to `msg.sender` after executing a swap via IUniswapV3Pool#swap.

In the implementation you must pay the pool tokens owed for the swap.
The caller of this method must be checked to be a UniswapV3Pool deployed by the canonical UniswapV3Factory.
amount0Delta and amount1Delta can both be 0 if no tokens were swapped.

#### Parameters:

| Name           | Type   | Description                                                                                 |
| :------------- | :----- | :------------------------------------------------------------------------------------------ |
| `amount0Delta` | int256 | The amount of token0 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token0 to the pool. |
| `amount1Delta` | int256 | The amount of token1 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token1 to the pool. |
|`data` | bytes | Any data passed through by the caller via the IUniswapV3PoolActions#swap call |

### quoteExactInputSingle

```solidity
  function quoteExactInputSingle(
  ) public override returns (uint256 amountOut, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)
```

### quoteExactInput

```solidity
  function quoteExactInput(
  ) public override returns (uint256 amountOut, uint160[] sqrtPriceX96AfterList, uint32[] initializedTicksCrossedList, uint256 gasEstimate)
```

### quoteExactOutputSingle

```solidity
  function quoteExactOutputSingle(
  ) public override returns (uint256 amountIn, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)
```

### quoteExactOutput

```solidity
  function quoteExactOutput(
  ) public override returns (uint256 amountIn, uint160[] sqrtPriceX96AfterList, uint32[] initializedTicksCrossedList, uint256 gasEstimate)
```

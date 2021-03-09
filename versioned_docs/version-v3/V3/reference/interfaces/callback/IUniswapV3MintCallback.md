Any contract that calls IUniswapV3PoolActions#mint must implement this interface


## Functions
### uniswapV3MintCallback
```solidity
  function uniswapV3MintCallback(
    uint256 amount0Owed, uint256 amount1Owed, bytes data
  ) external
```
Called on `msg.sender` after making updates to a position. Allows the sender to pay the tokens
due for the minted liquidity.

The caller of this method must be checked to be a UniswapV3Pool deployed by the canonical factory

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`amount0Owed` |  | The amount of token0 due to the pool for the minted liquidity
|`amount1Owed` |  | The amount of token1 due to the pool for the minted liquidity
|`data` |  | Any data passed through by the caller via the IUniswapV3PoolActions#mint call


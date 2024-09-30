# IV4Router
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/interfaces/IV4Router.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface containing all the structs and errors for different v4 swap types


## Errors
### V4TooLittleReceived
Emitted when an exactInput swap does not receive its minAmountOut


```solidity
error V4TooLittleReceived(uint256 minAmountOutReceived, uint256 amountReceived);
```

### V4TooMuchRequested
Emitted when an exactOutput is asked for more than its maxAmountIn


```solidity
error V4TooMuchRequested(uint256 maxAmountInRequested, uint256 amountRequested);
```

## Structs
### ExactInputSingleParams
Parameters for a single-hop exact-input swap


```solidity
struct ExactInputSingleParams {
    PoolKey poolKey;
    bool zeroForOne;
    uint128 amountIn;
    uint128 amountOutMinimum;
    uint160 sqrtPriceLimitX96;
    bytes hookData;
}
```

### ExactInputParams
Parameters for a multi-hop exact-input swap


```solidity
struct ExactInputParams {
    Currency currencyIn;
    PathKey[] path;
    uint128 amountIn;
    uint128 amountOutMinimum;
}
```

### ExactOutputSingleParams
Parameters for a single-hop exact-output swap


```solidity
struct ExactOutputSingleParams {
    PoolKey poolKey;
    bool zeroForOne;
    uint128 amountOut;
    uint128 amountInMaximum;
    uint160 sqrtPriceLimitX96;
    bytes hookData;
}
```

### ExactOutputParams
Parameters for a multi-hop exact-output swap


```solidity
struct ExactOutputParams {
    Currency currencyOut;
    PathKey[] path;
    uint128 amountOut;
    uint128 amountInMaximum;
}
```


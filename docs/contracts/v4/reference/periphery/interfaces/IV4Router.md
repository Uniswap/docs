# IV4Router
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/interfaces/IV4Router.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IImmutableState](contracts/v4/reference/periphery/interfaces/IImmutableState.md)

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


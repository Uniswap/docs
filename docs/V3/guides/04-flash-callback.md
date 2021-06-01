---
id: flash-callback
title: Flash Callback
---

Last, we will override the flash callback with our own custom logic to execute our swaps.

first we declare the `uniswapV3FlashCallback` function and override it

```solidity
    function uniswapV3FlashCallback(
        uint256 fee0,
        uint256 fee1,
        bytes calldata data
    ) external override {
```

Next we declare a variable in memory as `decoded`, which we assign to the decoded data [**decode**](https://docs.soliditylang.org/en/v0.7.6/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions) the data that we previously encoded into the calldata.

```solidity
        FlashCallbackData memory decoded = abi.decode(data, (FlashCallbackData));
```

Each callback must be validated to verify that the call originated from a genuine V3 pool

```solidity
        CallbackValidation.verifyCallback(factory, decoded.poolKey);
```


now we will assign local variables of type `address` as `token0` and `token1` so that we can approve the router to interact with the tokens from the flash.

```solidity
        address token0 = decoded.poolKey.token0;
        address token1 = decoded.poolKey.token1;

        TransferHelper.safeApprove(token0, address(swapRouter), decoded.amount0);
        TransferHelper.safeApprove(token1, address(swapRouter), decoded.amount1);
```

Then we'll code in a minimum amount out for both of the upcoming swaps, such that the following swaps will revert if we do not receive a profitable trade.

```solidity
        uint256 amount1Min = LowGasSafeMath.add(decoded.amount1, fee1);
        uint256 amount0Min = LowGasSafeMath.add(decoded.amount0, fee0);
```

Now we call the first of two swaps, calling `exactInputSingle` on the router contract, as we are not structuring this trade as a multi-hop. In this call we are using the previously declared `amount0In` as the minimum amount out, and assigning the returned balance of the swap to `amountOut0`.

Most of These function arguments have already been discussed, except for two new introductions:

`sqrtPriceLimitX96`: This value limits the price that the swap can change the pool to. This is useful for circumstances where the user wants to swap *up until* a certain price, but for the sake of clarity, we will set it to 0 to effectively make the argument inactive.

`deadline`: this is the timestamp after which the transaction will revert, to protect the transaction from unreasable slippage, the chances of which increase over time. For this example we will set it far in the future. In a live application, this will have to be calculated based on the preferences of the transaction sender.

```solidity
uint256 amountOut0 =
            swapRouter.exactInputSingle(
                ISwapRouter.ExactInputSingleParams({
                    tokenIn: token1,
                    tokenOut: token0,
                    fee: decoded.poolFee2,
                    recipient: address(this),
                    deadline: block.timestamp + 200,
                    amountIn: decoded.amount1,
                    amountOutMinimum: amount0Min,
                    sqrtPriceLimitX96: 0
                })
            );
```
Following that we have the second of two swaps, 

```solidity
uint256 amountOut1 =
            swapRouter.exactInputSingle(
                ISwapRouter.ExactInputSingleParams({
                    tokenIn: token0,
                    tokenOut: token1,
                    fee: decoded.poolFee3,
                    recipient: address(this),
                    deadline: block.timestamp + 200,
                    amountIn: decoded.amount0,
                    amountOutMinimum: amount1Min,
                    sqrtPriceLimitX96: 0
                })
            );
```

```solidity
    function uniswapV3FlashCallback(
        uint256 fee0,
        uint256 fee1,
        bytes calldata data
    ) external override {
        FlashCallbackData memory decoded = abi.decode(data, (FlashCallbackData));
        CallbackValidation.verifyCallback(factory, decoded.poolKey);

        address token0 = decoded.poolKey.token0;
        address token1 = decoded.poolKey.token1;

        TransferHelper.safeApprove(token0, address(swapRouter), decoded.amount0);
        TransferHelper.safeApprove(token1, address(swapRouter), decoded.amount1);

        // profitable check
        // exactInputSingle will fail if this amount not met
        uint256 amount1Min = LowGasSafeMath.add(decoded.amount1, fee1);
        uint256 amount0Min = LowGasSafeMath.add(decoded.amount0, fee0);

        // call exactInputSingle for swapping token1 for token0 in pool w/fee2
        uint256 amountOut0 =
            swapRouter.exactInputSingle(
                ISwapRouter.ExactInputSingleParams({
                    tokenIn: token1,
                    tokenOut: token0,
                    fee: decoded.poolFee2,
                    recipient: address(this),
                    deadline: block.timestamp + 200,
                    amountIn: decoded.amount1,
                    amountOutMinimum: amount0Min,
                    sqrtPriceLimitX96: 0
                })
            );

        // call exactInputSingle for swapping token0 for token 1 in pool w/fee3
        uint256 amountOut1 =
            swapRouter.exactInputSingle(
                ISwapRouter.ExactInputSingleParams({
                    tokenIn: token0,
                    tokenOut: token1,
                    fee: decoded.poolFee3,
                    recipient: address(this),
                    deadline: block.timestamp + 200,
                    amountIn: decoded.amount0,
                    amountOutMinimum: amount1Min,
                    sqrtPriceLimitX96: 0
                })
            );

        // end up with amountOut0 of token0 from first swap and amountOut1 of token1 from second swap
        uint256 amount0Owed = LowGasSafeMath.add(decoded.amount0, fee0);
        uint256 amount1Owed = LowGasSafeMath.add(decoded.amount1, fee1);

        TransferHelper.safeApprove(token0, address(this), amount0Owed);
        TransferHelper.safeApprove(token1, address(this), amount1Owed);

        if (amount0Owed > 0) pay(token0, address(this), msg.sender, amount0Owed);
        if (amount1Owed > 0) pay(token1, address(this), msg.sender, amount1Owed);

        // if profitable pay profits to payer
        if (amountOut0 > amount0Owed) {
            uint256 profit0 = LowGasSafeMath.sub(amountOut0, amount0Owed);

            TransferHelper.safeApprove(token0, address(this), profit0);
            pay(token0, address(this), decoded.payer, profit0);
        }
        if (amountOut1 > amount1Owed) {
            uint256 profit1 = LowGasSafeMath.sub(amountOut1, amount1Owed);
            TransferHelper.safeApprove(token0, address(this), profit1);
            pay(token1, address(this), decoded.payer, profit1);
        }
    }
```
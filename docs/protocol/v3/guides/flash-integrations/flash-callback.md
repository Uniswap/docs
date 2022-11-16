---
id: flash-callback
title: The Flash Callback
sidebar_position: 3
---

## Setting Up The Callback

Here we will override the flash callback with our custom logic to execute the desired swaps and pay the profits to the original `msg.sender`.

Declare the `uniswapV3FlashCallback` function and override it.

```solidity
    function uniswapV3FlashCallback(
        uint256 fee0,
        uint256 fee1,
        bytes calldata data
    ) external override {
```

Declare a variable `decoded` in memory and assign it to the [**decoded data**](https://docs.soliditylang.org/en/v0.7.6/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions) previously encoded into the calldata.

```solidity
        FlashCallbackData memory decoded = abi.decode(data, (FlashCallbackData));
```

Each callback must be validated to verify that the call originated from a genuine V3 pool. Otherwise, the pool contract would be vulnerable to attack via an EOA manipulating the callback function.

```solidity
        CallbackValidation.verifyCallback(factory, decoded.poolKey);
```

Assign local variables of type `address` as `token0` and `token1` to approve the router to interact with the tokens from the flash.

```solidity
        address token0 = decoded.poolKey.token0;
        address token1 = decoded.poolKey.token1;

        TransferHelper.safeApprove(token0, address(swapRouter), decoded.amount0);
        TransferHelper.safeApprove(token1, address(swapRouter), decoded.amount1);
```

Code in a minimum amount out for both of the upcoming swaps, such that the following swaps will revert if we do not receive a profitable trade.

```solidity
        uint256 amount1Min = LowGasSafeMath.add(decoded.amount1, fee1);
        uint256 amount0Min = LowGasSafeMath.add(decoded.amount0, fee0);
```

## Initiating A Swap

Call the first of two swaps, calling `exactInputSingle` on the [**router interface**](https://docs.uniswap.org/reference/periphery/interfaces/ISwapRouter) contract. In this call, we are using the previously declared `amount0In` as the minimum amount out, and assigning the returned balance of the swap to `amountOut0`.

Most of These function arguments have already been discussed, except for two new introductions:

`sqrtPriceLimitX96`: This value limits the price that the swap can change the pool to. Remember that price is always expressed in the pool contract as `token1` in terms of `token0`. This is useful for circumstances where the user wants to swap _up until_ a specific price. For this example, we will set it to 0, which makes to make the argument inactive.

`deadline`: this is the timestamp after which the transaction will revert, to protect the transaction from dramatic changes in price environment that can happen if the transaction is pending for too long. For this example, we will set it far in the future for the sake of simplicity.

The first swap takes the `amount1` that we withdrew from the original pool, and passes that amount as the input amount for a single swap that trades a fixed input for the maximum amount of possible output. It calls this function on the pool determined by our previous token pair, but with the next fee tier in our list of three.

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

Populate the second of two swaps, this time with the last fee tier and with the `amount0` that we withdrew from the original pool.

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

## Paying back the pool

To pay the original pool back for the flash transaction, first calculate the balance due to it and approve the router to transfer the tokens in our contract back to the pool.

```solidity
uint256 amount0Owed = LowGasSafeMath.add(decoded.amount0, fee0);
uint256 amount1Owed = LowGasSafeMath.add(decoded.amount1, fee1);

TransferHelper.safeApprove(token0, address(this), amount0Owed);
TransferHelper.safeApprove(token1, address(this), amount1Owed);
```

If there is any balance due to the token, use simple logic to call [pay](https://docs.uniswap.org/reference/periphery/base/PeripheryPayments#pay). Remember that the callback function is being called by the pool itself, which is why we can call `pay` despite the function being marked `internal`.

```solidity
if (amount0Owed > 0) pay(token0, address(this), msg.sender, amount0Owed);
if (amount1Owed > 0) pay(token1, address(this), msg.sender, amount1Owed);
```

Send the profits to the `payer`: the original `msg.sender` of the `initFlash` function, which executed the flash transaction and in turn triggered the callback.

```solidity
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
```

# The full function

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

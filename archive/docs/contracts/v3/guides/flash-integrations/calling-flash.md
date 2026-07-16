---
id: calling-flash
title: Calling Flash
sidebar_position: 2
---

## Parameter Structs

In order to call `flash`, we will need the flash parameters for the initial call, as well as any parameters we want to pass through to the callback.

The `FlashParams` struct will contain the token addresses and amounts we wish to pull out of the pool, as well as the three fee tiers used to determine which pool we are withdrawing from, and which we will be swapping with.

```solidity
  struct FlashParams {
        address token0;
        address token1;
        uint24 fee1;
        uint256 amount0;
        uint256 amount1;
        uint24 fee2;
        uint24 fee3;
    }
```

The `FlashCallbackData` struct will contain the data we want to send to the callback. This includes `poolKey`, which expresses the sorted tokens with the matched fee tier, returned by the [**PoolAddress**](https://github.com/Uniswap/uniswap-v3-periphery/blob/main/contracts/libraries/PoolAddress.sol) library.

```solidity
    struct FlashCallbackData {
        uint256 amount0;
        uint256 amount1;
        address payer;
        PoolAddress.PoolKey poolKey;
        uint24 poolFee2;
        uint24 poolFee3;
    }
```

## Pool Key

Now we'll start our function by assigning the relevant parameters from the `Flashparams` (which we have declared in memory as `params`) to our variable `poolKey`

```solidity
    function initFlash(FlashParams memory params) external {
        PoolAddress.PoolKey memory poolKey =
            PoolAddress.PoolKey({token0: params.token0, token1: params.token1, fee: params.fee1});
    }
```

Next we will declare `pool` as type [**IUniswapV3Pool**], which allows us to call `flash` on our desired pool contract.

```solidity
        IUniswapV3Pool pool = IUniswapV3Pool(PoolAddress.computeAddress(factory, poolKey));
```

## Calling Flash

Finally, we call `flash` on our previously declared `pool`. In the last parameter, we abi.encode the `FlashCallbackData`, which will be decoded in the callback and used to inform the next steps of the transaction.

```solidity
        pool.flash(
            address(this),
            params.amount0,
            params.amount1,
            abi.encode(
                FlashCallbackData({
                    amount0: params.amount0,
                    amount1: params.amount1,
                    payer: msg.sender,
                    poolKey: poolKey,
                    poolFee2: params.fee2,
                    poolFee3: params.fee3
                })
            )
        );
```

The full function:

```solidity
    //fee1 is the fee of the pool from the initial borrow
    //fee2 is the fee of the first pool to arb from
    //fee3 is the fee of the second pool to arb from
    struct FlashParams {
        address token0;
        address token1;
        uint24 fee1;
        uint256 amount0;
        uint256 amount1;
        uint24 fee2;
        uint24 fee3;
    }

    // fee2 and fee3 are the two other fees associated with the two other pools of token0 and token1
    struct FlashCallbackData {
        uint256 amount0;
        uint256 amount1;
        address payer;
        PoolAddress.PoolKey poolKey;
        uint24 poolFee2;
        uint24 poolFee3;
    }

function initFlash(FlashParams memory params) external {
        PoolAddress.PoolKey memory poolKey =
            PoolAddress.PoolKey({token0: params.token0, token1: params.token1, fee: params.fee1});
        IUniswapV3Pool pool = IUniswapV3Pool(PoolAddress.computeAddress(factory, poolKey));
        pool.flash(
            address(this),
            params.amount0,
            params.amount1,
            abi.encode(
                FlashCallbackData({
                    amount0: params.amount0,
                    amount1: params.amount1,
                    payer: msg.sender,
                    poolKey: poolKey,
                    poolFee2: params.fee2,
                    poolFee3: params.fee3
                })
            )
        );
    }
```

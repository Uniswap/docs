Contains the math that uses square root of price as a Q64.96 and liquidity to compute deltas

## Functions

### getNextSqrtPriceFromAmount0RoundingUp

```solidity
  function getNextSqrtPriceFromAmount0RoundingUp(
    uint160 sqrtPX96,
    uint128 liquidity,
    uint256 amount,
    bool add
  ) internal pure returns (uint160)
```

Gets the next sqrt price given a delta of token0

Always rounds up, because in the exact output case (increasing price) we need to move the price at least
far enough to get the desired output amount, and in the exact input case (decreasing price) we need to move the
price less in order to not send too much output.
The most precise formula for this is *liquidity \* sqrtPX96 / (liquidity +- amount \* sqrtPX96)*,
if this is impossible because of overflow, we calculate *liquidity / (liquidity / sqrtPX96 +- amount)*.

#### Parameters:

| Name        | Type    | Description                                                     |
| :---------- | :------ | :-------------------------------------------------------------- |
| `sqrtPX96`  | uint160 | The starting price, i.e. before accounting for the token0 delta |
| `liquidity` | uint128 | The amount of usable liquidity                                  |
| `amount`    | uint256 | How much of token0 to add or remove from virtual reserves       |
| `add`       | bool    | Whether to add or remove the amount of token0                   |

#### Return Values:

| Type    | Description                                             |
| :------ | :------------------------------------------------------ |
| uint160 | price after adding or removing amount, depending on add |

### getNextSqrtPriceFromAmount1RoundingDown

```solidity
  function getNextSqrtPriceFromAmount1RoundingDown(
    uint160 sqrtPX96,
    uint128 liquidity,
    uint256 amount,
    bool add
  ) internal pure returns (uint160)
```

Gets the next sqrt price given a delta of token1

Always rounds down, because in the exact output case (decreasing price) we need to move the price at least
far enough to get the desired output amount, and in the exact input case (increasing price) we need to move the
price less in order to not send too much output.
The formula we compute is within \<1 wei of the lossless version: *sqrtPX96 +- amount / liquidity*

#### Parameters:

| Name        | Type    | Description                                                      |
| :---------- | :------ | :--------------------------------------------------------------- |
| `sqrtPX96`  | uint160 | The starting price, i.e., before accounting for the token1 delta |
| `liquidity` | uint128 | The amount of usable liquidity                                   |
| `amount`    | uint256 | How much of token1 to add, or remove, from virtual reserves      |
| `add`       | bool    | Whether to add, or remove, the amount of token1                  |

#### Return Values:

| Type    | Description                             |
| :------ | :-------------------------------------- |
| uint160 | price after adding or removing `amount` |

### getNextSqrtPriceFromInput

```solidity
  function getNextSqrtPriceFromInput(
    uint160 sqrtPX96,
    uint128 liquidity,
    uint256 amountIn,
    bool zeroForOne
  ) internal pure returns (uint160 sqrtQX96)
```

Gets the next sqrt price given an input amount of token0 or token1

Throws if price or liquidity are 0, or if the next price is out of bounds

#### Parameters:

| Name         | Type    | Description                                                      |
| :----------- | :------ | :--------------------------------------------------------------- |
| `sqrtPX96`   | uint160 | The starting price, i.e., before accounting for the input amount |
| `liquidity`  | uint128 | The amount of usable liquidity                                   |
| `amountIn`   | uint256 | How much of token0, or token1, is being swapped in               |
| `zeroForOne` | bool    | Whether the amount in is token0 or token1                        |

#### Return Values:

| Name       | Type    | Description                                                 |
| :--------- | :------ | :---------------------------------------------------------- |
| `sqrtQX96` | uint160 | The price after adding the input amount to token0 or token1 |

### getNextSqrtPriceFromOutput

```solidity
  function getNextSqrtPriceFromOutput(
    uint160 sqrtPX96,
    uint128 liquidity,
    uint256 amountOut,
    bool zeroForOne
  ) internal pure returns (uint160 sqrtQX96)
```

Gets the next sqrt price given an output amount of token0 or token1

Throws if price or liquidity are 0 or the next price is out of bounds

#### Parameters:

| Name         | Type    | Description                                                |
| :----------- | :------ | :--------------------------------------------------------- |
| `sqrtPX96`   | uint160 | The starting price before accounting for the output amount |
| `liquidity`  | uint128 | The amount of usable liquidity                             |
| `amountOut`  | uint256 | How much of token0, or token1, is being swapped out        |
| `zeroForOne` | bool    | Whether the amount out is token0 or token1                 |

#### Return Values:

| Name       | Type    | Description                                                    |
| :--------- | :------ | :------------------------------------------------------------- |
| `sqrtQX96` | uint160 | The price after removing the output amount of token0 or token1 |

### getAmount0Delta

```solidity
  function getAmount0Delta(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint128 liquidity,
    bool roundUp
  ) internal pure returns (uint256 amount0)
```

Gets the amount0 delta between two prices

Calculates *liquidity / sqrt(lower) - liquidity / sqrt(upper)*,
i.e. *liquidity \* (sqrt(upper) - sqrt(lower)) / (sqrt(upper) \* sqrt(lower))*

#### Parameters:

| Name            | Type    | Description                            |
| :-------------- | :------ | :------------------------------------- |
| `sqrtRatioAX96` | uint160 | A sqrt price                           |
| `sqrtRatioBX96` | uint160 | Another sqrt price                     |
| `liquidity`     | uint128 | The amount of usable liquidity         |
| `roundUp`       | bool    | Whether to round the amount up or down |

#### Return Values:

| Name      | Type    | Description                                                                                   |
| :-------- | :------ | :-------------------------------------------------------------------------------------------- |
| `amount0` | uint256 | Amount of token0 required to cover a position of size liquidity between the two passed prices |

### getAmount1Delta

```solidity
  function getAmount1Delta(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint128 liquidity,
    bool roundUp
  ) internal pure returns (uint256 amount1)
```

Gets the amount1 delta between two prices

Calculates *liquidity \* (sqrt(upper) - sqrt(lower))*

#### Parameters:

| Name            | Type    | Description                             |
| :-------------- | :------ | :-------------------------------------- |
| `sqrtRatioAX96` | uint160 | A sqrt price                            |
| `sqrtRatioBX96` | uint160 | Another sqrt price                      |
| `liquidity`     | uint128 | The amount of usable liquidity          |
| `roundUp`       | bool    | Whether to round the amount up, or down |

#### Return Values:

| Name      | Type    | Description                                                                                   |
| :-------- | :------ | :-------------------------------------------------------------------------------------------- |
| `amount1` | uint256 | Amount of token1 required to cover a position of size liquidity between the two passed prices |

### getAmount0Delta

```solidity
  function getAmount0Delta(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    int128 liquidity
  ) internal pure returns (int256 amount0)
```

Helper that gets signed token0 delta

#### Parameters:

| Name            | Type    | Description                                                    |
| :-------------- | :------ | :------------------------------------------------------------- |
| `sqrtRatioAX96` | uint160 | A sqrt price                                                   |
| `sqrtRatioBX96` | uint160 | Another sqrt price                                             |
| `liquidity`     | int128  | The change in liquidity for which to compute the amount0 delta |

#### Return Values:

| Name      | Type   | Description                                                                        |
| :-------- | :----- | :--------------------------------------------------------------------------------- |
| `amount0` | int256 | Amount of token0 corresponding to the passed liquidityDelta between the two prices |

### getAmount1Delta

```solidity
  function getAmount1Delta(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    int128 liquidity
  ) internal pure returns (int256 amount1)
```

Helper that gets signed token1 delta

#### Parameters:

| Name            | Type    | Description                                                    |
| :-------------- | :------ | :------------------------------------------------------------- |
| `sqrtRatioAX96` | uint160 | A sqrt price                                                   |
| `sqrtRatioBX96` | uint160 | Another sqrt price                                             |
| `liquidity`     | int128  | The change in liquidity for which to compute the amount1 delta |

#### Return Values:

| Name      | Type   | Description                                                                        |
| :-------- | :----- | :--------------------------------------------------------------------------------- |
| `amount1` | int256 | Amount of token1 corresponding to the passed liquidityDelta between the two prices |

# IQuoter
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/interfaces/IQuoter.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Supports quoting the delta amounts for exact input or exact output swaps.

For each pool also tells you the sqrt price of the pool after the swap.

*These functions are not marked view because they rely on calling non-view functions and reverting
to compute the result. They are also not gas efficient and should not be called on-chain.*


## Functions
### quoteExactInputSingle

Returns the delta amounts for a given exact input swap of a single pool


```solidity
function quoteExactInputSingle(QuoteExactSingleParams memory params)
    external
    returns (uint256 amountOut, uint256 gasEstimate);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`QuoteExactSingleParams`|The params for the quote, encoded as `QuoteExactSingleParams` poolKey The key for identifying a V4 pool zeroForOne If the swap is from currency0 to currency1 exactAmount The desired input amount hookData arbitrary hookData to pass into the associated hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The output quote for the exactIn swap|
|`gasEstimate`|`uint256`|Estimated gas units used for the swap|


### quoteExactInput

Returns the delta amounts along the swap path for a given exact input swap


```solidity
function quoteExactInput(QuoteExactParams memory params) external returns (uint256 amountOut, uint256 gasEstimate);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`QuoteExactParams`|the params for the quote, encoded as 'QuoteExactParams' currencyIn The input currency of the swap path The path of the swap encoded as PathKeys that contains currency, fee, tickSpacing, and hook info exactAmount The desired input amount|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The output quote for the exactIn swap|
|`gasEstimate`|`uint256`|Estimated gas units used for the swap|


### quoteExactOutputSingle

Returns the delta amounts for a given exact output swap of a single pool


```solidity
function quoteExactOutputSingle(QuoteExactSingleParams memory params)
    external
    returns (uint256 amountIn, uint256 gasEstimate);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`QuoteExactSingleParams`|The params for the quote, encoded as `QuoteExactSingleParams` poolKey The key for identifying a V4 pool zeroForOne If the swap is from currency0 to currency1 exactAmount The desired output amount hookData arbitrary hookData to pass into the associated hooks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|The input quote for the exactOut swap|
|`gasEstimate`|`uint256`|Estimated gas units used for the swap|


### quoteExactOutput

Returns the delta amounts along the swap path for a given exact output swap


```solidity
function quoteExactOutput(QuoteExactParams memory params) external returns (uint256 amountIn, uint256 gasEstimate);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`QuoteExactParams`|the params for the quote, encoded as 'QuoteExactParams' currencyOut The output currency of the swap path The path of the swap encoded as PathKeys that contains currency, fee, tickSpacing, and hook info exactAmount The desired output amount|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|The input quote for the exactOut swap|
|`gasEstimate`|`uint256`|Estimated gas units used for the swap|


## Structs
### QuoteExactSingleParams

```solidity
struct QuoteExactSingleParams {
    PoolKey poolKey;
    bool zeroForOne;
    uint128 exactAmount;
    bytes hookData;
}
```

### QuoteExactParams

```solidity
struct QuoteExactParams {
    Currency exactCurrency;
    PathKey[] path;
    uint128 exactAmount;
}
```


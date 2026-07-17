---
sidebar_position: 2
title: index.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/index.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/index.ts)

### exponentToBigDecimal()
```
Params:
 - decimals (BigInt): The power of ten to return.

ReturnType: BigDecimal
```
Returns the number `1` followed by `decimals` number of `0s` with type BigDecimal.  
It uses a for loop to iterate between `0` and `decimals` and multiplies the previous result by `10`. Thus, only positive values are possible.

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [ONE_BI](./constants.ts#one_bi)


#### Invoked at:
1. [tokenAmountToDecimal()](#tokenamounttodecimal)
2. [priceToDecimal()](#pricetodecimal)
3. [convertTokenToDecimal()](#converttokentodecimal)
4. [convertEthToDecimal](#convertethtodecimal)
5. [sqrtPriceX96ToTokenPrices](./pricing.ts#sqrtpricex96totokenprices)

### safeDiv()
```
Params:
 - amount0 (BigDecimal): Numerator for the division
 - amount1 (BigDecimal): Denominator for the division

ReturnType: BigDecimal
```
Return `0` if parameter `amount1` is equal to `ZERO_BD`. <br/>
Else returns the result of dividing `amount0` by `amount1` using `BigDecimal`'s `div()` method.

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)

#### Invoked at:
1. [bigDecimalExponated()](#bigdecimalexponated)
2. [priceToDecimal()](#pricetodecimal)
3. [createTick()](./tick.ts#createtick)

### bigDecimalExponated()
```
Params:
 - value (BigDecimal): value to be raised to a certain power
 - power (BigInt): the exponent of the value to be calculated

ReturnType: BigDecimal
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

If `power` is `ZERO_BI`, `ONE_BD` is returned. `value` is multipled by itself in a simple for loop executed `abs(power)` number of times. If the `power` is negative, uses `safeDiv` to divide `ONE_BD` with the result of the previous calculation. Returns the result in BigDecimal.

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [ZERO_BD](./constants.ts#zero_bd)
3. [ONE_BI](./constants.ts#one_bi)
4. [ONE_BD](./constants.ts#one_bd)
5. [safeDiv()](#safediv)

#### Invoked at:
1. [createTick()](./tick.ts#createtick)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Differs in logic to compute the exponent from other chains.
- Instead of looping and multiplying `value` through `power` loop iterations, performs [simple exponentiation by squaring](https://en.wikipedia.org/wiki/Exponentiation_by_squaring)

#### Additional Dependencies:
1. [TWO_BI](./constants.ts#two_bi)

</TabItem>
</Tabs>   

### tokenAmountToDecimal()
```
Params:
 - tokenAmount (BigDecimal): The amount of tokens to be divided (numerator)
 - exchangeDecimals (BigInt): The power of 10 to divide the amount with

ReturnType: BigDecimal
```
If exchangeDecimals is `ZERO_BI`, returns tokenAmount after converting to BigDecimal. Else divides the BigDecimal tokenAmount using 10 raised to `exchangeDecimals` as the denominator.

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [exponentToBigDecimal()](#exponenttobigdecimal)

#### Invoked at:
1. []

### priceToDecimal()
```
Params:
 - amount (BigDecimal): The amount to be divided (numerator)
 - exchangeDecimals (BigInt): The power of 10 to divide the amount with

ReturnType: BigDecimal
```
If `exchangeDecimals` is equal to `ZERO_BI` returns the amount as it is. Otherwise uses `safeDiv` to divide `amount` with `10^exchangeDecimals` in BigDecimals type.

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [safeDiv()](#safediv)
3. [exponentToBigDecimal()](#exponenttobigdecimal)

#### Invoked at:
1. 

### equalToZero()
```
Params:
 - value (BigDecimal): Value to check whether zero

ReturnType: boolean
```
Converts value to string and then to float. Compares it against ZERO_BD after converting to String and then parsing as float. Returns boolean value from comparing the equality of the two float values.

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)

#### Invoked at:
1. 

### isNullEthValue()
```
Params:
 - value (String) - Hex String to check for Null Eth value

ReturnType: boolean
```
Returns boolean value. True is value == '0x0000000000000000000000000000000000000000000000000000000000000001', else false.

#### Invoked at:
1. [fetchTokenSymbol()](./token.ts#fetchtokensymbol)
2. [fetchTokenName()](./token.ts#fetchtokenname)

### bigDecimalExp18()
```
ReturnType: BigDecimal
Value: 10^18
```

#### Invoked at:
1.

### convertTokenToDecimal()
```
Params:
 - tokenAmount (BigInt) - The amount of token value to be converted
 - exchangeDecimals (BigInt) - The positive power of the exponent to divide the tokenAmount with

ReturnType: BigDecimal
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

If exchangeDecimals is `ZERO_BI`, returns tokenAmount after converting to BigDecimal. Else divides the BigDecimal tokenAmount using 10 raised to `exchangeDecimals` as the denominator.

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [exponentToBigDecimal](#exponenttobigdecimal)

#### Invoked at:
1. [handleMint()](../mappings/core.ts#handlemint)
2. [handleBurn()](../mappings/core.ts#handleburn)
3. [handleSwap()](../mappings/core.ts#handleswap)
4. [handleIncreaseLiquidity()](../mappings/position-manager.ts#handleincreaseliquidity)
5. [handleDecreaseLiquidity()](../mappings/position-manager.ts#handledecreaseliquidity)
6. [handleCollect()](../mappings/position-manager.ts#handlecollect)

</TabItem>
<TabItem value="Optimism" label="Optimism">

#### Additionally Invoked At:
1. [populateEmptyPools()](./backfill.ts#populateemptypools)

</TabItem>
</Tabs>

### convertEthToDecimal()
```
Params:
 - eth (BigInt) - Int value representing ether amount in wei

ReturnType: BigDecimal
```
Converts the value of ether in wei from integer to big decimal representing amount in ether. It converts the eth parameter to BigDecimal and then divides it with 10^18 BigDecimal value.

#### Dependencies:
1. [exponentToBigDecimal](#exponenttobigdecimal)

#### Invoked at:
1.

### loadTransaction()
```
Params:
 - event (ethereum.Event) - Ethereum event emitted from the transaction to return.

ReturnType: Transaction
```
Returns a [Transaction](../../schemas/transaction.md) instance for the specified event. If a transaction instance doesn't already exit for the event, it's created and then returned. Uses `event.transaction.hash.toHexString()` to find the relevant transaction or to create a new transaction instance.
Uses `event` parameters `block.blockNumber`, `block.timestamp`, `transaction.gasUsed` and `transaction.gasPrice` to populate `transaction`'s fields.

#### Entites:
1. [Transaction](../../schemas/transaction.md) - Read/Create & Write

#### Invoked at:
1. [getPosition()](../mappings/position-manager.ts#getposition)
2. [savePositionSnapshot()](../mappings/position-manager.ts#savepositionsnapshot)
3. [handleMint()](../mappings/core.ts#handlemint)
4. [handleBurn()](../mappings/core.ts#handleburn)
5. [handleSwap()](../mappings/core.ts#handleswap)
---
sidebar_position: 4
title: pricing.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/pricing.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/pricing.ts)

### WETH_ADDRESS
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth Mainnet">

```
- type: string
- value: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
```
</TabItem>
<TabItem value="Polygon" label="Polygon">

```
- type: string
- value: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
```
</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-one">

```
- type: string
- value: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'
```
</TabItem>
<TabItem value="Optimism" label="Optimism">

```
- type: string
- value: '0x4200000000000000000000000000000000000006'
```
</TabItem>
</Tabs>
Address of wrapped-ETH (WETH) contract on ethereum mainnet.

#### Referenced at:
1. [WHITELIST_TOKENS](#whitelist_tokens)
2. [findEthPerToken()](#findethpertoken)

### USDC_WETH_03_POOL
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth-Mainnet">

```
- type: string
- value: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'
```

Address of Uniswap V3 pool contract between `USDC` and `WETH` `ERC-20` tokens on the specific chain.

#### Referenced at:
1. [getEthPriceInUSD](#getethpriceinusd)

</TabItem>
<TabItem value="Polygon" label="Polygon">

```
- type: string
- value: '0x0e44ceb592acfc5d3f09d996302eb4c499ff8c10'
```
</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-one">

```
- type: string
- value: '0x17c14d2c404d167802b16c450d3c99f88f2c4f4d'
```
</TabItem>
<TabItem value="Optimism" label="Optimism">

- Not present. Instead refer [DAI_WETH_03_POOL](#dai_weth_03_pool)

</TabItem>
</Tabs>

### DAI_WETH_03_POOL

<Tabs>
<TabItem value="Optimism" label="Optimism">

```
- type: string
- value: '0x03af20bdaaffb4cc0a521796a223f7d85e2aac31'
```

Address of Uniswap V3 pool contract between `DAI` and `WETH` `ERC-20` tokens on optimsim mainnet.

#### Referenced at:
1. [getEthPriceInUSD](#getethpriceinusd)

</TabItem>
<TabItem value="Other-Chains" label="Other-Chains">

- Not present. Instead refer [USDC_WETH_03_POOL](#usdc_weth_03_pool)

</TabItem>
</Tabs>


### WHITELIST_TOKENS
A list of tokens which have considerable usage and are likely to have pool pairing with other tokens. These can be used for calculating liquidity in USD by using the tokens price in USD.

The following token addresses are present in the list:

<Tabs>
    <TabItem value="Eth Mainnet" label="Eth-Mainnet">

|Symbol|Address|
|-|-|
|WETH|`WETH_ADDRESS`*|
|DAI|[0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)|
|USDC|[0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)|
|USDT|[0xdac17f958d2ee523a2206206994597c13d831ec7](https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7)|
|TUSD|[0x0000000000085d4780b73119b644ae5ecd22b376](https://etherscan.io/address/0x0000000000085d4780b73119b644ae5ecd22b376)|
|WBTC|[0x2260fac5e5542a773aa44fbcfedf7c193bc2c599](https://etherscan.io/address/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599)|
|cDAI|[0x5d3a536e4d6dbd6114cc1ead35777bab948e3643](https://etherscan.io/address/0x5d3a536e4d6dbd6114cc1ead35777bab948e3643)|
|cUSDC|[0x39aa39c021dfbae8fac545936693ac917d5e7563](https://etherscan.io/address/0x39aa39c021dfbae8fac545936693ac917d5e7563)|
|EBASE|[0x86fadb80d8d2cff3c3680819e4da99c10232ba0f](https://etherscan.io/address/0x86fadb80d8d2cff3c3680819e4da99c10232ba0f)|
|sUSD|[0x57ab1ec28d129707052df4df418d58a2d46d5f51](https://etherscan.io/address/0x57ab1ec28d129707052df4df418d58a2d46d5f51)|
|MKR|[0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)|
|COMP|[0xc00e94cb662c3520282e6f5717214004a7f26888](https://etherscan.io/address/0xc00e94cb662c3520282e6f5717214004a7f26888)|
|LINK|[0x514910771af9ca656af840dff83e8264ecf986ca](https://etherscan.io/address/0x514910771af9ca656af840dff83e8264ecf986ca)|
|SNX|[0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f](https://etherscan.io/address/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f)|
|YFI|[0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e](https://etherscan.io/address/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e)|
|1INCH|[0x111111111117dc0aa78b770fa6a738034120c302](https://etherscan.io/address/0x111111111117dc0aa78b770fa6a738034120c302)|
|yCurv|[0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8](https://etherscan.io/address/0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8)|
|FEI|[0x956f47f50a910163d8bf957cf5846d573e7f87ca](https://etherscan.io/address/0x956f47f50a910163d8bf957cf5846d573e7f87ca)|
|MATIC|[0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0](https://etherscan.io/address/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0)|
|AAVE|[0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9](https://etherscan.io/address/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9)|
|sETH2|[0xfe2e637202056d30016725477c5da089ab0a043a](https://etherscan.io/address/0xfe2e637202056d30016725477c5da089ab0a043a)|

#### Dependencies:
1. [WETH_ADDRESS](#weth_address)

#### Referenced at:
1. [getTrackedAmountUSD](#gettrackedamountusd)
2. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)

</TabItem>
<TabItem value="Polygon" label="Polygon">

|Symbol|Address|
|-|-|
|WETH|`WETH_ADDRESS`*|
|WMATIC|[0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270](https://polygonscan.com/address/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270)|
|USDC|[0x2791bca1f2de4661ed88a30c99a7a9449aa84174](https://polygonscan.com/address/0x2791bca1f2de4661ed88a30c99a7a9449aa84174)|
|DAI|[0x8f3cf7ad23cd3cadbd9735aff958023239c6a063](https://polygonscan.com/address/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063)|
</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-one">

|Symbol|Address|
|-|-|
|WETH|`WETH_ADDRESS`*|
|USDC|[0xff970a61a04b1ca14834a43f5de4533ebddb5cc8](https://arbiscan.io/address/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8)|
|DAI|[0xda10009cbd5d07dd0cecc66161fc93d7c9000da1](https://arbiscan.io/address/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1)|
|USDT|[0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9](https://arbiscan.io/address/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9)|
</TabItem>
<TabItem value="Optimism" label="Optimism">

|Symbol|Address|
|-|-|
|WETH|`WETH_ADDRESS`*|
|DAI|[0xda10009cbd5d07dd0cecc66161fc93d7c9000da1](https://optimistic.etherscan.io/address/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1)|
|OP|[0x4200000000000000000000000000000000000042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042)|
|USDC|[0x7f5c764cbc14f9669b88837ca1490cca17c31607](https://optimistic.etherscan.io/address/0x7f5c764cbc14f9669b88837ca1490cca17c31607)|
|PERP|[0x9e1028f5f1d5ede59748ffcee5532509976840e0](https://optimistic.etherscan.io/address/0x9e1028f5f1d5ede59748ffcee5532509976840e0)|
|LYRA|[0x50c5725949a6f0c72e6c4a641f24049a917db0cb](https://optimistic.etherscan.io/address/0x50c5725949a6f0c72e6c4a641f24049a917db0cb)|
|USDT|[0x94b008aa00579c1307b0ef2c499ad98a8ce58e58](https://optimistic.etherscan.io/address/0x94b008aa00579c1307b0ef2c499ad98a8ce58e58)|
|WBTC|[0x68f180fcce6836688e9084f035309e29bf0a2095](https://optimistic.etherscan.io/address/0x68f180fcce6836688e9084f035309e29bf0a2095)|

#### Additional Referenced at:
1. [populateEmptyPools()](./backfill.ts#populateemptypools)

</TabItem>
</Tabs>

\* -> The value is imported from a variable and listed directly in the list declaration.

### STABLE_COINS
A list of ERC20 token contract addresses which have stable coin prices, i.e., 1 token expected to be valued at 1 USD.
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth-Mainnet">

||Address|
|-|-|
|DAI|[0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)|
|USDC|[0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)|
|USDT|[0xdac17f958d2ee523a2206206994597c13d831ec7](https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7)|
|TUSD|[0x0000000000085d4780b73119b644ae5ecd22b376](https://etherscan.io/address/0x0000000000085d4780b73119b644ae5ecd22b376)|
|FEI|[0x956f47f50a910163d8bf957cf5846d573e7f87ca](https://etherscan.io/address/0x956f47f50a910163d8bf957cf5846d573e7f87ca)|
|PRINTS|[0x4dd28568d05f09b02220b09c2cb307bfd837cb95](https://etherscan.io/address/0x4dd28568d05f09b02220b09c2cb307bfd837cb95)|

#### Referenced at:
1. [findEthPertoken()](#findethpertoken)

</TabItem>
<TabItem value="Polygon" label="Polygon">

||Address|
|-|-|
|USDC|[0x2791bca1f2de4661ed88a30c99a7a9449aa84174](https://polygonscan.com/address/0x2791bca1f2de4661ed88a30c99a7a9449aa84174)|

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- `STABLE_COINS` is not defined for arbitrum-one subgraph.

</TabItem>
<TabItem value="Optimism" label="Optimism">

- `STABLE_COINS` is not defined for optimism subgraph.

</TabItem>
</Tabs>

### MINIMUM_ETH_LOCKED
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth-Mainnet">

```
 - type: BigDecimal
 - value: 60
```
While calculating token price in USD, the value of other token locked in the pool in terms of eth has to be greated than `MINIMUM_ETH_LOCKED`.

#### Referenced at:
1. [findEthPertoken()](#findethpertoken)

</TabItem>
<TabItem value="Polygon" label="Polygon">

```
 - type: BigDecimal
 - value: 5
```
</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-one">

```
 - type: BigDecimal
 - value: 4
```

#### Additionally Referenced at:
1. [getEthPriceInUSD()](#getethpriceinusd)

</TabItem>
<TabItem value="Optimism" label="Optimism">

```
 - type: BigDecimal
 - value: 10
```

</TabItem>
</Tabs>

### sqrtPriceX96ToTokenPrices()
```
Params:
 - sqrtPriceX96 (BigInt): The square root of the price of token1 in terms of token0 in Q64.96 format. Formula: sqrt(token0.price/token1.price)*(2^96)
 - token0 (Token): The first token in the pool pair to calculate the relative price for
 - token1 (Token): The second token in the pool pair to calculate the relative price for

ReturnType: BigDecimal[]
```
Find the price of `token0` and `token1` in the pool relative to each other and returns the two prices.

#### Formula:
```
    num = (sqrtPriceX96^2) # Squaring the root to get the price
    denom = 2^192 # To divide price by 96^2 to convert the Q64.96 number to BigDecimal
    price1 = ((num/denom) * (10^token0.decimals))/ (10^token1.decimals) # Calculating price1
    price0 = 1/price1
```

#### Dependencies:
1. [exponentToBigDecimal()](./index.ts#exponenttobigdecimal)
2. [safeDiv()](./index.ts#safediv)

#### Invoked at:
1. [handleSwap()](../mappings/core.ts#handleswap)


### getEthPriceInUSD()
```
Params: none

ReturnType: BigDecimal
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Returns the Price of ETH in terms of USD, based on the stable coin pools.
Currently, the `token0Price` for the `pool` represented by `USDC_WETH_03_POOL`. When `pool` entity is not found, returns `ZERO_BD`.

#### Entites:
1. [Pool](../../schemas/pool.md) - Read Entity

#### Dependencies:
1. [USDC_WETH_03_POOL](#usdc_weth_03_pool)
2. [ZERO_BD](./constants.ts#zero_bd)

#### Invoked at:
1. [handleInitialize()](../mappings/core.ts#handleinitialize)
2. [handleSwap()](../mappings/core.ts#handleSwap)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Logic same as mainnet, except returns `ZERO_BD` if eth locked is not greated than `MINIMUM_ETH_LOCKED`.

#### Additional Dependencies:
1. [MINIMUM_ETH_LOCKED](#minimum_eth_locked)

</TabItem>
<TabItem value="Optimism" label="Optimism">

- Uses [DAI_WETH_03_POOL](#dai_weth_03_pool) instead of USDC

#### Differing Dependencies:
1. [DAI_WETH_03_POOL](#dai_weth_03_pool)

</TabItem>
</Tabs>

### findEthPerToken()
```
Params:
 - token (Token): Token entity to find the price in terms of ETH

ReturnType: BigDecimal
```
<Tabs>
<TabItem value="Eth Mainnet, Polygon" label="Eth Mainnet, Polygon">

If token is weth, returns 1. If token in `STABLE_COINS`, returns `1/bundle.ethPriceUSD`.

Else, iterates over all the whitelisted pools for the token using `token.whitelistPools`. Finds the pool with largest liquidity value in terms of ETH, as long as the value is atleast `MINIMUM_ETH_LOCKED`. Uses the eth value of the paired token and relative token price between the token pair to find the `token`'s' value in terms of eth.
If there's no whitelisted pool with `MINIMUM_ETH_LOCKED`, returns `ZERO_BD`.

#### Entites:
1. [Bundle](../../schemas/bundle.md) - Read Entity
2. [Pool](../../schemas/pool.md) - Read Entity
3. [Token](../../schemas/token.md) - Read Entity

#### Dependencies:
1. [WETH_ADDRESS](#weth_address)
2. [ONE_BD](./constants.ts#one_bd)
3. [ZERO_BD](./constants.ts#zero_bd)
4. [STABLE_COINS](#stable_coins)
5. [MINIMUM_ETH_LOCKED](#minimum_eth_locked)

#### Invoked at:
1. [handleInitialize()](../mappings/core.ts#handleinitialize)
2. [handleSwap()](../mappings/core.ts#handleSwap)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">
- Doesn't check if token is present in `STABLE_COINS`. Rest of the logic is same as mainnet.
</TabItem>
</Tabs>

### getTrackedAmountUSD()
```
Params:
 - tokenAmount0 (BigDecimal):
 - token0 (Token0):
 - tokenAmount1 (BigDecimal):
 - token1 (Token):

ReturnType: BigDecimal
```
Returns the USD value equivalent to `tokenAmoun0` and `tokenAmount1` together. Calculates the USD price using `token.derviedEth*bundle.ethPriceUSD` as the multiplier if the token is present in `WHITELIST_TOKENS`. If both the tokens are present, it adds their individual USD prices. If only one is present, it uses 2X the value of that token. If neither are in the `WHITELIST_TOKENS` list, returns `ZERO_BD`.
#### Entites:
1. [Bundle](../../schemas/bundle.md) - Read Entity

#### Dependencies:
1. [WHITELIST_TOKENS](#whitelist_tokens)
2. [ZERO_BD](./constants.ts#zero_bd)

#### Invoked at:
1. [handleSwap()](../mappings/core.ts#handleSwap)


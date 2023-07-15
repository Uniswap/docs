---
sidebar_position: 5
title: staticTokenDefinition.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/staticTokenDefinition.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/staticTokenDefinition.ts)


## Class StaticTokenDefinition
A utility class to represent an `ERC20` token metadata. Contains four fields:

|Field|Type|
|-|-|
|address|Address|
|symbol|string|
|name|string|
|decimals|BigInt|

It has a constructor to initialized an object:
```
constructor(address: Address, symbol: string, name: string, decimals: BigInt)
```

The class exposes two static functions:
1. [getStaticDefinitions()](#getstaticdefinitions)
2. [fromAddress()](#fromaddress)

### getStaticDefinitions()
Returns an `Array<StaticTokenDefinition>` object with the token definitions defined with the function:

<Tabs>
<TabItem value="Other Chains" lable="Other-Chains">

|Address|Symbol|Name|Decimals|
|-|-|-|-|
|0xe0b7927c4af23765cb51314a0e0521a9645f0e2a|DGD|DGD|9|
|0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9|AAVE|Aave Token|18|
|0xeb9951021698b42e4399f9cbb6267aa35f82d59d|LIF|Lif|18|
|0xbdeb4b83251fb146687fa19d1c660f99411eefe3|SVD|savedroid|18|
|0xbb9bc244d798123fde783fcc1c72d3bb8c189413|TheDAO|TheDAO|16|
|0x38c6a68304cdefb9bec48bbfaaba5c5b47818bb2|HPB|HPBCoin|18|

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

|Address|Symbol|Name|Decimals|
|-|-|-|-|
|0x82af49447d8a07e3bd95bd0d56f35241523fbab1|WETH|Wrapped Ethereum|18|
|0xff970a61a04b1ca14834a43f5de4533ebddb5cc8|USDC|USD Coin|6|

</TabItem>
<TabItem value="Optimism" lable="Optimism">

|Address|Symbol|Name|Decimals|
|-|-|-|-|
|0x82af49447d8a07e3bd95bd0d56f35241523fbab1|WETH|Wrapped Ethereum|18|

</TabItem>
</Tabs>

#### Invoked at:
1. [fromAddress()](#fromaddress)

### fromAddress()
```
Params:
 - tokenAddress (Address): the ERC20 address to search for in the ERC20 symbols defined in StaticTokenDefinition class

ReturnType: StaticTokenDefinition | null
```
Get an Array of `StaticTokenDefinition` objects from static method getStaticDefinition() and iterates through them to find the `tokenAddress`, If found returns the `StaticTokenDefinition` object, else returns `null`.

#### Dependencies:
1. [getStaticDefinitions()](#getstaticdefinitions)

#### Invoked at:
1. [fetchTokenSymbol()](./token.ts#fetchtokensymbol)
2. [fetchTokenName()](./token.ts#fetchtokenname)
3. [fetchTokenDecimals()](./token.ts#fetchtokendecimals)

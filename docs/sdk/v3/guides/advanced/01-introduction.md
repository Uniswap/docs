---
id: introduction
title: Introduction
---

For some more advanced use cases, it is necessary to use multiple tools in the Uniswap toolchain.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
:::

The following examples use **ethersJS** and the **Uniswap V3 subgraph** hosted on The Graph's hosted service. To learn more about Uniswap's subgraphs, visit the [API](../../../../api/subgraph/overview.md) section.

We will take a deep dive into the Uniswap V3 protocol and use practical examples to understand the data stored by the Uniswap smart contracts.
We will explore how we can compute the available liquidity in a specific price range, visualize **liquidity density** in pools, use Uniswap as a **price oracle** and swap by creating **Range Orders**.

These guides are a bit longer than the previous ones and provide more theoretical background.

## Theoretical background

Some of the guides presented here require a bit of theoretical and mathematical background.
To get the most out of the advanced guides, we encourage you to take a step back and read a bit about the math and theories behind the Uniswap protocol.

The most complete source of information on the Uniswap protocol is the [Uniswap V3 book](https://uniswapv3book.com/).

Besides the [concepts](../../../../concepts/uniswap-protocol.md) section of the Docs, the [Uniswap V3 whitepaper](https://uniswap.org/whitepaper-v3.pdf) is a great introduction to the protocol.
If you haven't checked it out yet, it is probably more concise and easier to understand than you would expect.

### Datatypes in Solidity

Uniswap V3 pools make use of a number of Datatypes Solidity offers to efficiently store their state.
If you are not familiar with Solidity data types yet, it can help to take a look at the [Solidity language reference](https://docs.soliditylang.org/en/v0.8.7/types.html#).
For the following guides, it is beneficial to take a look at two of them, which  we will outline here.

Ticks are stored as a [mapping(int24 => Tick.Info)](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L93).
Solidity [mappings](https://docs.soliditylang.org/en/v0.8.7/types.html#mapping-types) are very similar to hash maps, such that we can access any Value with their key with just one read operation.
The [`Tick.Info`](https://github.com/Uniswap/v3-core/blob/main/contracts/libraries/Tick.sol#L17) stores the values of the Tick that we need to work with the Pool:

```solidity
struct Info {
        // the total position liquidity that references this tick
        uint128 liquidityGross;
        // amount of net liquidity added (subtracted) when tick is crossed from left to right (right to left),
        int128 liquidityNet;
        // fee growth per unit of liquidity on the _other_ side of this tick (relative to the current tick)
        // only has relative meaning, not absolute — the value depends on when the tick is initialized
        uint256 feeGrowthOutside0X128;
        uint256 feeGrowthOutside1X128;
        // the cumulative tick value on the other side of the tick
        int56 tickCumulativeOutside;
        // the seconds per unit of liquidity on the _other_ side of this tick (relative to the current tick)
        // only has relative meaning, not absolute — the value depends on when the tick is initialized
        uint160 secondsPerLiquidityOutsideX128;
        // the seconds spent on the other side of the tick (relative to the current tick)
        // only has relative meaning, not absolute — the value depends on when the tick is initialized
        uint32 secondsOutside;
        // true iff the tick is initialized, i.e. the value is exactly equivalent to the expression liquidityGross != 0
        // these 8 bits are set to prevent fresh sstores when crossing newly initialized ticks
        bool initialized;
    }
```

We will use most of these values in the following guides.

In our case, we can access any `Tick.Info` value stored in the pool by its `int24` key.
The key of the Tick is usually called its *index*.
Mappings are not iterable, so if we are trying to fetch all the Ticks stored in a Pool, we can't just iterate over the mapping.
Instead, we have to know the keys (indices) of the mapping, we will explore how to do that in the [Pool data guide](./02-pool-data.md).

The second Solidity datatype we need to understand are normal unsigned [Integers](https://docs.soliditylang.org/en/v0.8.7/types.html#integers).
Solidity supports unsigned integer sizes between `uint8` and `uint256`, which are 8 and 256 bits long respectively.

Let's take a look at the `tickBitmap` function of a V3 Pool:

```solidity
  function tickBitmap(
      int16 wordPosition
  ) external view returns (uint256)
```

Similar to the tick mapping, the tickBitmap is a mapping of type [mapping(int16 => uint256)](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L95).

Let's look at the WETH/USDC pool with LOW fee on [Etherscan](https://etherscan.io/address/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640#readContract).
If we call the `tickBitmap` function with the input `0` we get the following response (at the time of writing):

<img src={require('./images/tickBitmap-etherscan.png').default} alt="TickBitmapEtherscan" box-shadow="none"/>

The `uint256` return value is interpreted as the representation of a decimal number by Etherscan.
The actual raw return value are 256 bits, that look something like this:

```raw
0x0000 ... lots of zeros and ones ... 000000110000000000
```

We interpret this string of zeros and ones not as the representation of a number, but rather as 256 booleans.

If the value of a position in the value is 1, the Tick at this position is **initialized**, meaning it holds a value.

With this trick, V3 Pools allow us to fetch the status of **256 ticks** with one call.
We will go into more details on how to calculate the tick indices from the tickBitmaps we fetch in the following guides.

## History of Uniswap

To get a better understanding of the V3 protocol, it can also be beneficial to understand the **history of decentralized exchanges** and the Uniswap protocol since it was founded in 2018.
You can read more about the older versions of Uniswap in the [V1](https://hackmd.io/@HaydenAdams/HJ9jLsfTz?type=view#Swaps-vs-Transfers) and [V2](https://uniswap.org/whitepaper.pdf) whitepapers, as well as the [V1](../../../../contracts/v1/overview.md) and [V2](../../../../contracts/v2/overview.md) section in the contract section.

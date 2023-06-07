---
id: active-liquidity
title: Active Liquidity
---

## Introduction

This guide will cover how to fetch and compute the active liquidity in the specific tick ranges of a pool. It is based on the [Liquidity Density example](https://github.com/Uniswap/examples/tree/main/v3-sdk/liquidity-density) and can be seen used in production, albeit in a more sophisticated way, in the [Uniswap Analytics](https://info.uniswap.org/#/pools) website.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this guide, we will use the Tick data we fetched from the V3 subgraph in the previous guide and compute the active liquidity our Pool can use at each tick. We then use `recharts` to draw a chart that visualizes our Pool's liqudity density.

This guide will cover:

1. Getting the tickSpacing and currently active Tick from the Pool
2. Calculating active liquidity from net liquidity
3. Drawing a chart from the tick data

This guide will not cover:

- Specifics of working with the recharts library. You can read more about that [here](https://recharts.org/en-US/).

At the end of the guide, we should be able to visualize the liquidity of any V3 Pool.

## Understanding Active Liquidity

To visualize the distribution of active liquidity in our Pool, we want to draw our Chart around the currently active Tick. For that we have to first understand:

- What is an initialized Tick?
- What is the current Tick?

### Initialized Ticks

When providing liquidity for a pool, the LP decides the **price range** in which the liquidity should be provided, and the amount of liquidity to be provided.
The pool understands the position as **liquidity between the lower and upper tick**. The Tick Index in this context is a representation of the price between the Pool's assets.
Looking at this [visualization](https://www.desmos.com/calculator/oduetjzfp4) of multiple positions in a V3 Pool, we can see that the liquidity available for a swap does not change inside a position, but when crossing into the next position.
This is what the **Initialized Ticks** of a Pool represent - they are a representation of the start or end of one or more positions.

<img src={require('./images/liquidityNetComparison.png').default} alt="LiquidityNet1" box-shadow="none"/>

When entering or leaving a position, its liquidity is added or correspondingly removed from the active liquidity available for a Swap. The initialized Ticks store this change in available liquidity in the `liquidityNet` field.
The change is always stored in relation to the currently active tick - the current price. When the price crosses an initialized Tick, it gets updated and liqudity that was previously added when crossing the Tick would now be removed and vice versa.

We already fetched the initialized ticks of our Pool in the [previous guide](./02-pool-data.md). The format we got from the Graph is:

```typescript
interface GraphTick {
  tickIdx: string
  liquidityGross: string
  liquidityNet: string
}
```

### Current Tick

The current Tick of the Pool represents the price after the last swap. Considering that the initialized Ticks only represent positions, we see that it is not necessarily one of the initialized Ticks but can be at any point in between them.
The active liqudity at the current Price is also stored in the smart contract - we already fetched it with the slot0 function.

### Tickspacing

Only the ticks with indices that are dividable by the tickspacing of a Pool are initializable. The Tickspacing of the Pool is dependent on the Fee Tier. Pools with lower fees are meant to be used for more stable Token Pairs and allow for more granularity in where LPs position their liquidity. We can get the `tickSpacing`from our pool:

```typescript
const tickSpacing = pool.tickSpacing
```

### Putting it all together

For the purpose of visualizing the liquidity density of the Pool, it rarely makes sense to display the full Tick Range of the Pool, as the vast majority of liquidity will be focused in a narrow price range.

Instead, we will display a sensible number of ticks around the current price.

## Calculating active liquidity

We know the spacing between ticks and the Initialized Ticks where active liquidity changes. All we have to do is start calculating from the current Tick and iterate outwards.
To draw our chart we want a data structure that looks something like this:

```typescript

interface TickProcessed {
    tickIdx: number,
    liquidityActive: JSBI,
    liquidityNet: JSBI,
    price0: string,
    price1: string,
    isCurrent: boolean
}
```

To access the initialized Ticks directly from their Tick Index, we store them in a [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type):

```typescript
const tickIdxToTickDictionary: Record<string, GraphTick> = Object.fromEntries(
    ticks.map((graphTick) => [graphTick.tickIdx, graphTick])
  ) 
```

The ticks variable in this code snippet is the response we got from the V3 Subgraph.

We want to mark the Tick closest to the current Price and we want to be able to display the prices at a Tick to the user.
We calculate the **initializable Tick** closest to the current price and create the active Tick that we start from:

```typescript
import { tickToPrice } from '@uniswap/v3-sdk'

const activeTickIdx = Math.floor(pool.tickCurrent / tickSpacing) * tickSpacing

const activeTickProcessed: TickProcessed = {
    tickIdx: activeTickIdx,
    liquidityActive: pool.liquidity,
    liquidityNet: JSBI.BigInt(0),
    price0: tickToPrice(tokenA, tokenB, activeTickIdx).toFixed(6),
    price1: tickToPrice(tokenB, tokenA, activeTickIdx).toFixed(6),
    isCurrent: true
}
```

Here we also calculate the price of the tokens from the tickIdx, the `v3-sdk` exports a handy utility function for that. 
We store it as a string as we won't make any further calculations in this example.
If the active Tick is initialized, we also need to set the liquidityNet to correctly handle moving out of the position:

```typescript
const currentTickInitialized = tickIdxToTickDictionary[activeTickIdx]
if (currentTickInitialized !== undefined) {
    activeTickProcessed.liquidityNet = JSBI.BigInt(currentTickInitialized.liquidityNet)
}
```

We now start iterating outwards from the active Tick and compute the active liquidity for each Tick we want to display. The processed Tick is then saved in an Array of `TickProcessed`.
We choose an arbitrary number of ticks we want to display, for this example we calculate 100 Ticks in each direction.

```typescript
import { TickMath } from '@uniswap/v3-sdk'

let previousTickProcessed = {
    ...activeTickProcessed
}

processedTicks: TickProcessed[] = []

for (let i = 0; i < 100; i++) {
    const currentTickIdx = previousTickProcessed.tickIdx + tickSpacing

    if (currentTickIdx > TickMath.MAX_TICK) {
        break
    }

    const currentTickProcessed = {
        liquidityActive: previousTickProcessed.liquidityActive,
        tickIdx: currentTickIdx,
        liquidityNet: JSBI.BigInt(0),
        price0: tickToPrice(token0, token1, currentTickIdx),
        price1: tickToPrice(token1, token0, currentTickIdx),
        isActive: false
    }
    
    ...
}
```

We calculate one Tick at a time, and we need to make sure our Tick stays inside the possible price range.
Again, we check if our current Tick is initialized and if so, recalculate the active liquidity:

```typescript
for (let i = 0; i < 100; i++) {

    ...

    const currentTickInitialized = tickIdxToTickDictionary[currentTickIdx]

    if (currentTickInitialized !== undefined) {
        currentTickProcessed.liquidityNet = JSBI.BigInt(currentTickInitialized.liquidityNet)
        currentTickProcessed.liquidityActive = JSBI.add(
            previousTickProcessed.liquidityActive,
            JSBI.BigInt(currentTickInitialized.liquidityNet)
        )
    }

    processedTicks.push(currentTickProcessed)
    previousTickProcessed = currentTickProcessed
}
```

After we are done calculating the next 100 Ticks after the current Tick, we iterate in the opposite direction for the previous Ticks. Iterating downwards, we need to subtract the net liquidity where we added it when iterating upwards.
You can find a full code example in the [Uniswap Example repository](https://github.com/Uniswap/examples/tree/main/v3-sdk/active-liquidity).
We are finally able to combine the previous, active and subsequent ticks:

```typescript
const allProcessedTicks = previousTicks.concat(activeTickProcessed).concat(subsequentTicks)
```

## Drawing the Chart

We are done with our calculations and move on to displaying the data. **Recharts** is not able to handle JSBI, so we need to convert the Array we created to a format it can handle:

```typescript
const chartTicks: TicksChart[] = allProcessedTicks.map((tickProcessed) => {
    return {...processedTick, liquidityActiveChart: parseFloat(tickProcessed.liquidityActive.toString())}
})
```

The loss of precision will not be visually noticeable in the chart and we are still able to display the exact number in a Tooltip if we wish to.
Finally, we draw the Chart:

```jsx
<ResponsiveContainer width="80%" height={400}>
    <BarChart>
        <XAxis />
        <YAxis />
        <Bar dataKey="liquidityActiveChart" fill="#2172E5">
            {chartTicks.map((entry, index) => {
                return (
                <Cell
                   key={`cell-${index}`}
                   fill={entry.isActive ? '#F51E87' : '#2172E5'}
                />
                )
            })}
        </Bar>
    </BarChart>
</ResponsiveContainer>
```

In a real application, you will probably want to format the chart properly and display additional information for users.
Check out the full [code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/active-liquidity) to this guide and the official recharts [documentation](https://recharts.org/).

You can also take a look at the [Uniswap Info](https://github.com/Uniswap/v3-info) repository to see a similar chart used in production.

## Next Steps

Now that you are familiar with liquidity data, consider checking out our next guide on using Uniswap as a Price Oracle.
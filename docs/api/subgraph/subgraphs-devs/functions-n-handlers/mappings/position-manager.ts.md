---
sidebar_position: 3
title: position-manager.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::danger File Missing
The complete file is missing for arbitrum-one
:::

path: [`/src/mappings/position-manager.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/mappings/position-manager.ts)

### getPosition()
```
Params:
 - event (ethereum.Event): An event from the NFT Position Manager contract
 - tokenId (BigInt): NFT Id for the staked position

ReturnType: Position | null
```
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth Mainnet">

- Returns a `Position` entity for the given `tokenId` if found.
- If not found, retrieves a position by directly querying the `NonfungiblePositionManager` contract using the ABI. Invokes `factoryContract.getPool()` and passing it the `position`'s parameters `token0`, `token1` and `fee` to find the `pool` contract address.
- Then creates a new position entity for the tokenId and set the metadata properties using `position` read earlier from the `NonfungiblePositionManager` contract. Sets the metrics to `ZERO_BD`. 

:::info No Position for same Block Mint and burn
In certain scenarios, the position is minted and burnt within the same block. The contract call to NonfungiblePositionManager to retrieve position data reverts in such scenarios as the position no longer exists.
:::

#### Entities
1. [Position](../../schemas/position) - Read/Create Without Saving

#### ABI Dependencies:
1. NonfungiblePositionManager.json

#### Dependencies:
1. [factoryContract](../utils/constants.ts#factorycontract)
2. [ZERO_BI](../utils/constants.ts#zero_bi)
3. [ZERO_BD](../utils/constants.ts#zero_bd)
4. [ADDRESS_ZERO](../utils/constants.ts#address_zero)
5. [loadTransaction()](../utils/index.ts#loadtransaction)

#### Invoked at:
1. [handleIncreaseLiquidity()](#handleincreaseliquidity)
2. [handleDecreaseLiquidity()](#handledecreaaseliquidity)
3. [handleCollect()](#handlecollect)
4. [handleTransfer()](#handletransfer)

</TabItem>
<TabItem value="Polygon, Optimism" label="Polygon, Optimism">
In addition to mainnet:

- initializes `position.collectedToken0` and `position.collectedToken1` values.

</TabItem>
</Tabs>

### updateFeeVars()
```
Params:
 - position (Position): The position for which the fee variables are set
 - event (ethereum.Event): An event from the NFT Position Manager contract
 - tokenId (BigInt): NFT Id for the staked position

ReturnType: Position
```
- Updates the fields `position.feeGrowthInside0LastX128` and `position.feeGrowthInside1LastX128` for the position represented by `tokenId` by reading the value from the `NonfungiblePositionManager` triggering the `event`.

#### Entities
1. [Position](../../schemas/position) - Update Fields Without Saving

#### ABI Dependencies:
1. NonfungiblePositionManager.json

#### Invoked at:
1. [handleIncreaseLiquidity()](#handleincreaseliquidity)
2. [handleDecreaseLiquidity()](#handledecreaaseliquidity)
3. [handleCollect()](#handlecollect)

### savePositionSnapshot()
```
Params:
 - position (Position): Position entity for which the current state is saved as a snapshot
 - event (ethereum.Event): NonfungiblePositionManager Contract event after which the snapshot is being saved

ReturnType: void
```
- Saves the current values of a `Position` entity for future reference, including liquidity, tokens deposited and withdrawn, fee collected, feeGrowthInside.

#### Entities
1. [PositionSnapshot()](../../schemas/positionsnapshot) - Create

#### Dependencies:
1. [loadTransaction()](../utils/index.ts#loadtransaction)

#### Invoked at:
1. [handleIncreaseLiquidity()](#handleincreaseliquidity)
2. [handleDecreaseLiquidity()](#handledecreaaseliquidity)
3. [handleCollect()](#handlecollect)
4. [handleTransfer()](#handletransfer)

### handleIncreaseLiquidity()
```
Params:
 - event (IncreaseLiquidity): Entity for a IncreaseLiquidity event emitted by NonfungiblePositionManager Contract

ReturnType: void
```
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth Mainnet">

:::info Ignored Blocks and Addresses
 - Block 14317993 is ignored by the function.
 - Pool address 0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248 (MULAN-USDT) is ignored by the function.
:::

- Fetches the position entity using `getPosition()`, passing `event.params.tokenId` and `event` as parameters.
- Updates fields `position.liquidity`, `position.depositedToken0` and `position.depositedToken1`.
- Triggers `updateFeeVars()` and `savePositionSnapshot()`

#### Entities
1. [Position](../../schemas/position) - Write
2. [Token](../../schemas/token) - Read

#### Dependencies:
1. [getPosition()](#getposition)
2. [convertTokenToDecimal()](../utils/index.ts#converttokentodecimal)
3. [updateFeeVars()](#updatefeevars)
4. [savePositionSnapshot()](#savepositionsnapshot)

#### Invoked at:
1. [IncreaseLiquidity Event (Handler)](../../events)

</TabItem>
<TabItem value="Polygon" label="Polygon">

Follows most of the logic of mainnet except the following points:

- No blocks ingored like mainnet.
- Updates field `position.amountDepositedUSD` by deriving `amount0` and `amount1` in their respective USD priced using `bundle.ethPriceUSD` and `token.derivedETH`.

#### Additional Entities Referenced
1. [Bundle](../../schemas/bundle) - Read

</TabItem>
<TabItem value="Optimism" label="Optimism">

Follows most of the logic of mainnet except the following points:

- No blocks ingored like mainnet.
- Returns without any changes if token0 or token1 entities are null.

#### Additional Entities Referenced
1. [Bundle](../../schemas/bundle) - Read

</TabItem>
</Tabs>

### handleDecreaseLiquidity()
```
Params:
 - event (DecreaseLiquidity): Entity for a DecreaseLiquidity event emitted by NonfungiblePositionManager Contract

ReturnType: void
```
<Tabs>
    <TabItem value="Eth Mainnet" label="Eth Mainnet">

:::info Ignored Blocks and Addresses
 - Block 14317993 is ignored by the function.
 - Pool address 0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248 (MULAN-USDT) is ignored by the function.
:::

- Fetches the position entity using `getPosition()`, passing `event.params.tokenId` and `event` as parameters.
- Updates fields `position.liquidity`, `position.withdrawnToken0` and `position.withdrawnToken1`.
- Triggers `updateFeeVars()` and `savePositionSnapshot()`

#### Entities
1. [Position](../../schemas/position) - Write
2. [Token](../../schemas/token) - Read

#### Dependencies:
1. [getPosition()](#getposition)
2. [convertTokenToDecimal()](../utils/index.ts#converttokentodecimal)
3. [updateFeeVars()](#updatefeevars)
4. [savePositionSnapshot()](#savepositionsnapshot)

#### Invoked at:
1. [DecreaseLiquidity Event (Handler)](../../events)

</TabItem>
<TabItem value="Polygon" label="Polygon">

Follows most of the logic of mainnet except the following points:

- No blocks ingored like mainnet
- Updates field `position.netWithdrawnUSD` by deriving `amount0` and `amount1` in their respective USD priced using `bundle.ethPriceUSD` and `token.derivedETH`.

#### Additional Entities
1. [Bundle](../../schemas/bundle) - Read

</TabItem>
<TabItem value="Optimism" label="Optimism">

Follows most of the logic of mainnet except the following points:

- No blocks ingored like mainnet.
- Returns without any changes if token0 or token1 entities are null.

#### Additional Entities Referenced
1. [Bundle](../../schemas/bundle) - Read

</TabItem>
</Tabs>

### handleCollect()
```
Params:
 - event (Collect): Entity for a Collect event emitted by NonfungiblePositionManager Contract

ReturnType: void
```
:::info Ignored Addresses
 - Pool address 0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248 (MULAN-USDT) is ignored by the function.
:::

<Tabs>
    <TabItem value="Eth Mainnet" label="Eth Mainnet">

- Fetches the position entity using `getPosition()`, passing `event.params.tokenId` and `event` as parameters.
- Updates fields `position.collectedFeesToken0` and `position.collectedFeesToken1` by adding the `event.params.amount0` after adjusting it with `token.decimals`.
- Triggers `updateFeeVars()` and `savePositionSnapshot()`

:::danger Incorrect Collected Fees Token1 amount
`event.params.amount0` (adjusted with `token0.decimals`) is added to both `position.collectedFeesToken0` and `position.collectedFeesToken1`. This logic needs to be validated.
:::

#### Entities
1. [Position](../../schemas/position) - Write
2. [Token](../../schemas/token) - Read

#### Dependencies:
1. [getPosition()](#getposition)
2. [convertTokenToDecimal()](../utils/index.ts#converttokentodecimal)
3. [updateFeeVars()](#updatefeevars)
4. [savePositionSnapshot()](#savepositionsnapshot)

#### Invoked at:
1. [Collect Event (Handler)](../../events)

</TabItem>
<TabItem value="Polygon" label="Polygon">

Differs from mainnet at the following areas:
- Updates fields `position.collectedToken0` and `position.collectedToken1` by adding the `event.params.amount0` and `event.params.amount1` after adjusting them with `token.decimals`.
- Updates fields `position.collectedFeesToken0` and `position.collectedFeesToken1` by subtracting `position.withdrawnToken` from `position.collectedToken`.
- Updates field `position.amountCollectedUSD` by deriving `amount0` and `amount1` in their respective USD priced using `bundle.ethPriceUSD` and `token.derivedETH` and adding to the existing value.

#### Additional Entities
1. [Bundle](../../schemas/bundle) - Read

</TabItem>
<TabItem value="Optimism" label="Optimism">

Differs from mainnet at the following areas:
- Returns without any changes if token0 or token1 entities are null.
- Updates fields `position.collectedToken0` and `position.collectedToken1` by adding the `event.params.amount0` and `event.params.amount1` after adjusting them with `token.decimals`.
- Updates fields `position.collectedFeesToken0` and `position.collectedFeesToken1` by subtracting `position.withdrawnToken` from `position.collectedToken`.

#### Additional Entities Referenced
1. [Bundle](../../schemas/bundle) - Read

</TabItem>

</Tabs>

### handleTransfer()
```
Params:
 - event (Transfer): Entity for a Transfer event emitted by NonfungiblePositionManager Contract

ReturnType: void
```
- Fetches the position entity using `getPosition()`, passing `event.params.tokenId` and `event` as parameters.
- Sets `position.owner` with `event.params.to`.
- Triggers `savePositionSnapshot()`.

#### Entities
1. [Position](../../schemas/position) - Write

#### Dependencies:
1. [getPosition()](#getposition)
2. [savePositionSnapshot()](#savepositionsnapshot)

#### Invoked at:
1. [Transfer Event (Handler)](../../events)

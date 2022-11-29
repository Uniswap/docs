[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3PoolProvider

# Class: V3PoolProvider

Provider or getting V3 pools.

**`Export`**

**`Interface`**

IV3PoolProvider

## Implements

- [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

## Table of contents

### Constructors

- [constructor](V3PoolProvider.md#constructor)

### Properties

- [POOL\_ADDRESS\_CACHE](V3PoolProvider.md#pool_address_cache)
- [chainId](V3PoolProvider.md#chainid)
- [multicall2Provider](V3PoolProvider.md#multicall2provider)
- [retryOptions](V3PoolProvider.md#retryoptions)

### Methods

- [getPoolAddress](V3PoolProvider.md#getpooladdress)
- [getPools](V3PoolProvider.md#getpools)
- [getPoolsData](V3PoolProvider.md#getpoolsdata)

## Constructors

### constructor

• **new V3PoolProvider**(`chainId`, `multicall2Provider`, `retryOptions?`)

Creates an instance of V3PoolProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `multicall2Provider` | [`IMulticallProvider`](IMulticallProvider.md)<`any`\> | The multicall provider to use to get the pools. |
| `retryOptions` | `Options` | The retry options for each call to the multicall. |

#### Defined in

[src/providers/v3/pool-provider.ts:84](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L84)

## Properties

### POOL\_ADDRESS\_CACHE

• `Private` **POOL\_ADDRESS\_CACHE**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/providers/v3/pool-provider.ts:76](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L76)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/v3/pool-provider.ts:85](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L85)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`IMulticallProvider`](IMulticallProvider.md)<`any`\>

The multicall provider to use to get the pools.

#### Defined in

[src/providers/v3/pool-provider.ts:86](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L86)

___

### retryOptions

• `Protected` **retryOptions**: `Options`

The retry options for each call to the multicall.

#### Defined in

[src/providers/v3/pool-provider.ts:87](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L87)

## Methods

### getPoolAddress

▸ **getPoolAddress**(`tokenA`, `tokenB`, `feeAmount`): `Object`

Gets the pool address for the specified token pair and fee tier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenA` | `Token` | Token A in the pool. |
| `tokenB` | `Token` | Token B in the pool. |
| `feeAmount` | `FeeAmount` | The fee amount of the pool. |

#### Returns

`Object`

The pool address and the two tokens.

| Name | Type |
| :------ | :------ |
| `poolAddress` | `string` |
| `token0` | `Token` |
| `token1` | `Token` |

#### Implementation of

[IV3PoolProvider](../interfaces/IV3PoolProvider.md).[getPoolAddress](../interfaces/IV3PoolProvider.md#getpooladdress)

#### Defined in

[src/providers/v3/pool-provider.ts:211](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L211)

___

### getPools

▸ **getPools**(`tokenPairs`, `providerConfig?`): `Promise`<[`V3PoolAccessor`](../modules.md#v3poolaccessor)\>

Gets the specified pools.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenPairs` | [`Token`, `Token`, `FeeAmount`][] | The token pairs and fee amount of the pools to get. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`V3PoolAccessor`](../modules.md#v3poolaccessor)\>

A pool accessor with methods for accessing the pools.

#### Implementation of

[IV3PoolProvider](../interfaces/IV3PoolProvider.md).[getPools](../interfaces/IV3PoolProvider.md#getpools)

#### Defined in

[src/providers/v3/pool-provider.ts:94](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L94)

___

### getPoolsData

▸ `Private` **getPoolsData**<`TReturn`\>(`poolAddresses`, `functionName`, `providerConfig?`): `Promise`<[`Result`](../modules.md#result)<`TReturn`\>[]\>

#### Type parameters

| Name |
| :------ |
| `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolAddresses` | `string`[] |
| `functionName` | `string` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`TReturn`\>[]\>

#### Defined in

[src/providers/v3/pool-provider.ts:240](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L240)

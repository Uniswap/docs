[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2PoolProvider

# Class: V2PoolProvider

Provider for getting V2 pools.

**`Export`**

**`Interface`**

IV2PoolProvider

## Implements

- [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md)

## Table of contents

### Constructors

- [constructor](V2PoolProvider.md#constructor)

### Properties

- [POOL\_ADDRESS\_CACHE](V2PoolProvider.md#pool_address_cache)
- [chainId](V2PoolProvider.md#chainid)
- [multicall2Provider](V2PoolProvider.md#multicall2provider)
- [retryOptions](V2PoolProvider.md#retryoptions)

### Methods

- [getPoolAddress](V2PoolProvider.md#getpooladdress)
- [getPools](V2PoolProvider.md#getpools)
- [getPoolsData](V2PoolProvider.md#getpoolsdata)

## Constructors

### constructor

• **new V2PoolProvider**(`chainId`, `multicall2Provider`, `retryOptions?`)

Creates an instance of V2PoolProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `multicall2Provider` | [`IMulticallProvider`](IMulticallProvider.md)<`any`\> | The multicall provider to use to get the pools. |
| `retryOptions` | `Options` | The retry options for each call to the multicall. |

#### Defined in

[src/providers/v2/pool-provider.ts:71](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L71)

## Properties

### POOL\_ADDRESS\_CACHE

• `Private` **POOL\_ADDRESS\_CACHE**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/providers/v2/pool-provider.ts:63](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L63)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/v2/pool-provider.ts:72](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L72)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`IMulticallProvider`](IMulticallProvider.md)<`any`\>

The multicall provider to use to get the pools.

#### Defined in

[src/providers/v2/pool-provider.ts:73](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L73)

___

### retryOptions

• `Protected` **retryOptions**: `Options`

The retry options for each call to the multicall.

#### Defined in

[src/providers/v2/pool-provider.ts:74](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L74)

## Methods

### getPoolAddress

▸ **getPoolAddress**(`tokenA`, `tokenB`): `Object`

Gets the pool address for the specified token pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenA` | `Token` | Token A in the pool. |
| `tokenB` | `Token` | Token B in the pool. |

#### Returns

`Object`

The pool address and the two tokens.

| Name | Type |
| :------ | :------ |
| `poolAddress` | `string` |
| `token0` | `Token` |
| `token1` | `Token` |

#### Implementation of

[IV2PoolProvider](../interfaces/IV2PoolProvider.md).[getPoolAddress](../interfaces/IV2PoolProvider.md#getpooladdress)

#### Defined in

[src/providers/v2/pool-provider.ts:178](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L178)

___

### getPools

▸ **getPools**(`tokenPairs`, `providerConfig?`): `Promise`<[`V2PoolAccessor`](../modules.md#v2poolaccessor)\>

Gets the pools for the specified token pairs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenPairs` | [`Token`, `Token`][] | The token pairs to get. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`V2PoolAccessor`](../modules.md#v2poolaccessor)\>

A pool accessor with methods for accessing the pools.

#### Implementation of

[IV2PoolProvider](../interfaces/IV2PoolProvider.md).[getPools](../interfaces/IV2PoolProvider.md#getpools)

#### Defined in

[src/providers/v2/pool-provider.ts:81](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L81)

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

[src/providers/v2/pool-provider.ts:201](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L201)

[@uniswap/v4-sdk](../overview.md) / V4PositionManager

Defined in: [PositionManager.ts:206](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L206)

## Properties

### INTERFACE

> `static` **INTERFACE**: `Interface`

Defined in: [PositionManager.ts:207](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L207)

## Methods

### addCallParameters()

> `static` **addCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/MethodParameters.md)

Defined in: [PositionManager.ts:224](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L224)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `position` | [`Position`](Position.md) |
| `options` | [`AddLiquidityOptions`](../overview.md#addliquidityoptions) |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

***

### collectCallParameters()

> `static` **collectCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/MethodParameters.md)

Defined in: [PositionManager.ts:387](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L387)

Produces the calldata for collecting fees from a position

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `position` | [`Position`](Position.md) | The position to collect fees from |
| `options` | [`CollectOptions`](../overview.md#collectoptions) | Additional information necessary for generating the calldata |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

The call parameters

***

### createCallParameters()

> `static` **createCallParameters**(`poolKey`, `sqrtPriceX96`): [`MethodParameters`](../interfaces/MethodParameters.md)

Defined in: [PositionManager.ts:217](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L217)

Public methods to encode method parameters for different actions on the PositionManager contract

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `poolKey` | [`PoolKey`](../overview.md#poolkey) |
| `sqrtPriceX96` | `BigintIsh` |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

***

### encodeERC721Permit()

> `static` **encodeERC721Permit**(`spender`, `tokenId`, `deadline`, `nonce`, `signature`): `string`

Defined in: [PositionManager.ts:435](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L435)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spender` | `string` |
| `tokenId` | `BigintIsh` |
| `deadline` | `BigintIsh` |
| `nonce` | `BigintIsh` |
| `signature` | `string` |

#### Returns

`string`

***

### encodeModifyLiquidities()

> `static` **encodeModifyLiquidities**(`unlockData`, `deadline`): `string`

Defined in: [PositionManager.ts:421](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L421)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `unlockData` | `string` |
| `deadline` | `BigintIsh` |

#### Returns

`string`

***

### encodePermitBatch()

> `static` **encodePermitBatch**(`owner`, `permitBatch`, `signature`): `string`

Defined in: [PositionManager.ts:426](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L426)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `owner` | `string` |
| `permitBatch` | [`AllowanceTransferPermitBatch`](../interfaces/AllowanceTransferPermitBatch.md) |
| `signature` | `string` |

#### Returns

`string`

***

### getPermitData()

> `static` **getPermitData**(`permit`, `positionManagerAddress`, `chainId`): [`NFTPermitData`](../interfaces/NFTPermitData.md)

Defined in: [PositionManager.ts:452](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L452)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `permit` | [`NFTPermitValues`](../interfaces/NFTPermitValues.md) |
| `positionManagerAddress` | `string` |
| `chainId` | `number` |

#### Returns

[`NFTPermitData`](../interfaces/NFTPermitData.md)

***

### removeCallParameters()

> `static` **removeCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/MethodParameters.md)

Defined in: [PositionManager.ts:314](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L314)

Produces the calldata for completely or partially exiting a position

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `position` | [`Position`](Position.md) | The position to exit |
| `options` | [`RemoveLiquidityOptions`](../overview.md#removeliquidityoptions) | Additional information necessary for generating the calldata |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

The call parameters

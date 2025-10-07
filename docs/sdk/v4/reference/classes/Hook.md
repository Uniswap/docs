[@uniswap/v4-sdk](../overview.md) / Hook

Defined in: [utils/hook.ts:40](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L40)

## Constructors

### new Hook()

> **new Hook**(): [`Hook`](Hook.md)

#### Returns

[`Hook`](Hook.md)

## Methods

### hasDonatePermissions()

> `static` **hasDonatePermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:91](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L91)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`boolean`

***

### hasInitializePermissions()

> `static` **hasInitializePermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:66](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L66)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`boolean`

***

### hasLiquidityPermissions()

> `static` **hasLiquidityPermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:74](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L74)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`boolean`

***

### hasPermission()

> `static` **hasPermission**(`address`, `hookOption`): `boolean`

Defined in: [utils/hook.ts:61](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `hookOption` | [`HookOptions`](../enumerations/HookOptions.md) |

#### Returns

`boolean`

***

### hasSwapPermissions()

> `static` **hasSwapPermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:85](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L85)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`boolean`

***

### permissions()

> `static` **permissions**(`address`): [`HookPermissions`](../overview.md#hookpermissions)

Defined in: [utils/hook.ts:41](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

[`HookPermissions`](../overview.md#hookpermissions)

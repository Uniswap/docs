[@uniswap/v4-sdk](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk) / Hook

# Class: Hook

Defined in: [utils/hook.ts:40](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L40)

## Constructors

### new Hook()

> **new Hook**(): [`Hook`](Hook.md)

#### Returns

[`Hook`](Hook.md)

## Methods

### hasDonatePermissions()

> `static` **hasDonatePermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:91](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L91)

#### Parameters

##### address

`string`

#### Returns

`boolean`

---

### hasInitializePermissions()

> `static` **hasInitializePermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:66](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L66)

#### Parameters

##### address

`string`

#### Returns

`boolean`

---

### hasLiquidityPermissions()

> `static` **hasLiquidityPermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:74](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L74)

#### Parameters

##### address

`string`

#### Returns

`boolean`

---

### hasPermission()

> `static` **hasPermission**(`address`, `hookOption`): `boolean`

Defined in: [utils/hook.ts:61](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L61)

#### Parameters

##### address

`string`

##### hookOption

[`HookOptions`](../enums/HookOptions.md)

#### Returns

`boolean`

---

### hasSwapPermissions()

> `static` **hasSwapPermissions**(`address`): `boolean`

Defined in: [utils/hook.ts:85](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L85)

#### Parameters

##### address

`string`

#### Returns

`boolean`

---

### permissions()

> `static` **permissions**(`address`): [`HookPermissions`](../typeAliases/HookPermissions.md)

Defined in: [utils/hook.ts:41](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/hook.ts#L41)

#### Parameters

##### address

`string`

#### Returns

[`HookPermissions`](../typeAliases/HookPermissions.md)

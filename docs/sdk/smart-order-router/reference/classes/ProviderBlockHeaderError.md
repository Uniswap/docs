[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ProviderBlockHeaderError

# Class: ProviderBlockHeaderError

## Hierarchy

- `Error`

  ↳ **`ProviderBlockHeaderError`**

## Table of contents

### Constructors

- [constructor](ProviderBlockHeaderError.md#constructor)

### Properties

- [message](ProviderBlockHeaderError.md#message)
- [name](ProviderBlockHeaderError.md#name)
- [stack](ProviderBlockHeaderError.md#stack)
- [prepareStackTrace](ProviderBlockHeaderError.md#preparestacktrace)
- [stackTraceLimit](ProviderBlockHeaderError.md#stacktracelimit)

### Methods

- [captureStackTrace](ProviderBlockHeaderError.md#capturestacktrace)

## Constructors

### constructor

• **new ProviderBlockHeaderError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1059

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string` = `'ProviderBlockHeaderError'`

#### Overrides

Error.name

#### Defined in

[src/providers/on-chain-quote-provider.ts:61](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L61)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4

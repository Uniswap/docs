[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ProviderTimeoutError

# Class: ProviderTimeoutError

## Hierarchy

- `Error`

  ↳ **`ProviderTimeoutError`**

## Table of contents

### Constructors

- [constructor](ProviderTimeoutError.md#constructor)

### Properties

- [message](ProviderTimeoutError.md#message)
- [name](ProviderTimeoutError.md#name)
- [stack](ProviderTimeoutError.md#stack)
- [prepareStackTrace](ProviderTimeoutError.md#preparestacktrace)
- [stackTraceLimit](ProviderTimeoutError.md#stacktracelimit)

### Methods

- [captureStackTrace](ProviderTimeoutError.md#capturestacktrace)

## Constructors

### constructor

• **new ProviderTimeoutError**(`message?`)

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

• **name**: `string` = `'ProviderTimeoutError'`

#### Overrides

Error.name

#### Defined in

[src/providers/on-chain-quote-provider.ts:65](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L65)

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

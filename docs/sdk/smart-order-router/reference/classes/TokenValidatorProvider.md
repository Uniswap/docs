[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / TokenValidatorProvider

# Class: TokenValidatorProvider

Provider for getting token data.

**`Export`**

**`Interface`**

ITokenValidatorProvider

## Implements

- [`ITokenValidatorProvider`](../interfaces/ITokenValidatorProvider.md)

## Table of contents

### Constructors

- [constructor](TokenValidatorProvider.md#constructor)

### Properties

- [BASES](TokenValidatorProvider.md#bases)
- [allowList](TokenValidatorProvider.md#allowlist)
- [amountToFlashBorrow](TokenValidatorProvider.md#amounttoflashborrow)
- [chainId](TokenValidatorProvider.md#chainid)
- [gasLimitPerCall](TokenValidatorProvider.md#gaslimitpercall)
- [multicall2Provider](TokenValidatorProvider.md#multicall2provider)
- [tokenValidationCache](TokenValidatorProvider.md#tokenvalidationcache)
- [tokenValidatorAddress](TokenValidatorProvider.md#tokenvalidatoraddress)

### Methods

- [CACHE\_KEY](TokenValidatorProvider.md#cache_key)
- [validateTokens](TokenValidatorProvider.md#validatetokens)

## Constructors

### constructor

• **new TokenValidatorProvider**(`chainId`, `multicall2Provider`, `tokenValidationCache`, `tokenValidatorAddress?`, `gasLimitPerCall?`, `amountToFlashBorrow?`, `allowList?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `multicall2Provider` | [`IMulticallProvider`](IMulticallProvider.md)<`any`\> | `undefined` |
| `tokenValidationCache` | [`ICache`](../interfaces/ICache.md)<[`TokenValidationResult`](../enums/TokenValidationResult.md)\> | `undefined` |
| `tokenValidatorAddress` | `string` | `TOKEN_VALIDATOR_ADDRESS` |
| `gasLimitPerCall` | `number` | `GAS_LIMIT_PER_VALIDATE` |
| `amountToFlashBorrow` | `string` | `AMOUNT_TO_FLASH_BORROW` |
| `allowList` | `Set`<`string`\> | `DEFAULT_ALLOWLIST` |

#### Defined in

[src/providers/token-validator-provider.ts:56](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L56)

## Properties

### BASES

• `Private` **BASES**: `string`[]

#### Defined in

[src/providers/token-validator-provider.ts:54](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L54)

___

### allowList

• `Private` **allowList**: `Set`<`string`\> = `DEFAULT_ALLOWLIST`

#### Defined in

[src/providers/token-validator-provider.ts:63](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L63)

___

### amountToFlashBorrow

• `Private` **amountToFlashBorrow**: `string` = `AMOUNT_TO_FLASH_BORROW`

#### Defined in

[src/providers/token-validator-provider.ts:62](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L62)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/token-validator-provider.ts:57](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L57)

___

### gasLimitPerCall

• `Private` **gasLimitPerCall**: `number` = `GAS_LIMIT_PER_VALIDATE`

#### Defined in

[src/providers/token-validator-provider.ts:61](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L61)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`IMulticallProvider`](IMulticallProvider.md)<`any`\>

#### Defined in

[src/providers/token-validator-provider.ts:58](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L58)

___

### tokenValidationCache

• `Private` **tokenValidationCache**: [`ICache`](../interfaces/ICache.md)<[`TokenValidationResult`](../enums/TokenValidationResult.md)\>

#### Defined in

[src/providers/token-validator-provider.ts:59](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L59)

___

### tokenValidatorAddress

• `Private` **tokenValidatorAddress**: `string` = `TOKEN_VALIDATOR_ADDRESS`

#### Defined in

[src/providers/token-validator-provider.ts:60](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L60)

## Methods

### CACHE\_KEY

▸ `Private` **CACHE_KEY**(`chainId`, `address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[src/providers/token-validator-provider.ts:51](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L51)

___

### validateTokens

▸ **validateTokens**(`tokens`, `providerConfig?`): `Promise`<[`TokenValidationResults`](../interfaces/TokenValidationResults.md)\>

Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `Token`[] | - |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`TokenValidationResults`](../interfaces/TokenValidationResults.md)\>

A token accessor with methods for accessing the tokens.

#### Implementation of

[ITokenValidatorProvider](../interfaces/ITokenValidatorProvider.md).[validateTokens](../interfaces/ITokenValidatorProvider.md#validatetokens)

#### Defined in

[src/providers/token-validator-provider.ts:68](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L68)

[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ITokenValidatorProvider

# Interface: ITokenValidatorProvider

Provider for getting token data.

**`Export`**

**`Interface`**

ITokenValidatorProvider

## Implemented by

- [`TokenValidatorProvider`](../classes/TokenValidatorProvider.md)

## Table of contents

### Methods

- [validateTokens](ITokenValidatorProvider.md#validatetokens)

## Methods

### validateTokens

▸ **validateTokens**(`tokens`, `providerConfig?`): `Promise`<[`TokenValidationResults`](TokenValidationResults.md)\>

Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `Token`[] | - |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`TokenValidationResults`](TokenValidationResults.md)\>

A token accessor with methods for accessing the tokens.

#### Defined in

[src/providers/token-validator-provider.ts:44](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-validator-provider.ts#L44)

[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / SafeTransferOptions

# Interface: SafeTransferOptions

## Table of contents

### Properties

- [data](SafeTransferOptions.md#data)
- [recipient](SafeTransferOptions.md#recipient)
- [sender](SafeTransferOptions.md#sender)
- [tokenId](SafeTransferOptions.md#tokenid)

## Properties

### data

• `Optional` **data**: `string`

The optional parameter that passes data to the `onERC721Received` call for the staker

#### Defined in

[nonfungiblePositionManager.ts:97](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L97)

___

### recipient

• **recipient**: `string`

The account that should receive the NFT.

#### Defined in

[nonfungiblePositionManager.ts:88](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L88)

___

### sender

• **sender**: `string`

The account sending the NFT.

#### Defined in

[nonfungiblePositionManager.ts:83](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L83)

___

### tokenId

• **tokenId**: `BigintIsh`

The id of the token being sent.

#### Defined in

[nonfungiblePositionManager.ts:93](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L93)

---
id: command-inputs
title: Command Inputs
sidebar_position: 2
---

| Command | Value                                                                               |
| :------ | :---------------------------------------------------------------------------------- |
| `0x00`  | [`V3_SWAP_EXACT_IN`](./02-command-inputs.md#v3_swap_exact_in)                       |
| `0x01`  | [`V3_SWAP_EXACT_OUT`](./02-command-inputs.md#v3_swap_exact_out)                     |
| `0x02`  | [`PERMIT2_TRANSFER_FROM`](./02-command-inputs.md#permit2_transfer_from)             |
| `0x03`  | [`PERMIT2_PERMIT_BATCH`](./02-command-inputs.md#permit2_permit_batch)               |
| `0x04`  | [`SWEEP`](./02-command-inputs.md#sweep)                                             |
| `0x05`  | [`TRANSFER`](./02-command-inputs.md#transfer)                                       |
| `0x06`  | [`PAY_PORTION`](./02-command-inputs.md#pay_portion)                                 |
| `0x07`  |                                                                                     |
| `0x08`  | [`V2_SWAP_EXACT_IN`](./02-command-inputs.md#v2_swap_exact_in)                       |
| `0x09`  | [`V2_SWAP_EXACT_OUT`](./02-command-inputs.md#v2_swap_exact_out)                     |
| `0x0a`  | [`PERMIT2_PERMIT`](./02-command-inputs.md#permit2_permit)                           |
| `0x0b`  | [`WRAP_ETH`](./02-command-inputs.md#wrap_eth)                                       |
| `0x0c`  | [`UNWRAP_WETH`](./02-command-inputs.md#unwrap_eth)                                  |
| `0x0d`  | [`PERMIT2_TRANSFER_FROM_BATCH`](./02-command-inputs.md#permit2_transfer_from_batch) |
| `0x0e`  |                                                                                     |
| `0x0f`  |                                                                                     |
| `0x10`  | [`SEAPORT`](./02-command-inputs.md#seaport)                                         |
| `0x11`  | [`LOOKS_RARE_721`](./02-command-inputs.md#looks_rare_721)                           |
| `0x12`  | [`NFTX`](./02-command-inputs.md#nftx)                                               |
| `0x13`  | [`CRYPTOPUNKS`](./02-command-inputs.md#cryptopunks)                                 |
| `0x14`  | [`LOOKS_RARE_1155`](./02-command-inputs.md#looks_rare_1155)                         |
| `0x15`  | [`OWNER_CHECK_721`](./02-command-inputs.md#owner_check_721)                         |
| `0x16`  | [`OWNER_CHECK_1155`](./02-command-inputs.md#owner_check_1155)                       |
| `0x17`  | [`SWEEP_ERC721`](./02-command-inputs.md#sweep_erc721)                               |
| `0x18`  | [`X2Y2_721`](./02-command-inputs.md#x2y2_721)                                       |
| `0x19`  | [`SUDOSWAP`](./02-command-inputs.md#sudoswap)                                       |
| `0x1a`  | [`NFT20`](./02-command-inputs.md#nft20)                                             |
| `0x1b`  | [`X2Y2_1155`](./02-command-inputs.md#x2y2_1155)                                     |
| `0x1c`  | [`FOUNDATION`](./02-command-inputs.md#foundation)                                   |
| `0x1d`  | [`SWEEP_ERC1155`](./02-command-inputs.md#sweep_erc1155)                             |
| `0x1e`  |                                                                                     |
| `0x1f`  |                                                                                     |

### `V3_SWAP_EXACT_IN`

- `address` The recipient of the output of the trade
- `uint256` The amount of input tokens for the trade
- `uint256` The minimum amount of output tokens the user wants
- `bytes` The UniswapV3 encoded path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### `V3_SWAP_EXACT_OUT`

- `address` The recipient of the output of the trade
- `uint256` The amount of output tokens to receive
- `uint256` The maximum number of input tokens that should be spent
- `bytes` The UniswapV3 encoded path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### `PERMIT2_TRANSFER_FROM`

- `address` The token to fetch from Permit2
- `address` The recipient of the tokens fetched
- `uint256` The amount of token to fetch

The individual that the tokens are fetched from is always the `msg.sender` of the transaction

### `PERMIT2_PERMIT_BATCH`

- `IAllowanceTransfer.PermitBatch` A `PermitBatch` struct outlining all of the Permit2 permits to execute.
- `bytes` The signature to provide to Permit2

The individual that signed the permits must be the `msg.sender` of the transaction

### `SWEEP`

- `address` The ERC20 token to sweep (or Constants.ETH for ETH)
- `address` The recipient of the sweep
- `uint256` The minimum required tokens to receive from the sweep

### `TRANSFER`

- `address` The ERC20 token to transfer (or Constants.ETH for ETH)
- `address` The recipient of the transfer
- `uint256` The amount to transfer

### `PAY_PORTION`

- `address` The ERC20 token to transfer (or Constants.ETH for ETH)
- `address` The recipient of the transfer
- `uint256` In basis points, the percentage of the contract’s balance to transfer

### `V2_SWAP_EXACT_IN`

- `address` The recipient of the output of the trade
- `uint256` The amount of input tokens for the trade
- `uint256` The minimum amount of output tokens the user wants
- `address[]` The UniswapV2 token path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### `V2_SWAP_EXACT_OUT`

- `address` The recipient of the output of the trade
- `uint256` The amount of output tokens to receive
- `uint256` The maximum number of input tokens that should be spent
- `address[]` The UniswapV2 token path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### `PERMIT2_PERMIT`

- `IAllowanceTransfer.PermitSingle` A `PermitSingle` struct outlining the Permit2 permit to execute
- `bytes` The signature to provide to Permit2

The individual that signed the permit must be the `msg.sender` of the transaction

### `WRAP_ETH`

- `address` The recipient of the WETH
- `uint256` The amount of ETH to wrap

### `UNWRAP_ETH`

- `address` The recipient of the ETH
- `uint256` The minimum required ETH to receive from the unwrapping

### `PERMIT2_TRANSFER_FROM_BATCH`

- `IAllowanceTransfer.AllowanceTransferDetails[]` An array of `AllowanceTransferDetails` structs that each describe a Permit2 transfer to perform

### `SEAPORT`

- `uint256` The ETH value to forward to the Seaport contract
- `bytes` The calldata to use to call the Seaport contract

### `LOOKS_RARE_721`

- `uint256` The ETH value to forward to the LooksRare contract
- `bytes` The calldata to use to call the LooksRare contract
- `address` The recipient of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### `NFTX`

- `uint256` The ETH value to forward to the NFTX contract
- `bytes` The calldata to use to call the NFTX contract

### `CRYPTOPUNKS`

- `uint256` The PunkID to purchase
- `address` The recipient for the cryptopunk
- `uint256` The ETH value to forward to the Cryptopunks contract

### `LOOKS_RARE_1155`

- `uint256` The ETH value to forward to the LooksRare contract
- `bytes` The calldata to use to call the LooksRare contract
- `address` The recipient of the ERC1155
- `address` The ERC1155 token address
- `uint256` The ID of the ERC1155
- `uint256` The amount of the ERC1155 to transfer

### `OWNER_CHECK_721`

- `address` The required owner of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### `OWNER_CHECK_1155`

- `address` The required owner of the ERC1155
- `address` The ERC721 token address
- `uint256` The ID of the ERC1155
- `uint256` The minimum required amount of the ERC1155

### `SWEEP_ERC721`

- `address` The ERC721 token address to transfer
- `address` The recipient of the transfer
- `uint256` The token ID to transfer

### `X2Y2_721`

- `uint256` The ETH value to forward to the X2Y2 contract
- `bytes` The calldata to use to call the X2Y2 contract
- `address` The recipient of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### `SUDOSWAP`

- `uint256` The ETH value to forward to the Sudoswap contract
- `bytes` The calldata to use to call the Sudoswap contract

### `NFT20`

- `uint256` The ETH value to forward to the NFT20 contract
- `bytes` The calldata to use to call the NFT20 contract

### `X2Y2_1155`

- `uint256` The ETH value to forward to the X2Y2 contract
- `bytes` The calldata to use to call the X2Y2 contract
- `address` The recipient of the ERC1155
- `address` The ERC1155 token address
- `uint256` The ID of the ERC1155
- `uint256` The amount of the ERC1155 to transfer

### `FOUNDATION`

- `uint256` The ETH value to forward to the Foundation contract
- `bytes` The calldata to use to call the Foundation contract
- `address` The recipient of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### `SWEEP_ERC1155`

- `address` The ERC1155 token address to sweep
- `address` The recipient of the sweep
- `uint256` The token ID to sweep
- `uint256` The minimum required tokens to receive from the sweep
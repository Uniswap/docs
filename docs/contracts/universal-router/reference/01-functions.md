---
id: functions
title: Functions
sidebar_position: 1
---


Transactions to the `UniversalRouter` all go through the `UniversalRouter.execute` functions:

- `execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline)`
- `execute(bytes calldata commands, bytes[] calldata inputs)`

The first of these functions adds the functionality to allow transactions to have a transaction deadline. If the `block.timestamp` is after the `deadline` provided the transaction will revert. After that check, the 2 functions otherwise execute identically.

The `execute` functions work like a simplified VM - they take in a list of commands, and a list of inputs for the commands and execute them in the order specified.

## Command Structure 

The first parameter for the function (`bytes calldata commands`) is a list of commands for the contract to execute, in the order they should be executed. Each command is encoded in 1 byte, containing the following split of 8 bits:

| 0  | 1 2 | 3 4 5 6 7 |
| :- | :-- | :-------- |
| f  | r   | command   |

### `f` 
A single bit flag, that signals whether or not the command should be allowed to revert without the whole transaction failing.
 - If `f` is `0` aka `false` and the command reverts, then the entire transaction will revert and none of the commands will be executed.
 - If `f` is `1` aka `true` and the command reverts, then the transaction will continue, allowing us to achieve partial fills. If using this flag, be careful to include further commands that will remove any funds that could be left unused in the `UniversalRouter` contract.

### `r` 
2 unused bytes, reserved for future use. Leaving these 2 bits as `0` will save gas, but any value passed into the contract will be ignored. Later versions of the `UniversalRouter` will likely expand the 5 bits used for `command` to use at least 1 of these bits.

### `command` 
A 5 bit unique identifier for the command that should be carried out. The values of these commands can be found within [Commands.sol](https://github.com/Uniswap/universal-router/blob/main/contracts/libraries/Commands.sol), or can be viewed in the table below.
    
The command types that are not defined do not have an assigned command at this moment in time. Providing one of these identifiers will cause the transaction to revert with `InvalidCommandType`.

For a complete list of commands, see [Available Commands](./01-functions.md#available-commands).

## Command Inputs

The second parameter for the function is an array of bytes strings. Each element in the array is the abi-encoded input that will be used for the respective command.

`commands[i]` is the command that will use `inputs[i]` as its encoded input parameters.

The router uses the command type to know how to decode the encoded input parameters - depending on the command chosen, the required inputs is different.

The input parameters required for each command are outlined in [Command Inputs](./02-command-inputs.md).

## Available Commands

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

### Example: Reverting Commands

For a Sudoswap command, that should be *allowed to revert*, the following 8 bit command should be provided:

```markdown
command = 0x80 (10000000) && 0x19 (00011001) = 0x99 (10011001)
```

Take care when working with reverting commands - ensure you have appended commands to deal with funds that could remain in the contract after either outcomes. For example, if the Sudoswap command reverts, a following `SWEEP` can be added to ensure that any ETH that was not spent does not get left in the router.
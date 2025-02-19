---
id: technical-reference
title: Technical Reference
sidebar_position: 1
---

## Functions

Transactions to the `UniversalRouter` all go through the `UniversalRouter.execute` functions:

- `execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline)`
- `execute(bytes calldata commands, bytes[] calldata inputs)`

The first of these functions adds the functionality to allow transactions to have a transaction deadline. If the `block.timestamp` is after the `deadline` provided the transaction will revert. After that check, the 2 functions otherwise execute identically.

The `execute` functions work like a simplified VM - they take in a list of commands, and a list of inputs for the commands and execute them in the order specified.

## Command Structure

The first parameter for the function (`bytes calldata commands`) is a list of commands for the contract to execute, in the order they should be executed. Each command is encoded in 1 byte, containing the following split of 8 bits:

| 0   | 1 2 | 3 4 5 6 7 |
| :-- | :-- | :-------- |
| f   | r   | command   |

### `f`

A single bit flag, that signals whether or not the command should be allowed to revert without the whole transaction failing.

- If `f` is `0` aka `false` and the command reverts, then the entire transaction will revert and none of the commands will be executed.
- If `f` is `1` aka `true` and the command reverts, then the transaction will continue, allowing us to achieve partial fills. If using this flag, be careful to include further commands that will remove any funds that could be left unused in the `UniversalRouter` contract.

### `r`

2 unused bytes, reserved for future use. Leaving these 2 bits as `0` will save gas, but any value passed into the contract will be ignored. Later versions of the `UniversalRouter` will likely expand the 5 bits used for `command` to use at least 1 of these bits.

### `command`

A 5 bit unique identifier for the command that should be carried out. The values of these commands can be found within [Commands.sol](https://github.com/Uniswap/universal-router/blob/main/contracts/libraries/Commands.sol), or can be viewed in the table below.

The command types that are not defined do not have an assigned command at this moment in time. Providing one of these identifiers will cause the transaction to revert with `InvalidCommandType`.

A complete list of commands can be found in the table below:

| Command | Value                                                                                    |
| :------ | :--------------------------------------------------------------------------------------- |
| `0x00`  | [`V3_SWAP_EXACT_IN`](./02-technical-reference.md#v3_swap_exact_in)                       |
| `0x01`  | [`V3_SWAP_EXACT_OUT`](./02-technical-reference.md#v3_swap_exact_out)                     |
| `0x02`  | [`PERMIT2_TRANSFER_FROM`](./02-technical-reference.md#permit2_transfer_from)             |
| `0x03`  | [`PERMIT2_PERMIT_BATCH`](./02-technical-reference.md#permit2_permit_batch)               |
| `0x04`  | [`SWEEP`](./02-technical-reference.md#sweep)                                             |
| `0x05`  | [`TRANSFER`](./02-technical-reference.md#transfer)                                       |
| `0x06`  | [`PAY_PORTION`](./02-technical-reference.md#pay_portion)                                 |
| `0x07`  |                                                                                          |
| `0x08`  | [`V2_SWAP_EXACT_IN`](./02-technical-reference.md#v2_swap_exact_in)                       |
| `0x09`  | [`V2_SWAP_EXACT_OUT`](./02-technical-reference.md#v2_swap_exact_out)                     |
| `0x0a`  | [`PERMIT2_PERMIT`](./02-technical-reference.md#permit2_permit)                           |
| `0x0b`  | [`WRAP_ETH`](./02-technical-reference.md#wrap_eth)                                       |
| `0x0c`  | [`UNWRAP_WETH`](./02-technical-reference.md#unwrap_weth)                                 |
| `0x0d`  | [`PERMIT2_TRANSFER_FROM_BATCH`](./02-technical-reference.md#permit2_transfer_from_batch) |
| `0x0e`  | [`BALANCE_CHECK_ERC20`](./02-technical-reference.md#balance_check_erc20)                 |
| `0x0f`  |                                                                                          |
| `0x10`  | [`V4_SWAP`](./02-technical-reference.md#v4_swap)                                         |
| `0x11`  | [`V3_POSITION_MANAGER_PERMIT`](./02-technical-reference.md#v3_position_manager_permit)   |
| `0x12`  | [`V3_POSITION_MANAGER_CALL`](./02-technical-reference.md#v3_position_manager_call)       |
| `0x13`  | [`V4_INITIALIZE_POOL`](./02-technical-reference.md#v4_initialize_pool)                   |
| `0x14`  | [`V4_POSITION_MANAGER_CALL`](./02-technical-reference.md#v4_position_manager_call)       |
| `0x21`  | [`EXECUTE_SUB_PLAN`](./02-technical-reference.md#execute_sub_plan)                       |

## Command Inputs

The second parameter for the function is an array of bytes strings. Each element in the array is the abi-encoded input that will be used for the respective command.

`commands[i]` is the command that will use `inputs[i]` as its encoded input parameters.

The router uses the command type to know how to decode the encoded input parameters - depending on the command chosen, the required inputs is different.

The input parameters required for each command are outlined below:

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

### `UNWRAP_WETH`

- `address` The recipient of the ETH
- `uint256` The minimum required ETH to receive from the unwrapping

### `PERMIT2_TRANSFER_FROM_BATCH`

- `IAllowanceTransfer.AllowanceTransferDetails[]` An array of `AllowanceTransferDetails` structs that each describe a Permit2 transfer to perform

### `BALANCE_CHECK_ERC20`

- `address` The required owner of the ERC20
- `address` The ERC20 token address
- `uint256` The minimum required amount of the ERC20

### `V4_SWAP`

- `bytes` The calldata to use to call the V4SwapRouter contract

### `V3_POSITION_MANAGER_PERMIT`

- `bytes` The calldata to use to call the UniswapV3 PositionManager contract with permit

### `V3_POSITION_MANAGER_CALL`

- `bytes` The calldata to use to call the UniswapV3 PositionManager contract

### `V4_INITIALIZE_POOL`

- `PoolKey` A [`PoolKey`](../v4/reference/core/types/poolkey.mdx) struct to define the pool's characteristics
- `uint160` The `sqrtPriceX96` for the pool to be initialized with

### `V4_POSITION_MANAGER_CALL`

- `bytes` The calldata to use to call the UniswapV4 PositionManager contract

### `EXECUTE_SUB_PLAN`

- `commands` Bytes containing a set of concatenated commands, each 1 byte in length
- `inputs` An array of bytes containing abi encoded inputs for each command

## Example: Reverting Commands

For a `EXECUTE_SUB_PLAN` command, that should be _allowed to revert_, the following 8 bit command should be provided:

```markdown
command = 0x80 (10000000) && 0x21 (00100001) = 0xA1 (10100001)
```

Take care when working with reverting commands - ensure you have appended commands to deal with funds that could remain in the contract after either outcomes. For example, if the `EXECUTE_SUB_PLAN` command reverts when you are trying to execute swap as a sub plan, a following `SWEEP` can be added to ensure that any ETH that was not spent does not get left in the router.

---
id: signature-transfer
title: SignatureTransfer
sidebar_position: 1
---

Transactions to the `UniversalRouter` all go through the `UniversalRouter.execute` functions:

- `execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline)`
- `execute(bytes calldata commands, bytes[] calldata inputs)`

The first of these functions adds the functionality to allow transactions to have a transaction deadline. If the `block.timestamp` is after the `deadline` provided the transaction will revert. After that check, the 2 functions otherwise execute identically.

The `execute` functions work like a simplified VM - they take in a list of commands, and a list of inputs for the commands and execute them in the order specified.

## bytes calldata commands

The first parameter for the function is a list of commands for the contract to execute, in the order they should be executed. Each command is encoded in 1 byte, containing the following split of 8 bits:

 0 1 2 3 4 5 6 7
┌─┬───┬─────────┐
│f│ r | command │
└─┴───┴─────────┘


- `f` is a single bit flag, that signals whether or not the command should be allowed to revert without the whole transaction failing.
    - If `f` is `0` aka `false` and the command reverts, then the entire transaction will revert and none of the commands will be executed.
    - If `f` is `1` aka `true` and the command reverts, then the transaction will continue, allowing us to achieve partial fills. If using this flag, be careful to include further commands that will remove any funds that could be left unused in the `UniversalRouter` contract.
- `r` is 2 unused bytes, reserved for future use. Leaving these 2 bits as `0` will save gas, but any value passed into the contract will be ignored. Later versions of the `UniversalRouter` will likely expand the 5 bits used for `command` to use at least 1 of these bits.
- `command` is a 5 bit unique identifier for the command that should be carried out. The values of these commands can be found within [Commands.sol](https://github.com/Uniswap/universal-router/blob/main/contracts/libraries/Commands.sol), or can be viewed in the table below.
    
    The command types that are empty in the table below do not have an assigned command at this moment in time. Providing one of these identifiers will cause the transaction to revert with `InvalidCommandType`.
    

   ┌──────┬───────────────────────────────┐
   │ 0x00 │  V3_SWAP_EXACT_IN             │
   ├──────┼───────────────────────────────┤
   │ 0x01 │  V3_SWAP_EXACT_OUT            │
   ├──────┼───────────────────────────────┤
   │ 0x02 │  PERMIT2_TRANSFER_FROM        │
   ├──────┼───────────────────────────────┤
   │ 0x03 │  PERMIT2_PERMIT_BATCH         │
   ├──────┼───────────────────────────────┤
   │ 0x04 │  SWEEP                        │
   ├──────┼───────────────────────────────┤
   │ 0x05 │  TRANSFER                     │
   ├──────┼───────────────────────────────┤
   │ 0x06 │  PAY_PORTION                  │
   ├──────┼───────────────────────────────┤
   │ 0x07 │  -------                      │
   ├──────┼───────────────────────────────┤
   │ 0x08 │  V2_SWAP_EXACT_IN             │
   ├──────┼───────────────────────────────┤
   │ 0x09 │  V2_SWAP_EXACT_OUT            │
   ├──────┼───────────────────────────────┤
   │ 0x0a │  PERMIT2_PERMIT               │
   ├──────┼───────────────────────────────┤
   │ 0x0b │  WRAP_ETH                     │
   ├──────┼───────────────────────────────┤
   │ 0x0c │  UNWRAP_WETH                  │
   ├──────┼───────────────────────────────┤
   │ 0x0d │  PERMIT2_TRANSFER_FROM_BATCH  │
   ├──────┼───────────────────────────────┤
   │ 0x0e │  -------                      │
   ├──────┼───────────────────────────────┤
   │ 0x0f │  -------                      │
   ├──────┼───────────────────────────────┤
   │ 0x10 │  SEAPORT                      │
   ├──────┼───────────────────────────────┤
   │ 0x11 │  LOOKS_RARE_721               │
   ├──────┼───────────────────────────────┤
   │ 0x12 │  NFTX                         │
   ├──────┼───────────────────────────────┤
   │ 0x13 │  CRYPTOPUNKS                  │
   ├──────┼───────────────────────────────┤
   │ 0x14 │  LOOKS_RARE_1155              │
   ├──────┼───────────────────────────────┤
   │ 0x15 │  OWNER_CHECK_721              │
   ├──────┼───────────────────────────────┤
   │ 0x16 │  OWNER_CHECK_1155             │
   ├──────┼───────────────────────────────┤
   │ 0x17 │  SWEEP_ERC721                 │
   ├──────┼───────────────────────────────┤
   │ 0x18 │  X2Y2_721                     │
   ├──────┼───────────────────────────────┤
   │ 0x19 │  SUDOSWAP                     │
   ├──────┼───────────────────────────────┤
   │ 0x1a │  NFT20                        │
   ├──────┼───────────────────────────────┤
   │ 0x1b │  X2Y2_1155                    │
   ├──────┼───────────────────────────────┤
   │ 0x1c │  FOUNDATION                   │
   ├──────┼───────────────────────────────┤
   │ 0x1d │  SWEEP_ERC1155                │
   ├──────┼───────────────────────────────┤
   │ 0x1e │  -------                      │
   ├──────┼─────────────────-─────────────┤
   │ 0x1f │  -------                      │
   └──────┴───────────────────────────────┘


**Reverting command example**

For a Sudoswap command, that should be *allowed to revert*, the following 8 bit command should be provided:

```markdown
command = 0x80 (10000000) && 0x19 (00011001) = 0x99 (10011001)
```

Take care when working with reverting commands - ensure you have appended commands to deal with funds that could remain in the contract after either outcomes. For example, if the Sudoswap command reverts, a following `SWEEP` can be added to ensure that any ETH that was not spent does not get left in the router.

## **bytes[] calldata inputs**

The second parameter for the function is an array of bytes strings. Each element in the array is the abi-encoded input that will be used for the respective command.

`commands[i]` is the command that will use `inputs[i]` as its encoded input parameters.

The router uses the command type to know how to decode the encoded input parameters - depending on the command chosen, the required inputs is different.

Below the input parameters required for each command is outlined.

### V3_SWAP_EXACT_IN

- `address` The recipient of the output of the trade
- `uint256` The amount of input tokens for the trade
- `uint256` The minimum amount of output tokens the user wants
- `bytes` The UniswapV3 encoded path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### V3_SWAP_EXACT_OUT

- `address` The recipient of the output of the trade
- `uint256` The amount of output tokens to receive
- `uint256` The maximum number of input tokens that should be spent
- `bytes` The UniswapV3 encoded path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### PERMIT2_TRANSFER_FROM

- `address` The token to fetch from Permit2
- `address` The recipient of the tokens fetched
- `uint256` The amount of token to fetch

The individual that the tokens are fetched from is always the `msg.sender` of the transaction

### PERMIT2_PERMIT_BATCH

- `IAllowanceTransfer.PermitBatch` A `PermitBatch` struct outlining all of the Permit2 permits to execute.
- `bytes` The signature to provide to Permit2

The individual that signed the permits must be the `msg.sender` of the transaction

### SWEEP

- `address` The ERC20 token to sweep (or Constants.ETH for ETH)
- `address` The recipient of the sweep
- `uint256` The minimum required tokens to receive from the sweep

### TRANSFER

- `address` The ERC20 token to transfer (or Constants.ETH for ETH)
- `address` The recipient of the transfer
- `uint256` The amount to transfer

### PAY_PORTION

- `address` The ERC20 token to transfer (or Constants.ETH for ETH)
- `address` The recipient of the transfer
- `uint256` In basis points, the percentage of the contract’s balance to transfer

### V2_SWAP_EXACT_IN

- `address` The recipient of the output of the trade
- `uint256` The amount of input tokens for the trade
- `uint256` The minimum amount of output tokens the user wants
- `address[]` The UniswapV2 token path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### V2_SWAP_EXACT_OUT

- `address` The recipient of the output of the trade
- `uint256` The amount of output tokens to receive
- `uint256` The maximum number of input tokens that should be spent
- `address[]` The UniswapV2 token path to trade along
- `bool` A flag for whether the input tokens should come from the `msg.sender` (through Permit2) or whether the funds are already in the `UniversalRouter`

### PERMIT2_PERMIT

- `IAllowanceTransfer.PermitSingle` A `PermitSingle` struct outlining the Permit2 permit to execute
- `bytes` The signature to provide to Permit2

The individual that signed the permit must be the `msg.sender` of the transaction

### WRAP_ETH

- `address` The recipient of the WETH
- `uint256` The amount of ETH to wrap

### UNWRAP_ETH

- `address` The recipient of the ETH
- `uint256` The minimum required ETH to receive from the unwrapping

### PERMIT2_TRANSFER_FROM_BATCH

- `IAllowanceTransfer.AllowanceTransferDetails[]` An array of `AllowanceTransferDetails` structs that each describe a Permit2 transfer to perform

### SEAPORT

- `uint256` The ETH value to forward to the Seaport contract
- `bytes` The calldata to use to call the Seaport contract

### LOOKS_RARE_721

- `uint256` The ETH value to forward to the LooksRare contract
- `bytes` The calldata to use to call the LooksRare contract
- `address` The recipient of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### NFTX

- `uint256` The ETH value to forward to the NFTX contract
- `bytes` The calldata to use to call the NFTX contract

### CRYPTOPUNKS

- `uint256` The PunkID to purchase
- `address` The recipient for the cryptopunk
- `uint256` The ETH value to forward to the Cryptopunks contract

### LOOKS_RARE_1155

- `uint256` The ETH value to forward to the LooksRare contract
- `bytes` The calldata to use to call the LooksRare contract
- `address` The recipient of the ERC1155
- `address` The ERC1155 token address
- `uint256` The ID of the ERC1155
- `uint256` The amount of the ERC1155 to transfer

### OWNER_CHECK_721

- `address` The required owner of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### OWNER_CHECK_1155

- `address` The required owner of the ERC1155
- `address` The ERC721 token address
- `uint256` The ID of the ERC1155
- `uint256` The minimum required amount of the ERC1155

### SWEEP_ERC721

- `address` The ERC721 token address to transfer
- `address` The recipient of the transfer
- `uint256` The token ID to transfer

### X2Y2_721

- `uint256` The ETH value to forward to the X2Y2 contract
- `bytes` The calldata to use to call the X2Y2 contract
- `address` The recipient of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### SUDOSWAP

- `uint256` The ETH value to forward to the Sudoswap contract
- `bytes` The calldata to use to call the Sudoswap contract

### NFT20

- `uint256` The ETH value to forward to the NFT20 contract
- `bytes` The calldata to use to call the NFT20 contract

### X2Y2_1155

- `uint256` The ETH value to forward to the X2Y2 contract
- `bytes` The calldata to use to call the X2Y2 contract
- `address` The recipient of the ERC1155
- `address` The ERC1155 token address
- `uint256` The ID of the ERC1155
- `uint256` The amount of the ERC1155 to transfer

### FOUNDATION

- `uint256` The ETH value to forward to the Foundation contract
- `bytes` The calldata to use to call the Foundation contract
- `address` The recipient of the ERC721
- `address` The ERC721 token address
- `uint256` The ID of the ERC721

### SWEEP_ERC1155

- `address` The ERC1155 token address to sweep
- `address` The recipient of the sweep
- `uint256` The token ID to sweep
- `uint256` The minimum required tokens to receive from the sweep
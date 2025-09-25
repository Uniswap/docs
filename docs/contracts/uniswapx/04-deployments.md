---
id: deployment
title: Deployments
sidebar_position: 4
---
# Deployment Addresses

## Mainnet

| Contract | Contract Address | Source Code | Example Filler Implementation |
|-----------|------------------|----------------------|------------------------------|
| V2 Dutch Order Reactor | [0x00000011f84b9aa48e5f8aa8b9897600006289be](https://etherscan.io/address/0x00000011f84b9aa48e5f8aa8b9897600006289be) | [V2DutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V2DutchOrderReactor.sol) | [uniswapx_strategy](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/uniswapx_strategy.rs)
| V1 Exclusive Dutch Order Reactor | [0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4](https://etherscan.io/address/0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4) | [ExclusiveDutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/v1.0.0/src/reactors/ExclusiveDutchOrderReactor.sol) |
| OrderQuoter| [0x54539967a06Fc0E3C3ED0ee320Eb67362D13C5fF](https://etherscan.io/address/0x54539967a06Fc0E3C3ED0ee320Eb67362D13C5fF) | [OrderQuoter](https://github.com/Uniswap/UniswapX/blob/v1.0.0/src/OrderQuoter.sol)| N/A |
| Permit2| [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [Permit2](https://github.com/Uniswap/permit2)| N/A|

## Arbitrum

| Contract | Contract Address | Source Code | Example Filler Implementation |
|-----------|------------------|----------------------|------------------------------|
| DutchV3OrderReactor | [0xB274d5F4b833b61B340b654d600A864fB604a87c](https://arbiscan.io/address/0xB274d5F4b833b61B340b654d600A864fB604a87c) | [V3DutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V3DutchOrderReactor.sol) | [dutchv3_strategy](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/dutchv3_strategy.rs) |
| DutchV2OrderReactor (deprecated April 15, 2025) | [0x1bd1aAdc9E230626C44a139d7E70d842749351eb](https://arbiscan.io/address/0x1bd1aAdc9E230626C44a139d7E70d842749351eb) | [V2DutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V2DutchOrderReactor.sol) | [uniswapx_strategy](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/uniswapx_strategy.rs) |
| Permit2| [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://arbiscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [Permit2](https://github.com/Uniswap/permit2)| N/A|

## Unichain

| Contract | Contract Address | Source Code | Example Filler Implementation |
|-----------|------------------|----------------------|------------------------------|
| PriorityOrderReactor | [0x00000006021a6Bce796be7ba509BBBA71e956e37](https://uniscan.xyz/address/0x00000006021a6Bce796be7ba509BBBA71e956e37) | [PriorityOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol) |  [priority_strategy](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/priority_strategy.rs) |
| Permit2| [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://uniscan.xyz/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [Permit2](https://github.com/Uniswap/permit2)| N/A|

## Base

| Contract | Contract Address | Source Code | Example Filler Implementation |
|-----------|------------------|----------------------|------------------------------|
| PriorityOrderReactor  | [0x000000001Ec5656dcdB24D90DFa42742738De729](https://basescan.org/address/0x000000001Ec5656dcdB24D90DFa42742738De729) | [PriorityOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol) | [priority_strategy](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/priority_strategy.rs) |
| Permit2| [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://basescan.org/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [Permit2](https://github.com/Uniswap/permit2)| N/A|
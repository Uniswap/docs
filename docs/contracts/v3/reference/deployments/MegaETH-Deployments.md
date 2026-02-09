---
id: megaeth-deployments
title: MegaETH Deployments
---

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | MegaETH Addresses            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x3a5f0cd7d62452b7f899b2a5758bfa57be0de478` |
| [UniswapInterfaceMulticall](https://megaeth.blockscout.com/address/0x61f3272a3619d9f20788c6822fed2e5471bfc477)                                                | `0x61f3272a3619d9f20788c6822fed2e5471bfc477` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0xe7a2d824722addcb21e7a203ae7b372bf3a29ec5` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0xcdc86e98184e96436f733a8bf31bd4f0214e6d7d` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0xed30f6c25fe915dc710f168fa3ab66199ee84454` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x31db60c6a4c71909674094b404597762df424ae7` |
| [Quoter](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol)                                                              | `0x5affda77bc34d945f9632bd080ebfcf24133b90e` |
| [SwapRouter](https://github.com/Uniswap/swap-router-contracts)                                                                                              | `0x2eec3eb1c9dc14af773e04a177f960124295a067` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                      | `0x48020de9208bafc183f5cad5118ffbe8f0f913f5` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                              | `0x47837eb80db5908eabba9105626d9b348bea7b02` |

These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)


## Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

## Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

## Wrapped Native Token Addresses

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

| Network  | ChainId  | Wrapped Native Token | Address                                      |
| -------- | -------- | -------------------- | -------------------------------------------- |
| MegaETH  | `4326`   | WETH                 | `0x4200000000000000000000000000000000000006` |
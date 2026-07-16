---
id: tempo-deployments
title: Tempo Deployments
---

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | Tempo Addresses                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x24a3d4757e330890a8b8978028c9e58e04611fd6` |
| [UniswapInterfaceMulticall](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/UniswapInterfaceMulticall.sol)                                  | `0x64eb6294fd6072b2c20d31a54e39d5d3bf69d982` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0x95cb27f323a03b03528096a527ee75704db28ef5` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0xb71c33f096ceabdc0229110e0d76a6382d01c633` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x2352328bd3313549d6d908646c82c2b7136901a9` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x53ab5d7a69db158f621b43ee70423da1e1403c2a` |
| [Quoter](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol)                                                              | `0x9a0dd5fda50d8df9dd6fa4b4be33b6b1e241b408` |
| [SwapRouter](https://github.com/Uniswap/swap-router-contracts)                                                                                              | `0x6a3988d2366ad79917a2399f18a1a82b157470e1` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                      | `0x7e9d53081e961201837336bcd81f52ae92691a8f` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022d473030f116ddee9f6b43ac78ba3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                              | `0xa2dc7d0266f0cc50b3eeaf36c9bfcecff1beea91` |

These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)


## Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

## Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on the [Tempo Explorer](https://explore.tempo.xyz/).

You can look up the address of an existing pool on [Uniswap Info](https://app.uniswap.org/explore#/) or by calling the [`getPool`](../core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

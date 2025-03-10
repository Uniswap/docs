---
id: celo-deployments
title: CELO Deployments
---

# Uniswap Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | CELO Address                                 | Alfajores Address                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0xAfE208a311B21f13EF87E33A90049fC17A7acDEc` | `0x229Fd76DA9062C1a10eb4193768E192bdEA99572` |
| [Multicall2](https://celoscan.io/address/0x633987602de5c4f337e3dbf265303a1080324204#code)                                                                    | `0x633987602DE5C4F337e3DbF265303A1080324204` | `0x692A12C7C167c44e54c3d381CA3EE91F058Dc404` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `0xc1b262Dd7643D4B7cA9e51631bBd900a564BF49A` | `0xE4d1eBb97Fe5fabFaBbB8C004C424EE12dE8A07d` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0x5f115D9113F88e0a0Db1b5033D90D4a9690AcD3D` | `0xFdACaEfB0f85C9BE9d319023453cC85C812d7e1E` |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0xa9Fd765d85938D278cb0b108DbE4BF7186831186` | `0xE3da4F834D45b27AF95600e6546991dC3B50adAC` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0x644023b316bB65175C347DE903B60a756F6dd554` | `0xB00B8C3aB078EB0f7DeC6cE19c1a1da5bf4f8d7e` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0x505B43c452AA4443e0a6B84bb37771494633Fde9` | `0x9ddD6325FBE93A715B422883cED853CD843f217C` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A` | `0x0eC9d3C06Bc0A472A80085244d897bb604548824` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x3cFd4d48EDfDCC53D3f173F596f621064614C582` | `0x245d3F47F55c532dbE9340368855Be631B162cfd` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8` | `0x3c1FCF8D6f3A579E98F4AE75EB0adA6de70f5673` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x5615CDAb10dc425a742d643d949a7F474C01abc4` | `0x8C456F41A3883bA0ba99f810F7A2Da54D9Ea3EF0` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022D473030F116dDEE9F6B43aC78BA3` | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x643770E279d5D0733F21d6DC03A8efbABf3255B4` | `0x84904B9E85F76a421223565be7b596d7d9A8b8Ce` |
| [v3StakerAddress](https://github.com/Uniswap/v3-staker)                                                                                                      | `0x6586FB35393abF7Ff454977a9b3c912d218791C6` | `0x8AC47D3e65a3e6aD14596ee7d18ad1d1aA53208F` |
 

These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)

# Uniswap V3 Staker

An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/v3-staker/releases/tag/v1.0.2) for the `UniswapV3Staker` contract.

# Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

# Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../reference/core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

# CELO Native Asset

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

**Note: CELO is the native asset, it is a token and will work as a token, needing approval for routers to manage.*

| Network | ChainId | Wrapped Native Token | Address                                      |
| ------- | ------- | -------------------- | -------------------------------------------- |
| CELO    | `42220` | CELO Native Asset    | `0x471EcE3750Da237f93B8E339c536989b8978a438` |

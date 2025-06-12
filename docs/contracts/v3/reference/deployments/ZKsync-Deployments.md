---
id: ZKsync-deployments
title: ZKsync Deployments
---

# Uniswap Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                                      | ZKsync Mainnet                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/uniswap-zksync/era-uniswap-v3-core/blob/v1.0.0-zksync-era/contracts/UniswapV3Factory.sol)                                               | `0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422` |
| [Multicall2](https://explorer.zksync.io/address/0x0c68a7C72f074d1c45C16d41fa74eEbC6D16a65C#contract)                                                                          | `0x0c68a7C72f074d1c45C16d41fa74eEbC6D16a65C` |
| [ProxyAdmin](https://github.com/uniswap-zksync/era-openzeppelin-contracts/blob/v3.4.1-solc-0.7-2-zksync-era/contracts/proxy/ProxyAdmin.sol)                                   | `0xBb79274aD9C7f68A5B6a7E31F431175BB889b557` |
| [TickLens](https://github.com/uniswap-zksync/era-uniswap-v3-periphery/blob/v1.1.1-zksync-era/contracts/lens/TickLens.sol)                                                     | `0xe10FF11b809f8EE07b056B452c3B2caa7FE24f89` |
| [NFTDescriptor](https://github.com/uniswap-zksync/era-uniswap-v3-periphery/blob/v1.3.0-zksync-era/contracts/libraries/NFTDescriptor.sol)                                      | `0x7d67b8Ff4AbFfc020641F5e430fbeEd03897674d` |
| [NonfungibleTokenPositionDescriptor](https://github.com/uniswap-zksync/era-uniswap-v3-periphery/blob/v1.3.0-zksync-era/contracts/NonfungibleTokenPositionDescriptor.sol)      | `0xa819De78cAB1163F8605809392068EdE3BFcDd1E` |
| [TransparentUpgradeableProxy](https://github.com/uniswap-zksync/era-openzeppelin-contracts/blob/v3.4.1-solc-0.7-2-zksync-era/contracts/proxy/TransparentUpgradeableProxy.sol) | `0xAeaBf2d69698C6810D2596fAE86099790A13Ee81` |
| [NonfungiblePositionManager](https://github.com/uniswap-zksync/era-uniswap-v3-periphery/blob/v1.1.1-zksync-era/contracts/NonfungiblePositionManager.sol)                      | `0x0616e5762c1E7Dc3723c50663dF10a162D690a86` |
| [V3Migrator](https://github.com/uniswap-zksync/era-uniswap-v3-periphery/blob/v1.1.1-zksync-era/contracts/V3Migrator.sol)                                                      | `0x611841b24E43C4ACfd290B427a3D6cf1A59dac8E` |
| [QuoterV2](https://github.com/uniswap-zksync/era-uniswap-swap-router-contracts/blob/v1.1.0-zksync-era/contracts/lens/QuoterV2.sol)                                            | `0x8Cb537fc92E26d8EBBb760E632c95484b6Ea3e28` |
| [SwapRouter02](https://github.com/uniswap-zksync/era-uniswap-swap-router-contracts/blob/v1.1.0-zksync-era/contracts/SwapRouter02.sol)                                         | `0x99c56385daBCE3E81d8499d0b8d0257aBC07E8A3` |
| [Permit2](https://github.com/uniswap-zksync/era-permit2/blob/0x000000000022D473030F116dDEE9F6B43aC78BA3-zksync-era/src/Permit2.sol)                                           | `0x0000000000225e31d15943971f47ad3022f714fa` |
| [UniversalRouter](https://github.com/uniswap-zksync/era-universal-router/tree/v1.2.2-zksync-era)                                                                              | `0x28731BCC616B5f51dD52CF2e4dF0E78dD1136C06` |
| [v3StakerAddress](https://github.com/uniswap-zksync/era-uniswap-v3-staker/blob/v1.0.2-zksync-era/contracts/UniswapV3Staker.sol)                                               | `0xf84268FA8EB857c2e4298720C1C617178F5e78e1` |


These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core`](https://github.com/uniswap-zksync/era-uniswap-v3-core/tree/v1.0.0-zksync-era)
- [`@uniswap/v3-periphery`](https://github.com/uniswap-zksync/era-uniswap-v3-periphery)
- [`@uniswap/swap-router-contracts`](https://github.com/uniswap-zksync/era-uniswap-swap-router-contracts)

*Note:*
ZKsync contracts are also using the [`ZKsync fork of OpenZeppelin`](https://github.com/uniswap-zksync/era-openzeppelin-contracts#v3.4.1-solc-0.7-2-zksync-era).

# Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/sdks/blob/main/sdks/universal-router-sdk/src/utils/constants.ts).

# Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://app.uniswap.org/explore) or by calling the [`getPool`](../reference/core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

# Wrapped Native Token Addresses

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

| Network           | ChainId  | Wrapped Native Token | Address                                      |
| ----------------- | -------- | -------------------- | -------------------------------------------- |
| ZKsync            | `324`    | WETH                 | `0x5aea5775959fbc2557cc8789bc1bf90a239d9a91` |


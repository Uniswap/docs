---
id: defi-oracle-meta-deployments
title: DeFi Oracle Meta Deployments
---

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` on **DeFi Oracle Meta Mainnet** (chain ID **138**, registry id `dfiometa`) are deployed at the addresses listed below. Integrators should **not** assume Ethereum mainnet or other chain addresses apply on chain 138.

| Contract                                                                                                                                                     | DeFi Oracle Meta (138) Address |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | [`0x2f7219276e3ce367dB9ec74C1196a8ecEe67841C`](https://blockscout.defi-oracle.io/address/0x2f7219276e3ce367dB9ec74C1196a8ecEe67841C) |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol) (library)                               | [`0x6F5fdE32DD2aC66B27e296EC9D6F4E79A3dE2947`](https://blockscout.defi-oracle.io/address/0x6F5fdE32DD2aC66B27e296EC9D6F4E79A3dE2947) |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | [`0xca66DCAC4633555033F6fDDBE4234B6913c7ff51`](https://blockscout.defi-oracle.io/address/0xca66DCAC4633555033F6fDDBE4234B6913c7ff51) |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | [`0x31b68BE5af4Df565Ce261dfe53D529005D947B48`](https://blockscout.defi-oracle.io/address/0x31b68BE5af4Df565Ce261dfe53D529005D947B48) |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | [`0x6abbB1CEb2468e748a03A00CD6aA9BFE893AFa1f`](https://blockscout.defi-oracle.io/address/0x6abbB1CEb2468e748a03A00CD6aA9BFE893AFa1f) |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | [`0xde9cD8ee2811E6E64a41D5F68Be315d33995975E`](https://blockscout.defi-oracle.io/address/0xde9cD8ee2811E6E64a41D5F68Be315d33995975E) |

These addresses were deployed from official Uniswap npm package bytecode (via operator scripts on chain 138; not modified core logic). Deployment began around block `3510162`.

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)

## Network metadata

| Field | Value |
| ----- | ----- |
| Chain ID | `138` |
| Native currency | ETH |
| Public RPC | `https://rpc-http-pub.d-bis.org` |
| Block explorer | [Blockscout](https://blockscout.defi-oracle.io) |
| Chain website | [info.defi-oracle.io](https://info.defi-oracle.io) |

## Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract. Example seeded pools on chain 138:

| Pool | Address |
| ---- | ------- |
| WETH / USDT | [`0xa893add35aEfe6A6d858EB01828bE4592f12C9F5`](https://blockscout.defi-oracle.io/address/0xa893add35aEfe6A6d858EB01828bE4592f12C9F5) |
| WETH / USDC | [`0xEC745bfb6b3cd32f102d594E5F432d8d85B19391`](https://blockscout.defi-oracle.io/address/0xEC745bfb6b3cd32f102d594E5F432d8d85B19391) |

Pool USDT/USDC here are chain-138 bridged stablecoins, not Ethereum mainnet USDT/USDC. You can look up additional pools by calling [`getPool`](../core/interfaces/IUniswapV3Factory.md#getpool) on the `UniswapV3Factory` contract or via [Blockscout](https://blockscout.defi-oracle.io).

```solidity
getPool("0x71d6687f38b93ccad569fa6352c876eea967201b", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

## Wrapped Native Token

| Network | ChainId | Wrapped Native Token | Address |
| ------- | ------- | -------------------- | ------- |
| DeFi Oracle Meta Mainnet | `138` | WETH9 | [`0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`](https://blockscout.defi-oracle.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) |

## Integrator note

Chain 138 also hosts other DEX infrastructure (for example DODO PMM). For Uniswap protocol integrations, use **only** the factory, router, and pool addresses listed on this page — not Ethereum mainnet canonical deployments.

## Uniswap V2 (chain 138)

Official `@uniswap/v2-core` / `@uniswap/v2-periphery` bytecode on chain 138 (deployed at block `4041469`):

| Contract | Address |
| -------- | ------- |
| UniswapV2Factory | [`0x0C30F6e67Ab3667fCc2f5CEA8e274ef1FB920279`](https://blockscout.defi-oracle.io/address/0x0C30F6e67Ab3667fCc2f5CEA8e274ef1FB920279) |
| UniswapV2Router02 | [`0x3019A7fDc76ba7F64F18d78e66842760037ee638`](https://blockscout.defi-oracle.io/address/0x3019A7fDc76ba7F64F18d78e66842760037ee638) |

Example V2 pairs:

| Pair | Address |
| ---- | ------- |
| WETH / USDT | [`0xda2A5AC9F4892EAd47093A374779Ba790f23DC84`](https://blockscout.defi-oracle.io/address/0xda2A5AC9F4892EAd47093A374779Ba790f23DC84) |
| WETH / USDC | [`0xCD255F4f6c4E861490b3C7E0300613318B870f36`](https://blockscout.defi-oracle.io/address/0xCD255F4f6c4E861490b3C7E0300613318B870f36) |
| cUSDT / cUSDC | [`0x7bd707294AACb47ab109780be8a096700741886d`](https://blockscout.defi-oracle.io/address/0x7bd707294AACb47ab109780be8a096700741886d) |

See also the [V2 deployment addresses table](../../../v2/reference/smart-contracts/08-deployment-addresses.md) for factory and router across networks.

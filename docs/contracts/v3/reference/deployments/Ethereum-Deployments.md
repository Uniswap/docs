---
id: ethereum-deployments
title: Ethereum Deployments
---

# Uniswap Ethereum Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | Mainnet                                      | Ethereum Sepolia Addresses                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x1F98431c8aD98523631AE4a59f267346ea31F984` | `0x0227628f3F023bb0B980b67D528571c95c6DaC1c` |
| [Multicall](https://etherscan.io/address/0x1F98415757620B543A52E61c46B32eB19261F984#code)                                                                    | `0x1F98415757620B543A52E61c46B32eB19261F984` | ``                                           |
| [Multicall2](https://etherscan.io/address/0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696#code)                                                                   | `0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696` | `0xD7F33bCdb21b359c8ee6F0251d30E94832baAd07` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2` | `0x0b343475d44EC2b4b8243EBF81dc888BF0A14b36` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0xbfd8137f7d1516D3ea5cA83523914859ec47F573` | ``                                           |
| [Quoter](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol)                                                              | `0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6` | ``                                           |
| [SwapRouter](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/SwapRouter.sol)                                                           | `0xE592427A0AEce92De3Edee1F18E0157C05861564` | ``                                           |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0x42B24A95702b9986e82d421cC3568932790A48Ec` | `0x3B5E3c5E595D85fbFBC2a42ECC091e183E76697C` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0x91ae842A5Ffd8d12023116943e72A606179294f3` | `0x5bE4DAa6982C69aD20A57F1e68cBcA3D37de6207` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0xEe6A57eC80ea46401049E92587E52f5Ec1c24785` | ``                                           |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0xC36442b4a4522E871399CD717aBDD847Ab11FE88` | `0x1238536071E1c677A632429e3655c799b22cDA52` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0xA5644E29708357803b5A882D272c41cC0dF92B34` | `0x729004182cF005CEC8Bd85df140094b6aCbe8b15` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x61fFE014bA17989E743c5F6cB21bF9697530B21e` | `0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45` | `0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022D473030F116dDEE9F6B43aC78BA3` | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x66a9893cc07d91d95644aedd05d03f95e1dba8af` | `0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD` |
| [v3StakerAddress](https://github.com/Uniswap/v3-staker)                                                                                                      | `0xe34139463bA50bD61336E0c446Bd8C0867c6fE65` | ``                                           |


These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)

# Uniswap v3 Staker

An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/v3-staker/releases/tag/v1.0.2) for the `UniswapV3Staker` contract.

# Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

# Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../reference/core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

# Wrapped Native Token Addresses

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

| Network             | ChainId     | Wrapped Native Token | Address                                      |
| ------------------- | ----------- | -------------------- | -------------------------------------------- |
| Ethereum            | `1`         | WETH                 | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` |
| Sepolia             | `11155111`  | WETH                 | `0xfff9976782d46cc05630d1f6ebab18b2324d6b14` |


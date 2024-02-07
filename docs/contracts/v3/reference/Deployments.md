---
id: deployments
title: Deployment Addresses
---

# Uniswap Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | Mainnet, Goerli, Arbitrum, Optimism, Polygon Address | Celo Address                                 | BNB Address                                  | Base Address                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x1F98431c8aD98523631AE4a59f267346ea31F984`         | `0xAfE208a311B21f13EF87E33A90049fC17A7acDEc` | `0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7` | `0x33128a8fC17869897dcE68Ed026d694621f6FDfD` |
| [Multicall2](https://etherscan.io/address/0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696#code)                                                                   | `0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696`         | `0x633987602DE5C4F337e3DbF265303A1080324204` | `0x963Df249eD09c358A4819E39d9Cd5736c3087184` | `0x091e99cb1C49331a94dD62755D168E941AbD0693` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2`         | `0xc1b262Dd7643D4B7cA9e51631bBd900a564BF49A` | `0xC9A7f5b73E853664044ab31936D0E6583d8b1c79` | `0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0xbfd8137f7d1516D3ea5cA83523914859ec47F573`         | `0x5f115D9113F88e0a0Db1b5033D90D4a9690AcD3D` | `0xD9270014D396281579760619CCf4c3af0501A47C` | `0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d` |
| [Quoter](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol)                                                              | `0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6`         | `0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8` |                                              |                                              |
| [SwapRouter](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/SwapRouter.sol)                                                           | `0xE592427A0AEce92De3Edee1F18E0157C05861564`         | `0x5615CDAb10dc425a742d643d949a7F474C01abc4` |                                              |                                              |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0x42B24A95702b9986e82d421cC3568932790A48Ec`         | `0xa9Fd765d85938D278cb0b108DbE4BF7186831186` | `0x831d93E55AF23A2977E4DA892d5005f4F2995071` | `0xF9d1077fd35670d4ACbD27af82652a8d84577d9F` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0x91ae842A5Ffd8d12023116943e72A606179294f3`         | `0x644023b316bB65175C347DE903B60a756F6dd554` | `0x0281E98322e4e8E53491D576Ee6A2BFCE644C55C` | `0x4f225937EDc33EFD6109c4ceF7b560B2D6401009` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0xEe6A57eC80ea46401049E92587E52f5Ec1c24785`         | `0x505B43c452AA4443e0a6B84bb37771494633Fde9` | `0xAec98e489AE35F243eB63452f6ad233A6c97eE97` | `0x4615C383F85D0a2BbED973d83ccecf5CB7121463` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`         | `0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A` | `0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613` | `0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0xA5644E29708357803b5A882D272c41cC0dF92B34`         | `0x3cFd4d48EDfDCC53D3f173F596f621064614C582` | `0x32681814957e0C13117ddc0c2aba232b5c9e760f` | `0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x61fFE014bA17989E743c5F6cB21bF9697530B21e`         | `0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8` | `0x78D78E420Da98ad378D7799bE8f4AF69033EB077` | `0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45`         | `0x5615CDAb10dc425a742d643d949a7F474C01abc4` | `0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2` | `0x2626664c2603336E57B271c5C0b26F421741e481` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022d473030f116ddee9f6b43ac78ba3`         | `0x000000000022d473030f116ddee9f6b43ac78ba3` | `0x000000000022d473030f116ddee9f6b43ac78ba3` | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD`         | `0x5Dc88340E1c5c6366864Ee415d6034cadd1A9897` | `0x5302086A3a25d473aAbBd0356eFf8Dd811a4d89B` | `0x198EF79F1F515F02dFE9e3115eD9fC07183f02fC` |

### Sepolia Addresses

| Contract                                                                                                                                                     | Ethereum Sepolia Address                     | Base Sepolia Address                         | OP Sepolia Address                           | Arbitrum Sepolia                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | 
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x0227628f3F023bb0B980b67D528571c95c6DaC1c` | `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24` | `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24` | `0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e` |
| [Multicall2](https://etherscan.io/address/0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696#code)                                                                   | `0xD7F33bCdb21b359c8ee6F0251d30E94832baAd07` | `0xd867e273eAbD6c853fCd0Ca0bFB6a3aE6491d2C1` | `0xd867e273eAbD6c853fCd0Ca0bFB6a3aE6491d2C1` | `0x2B718b475e385eD29F56775a66aAB1F5cC6B2A0A` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `` | `0xD7303474Baca835743B54D73799688990f24a79D` | `0xD7303474Baca835743B54D73799688990f24a79D` | ``                                           |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0xd7f33bcdb21b359c8ee6f0251d30e94832baad07` | `0xedf6066a2b290C185783862C7F4776A2C8077AD1` | `0xedf6066a2b290C185783862C7F4776A2C8077AD1` | `0x0fd18587734e5C2dcE2dccDcC7DD1EC89ba557d9` |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `` | `0x4e0caFF1Df1cCd7CF782FDdeD77f020699B57f1a` | `0x4e0caFF1Df1cCd7CF782FDdeD77f020699B57f1a` | ``                                           |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `` | `0xd7c6e867591608D32Fe476d0DbDc95d0cf584c8F` | `0xd7c6e867591608D32Fe476d0DbDc95d0cf584c8F` | ``                                           |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `` | `0x1E2A708040Eb6Ed08893E27E35D399e8E8e7857E` | `0x1E2A708040Eb6Ed08893E27E35D399e8E8e7857E` | ``                                           |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0x1238536071E1c677A632429e3655c799b22cDA52` | `0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2` | `0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2` | `0x6b2937Bde17889EDCf8fbD8dE31C3C2a70Bc4d65` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x729004182cF005CEC8Bd85df140094b6aCbe8b15` | `0xCbf8b7f80800bd4888Fbc7bf1713B80FE4E23E10` | `0xCbf8b7f80800bd4888Fbc7bf1713B80FE4E23E10` | `0x398f43ef2c67B941147157DA1c5a868E906E043D` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3` | `0xC5290058841028F1614F3A6F0F5816cAd0df5E27` | `0xC5290058841028F1614F3A6F0F5816cAd0df5E27` | `0x2779a0CC1c3e0E44D2542EC3e79e3864Ae93Ef0B` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E` | `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4` | `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4` | `0x101F443B4d1b059569D643917553c771E1b9663E` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022D473030F116dDEE9F6B43aC78BA3` | `0x000000000022d473030f116ddee9f6b43ac78ba3` | `0x000000000022d473030f116ddee9f6b43ac78ba3` | `0x000000000022d473030f116ddee9f6b43ac78ba3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD` | `0x050E797f3625EC8785265e1d9BDd4799b97528A1` | `0xD5bBa708b39537d33F2812E5Ea032622456F1A95` | `0x4A7b5Da61326A6379179b40d00F57E5bbDC962c2` |
| [v3StakerAddress](https://github.com/Uniswap/v3-staker)                                                                                                      | `` | `0x62725F55f50bdE240aCa3e740D47298CAc8d57D5` | `0x62725F55f50bdE240aCa3e740D47298CAc8d57D5` | ``                                           |

These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)

# Uniswap V3 Staker

An up-to-date list of [deploy addresses by chain is hosted on Github](https://github.com/Uniswap/v3-staker/releases/tag/v1.0.2) for the `UniswapV3Staker` contract.

# Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on Github](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

# Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../reference/core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

# Wrapped Native Token Addresses

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

| Network             | ChainId  | Wrapped Native Token | Address                                      |
| ------------------- | -------- | -------------------- | -------------------------------------------- |
| Ethereum            | `1`      | WETH                 | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` |
| Goerli              | `5`      | WETH                 | `0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6` |
| Arbitrum            | `42161`  | WETH                 | `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` |
| Arbitrum Goerli     | `421613` | WETH                 | `0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3` |
| Optimism            | `10`     | WETH                 | `0x4200000000000000000000000000000000000006` |
| Optimism Goerli     | `420`    | WETH                 | `0x4200000000000000000000000000000000000006` |
| Polygon             | `137`    | WMATIC               | `0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270` |
| Polygon Mumbai      | `80001`  | WMATIC               | `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889` |
| Binance Smart Chain | `56`     | WBNB                 | `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c` |
| Base                | `8453`   | WETH                 | `0x4200000000000000000000000000000000000006` |

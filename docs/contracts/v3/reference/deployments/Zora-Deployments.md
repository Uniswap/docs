---
id: Zora-deployments
title:  Zora Deployment Addresses
---

# Uniswap Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | Zora                                         | Zora Sepolia                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb` | `0x4324A677D74764f46f33ED447964252441aA8Db6` |
| [Multicall2](https://explorer.zora.energy/address/0xA51c76bEE6746cB487a7e9312E43e2b8f4A37C15)                                                                 | `0xA51c76bEE6746cB487a7e9312E43e2b8f4A37C15` | `0xA1E7e3A69671C4494EC59Dbd442de930a93F911A` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `0xd4109824FC80dD41ca6ee8D304ec74B8bEdEd03b` | `0x561896C035abFB3C72f754f10fD35f6c450Ffe16` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0x209AAda09D74Ad3B8D0E92910Eaf85D2357e3044` | `0x23C0F71877a1Fc4e20A78018f9831365c85f3064` |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0xffF2BffC03474F361B7f92cCfF2fD01CFBBDCdd1` | `0xf70C8a20496a5201Fd8D01F627c93aE39cDa1999` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0xf15D9e794d39A3b4Ea9EfC2376b2Cd9562996422` | `0x5BC936a151Fb4CEBD14467Ca9CBf598b7E645fc0` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0x843b0b03c3B3B0434B9cb00AD9cD1D9218E7741b` | `0x68EF3669bEd58213edf9Da598f4E1307680839B2` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0xbC91e8DfA3fF18De43853372A3d7dfe585137D78` | `0xB8458EaAe43292e3c1F7994EFd016bd653d23c20` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x048352d8dCF13686982C799da63fA6426a9D0b60` | `0x65ef259b31bf1d977c37e9434658694267674897` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x11867e1b3348F3ce4FcC170BC5af3d23E07E64Df` | `0xC195976fEF0985886E37036E2DF62bF371E12Df0` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x7De04c96BE5159c3b5CeffC82aa176dc81281557` | `0x6B36d761981d82B1e07cF3c4daF4cB4615c4850a` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022d473030f116ddee9f6b43ac78ba3` | `0x000000000022d473030f116ddee9f6b43ac78ba3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x2986d9721A49838ab4297b695858aF7F17f38014` | ``                                           |
| [v3StakerAddress](https://github.com/Uniswap/v3-staker)                                                                                                      | `0x5eF5A6923d2f566F65f363b78EF7A88ab1E4206f` | `0x5d298AAf21058d14436DBD36940dcB5542b8aFE8` |


These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)


# Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/sdks/blob/main/sdks/universal-router-sdk/src/utils/constants.ts).

# Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../reference/core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

# Wrapped Native Token Addresses

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

| Network      | ChainId     | Wrapped Native Token | Address                                      |
| ------------ | ----------- | -------------------- | -------------------------------------------- |
| Zora         | `7777777`   | WETH                 | `0x4200000000000000000000000000000000000006` |
| Zora Sepolia | `999999999` | WETH                 | `0x4200000000000000000000000000000000000006` |

---
id: base-deployments
title: Base Deployments
---

# Uniswap Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     |  Base Address                                | Base Sepolia Address                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x33128a8fC17869897dcE68Ed026d694621f6FDfD` | `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24` |
| [Multicall](https://basescan.org/address/0x091e99cb1c49331a94dd62755d168e941abd0693#code)                                                                    | `0x091e99cb1C49331a94dD62755D168E941AbD0693` | `0xd867e273eAbD6c853fCd0Ca0bFB6a3aE6491d2C1` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9` | `0xD7303474Baca835743B54D73799688990f24a79D` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d` | `0xedf6066a2b290C185783862C7F4776A2C8077AD1` |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0xF9d1077fd35670d4ACbD27af82652a8d84577d9F` | `0x4e0caFF1Df1cCd7CF782FDdeD77f020699B57f1a` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0x4f225937EDc33EFD6109c4ceF7b560B2D6401009` | `0xd7c6e867591608D32Fe476d0DbDc95d0cf584c8F` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0x4615C383F85D0a2BbED973d83ccecf5CB7121463` | `0x1E2A708040Eb6Ed08893E27E35D399e8E8e7857E` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1` | `0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7` | `0xCbf8b7f80800bd4888Fbc7bf1713B80FE4E23E10` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a` | `0xC5290058841028F1614F3A6F0F5816cAd0df5E27` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x2626664c2603336E57B271c5C0b26F421741e481` | `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022D473030F116dDEE9F6B43aC78BA3` | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x6ff5693b99212da76ad316178a184ab56d299b43` | `0x492e6456d9528771018deb9e87ef7750ef184104` |
| [v3StakerAddress](https://github.com/Uniswap/v3-staker)                                                                                                      | `0x42bE4D6527829FeFA1493e1fb9F3676d2425C3C1` | ``                                           |


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
| Base                | `8453`   | WETH                 | `0x4200000000000000000000000000000000000006` |
| Base Sepolia        | `84532`  | WETH                 | `0x4200000000000000000000000000000000000006` |

---
id: blast-deployments
title: Blast Deployments
---

# Uniswap Contract Deployments

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | Blast addresses                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd` |
| [Multicall](https://blastscan.io/address/0xdc7f370de7631ce9e2c2e1dcda6b3b5744cf4705#code)                                                                    | `0xdC7f370de7631cE9e2c2e1DCDA6B3B5744Cf4705` |
| [ProxyAdmin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol)                                   | `0x7C9cAa4ac84C8FAD8Bd504DBF90e791F91f41705` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0x2E95185bCdD928a3e984B7e2D6560Ab1b17d7274` |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0xAa32bD3926097fd04d22b4433e9867417EE79333` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0x497089D9450BB58f536c38c1C0d0A37472303508` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0xB22Ef02E13B1900EBF10391e57162402c11BfF05` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0xB218e4f7cF0533d4696fDfC419A0023D33345F28` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x15CA7043CD84C5D21Ae76Ba0A1A967d42c40ecE0` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x6Cdcd65e03c1CEc3730AeeCd45bc140D57A25C77` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0x549FEB8c9bd4c12Ad2AB27022dA12492aC452B66` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022d473030f116ddee9f6b43ac78ba3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0xeabbcb3e8e415306207ef514f660a3f820025be3` |
| [v3StakerAddress](https://github.com/Uniswap/v3-staker)                                                                                                      | `0xEcAF7c276f746170642e97De961f2f0361e1aCc8` |


These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)


# Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

# Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

# Wrapped Native Token Addresses

The Uniswap Protocol supports trading of ERC20 tokens. In order to swap a native asset like ETH (or MATIC on Polygon), the Uniswap protocol wraps these assets in an ERC20 wrapped native token contract. The protocol uses the following WETH9 addresses on Ethereum and WMATIC addresses on Polygon.

| Network | ChainId | Wrapped Native Token | Address                                      |
| ------- | ------- | -------------------- | -------------------------------------------- |
| Blast   | `81457` | WETH                 | `0x4300000000000000000000000000000000000004` |

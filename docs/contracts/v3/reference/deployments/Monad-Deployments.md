---
id: monad-deployments
title: Monad Deployments
---

The latest version of `@uniswap/v3-core`, `@uniswap/v3-periphery`, and `@uniswap/swap-router-contracts` are deployed at the addresses listed below. Integrators should **no longer assume that they are deployed to the same addresses across chains** and be extremely careful to confirm mappings below.

| Contract                                                                                                                                                     | Monad Addresses             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| [UniswapV3Factory](https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol)                                                    | `0x204faca1764b154221e35c0d20abb3c525710498` |
| [Multicall](https://monadvision.com/address/0xd1b797d92d87b688193a2b976efc8d577d204343)                                                     | `0xd1b797d92d87b688193a2b976efc8d577d204343` |
| [TickLens](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol)                                                          | `0xf025e0fe9e331a0ef05c2ad3c4e9c64b625cda6f` |
| [NFTDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol)                                           | `0x2e9d45bb7b30549f5216813ada9a6b7982c5b3ed` |
| [NonfungibleTokenPositionDescriptor](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol)           | `0x315e413a11ab0df498ef83873012430ca36638ae` |
| [TransparentUpgradeableProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol) | `0x63023c02f457a24594ad8fd411f56092179655e2` |
| [NonfungiblePositionManager](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol)                           | `0x7197e214c0b767cfb76fb734ab638e2c192f4e53` |
| [V3Migrator](https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol)                                                           | `0x7078c4537c04c2b2e52ddba06074dbdacf23ca15` |
| [QuoterV2](https://github.com/Uniswap/v3-periphery/blob/main/contracts/lens/QuoterV2.sol)                                                                    | `0x661e93cca42afacb172121ef892830ca3b70f08d` |
| [SwapRouter02](https://github.com/Uniswap/swap-router-contracts/blob/main/contracts/SwapRouter02.sol)                                                        | `0xfe31f71c1b106eac32f1a19239c9a9a72ddfb900` |
| [Permit2](https://github.com/Uniswap/permit2)                                                                                                                | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |
| [UniversalRouter](https://github.com/Uniswap/universal-router)                                                                                               | `0x0d97dc33264bfc1c226207428a79b26757fb9dc3` |

These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)


## Uniswap v3 Staker

An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/v3-staker/releases/tag/v1.0.2) for the `UniswapV3Staker` contract.

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

| Network | ChainId  | Wrapped Native Token | Address                                      |
| ------- | -------- | -------------------- | -------------------------------------------- |
| Monad    | `143`  | WMON                | `0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A` |

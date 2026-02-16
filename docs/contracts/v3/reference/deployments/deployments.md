---
id: deployments
title: Deployment Addresses
---

## Uniswap v3 Contract Deployments

The Uniswap Protocol is made up of multiple contracts on many networks.

Please do not assume contracts are deployed to the same addresses across chains, and be extremely careful to confirm addresses before using a contract.

- [`Ethereum`](./Ethereum-Deployments.md)
- [`Unichain`](./Unichain-Deployments.md)
- [`Arbitrum`](./Arbitrum-Deployments.md)
- [`Optimism`](./Optimism-Deployments.md)
- [`Polygon`](./Polygon-Deployments.md)
- [`Base`](./Base-Deployments.md)
- [`BNB`](./BNB-Binance-Deployments.md)
- [`Avalanche C-Chain`](./AVAX-Deployments.md)
- [`CELO`](./Celo-Deployments.md)
- [`Blast`](./Blast-Deployments.md)
- [`ZKsync`](./ZKsync-Deployments.md)
- [`Zora`](./Zora-Deployments.md)
- [`WorldChain`](./WorldChain-Deployments.md)
- [`Monad`](./Monad-Deployments.md)
- [`MegaETH`](./MegaETH-Deployments.md)

These addresses are final and were deployed from these npm package versions:

- [`@uniswap/v3-core@1.0.0`](https://github.com/Uniswap/uniswap-v3-core/tree/v1.0.0)
- [`@uniswap/v3-periphery@1.0.0`](https://github.com/Uniswap/uniswap-v3-periphery/tree/v1.0.0)
- [`@uniswap/swap-router-contracts@1.1.0`](https://github.com/Uniswap/swap-router-contracts/tree/v1.1.0)


## Universal Router

The `UniversalRouter` contract is the current preferred entrypoint for ERC20 and NFT swaps, replacing, among other contracts, `SwapRouter02`. An up-to-date list of [deploy addresses by chain is hosted on GitHub](https://github.com/Uniswap/universal-router/tree/main/deploy-addresses).

## Uniswap Pool Deployments

Every Uniswap pool is a unique instance of the `UniswapV3Pool` contract and is deployed at its own unique address. The contract source code of the pool will be auto-verified on etherscan. For example, here is the [ETH/USDC 0.3% pool](https://etherscan.io/address/0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8) on Ethereum mainnet.

You can look up the address of an existing pool on [Uniswap Info](https://info.uniswap.org/#/) or by calling the [`getPool`](../core/interfaces/IUniswapV3Factory.md#getpool) function on the `UniswapV3Factory` contract.

```solidity
getPool("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 3000)
```

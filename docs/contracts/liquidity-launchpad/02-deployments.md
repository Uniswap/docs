---
id: Deployments
title: Deployments
sidebar_position: 2
---

# Deployments
View the changelogs for more details on differences between contract deployments: [continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction/blob/main/CHANGELOG.md) and [liquidity-launcher](https://github.com/Uniswap/liquidity-launcher/blob/main/CHANGELOG.md).

## ContinuousClearingAuctionFactory
The CCA factory has no constructor parameters so it can be deployed to the same address across all compatible chains.

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v1.1.0  | TODO |  |
| v1.0.0*  | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f |
> *This version is deprecated and should not be used in production.

## LiquidityLauncher
The LiquidityLauncher is a singleton contract which is delployed to the same address across all compatible chains.

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v1.0.0  | 0x00000008412db3394C91A5CbD01635c6d140637C | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d |

## UERC20Factory
The UERC20Factory is a factory contract for new UERC20 tokens.

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v1.0.0  | 0x0cde87c11b959e5eb0924c1abf5250ee3f9bd1b5 | 9705debfea9e6a641bc04352398f9e549055ac44 |

## USUPERC20Factory
The USUPERC20Factory is a factory contract for new Superchain compatible UERC20 tokens. It is only deployed on Superchain L2s.

| Chain                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| Unichain  | 0x000000000022D473030F116dDEE9F6B43aC78BA3 | 9705debfea9e6a641bc04352398f9e549055ac44 |
| Unichain Sepolia  | 0x000000000022D473030F116dDEE9F6B43aC78BA3 | 9705debfea9e6a641bc04352398f9e549055ac44 |
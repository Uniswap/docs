---
id: Deployments
title: Deployments
sidebar_position: 2
---

# Deployments
View the changelogs for more details on differences between contract deployments: [continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction/blob/main/CHANGELOG.md) and [liquidity-launcher](https://github.com/Uniswap/liquidity-launcher/blob/main/CHANGELOG.md).

## ContinuousClearingAuctionFactory
The CCA factory has no constructor parameters so it can be deployed to the same address across all compatible chains.

| Network  | Address                                    | Commit Hash                              | Version          |
| -------- | ------------------------------------------ | ---------------------------------------- | ---------------- |
| v1.1.0   | 0xcca1101C61cF5cb44C968947985300DF945C3565 | 95d7da7a2d25cf60f14eaccd6ab5fb24d393a452 | v1.1.0           |
| v1.0.0\* | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
> \*v1.0.0-candidate is the initial version of CCA and is NOT recommended for production use. See the [Changelog](https://github.com/Uniswap/continuous-clearing-auction/blob/main/CHANGELOG.md) for more details.

## LiquidityLauncher
The LiquidityLauncher is a singleton contract which is delployed to the same address across all compatible chains.

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v1.0.0  | 0x00000008412db3394C91A5CbD01635c6d140637C | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d |

## LBP Strategies
LBP strategies are deployed via factory contracts which are deployed to the same address across all compatible chains.

### FullRangeLBPStrategyFactory
The FullRangeLBPStrategyFactory is a factory contract for the [FullRangeLBPStrategy]().

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v2.0.0  |  |  |

### AdvancedLBPStrategyFactory
The AdvancedLBPStrategyFactory is a factory contract for the [AdvancedLBPStrategy]().

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v2.0.0  |  |  |

## Previous Deployments
The following contracts are deprecated and are not recommended for production use. See the [Changelog](https://github.com/Uniswap/liquidity-launcher/blob/main/CHANGELOG.md) for more details.

### LBPStrategyBasicFactory
The LBPStrategyBasicFactory is a factory contract for the [LBPStrategyBasic]().

| Network | Address | Commit Hash | Version |
|---------|---------|------------|---------|
| Mainnet | 0xbbbb6FFaBCCb1EaFD4F0baeD6764d8aA973316B6 | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d | v1.0.0-candidate |
| Base | 0xC46143aE2801b21B8C08A753f9F6b52bEaD9C134 | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d | v1.0.0-candidate |
| Unichain | 0x435DDCFBb7a6741A5Cc962A95d6915EbBf60AE24 | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d | v1.0.0-candidate |

### VirtualLBPStrategyFactory

| Network | Address | Commit Hash | Version |
|---------|---------|------------|---------|
| Mainnet | 0x00000010F37b6524617b17e66796058412bbC487 | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d | v1.0.0-candidate |
| Sepolia | 0xC695ee292c39Be6a10119C70Ed783d067fcecfA4 | fd5be9b7a918ca3d925d985dff9bcde82b3b8a9d | v1.0.0-candidate |


## UERC20Factory
The UERC20Factory is a factory contract for new UERC20 tokens.

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v1.0.0  | 0x0cde87c11b959e5eb0924c1abf5250ee3f9bd1b5 | 9705debfea9e6a641bc04352398f9e549055ac44 |

## USUPERC20Factory
The USUPERC20Factory is a factory contract for new Superchain compatible UERC20 tokens. It is deployed to the same address across all Superchain compatible L2s.

| Version                                     | Address                                    | Commit Hash                              |
| -------- | ------------------------------------------ | ---------------------------------------- |
| v1.0.0  |  | 9705debfea9e6a641bc04352398f9e549055ac44 |

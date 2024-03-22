---
id: overview
title: Overview
---

## Code

[`governance`](https://github.com/Uniswap/governance)

## Documentation

For reference material on the Uniswap Governance system please see [Governance Reference](../../contracts/v3/reference/governance/overview.md).

## UNI Address

`UNI` is deployed at `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984` on the Ethereum [mainnet](https://etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984), and the [Ropsten](https://ropsten.etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984), [Rinkeby](https://rinkeby.etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984), [Görli](https://goerli.etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984), and [Kovan](https://kovan.etherscan.io/address/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984) testnets. It was built from commit [ab22c08](https://github.com/Uniswap/governance/commit/ab22c084bacb2636a1aebf9759890063eb6e4946).

### ABI

```typescript
import Uni from '@uniswap/governance/build/Uni.json'
```

[https://unpkg.com/@uniswap/governance@1.0.2/build/Uni.json](https://unpkg.com/@uniswap/governance@1.0.2/build/Uni.json)

## Timelock

`Timelock` is deployed at `0x1a9C8182C09F50C8318d769245beA52c32BE35BC` on the Ethereum [mainnet](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC), and the [Ropsten](https://ropsten.etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC), [Rinkeby](https://rinkeby.etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC), [Görli](https://goerli.etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC), and [Kovan](https://kovan.etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC) testnets. It was built from commit [ab22c08](https://github.com/Uniswap/governance/commit/ab22c084bacb2636a1aebf9759890063eb6e4946).

### ABI

```typescript
import Timelock from '@uniswap/governance/build/Timelock.json'
```

[https://unpkg.com/@uniswap/governance@1.0.2/build/Timelock.json](https://unpkg.com/@uniswap/governance@1.0.2/build/Timelock.json)

## GovernorAlpha (Deprecated)

`GovernorAlpha` is deployed at `0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F` on the Ethereum [mainnet](https://etherscan.io/address/0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F), and the [Ropsten](https://ropsten.etherscan.io/address/0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F), [Rinkeby](https://rinkeby.etherscan.io/address/0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F), [Görli](https://goerli.etherscan.io/address/0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F), and [Kovan](https://kovan.etherscan.io/address/0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F) testnets. It was built from commit [ab22c08](https://github.com/Uniswap/governance/commit/ab22c084bacb2636a1aebf9759890063eb6e4946).

### ABI

The `GovernorAlpha` ABI is viewable on [Etherscan](https://etherscan.io/address/0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F), as well as via an [npm package](https://www.npmjs.com/package/@uniswap/governance).

[https://unpkg.com/@uniswap/governance@1.0.2/build/GovernorAlpha.json](https://unpkg.com/@uniswap/governance@1.0.2/build/GovernorAlpha.json)

```typescript
import GovernorAlpha from '@uniswap/governance/build/GovernorAlpha.json'
```

## GovernorAlpha v2 (Deprecated)

`GovernerAlpha v2` is deployed at `0xC4e172459f1E7939D522503B81AFAaC1014CE6F6` on the Ethereum [mainnet](https://etherscan.io/address/0xC4e172459f1E7939D522503B81AFAaC1014CE6F6).

### ABI

The `GovernerAlpha v2` ABI is viewable on [Etherscan](https://etherscan.io/address/0xC4e172459f1E7939D522503B81AFAaC1014CE6F6)

## GovernorBravo (Current)

`GovernorBravo` is deployed at `0x408ED6354d4973f66138C91495F2f2FCbd8724C3` on the Ethereum [mainnet](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3#code).

### ABI

The Governor Bravo ABI can be found on [Etherscan](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3#code).

## Miscellaneous Addresses

**The following addresses only exist on the Ethereum mainnet.**

The UNI merkle distributor address is `0x090D4613473dEE047c3f2706764f49E0821D256e`.

The staking rewards factory address is `0x3032Ab3Fa8C01d786D29dAdE018d7f2017918e12`.

The four staking rewards addresses are:

```js
0x6c3e4cb2e96b01f4b866965a91ed4437839a121a
0x7fba4b8dc5e7616e59622806932dbea72537a56b
0xa1484c3aa22a66c62b77e0ae78e15258bd0cb711
0xca35e32e7926b96a9988f61d510e038108d8068e
```

The four year-long vesting contract addresses are:

```js
0x4750c43867ef5f89869132eccf19b9b6c4286e1a
0xe3953d9d317b834592ab58ab2c7a6ad22b54075d
0x4b4e140d1f131fdad6fb59c13af796fd194e4135
0x3d30b1ab88d487b0f3061f40de76845bec3f1e94
```

The `feeToSetterVester` address is `0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360`.

The `feeTo` address is `0xDAF819c2437a82f9e01f6586207ebF961a7f0970`.

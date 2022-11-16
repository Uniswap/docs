---
id: overview
title: Overview
sidebar_position: 1
---

# The Uniswap V1 Smart Contracts

Uniswap V1 is the first version of the protocol, [launched in November 2018](https://twitter.com/haydenzadams/status/1058376395108376577) at Devcon 4. Because of its permissionless nature, it will exist for as long as Ethereum does.

Designed with simplicity in mind, the Uniswap protocol provides an interface for seamless exchange of ERC20 tokens on Ethereum. By eliminating unnecessary forms of rent extraction and middlemen it allows faster, more efficient exchange. Where it makes tradeoffs, decentralization, censorship resistance, and security are prioritized.

Uniswap is open source and functions as a public good. There is no central token or platform fee. No special treatment is given to early investors, adopters, or developers. Token listing is open and free. All smart contract functions are public and all upgrades are opt-in.

This site will serve as a project overview for Uniswap - explaining how it works, how to use it, and how to build on top of it. These docs are actively being worked on and more information will be added on an ongoing basis.

# V1 Features

- Add support for any ERC20 token using the Uniswap [factory](https://github.com/Uniswap/uniswap-v1/blob/master/contracts/uniswap_factory.vy)
- Join liquidity pools to collect fees on ETH-ERC20 pairs
- Liquidity-sensitive automated pricing using [constant product formula](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf)
- Trade ETH for any ERC20 without wrapping
- Trade any ERC20 for any ERC20 in a single transaction
- Trade and transfer to a different address in a single transaction
- Lowest gas cost of any decentralized exchange
- Support for private and custom uniswap exchanges
- Buy ERC20 tokens from any wallet using ENS
- [Partially verified](https://github.com/runtimeverification/verified-smart-contracts/tree/uniswap/uniswap) smart contracts written in Vyper
- Mobile-optimized open source [frontend implementation](https://github.com/Uniswap/uniswap-interface)
- Funded through an [Ethereum Foundation grant](https://blog.ethereum.org/2018/08/17/ethereum-foundation-grants-update-wave-3/)

# Resources

- [Website](https://uniswap.org)
- [GitHub](https://github.com/Uniswap)
- [Twitter](https://twitter.com/Uniswap)
- [Reddit](https://www.reddit.com/r/Uniswap)
- [Email](mailto:contact@uniswap.org)
- [Whitepaper](https://hackmd.io/s/HJ9jLsfTz)

# How it works

Uniswap is made up of a series of ETH-ERC20 exchange contracts. There is exactly one exchange contract per ERC20 token. If a token does not yet have an exchange it can be created by anyone using the Uniswap factory contract. The factory serves as a public registry and is used to look up all token and exchange addresses added to the system.

Each exchange holds reserves of both ETH and its associated ERC20 token. Anyone can become a liquidity provider on an exchange and contribute to its reserves. This is different than buying or selling; it requires depositing an equivalent value of both ETH and the relevant ERC20 token. Liquidity is pooled across all providers and an internal "pool token" (ERC20) is used to track each providers relative contribution. Pool tokens are minted when liquidity is deposited into the system and can be burned at any time to withdraw a proportional share of the reserves.

Exchange contracts are automated market makers between an ETH-ERC20 pair. Traders can swap between the two in either direction by adding to the liquidity reserve of one and withdrawing from the reserve of the other. Since ETH is a common pair for all ERC20 exchanges, it can be used as an intermediary allowing direct ERC20-ERC20 trades in a single transaction. Users can specify a recipient address if they want to receive purchased tokens at a different address from the one used to make a transaction.

Uniswap uses a "constant product" market making formula which sets the exchange rate based off of the relative size of the ETH and ERC20 reserves, and the amount with which an incoming trade shifts this ratio. Selling ETH for ERC20 tokens increases the size of the ETH reserve and decreases the size of the ERC20 reserve. This shifts the reserve ratio, increasing the ERC20 token's price relative to ETH for subsequent transactions. The larger a trade relative to the total size of the reserves, the more price slippage will occur. Essentially, exchange contracts use the open financial market to decide on the relative value of a pair and uses that as a market making strategy.

A small liquidity provider fee \(0.30%\) is taken out of each trade and added to the reserves. While the ETH-ERC20 reserve ratio is constantly shifting, fees makes sure that the total combined reserve size increases with every trade. This functions as a payout to liquidity providers that is collected when they burn their pool tokens to withdraw their portion of total reserves. Guaranteed arbitrage opportunities from price fluctuations should push a steady flow of transactions through the system and increase the amount of fee revenue generated.

Since Uniswap is entirely on-chain, prices can change between when a transaction is signed and when it is included in a block. Traders can bound price fluctuations by specifying the minimum amount bought on sell orders, or the maximum amount sold on buy orders. This acts as a limit order that will automatically cancel if it is not filled. It is also possible to set transaction deadlines which will cancel orders if they are not executed fast enough.

The reason only one exchange per token can be registered to the factory is to encourage providers to pool their liquidity into a single reserve. However, Uniswap has built in support for ERC20-to-ERC20 trades using the public pools from the factory on one side of the transaction and custom, user-specified pool on the other. Custom pools could have fund managers, use alternate pricing mechanisms, remove liquidity provider fees, integrate complex three dimensional fomo-based ponzi-schemes and more. They just need to implement the Uniswap interface and accept ETH as an intermediary asset. Custom pools do not have the same safety properties as the public ones. It is recommended users only interact with audited, open-source smart contracts.

Upgrading censorship resistant, decentralized smart contracts is difficult. If significant improvements are made to the system a new version will be released. Liquidity providers can choose between moving to the new system or staying in the old one. If possible, new versions will be backwards compatible and able to trade ERC20-to-ERC20 with the old versions similar to a custom pool.

# How to use it

[uniswap.org](https://uniswap.org) is the landing page for the Uniswap protocol. It describes the project and directs users where they need to go.

The Uniswap smart contracts live on Ethereum. Anyone can interact with them directly.

The Uniswap frontend is an open source interface designed to improve user experience when interacting with the smart contracts. Anyone can use the source code to host an interface, or build their own. Hosted interfaces are independent of Uniswap, and should comply with their jurisdictional laws and regulations.

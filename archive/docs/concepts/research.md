---
id: research
title: Research
sidebar_position: 4
---

The [Uniswap Foundation](https://www.uniswapfoundation.org/) supports the protocol's growth and decentralization through strategic research initiatives, empowering our community with grants and resources to conduct groundbreaking research and develop practical implementations that advance the frontier DeFi. Featured research from our community:

## Layer 2 be or Layer not 2 be: Scaling on Uniswap v3

Authors: Austin Adams

> This research paper analyzes how cheaper and faster blockchain networks impact Uniswap v3's performance compared to Ethereum mainnet, revealing that reduced transaction costs lead to better gas-adjusted execution and more efficient capital deployment by liquidity providers. Faster block times and lower costs enable increased arbitrage activity, resulting in higher fee returns for liquidity providers, though there's evidence that 2-second block times may not be optimal compared to a first-come-first-served model. Evidence suggests that many current AMM limitations stem from blockchain constraints rather than protocol design, and these issues can be significantly improved through faster, cheaper transactions.

- [Layer 2 be or Layer not 2 be: Scaling on Uniswap v3 [Mar 2024]](https://arxiv.org/abs/2403.09494)

## Who Wins Ethereum Block Building Auctions and Why?

Authors: Burak Öz, Danning Sui, Thomas Thiery, Florian Matthes

> The MEV-Boost block auction contributes approximately 90% of all Ethereum blocks. Between October 2023 and March 2024, only three builders produced 80% of them, highlighting the concentration of power within the block builder market. To foster competition and preserve Ethereum's decentralized ethos and censorship-resistance properties, understanding the dominant players' competitive edges is essential. This identifies features that play a significant role in builders' ability to win blocks and earn profits by conducting a comprehensive empirical analysis of MEV-Boost auctions over a six-month period. 

- [Who Wins Ethereum Block Building Auctions and Why? [Jul 2024]](https://arxiv.org/abs/2407.13931)

## MEV Capture and Decentralization in Execution Tickets

Authors: Jonah Burian, Davide Crapis, Fahad Saleh

> Provides an economic model of Execution Tickets and uses it to study the ability of the Ethereum protocol to capture MEV from block construction, demonstrating that Execution Tickets extract all MEV when all buyers are homogeneous, risk neutral and face no capital costs. We also show that MEV capture decreases with risk aversion and capital costs. Moreover, when buyers are heterogeneous, MEV capture can be especially low and a single dominant buyer can extract much of the MEV. This adverse effect can be partially mitigated by the presence of a Proposer Builder Separation (PBS) mechanism, which gives ET buyers access to a market of specialized builders, but in practice centralization vectors still persist. With PBS, ETs are concentrated among those with the highest ex-ante MEV extraction ability and lowest cost of capital. We show how it is possible that large investors that are not builders but have substantial advantage in capital cost can come to dominate the ET market.

- [MEV Capture and Decentralization in Execution Tickets [Aug 2024]](https://arxiv.org/abs/2408.11255)

## What Drives Liquidity on Decentralized Exchanges? Evidence from the Uniswap Protocol

Authors: Alex Evans

> Geometric mean market makers (G3Ms), such as Uniswap and Balancer, comprise a popular class of automated market makers (AMMs) defined by the following rule: the reserves of the AMM before and after each trade must have the same (weighted) geometric mean. This paper extends several results known for constant-weight G3Ms to the general case of G3Ms with time-varying and potentially stochastic weights. These results include the returns and no-arbitrage prices of liquidity pool (LP) shares that investors receive for supplying liquidity to G3Ms. Using these expressions, we show how to create G3Ms whose LP shares replicate the payoffs of financial derivatives. The resulting hedges are model-independent and exact for derivative contracts whose payoff functions satisfy an elasticity constraint. These strategies allow LP shares to replicate various trading strategies and financial contracts, including standard options. G3Ms are thus shown to be capable of recreating a variety of active trading strategies through passive positions in LP shares.

- [What Drives Liquidity on Decentralized Exchanges? Evidence from the Uniswap Protocol [Oct 2024]](https://arxiv.org/abs/2410.19107)

## The Evolution of Decentralized Exchange: Risks, Benefits, and Oversight

Authors: Campbell R. Harvey, Joel Hasbrouck, Fahad Saleh

> A decentralized exchange or DEX is an application deployed on a blockchain that allows investors to exchange digital assets at pricing terms determined by a preset exchange rate formula. This technology has several unique features, including accessibility to all investors, transparency of pricing, and simultaneity of execution and settlement. Notably, trading via a DEX is feasible for any asset tokenized on a blockchain. In turn, given that assets such as stocks and bonds could be tokenized easily, it is particularly important to understand the risks posed by DEXs. This paper examines both the benefits and risks to investors from DEXs, explores the role of private and public liquidity pools and analyzes possible regulatory approaches.

- [The Evolution of Decentralized Exchange: Risks, Benefits, and Oversight [Oct 2024]](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4861942)


## Research Initiatives: Get Involved

- [TLDR (The Latest in DeFi Research):](https://www.thelatestindefi.org/) empowers engineers, academics, and students through research fellowships with grants and expert mentorship, culminating in an annual conference to showcase groundbreaking work.

- [CBER CtCe (Crafting the Cryptoeconomy):](https://x.com/UniswapFND/status/1859719158763749514) developed to generate and promote practical yet rigorous research in cryptoeconomics by connecting researchers, economists and practitioners through workshops, grants and conferences. 

- [DEX Analytics Portal:](https://dexanalytics.org/) accurate, verified, and ergonomic DEX and Uniswap datasets to save researchers time.


<!-- 

The automated market maker is a new concept, and as such, new research comes out frequently. We've selected some of the most thoughtful here.

# Uniswap's Financial Alchemy

Authors: Dave White, Martin Tassy, Charlie Noyes, and Dan Robinson

> An automated market maker is a type of decentralized exchange that lets customers trade between on-chain assets like USDC and ETH. Uniswap is the most popular AMM on Ethereum. Like most AMMs, Uniswap facilitates trading between a particular pair of assets by holding reserves of both assets. It sets the trading price between them based on the size of its reserves in such a way that prices will stay in line with the broader market. Anybody who would like to can join the “pool” for a particular pair and become a liquidity provider, or LP, so-called because they provide liquid assets for others to trade against. LPs contribute assets to both reserves simultaneously, taking on some of the risk of trading in exchange for a share of the returns.

- [Uniswap's Financial Alchemy](https://www.paradigm.xyz/2020/12/uniswaps-alchemy) 

# An analysis of Uniswap markets

Authors: Guillermo Angeris, Hsien-Tang Kao, Rei Chiang, Charlie Noyes, Tarun Chitra

> Uniswap---and other constant product markets---appear to work well in practice despite their simplicity. In this paper, we give a simple formal analysis of constant product markets and their generalizations, showing that, under some common conditions, these markets must closely track the reference market price. We also show that Uniswap satisfies many other desirable properties and numerically demonstrate, via a large-scale agent-based simulation, that Uniswap is stable under a wide range of market conditions.

- [An analysis of Uniswap markets](https://arxiv.org/abs/1911.03380)

# Improved Price Oracles: Constant Function Market Makers

Authors: Guillermo Angeris, Tarun Chitra

> Automated market makers, first popularized by Hanson's logarithmic market scoring rule (or LMSR) for prediction markets, have become important building blocks, called 'primitives,' for decentralized finance. A particularly useful primitive is the ability to measure the price of an asset, a problem often known as the pricing oracle problem. In this paper, we focus on the analysis of a very large class of automated market makers, called constant function market makers (or CFMMs) which includes existing popular market makers such as Uniswap, Balancer, and Curve, whose yearly transaction volume totals to billions of dollars. We give sufficient conditions such that, under fairly general assumptions, agents who interact with these constant function market makers are incentivized to correctly report the price of an asset and that they can do so in a computationally efficient way. We also derive several other useful properties that were previously not known. These include lower bounds on the total value of assets held by CFMMs and lower bounds guaranteeing that no agent can, by any set of trades, drain the reserves of assets held by a given CFMM.

- [Improved Price Oracles: Constant Function Market Makers](https://arxiv.org/abs/2003.10001)

# Pintail research

Published [medium](https://medium.com/@pintail) articles by Pintail.

- [Understanding Uniswap Returns](https://medium.com/@pintail/understanding-uniswap-returns-cc593f3499ef)
- [Uniswap: A Good Deal for Liquidity Providers?](https://medium.com/@pintail/uniswap-a-good-deal-for-liquidity-providers-104c0b6816f2)

# Liquidity Provider Returns in Geometric Mean Markets

Authors: Alex Evans

> Geometric mean market makers (G3Ms), such as Uniswap and Balancer, comprise a popular class of automated market makers (AMMs) defined by the following rule: the reserves of the AMM before and after each trade must have the same (weighted) geometric mean. This paper extends several results known for constant-weight G3Ms to the general case of G3Ms with time-varying and potentially stochastic weights. These results include the returns and no-arbitrage prices of liquidity pool (LP) shares that investors receive for supplying liquidity to G3Ms. Using these expressions, we show how to create G3Ms whose LP shares replicate the payoffs of financial derivatives. The resulting hedges are model-independent and exact for derivative contracts whose payoff functions satisfy an elasticity constraint. These strategies allow LP shares to replicate various trading strategies and financial contracts, including standard options. G3Ms are thus shown to be capable of recreating a variety of active trading strategies through passive positions in LP shares.

- [Liquidity Provider Returns in Geometric Mean Markets](https://arxiv.org/abs/2006.08806)

# The Replicating Portfolio of a Constant Product Market

Authors: Joseph Clark

> We derive the replicating portfolio of a constant product market. This is structurally short volatility (selling options) which explains why positive transaction costs are needed to induce liquidity providers to participate. Where futures and options markets do not exist, this payoff can be used to create them.

- [https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3550601](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3550601)

-->
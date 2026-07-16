---
id: filleroverview
title: Filler Overview
sidebar_position: 1
---

UniswapX is a permissionless auction-based protocol where fillers compete to execute user swaps at the best prices. Anyone can participate as a filler by winning these auctions.

This overview covers:
- The difference between quoters (Ethereum) and fillers (all chains)
- How to get started quoting or filling orders
- Common questions and troubleshooting

**Getting Started:**
- Join our [Announcements Channel](https://t.me/uniswapx_fillers) on Telegram for updates
- Join our [Fillers Group](https://t.me/UniswapXdiscussion) on Telegram for discussion
- To quote on Ethereum, join the [waitlist](https://uniswap.typeform.com/to/UiPDKgY6) or [email](mailto:quoters@uniswap.org)

## Quoters vs. Fillers

Ethereum Mainnet uses a two-role system (Quoters + Fillers) due to its 12-second blocks and high gas costs, while L2 chains use only Fillers thanks to their fast block times.

- On Ethereum Mainnet
    - **Quoters** (Permissioned): Provide off-chain quotes through RFQ and compete for exclusive fill rights
    - **Fillers** (Permissionless): Execute orders during Dutch auction if quoters fade or decline
- On L2 Chains  
    - **Fillers only** (Permissionless): All participants compete directly onchain without RFQ

This design ensures optimal price discovery: Ethereum needs off-chain quoting to avoid slow auctions, while L2s can efficiently discover prices onchain.

## Become a Quoter or Filler

### Become a Quoter
In the current Uniswap Labs interface implementation of UniswapX, some fillers may choose to help parameterize orders on Ethereum by participating as quoters. These fillers can *only* win a quote if they guarantee improved swap execution over Uniswap v2, v3 or v4 liquidity pools. Fillers who win a quote will receive execution priority for a limited period to fill orders for which they submitted winning quotes.

To ensure a smooth swapping experience for traders, the set of quoters are vetted by Uniswap Labs. To read about expectations for quoters, please see [Become a Quoter](docs/contracts/uniswapx/fillers/mainnet/becomeQuoter.md). If you are interested in participating as a quoter, please reach out [here](mailto:quoters@uniswap.org) or join the [waitlist](https://uniswap.typeform.com/to/UiPDKgY6).

### Become a Filler 
This documentation contains specific integration guides for each chain. Choose your chain to see specific integration details:

- [Ethereum](/contracts/uniswapx/fillers/mainnet/createFiller.md) - RFQ system with exclusive fill periods 
- [Arbitrum](/contracts/uniswapx/fillers/arbitrum/arbitrumfiller.md) - Direct Dutch auction with 0.25s blocks  
- [Unichain, Base](/contracts/uniswapx/fillers/priority/priorityorderreactor.md) - Priority gas auctions

:::note Auction Types
To learn about the different auction mechanics, please see the [Auction Types Overview](../03-auction-types.md) page. 
:::

Fillers should start with polling for orders and rate limit at 6rps. If after polling, a filler's performance is degraded due to the polling rate limit, please see the [Webhook Support](contracts/uniswapx/fillers/webhooks.md) documentation to learn about registering webhooks for orders.

## Filler FAQ

### Getting Started
<details>
  <summary>Which IPs do I need to whitelist?</summary>

    IPs to whitelist:
    <br/>
    **Beta Test Environment**
    - Quote requests: `3.135.148.114`
    - Order notification webhooks: `3.129.136.245`
    <br/>
    **Production Environment**
    - Quote requests: `3.138.88.28`
    - Order notification webhooks: `3.14.56.90`

</details>

<details>
  <summary>Why don’t I get quote requests for Unichain/Base/Arbitrum?</summary>

    On Ethereum, we use RFQ to accurately parameterize the order which often results in exclusive orders. On L2s, we don’t use RFQ and instead parameterize the auction solely based on the AMM price. As a result, we will only notify fillers of orders that are ready to be executed via the orders API or your registered webhook endpoint. Fill out this [onboarding form](https://forms.gle/FtqVhSinod9fZDNH8) if you would like your endpoint to be notified via webhook, but it is recommended that fillers try polling first and only pursue a webhook as needed. 
    <br/>
    For more information, please see our [Webhook Support Page](./webhooks.md).

</details>

<details>
  <summary>What's the expected RPS for quoting on Ethereum?</summary>

    1 RPS. 

</details>

<details>
  <summary>Which tokens are supported in RFQ?</summary>

    All tokens are supported, except those on the [unsupported token list](https://unsupportedtokens.uniswap.org/). 

</details>

### Technical Issues
<details>
  <summary>I’m getting 404, no quotes available?</summary>

  There are several reasons why you might receive this error:
  
  - **Price Impact**: UniswapX has filters that route trades to the AMM when direct AMM execution would be superior. If the price impact is too high or the benefit of routing through UniswapX isn't significant enough, no quote will be returned for this pair.
  
  - **Order Size**: Very small orders may not be economical to fill through UniswapX due to gas costs. Similarly, extremely large orders might exceed available liquidity from quoters.
  
  - **Response Latency**: If your filler responds but takes longer than 500ms, your quote will be rejected. Ensure your infrastructure can consistently respond within this latency requirement. The quote server is located in AWS `US-EAST-2` if you wish to co-locate to reduce latency.

</details>

<details>
  <summary>The transaction is reverting for a certain reason (e.g. `InvalidOrderFields`). What does this mean?</summary>

    Check the [KNOWN_ERRORS](https://github.com/Uniswap/sdks/blob/a7fb8d7b8eecdc8a29d386420339da86b0361a77/sdks/uniswapx-sdk/src/utils/OrderQuoter.ts#L70) in the SDK to see what the likely causes are.

</details>

<details>
  <summary>Why did my server stop receiving quote requests?</summary>

    Your server may be temporarily blocked due to our fade-rate monitor. If you win an RFQ but don't fill the order, this counts as a "fade." After too many fades, we temporarily stop sending you RFQs. 
    <br/>
    You'll know you're blocked when quote requests include a `blockUntilTimestamp` field indicating when you'll start receiving requests again.

</details>

<details>
  <summary>Why does my fill transaction fail the permit2 nonce check?</summary>

    A permit2 nonce check failure typically means:
    <br/>
    - The order has already been filled by another filler
    - The user cancelled the order
    - The signature has expired
    <br/>
    Before attempting to fill, verify the order is still valid. See: "How do I know if an order is still fillable?"

</details>

### Order Mechanics

<details>
  <summary>How do I know if an order is still fillable?</summary>

    The simulation using the [UniswapXOrderQuoter](https://github.com/Uniswap/sdks/blob/416793e034dd065fe3310f7c26b75c7255f610bb/sdks/uniswapx-sdk/src/utils/OrderQuoter.ts#L175) will tell you whether the order is still fillable.

</details>

<details>
  <summary>How is the OrderHash generated? Is it guaranteed to be unique?</summary>
    
    OrderHashes are generated from the hash of the witness information from the order, and are thus guarenteed to be cryptographically unique. 

</details>

<details>
  <summary>Why do I receive inverse requests for every quote (e.g. USDC\<\>ETH and ETH\<\>USDC)?</summary>

    We perform two quote requests per actual quote to obfuscate the swappers actual request to reduce the chances of front-running.

</details>




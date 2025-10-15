---
id: becomequoter
title: Become a Quoter
sidebar_position: 2
---

This guide provides step-by-step instructions for integrating as a Quoter on UniswapX. It is intended for experienced defi teams that have experience running similar systems on other protocols.

To ensure a smooth swapping experience for traders, the set of Quoters is vetted by Uniswap Labs. There are plans to make the quoting system fully permissionless in the future.

Once you've been approved to be a quoter by the Uniswap Labs team, follow the instructions below to complete your integration. If you have not been approved, please join the waitlist by filling out our [intake form](https://uniswap.typeform.com/to/UiPDKgY6).

## Getting Started as a Quoter
To participate as a quoter, you must host a service that adheres to the UniswapX RFQ API schema and responds to requests with quotes. The RFQ participant who submits the best quote for a given order will receive exclusive rights to fill it using their Executor during the _Exclusivity Period_ of the auction.

## Performance Expectations
To ensure a smooth experience for swappers and a fair auction process for quoters, we will hold participants to the following performance standards:

- ***500ms Response Time:*** Your server must respond to a request for a quote within **500ms**. If you cannot provide a quote, respond with a 204 status code.

Consistent failure to meet this standard may result in suspension from the system.

## Handling Fades & the Circuit Breaker
Quoters are expected to honor and execute the quotes they submit. If a quoter submits a winning quote but fails to fill the subsequent order, the "circuit breaker" will be triggered, temporarily disabling the quoter from receiving new requests.

- ***Cooldown Time:*** The cooldown period starts at 15 minutes for the first fade and increases exponentially for consecutive fades. More details on the cooldown calculation can be found in the [source code](https://github.com/Uniswap/uniswapx-parameterization-api/blob/bf87dcc0066fa21b72255f7155f5fbd04a518594/lib/cron/fade-rate-v2.ts#L215). 

## RFQ API Integration Details
To successfully receive and respond to UniswapX RFQ Quotes, you must have a publicly accessible endpoint that handles incoming quote requests according to the following schema:

### Request Schema:
```jsx
method: POST
content-type: application/json
data: {
    requestId: "string uuid - a unique identifier for swapper's request",
    tokenInChainId: "number - the `tokenIn` chainId",
    tokenOutChainId: "number - the `tokenOut` chainId",
    swapper: "string address - The swapper’s EOA address that will sign the order",
    tokenIn: "string address - The ERC20 token that the swapper will provide",
    tokenOut: "string address - The ERC20 token that the swapper will receive",
    amount: "string number - If the trade type is exact input then this is amount of `tokenIn` the user wants to swap otherwise this is amount of tokenOut the user wants to receive",
    type: "number - This is either `EXACT_INPUT` or `EXACT_OUTPUT`",
    quoteId: "string uuid - a unique identifier for the quote an integrator is sending back"
}
```

### Response Schema:
If you can fulfill the quote request, your server should respond with (status 200 - OK) and the following data:
```jsx
{
    chainId: "number - the chainId for the quoted token",
    amountIn: "string number - If the request type is exact input then this field is `amount` from the quote request, otherwise this is the provided quote",
    amountOut: "string number - If the request type is exact output then this field is `amount` from the quote request, otherwise this is the provided quote",
    filler: "string address - The executor address that you would like to have last-look exclusivity for this order"

    { ...The following fields should be echoed from the quote request...},
    requestId: "string uuid - a unique identifier for this quote request",
    swapper: "string address - The swapper’s EOA address that will sign the order",
    tokenIn: "string address - The ERC20 token that the swapper will provide",
    tokenOut: "string address - The ERC20 token that the swapper will receive",
    quoteId: "string uuid - a unique identifier for the quote an integrator is sending back"
}
```

If you do not wish to respond to a quote request, you must return an empty response with status code `204`.

### Schema When Disabled Due to Circuit Breaker
If you are an onboarded quoter who is currently disabled by the circuit breaker, your server will receive the following message on the same quote endpoint:

```jsx
method: POST
content-type: application/json
data: {
    blockUntilTimestamp: "timestamp - the timestamp that this quoter is disabled until"
}
```

## Moving to Production
All new quoter instances will start by being onboarded to our [Beta environment](https://beta.api.uniswap.org/v2/uniswapx/docs). Here, they will need to demonstrate at least **5 valid Exclusive RFQ fills** to be moved to production. The Beta environment serves valid mainnet orders that should be filled against production contracts but does not receive traffic from production interfaces.

### Steps to Move to Production

1. **Provide their quote server URL** to your Uniswap Labs contact along with the contract address you’re using to fill. We recommend that this be the same quoting infrastructure that you plan to run in production. 
2. **(Optional) Provide notification webhook URL** to you Uniswap Labs contact. We’ll set up notifications of won orders to be served there. Alternatively, you can poll the [Beta /orders Endpoint](https://beta.api.uniswap.org/v2/uniswapx/docs) for won orders. 
3. **Begin sending quotes and orders to beta** via the [UniswapX CLI](https://github.com/Uniswap/uniswapx-tool?tab=readme-ov-file#simple-order-creation). Reach out to the Uniswap team to be added to the private github.
4. **Send hashes of 5 filled transactions** that demonstrate that the integration was able to fill during the exclusive period; specifically before [decayStartTime](https://github.com/Uniswap/UniswapX/blob/abd7a0b080148fc42ef7c86536d14de714eec4c7/src/lib/ExclusiveDutchOrderLib.sol#L12)

The Uniswap Labs team will review the 5 transactions to confirm they were successful exclusive fills. Once they are confirmed, the quoters setup will be promoted to production and will start receiving traffic.


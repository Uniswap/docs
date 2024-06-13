---
id: becomequoter
title: Become a Quoter
sidebar_position: 2
---
# Quoting During UniswapX Beta
To ensure a smooth swapping experience for traders during the beta period, the set of Quoters will be vetted by Uniswap Labs following UniswapX’s launch, with plans to make the quoting system fully permissionless in the near future.

Once you've been approved to be a quoter by the Uniswap Labs team follow the instructions below to complete your integration. If you have not been approved, please join the waitlist by filling out our [intake form](https://uniswap.typeform.com/to/UiPDKgY6).

# Integrating with UniswapX RFQ

To participate as quoters, fillers must host a service that adheres to the UniswapX RFQ API schema (below) and responds to requests with quotes. The RFQ participant who submits the best quote for a given order will receive exclusive rights to fill it using their Executor during the _Exclusivity Period_ of the auction.

## Performance Expectations
During the UniswapX beta period, quoters will be expected to uphold the following standards to assure a fair auction process and the best experience for swappers. Any quoters who drop below these expectations are subject to suspension or removal from the UniswapX beta: 

1. **500ms Response Time:** When a quoter receives a request for quote, their server should respond within 500ms with either a quote for the trade or a 204 response code
2. **90% Rolling Fill Rate:** When a quoter wins an auction, meaning their contract address is in the `exclusiveFiller` field of an order, they are required to fill that order >90% of the time. We'll measure this on a rolling 7-day day period.

## RFQ API Schema

To successfully receive and respond to UniswapX RFQ Quotes, you must have a publicly accessible endpoint that receives incoming quote requests and responds with quotes by implementing the following schema:

Request:

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

Response (status 200 - OK):

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

There is a latency requirement on responses from registered endpoints. Currently set to 500ms, but is subject to change. If you do not wish to respond to a quote request, you must return an empty response with status code `204`.

# Requirements for Moving to Prod

All new quoter instances will start by being onboarded to our [Beta environment](https://beta.api.uniswap.org/v2/uniswapx/docs), where they will need to demonstrate at least **5 valid Exclusive RFQ fills** in order to be moved to production. The [Beta environment](https://beta.api.uniswap.org/v2/uniswapx/docs) serves valid mainnet orders that should be filled against production contracts, it just does not receive traffic from any production interfaces. 

To begin testing in beta quoters will need to: 

1. **Provide their quote server URL** to your Uniswap Labs contact along with the contract address you’re using to fill. We recommend that this be the same quoting infrastructure that you plan to run in production. 
2. **(Optional) Provide notification webhook URL** to you Uniswap Labs contact. We’ll set up notifications of won orders to be served there. Alternatively, you can poll the [Beta /orders Endpoint](https://beta.api.uniswap.org/v2/uniswapx/docs) for won orders. 
3. **Begin sending quotes and orders to beta** via the [UniswapX CLI](https://github.com/Uniswap/uniswapx-tool?tab=readme-ov-file#simple-order-creation). 
4. **Send hashes of 5 filled transactions** that demonstrate that the integration was able to fill during the exclusive period; specifically before [decayStartTime](https://github.com/Uniswap/UniswapX/blob/abd7a0b080148fc42ef7c86536d14de714eec4c7/src/lib/ExclusiveDutchOrderLib.sol#L12)

The Uniswap Labs team will review the 5 transactions to confirm they were successful exclusive fills. Once they are confirmed, the quoters setup will be promoted to production and will start receiving traffic.

# (Optional) Signed Order Webhook Notifications

Signed open orders can always be fetched via the UniswapX API, but to provide improved latency there is the option to register for webhook notifications. Quoters can register an endpoint with their filler address, and receive notifications for every newly posted order that matches the filter. 

**Filter**

Orders can be filtered by various fields, but most relevant here is `filler`. When registering your webhook notification endpoint, we recommend you provide the `filler` address that you plan to use to execute orders and to receive the last-look exclusivity period. Alternatively the webhook can be configured to send all open orders to your endpoint.

**Filter**

To register your webhook endpoint, please reach out in [UniswapX Fillers - Discussion](https://t.me/uniswapx_fillers_discussion).

**Notification**

Order notifications will be sent to the registered endpoint as http requests as follows:

```jsx
method: POST
content-type: application/json
data: {
    orderHash: "the hash identifier for the order", 
    createdAt: "timestamp at which the order was posted",
    signature: "the swapper signature to include with order execution",
    orderStatus: "current order status (always should be `open` upon receiving notification)",
    encodedOrder: "The abi-encoded order to include with order execution. This can be decoded using the Uniswapx-SDK (https://github.com/uniswap/uniswapx-sdk) to verify order fields and signature",
    chainId: "The chain ID that the order originates from and must be settled on",
    filler?: "If this order was quoted by an RFQ participant then this will be their filler address",
    quoteId?: "If this order was quoted by an RFQ participant then this will be the requestId from the quote request",
    swapper?: "The swapper address",
    type?: "The order type (e.g. 'Dutch_V2', 'Limit', etc)"
}
```
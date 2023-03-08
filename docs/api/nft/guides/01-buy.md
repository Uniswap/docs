---
id: examples
title: Buying NFTs
---
# Introduction

Uniswap NFT makes adding the NFT purchase functionality to your application simple. At a high level integrators will: 

1. Send a request to the Uniswap API specifying the assets to be purchased. The API will find the best price for that asset across our onboarded marketplaces and return the calldata to execute the purchase 
2. Use the provider or wallet of their choosing to execute that calldata and complete the purchase

The Uniswap API is designed to be flexible and easy to integrate, below is a simple walk through of how you can use it to add the purchase of NFTs to your web application. 

## Calling the `/buy_intent` Endpoint

The `/buy_intent` endpoint of the Uniswap API is designed to seamlessly allow your application to perform all the necessary steps to purchase NFTs. 

The endpoint accepts the following parameters to specify which NFTs a user would like to purchase: 

```json
POST: /buy_intent
BODY: 
{
  "buyerAddress": "String: The address of the account purchasing the NFT",
  "chain": "String: The chain the NFT is on",
  "tokens": [{
    "collectionAddress": "String: the address of the collection to purchase",
    "tokenId": "String: The id of the specific asset in the collection",
  }] 
} 
```

The response will be an object that specifying the steps necessary for a user to complete the purchase. To demonstrate, the below is an example response from the API we can walk through in more detail:  

```json
{
  "requestId": "e540c05c-e979-45c6-83fe-be4d2a7f0edc",
  "tokens": [
    {
      "tokenId": "10108",
      "collectionAddress": "0x76be3b62873462d2142405439777e971754e8e77",
      "marketplace": "NFTX",
      "amount": 1,
      "quote": {
          "currency": "ETH",
          "rawValue": "1205851250141177"
      },
      "status": [ "REQUIRES_ROUTE_TX" ],
    },
    {
      "tokenId": "10110",
      "collectionAddress": "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
      "marketplace": "OPENSEA",
      "amount": 1,
      "quote": {
          "currency": "ETH",
          "rawValue": "1345851250141177"
      },
      "status": [ "REQUIRES_ROUTE_TX" ],
    }
  ],
  "actions": [
    {
      "tokenIndexes" : [ 0, 1],
      "method": "eth_sendTransaction",
      "payload": {
          "from": "0x17A18958F70fD2C863B7306B90d68D9586a86fb1",
          "to": "0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B",
          "value": "1205851250141177",
          "data": "0x24856bc3000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002120400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000448b71f6aa7f9000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001447fc824840000000000000000000000000000000000000000000000000000000000000071000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000017a18958f70fd2c863b7306b90d68d9586a86fb10000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000277c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000004304940f12f9740ffce4124d0e2ec1340cc6f349000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"
      }
    }
]
}
```

The first field is a `requestId` which can be used to track and recall the request made. 
The next field, the `tokens` list, is a list of all the tokens requested to purchase and all of the information about each. 
Some important fields to understand are: 

- `marketplace`: This is the marketplace where Uniswap NFT found the best price available for the requested asset.
- `quote`: The listing price that Uniswap NFT discovered and the currency that the use will be paying in (this defaults to ETH)
- `status`: If the requested assets were discovered on a marketplace this field will include “REQUIRES_ROUTE_TX”. If the asset wasn’t found on any marketplace the status will be “NO_LISTINGS”.

The third field, the `actions` list, is a list of all the actions that need to be executed on the client to complete the purchase. The `payload` field of each action can be signed and sent using an [Ethereum client](https://docs.ethers.org/v5/api/signer/) `eth_sendTransaction` method to execute the action.

## Simple Example

You can use the `buy_intent` endpoint to add the purchase of NFTs directly to your web app in about 5 lines of code. Below is an example implementation using the auto-generated client of the Uniswap API. In the example, we simply call the API, get the actions required to complete a transaction and uses a connected wallet to execute the transaction: 

```typescript title="Create Trade calldata" 
 const response = await new BuyApi().buyIntent({
      buyerAddress,
      tokens: trades,
    })

    response.data.actions?.forEach(async (action) => {
      const txPayload = action.payload
      const gasLimit = await provider.estimateGas(txPayload)
      await provider.getSigner().sendTransaction({ ...txPayload, gasLimit })
    })
```

## Coming Next

We are actively adding features to this Alpha software and plan to soon add functionality to: 

- - Allowing purchase of NFTs from the Polygon ecosystem
- Allow payment for NFTs using any ERC-20 token

Check back to these docs for updates!



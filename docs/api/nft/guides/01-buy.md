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
  "currency": "String: The currency the NFT is bought in",
  "tokens": [{
    "collectionAddress": "String: the address of the collection to purchase",
    "tokenId": "String: The id of the specific asset in the collection",
    "amount": "Number: The amount of the asset to purchase"
  }] 
} 
```

The response will be an object specifying the steps necessary for a user to complete the purchase. To demonstrate, the below is an example response from the API we can walk through in more detail:  

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
      "amount": 1,
      "status": [ "REQUIRES_APPROVAL" ],
    }
  ],
  "actions": [
    {
      "tokenIndexes" : [0, 1],
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

The response will include the following fields:
- `requestId`: An id which can be used to track and recall the request made.
- `tokens`: A list of all the tokens requested to purchase and all of the information about each.
  - `marketplace`: This is the marketplace where Uniswap NFT found the best price available for the requested asset.
  - `quote`: The listing price that Uniswap NFT discovered and the currency that the use will be paying in (this defaults to ETH).
  - `status`: The current status of the token during this buy intent. Intended to be used for UI state update purposes.
- `actions`: A list of all the actions that need to be executed on the client to complete the purchase. This field will be empty if there are no actions required to complete the purchase.
  - `tokenIndexes`: A list of all the tokens that are affected by this action. This is used to determine which tokens need to be updated in the UI after the action is executed.
  - `method`: The method that should be called to execute the action.
  - `payload`: The payload that should be sent to the method to execute the action.

The `status` field of each token will be one of the following:
- `REQUIRES_ROUTE_TX`: The user needs to approve the *buy* transaction.
- `ALREADY_OWNED`: The user already owns the token.
- `NO_LISTINGS`: No listings were found for the token.
- `REQUIRES_APPROVE_TX`: (PWAT only) The user needs to approve the Permit2 to spend the input currency.
- `REQUIRES_PERMIT_SIGN`: (PWAT only) The user needs to sign the permit to spend the input currency.


## Simple Example

You can use the `buy_intent` endpoint to add the purchase of NFTs directly to your web app in a few lines of code. Below is an example implementation using the auto-generated client of the Uniswap API. In the example, we simply call the API, get the actions required to complete a transaction and uses a connected wallet to execute the transaction: 

```typescript title="Create Trade calldata"
import { BuyApi } from '../types/generated-sources/openapi'

let response = await new BuyApi().buyIntent(
  {
    buyerAddress,
    chain,
    currency,
    tokens,
  },
  {
    headers: {
      'x-api-key': 'YOUR_API_KEY',
    },
  }
)
let permit

while (response.data.actions?.length !== 0) {
  // Iterate over all the actions and execute them
  for (const action of response.data.actions ?? []) {
    const method = action.method
    const payload = action.payload

    if (method === 'eth_signTypedData') {
      const { types, values, domain } = payload as any
      const signature = await signer._signTypedData(domain, types, values)

      permit = {
        signature,
        spender: values?.spender,
        sigDeadline: values?.sigDeadline.toString(),
        details: {
          ...values?.details,
          amount: values?.details.amount.hex,
        },
      }
    } else {
      const gasLimit = await provider.estimateGas({ ...payload, value: undefined })
      await signer.sendTransaction({ ...payload, gasLimit, value: undefined })
    }
  }

  // Call the buy intent endpoint again to get the next set of actions
  response = await new BuyApi().buyIntent(
    {
      buyerAddress,
      chain,
      currency,
      tokens,
      permit,
    },
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
      },
    }
  )
}
```

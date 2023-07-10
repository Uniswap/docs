---
id: create
title: Create Offers
---

# Create Offers (Coming Soon)

Uniswap NFT API provides easy to use endpoints that allow integrators to programmatically create signed offers for assets across supported marketplaces. By sending offers to multiple marketplaces your users maximize their chance of a successful purchase.

Similar to other Uniswap NFT endpoints, to create offers a caller will start by creating an **************Offer Intent.************** 

## Calling the `/offer_intent` Endpoint

Creating an **************Offer Intent************** provides the caller with all of the methods required to create offers on one or more supported marketplaces. To create an offer, the caller will create a request with the following information: 

```jsx
POST: /offer_intent
BODY: 
{
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "offerer": "0x123",
  "offerPrice": 100,
  "offerAsset": "ETH",
  "expiresAt": "2017-07-21T17:32:28Z",
  "marketplaces": [
    "OPENSEA"
  ]
}
```

Here the caller specifies the details of their offer to purchase an asset that they do not currently hold. The API will then return an ************Offer Intent************ that lists the actions they need to perform to create offers on the requested marketplaces: 

```jsx
{
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "offerPrice": 100,
  "offerAsset": "ETH",
  "expiresAt": "2017-07-21T17:32:28Z",
  "actions": [
    {
      "marketplace": "OPENSEA",
      "method": "eth_sendTransaction",
      "payload": {
        "from": "0x123",
        "to": "0x345",
        "value": "100",
        "data": "0x678"
      }
    }
  ]
}
```

By sequentially iterating through and executing the transactions defined by the `actions` array, the caller will create offers across all the requested marketplaces. 
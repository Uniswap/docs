---
id: create
title: Create Listings
---
# List Across Marketplaces (Coming Soon)

Uniswap NFT provides a simple layer for your users to list their assets for sale on between one and all supported marketplaces. Using an aggregator like Uniswap NFT allows you to choose the marketplace(s) that are right for your users and maximizes their access to potential buyers. 

To integrate the **Aggregated Listing** functionality you’ll need to add the following steps to your application: 

1. Create a **Listing Intent** by posting intended listing information (price, expiry, marketplaces to list on etc.) to the `/listing_intent` end point.
2. The **Listing Intent** returned will include a series of **Actions** your user will need to complete. Iterate through each **Action** required to complete the listing. 

## Creating a Listing Intent:

Creating a **Listing Intent** provides the caller with all of the methods required to create a listing on one or more supported marketplaces. To create one, the caller will create a request with the following information: 

```json
POST: /listing_intent
BODY: 
{
  "ownerAddress": "0x123",
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "marketplaces": [
    "OPENSEA"
  ],
  "listingPrice": 100,
  "listingAsset": "ETH",
  "expiresAt": "2017-07-21T17:32:28Z"
}
```

For the call to be successful the `ownerAddress` field needs to match the owner of the specified asset. The `marketplaces` array allows the caller to specify which marketplaces they’d like to list on, and the `listingPrice`, `listingAsset` and `expiresAt` fields let them set the details of the listing. 

A successful call will return a **Listing Intent** that specifies the Actions that need to be taken to list the asset on the requested marketplaces: 

```json
{
  "ownerAddress": "0x123",
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "listPrice": 100,
  "listAsset": "ETH",
  "actions": [
    {
      "marketplace": "OPENSEA",
      "description": "Approve to list on OpenSea.",
      "method": "eth_sendTransaction",
      "payload": {
        "from": "0x123",
        "to": "0x345",
        "data": "0x678"
      }
    }
  ]
}
```

The caller should confirm that the details in the first part of the response match their request, then to execute the request, should iterate through and complete the methods specified in the `actions` array. 
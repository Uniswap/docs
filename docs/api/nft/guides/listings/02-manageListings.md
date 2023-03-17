---
id: manage
title: Manage Listings
---

# Manage Listings (Coming Soon)

Along with creating new listings, the API also supports methods for getting and managing existing listings. 

### Get All Listings for an Asset

To get all active listings for an asset, across every supported marketplace, integrators can call the following method: 

```jsx
GET: /listings/{collectionId}/{tokenId}
```

This will return information about the owner of the asset as well as information about any active listings for it across the supported marketplaces: 

```jsx
{
  "ownerAddress": "0x123",
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "listings": [
    {
      "marketplace": "OPENSEA",
      "txnHash": "0x123",
      "listingPrice": 100,
      "listingAsset": "ETH",
      "expiresAt": "2017-07-21T17:32:28Z"
    }
  ]
}
```

### Cancel a Listing

To cancel a listing, the address that created the original listing will need to send a cancellation transaction. Note that sending a cancellation transaction does not guarantee that a listing will be cancelled, if it’s purchased before the cancellation, the transaction cannot be reversed. 

To retrieve the transaction information to cancel a listing, a caller will first create a `Cancel Listing Intent` object that references the transaction hash of the offer and then execute the actions it contains: 

```jsx
POST: /listing_cancel_intent
BODY: 
{
  "txnHash": "0x123",
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
	"marketplace": "OPENSEA",
	"ownerAddress": "0x123", 
}
```

Like the creation end point, this will return an ***Intent*** that contains the required action to cancel the specified listing. The cancellation transaction will only be accepted if the caller is the same address that created the initial listing: 

```jsx
{
  "listing": {
    "marketplace": "OPENSEA",
    "txnHash": "0x123",
    "listingPrice": 100,
    "listingAsset": "ETH",
    "expiresAt": "2017-07-21T17:32:28Z"
  },
  "actions": [
    {
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

A caller can execute the transaction included in the action object to request a cancellation to their listing. 
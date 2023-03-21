---
id: manage
title: Manage Offers
---

# Manage Offers (Coming Soon)

Along with creating new offers, the API also supports methods for getting and managing existing offers across marketplaces.

### Retrieving Offers for an Asset

To get all offers for an asset across marketplaces, query the offers endpoint: 

```json
 GET: /offers/{collectionId}/{tokenId}
```

This will return a list of the existing offers for the specified asset. Included in each returned offer, is the calldata that the owner of the asset needs to send in order to execute that offer:  

```json
{
  "ownerAddress": "0x123",
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "offers": [
    {
      "txnHash": "0x123",
      "offerPrice": 100,
      "offerAsset": "ETH",
      "expiresAt": "2017-07-21T17:32:28Z",
      "offererAddress": "0x123",
      "marketplace": "OPENSEA",
      "acceptActions": [
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
  ]
}
```

### Canceling an Offer

To cancel an Offer, the address that created the original offer will need to send a cancelation transaction. Note that sending a cancellation transaction does not guarantee that an offer will be cancelled, if it’s accepted before the cancellation it cannot be reversed. 

To retrieve the transaction information to cancel an Offer, a caller will first create a `Cancel Offer Intent` object that references the transaction hash of the offer and then execute the actions it contains: 

```jsx
POST: /offer_cancel_intent
BODY: 
{
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "txnHash": "0x123" 
}
```

Like the creation end point, this will return an ***Intent*** that contains the required action to cancel the specified offer. The cancellation transaction will only be accepted if the caller is the same address that created the initial offer: 

```json
{
  "chaindId": 1,
  "collection": "0x123",
  "tokenId": "0x123",
  "offerPrice": 100,
  "offerAsset": "ETH",
  "expiresAt": "2017-07-21T17:32:28Z",
  "action": {
    "method": "eth_sendTransaction",
    "payload": {
      "from": "0x123",
      "to": "0x345",
      "value": "100",
      "data": "0x678"
    }
  }
}
```

A caller can execute the transaction included in the action object to request a cancellation to their offer.
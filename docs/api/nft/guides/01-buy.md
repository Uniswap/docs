---
id: examples
title: Trading NFTs
---

## Buying NFTs

```typescript title="Create Trade calldata" 
 const response = await axiosClient.post('/buy_intent', {
      collectionAddress,
      tokenId,
      buyerAddress,
    })

    if (response.status !== 200) {
      console.log('Request error', response)
      return
    }

    const data = response.data as BuyIntentResponseBody
    data.tokens.forEach(async (token: BuyIntentResponseBodyTokensInner) => {
      if (token.status.indexOf(BuyIntentResponseBodyTokensInnerStatusEnum.RequiresRouteTx) === 0) {
        const txPayload = token.actions[0].payload
        const gasLimit = await provider.estimateGas(txPayload)
        await provider.getSigner().sendTransaction({ ...txPayload, gasLimit })
      }
    })
  }
```
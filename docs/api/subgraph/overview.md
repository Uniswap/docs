---
id: overview
sidebar_position: 1
title: Overview
---

# The Uniswap Subgraph

Uniswap uses multiple [subgraphs](https://thegraph.com/docs/about/introduction#what-the-graph-is) for indexing and organizing data from the Uniswap smart contracts.
These subgraphs are hosted on The Graph and can be used to query Uniswap data.

## Versions and Production Endpoints

Each version of Uniswap for each chain has its own dedicated subgraph. As hosted subgraphs have been depreciated, you will now need to call through their decentralized subgraphs.

Each subgraph has a dedicated endpoint for querying data, as well as a page on [The Graph explorer](https://thegraph.com/explorer) that exposes the schema and available fields to query.

## Creating an API Key

API Keys can be created by users inside the [Studio](https://thegraph.com/studio/apikeys/). This key will be included into the endpoint to associate a consumers usage to their billing.  


##### v4 (Mainnet)

- [Subgraph](https://thegraph.com/explorer/subgraphs/DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G?view=About&chain=arbitrum-one)
- Graphql Endpoint: `https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G`
- Code: https://github.com/Uniswap/v4-subgraph

##### v3 (Mainnet)

- [Subgraph](https://thegraph.com/explorer/subgraphs/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV?view=Query&chain=arbitrum-one)
- Graphql Endpoint: `https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
- Code: https://github.com/Uniswap/v3-subgraph

##### v2 (Mainnet)

- [Subgraph](https://thegraph.com/explorer/subgraphs/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum?view=Query&chain=arbitrum-one)
- Graphql Endpoint: `https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum`
- Code: https://github.com/Uniswap/v2-subgraph

##### v1 (Mainnet)

- [Explorer Page](https://thegraph.com/explorer/subgraphs/ESnjgAG9NjfmHypk4Huu4PVvz55fUwpyrRqHF21thoLJ?view=Query&chain=arbitrum-one)
- Graphql Endpoint: `https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/ESnjgAG9NjfmHypk4Huu4PVvz55fUwpyrRqHF21thoLJ`
- Code: https://github.com/graphprotocol/uniswap-subgraph

## v3 Subgraphs for other chains

| Chain | V3 |
|--|--|
| Arbitrum | [Subgraph](https://thegraph.com/explorer/subgraphs/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM?view=Query&chain=arbitrum-one) |
| Base | [Subgraph](https://thegraph.com/explorer/subgraphs/43Hwfi3dJSoGpyas9VwNoDAv55yjgGrPpNSmbQZArzMG?view=Query&chain=arbitrum-one) |
| Optimism | [Subgraph](https://thegraph.com/explorer/subgraphs/Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj?view=Query&chain=arbitrum-one) |
| Polygon | [Subgraph](https://thegraph.com/explorer/subgraphs/3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm?view=Query&chain=arbitrum-one) |
| BSC | [Subgraph](https://thegraph.com/explorer/subgraphs/F85MNzUGYqgSHSHRGgeVMNsdnW1KtZSVgFULumXRZTw2?view=Query&chain=arbitrum-one) |
| Avalanche | [Subgraph](https://thegraph.com/explorer/subgraphs/GVH9h9KZ9CqheUEL93qMbq7QwgoBu32QXQDPR6bev4Eo?view=Query&chain=arbitrum-one) |
| Celo | [Subgraph](https://thegraph.com/explorer/subgraphs/ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4?view=Query&chain=arbitrum-one) |
| Blast | [Subgraph](https://thegraph.com/explorer/subgraphs/2LHovKznvo8YmKC9ZprPjsYAZDCc4K5q4AYz8s3cnQn1?view=Query&chain=arbitrum-one) |

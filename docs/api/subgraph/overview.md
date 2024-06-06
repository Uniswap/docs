---
id: overview
sidebar_position: 1
title: Overview
---

# The Uniswap Subgraph

Uniswap uses multiple [subgraphs](https://thegraph.com/docs/about/introduction#what-the-graph-is) for indexing and organizing data from the Uniswap smart contracts.
These subgraphs are hosted on The Graph and can be used to query Uniswap data.

## Versions and Production Endpoints

Each combination of contract version and chain has its own dedicated subgraph.

Each subgraph has a dedicated endpoint for querying data, as well as a page on [The Graph explorer](https://thegraph.com/explorer/) the exposes the schema and available fields to query.

## Creating an API Key

API Keys can be created by users inside the [Studio](https://thegraph.com/studio/apikeys/). This key will be included into the endpoint to associate a consumers usage to their billing.  


## V2 & V3 Subgraphs

| Chain | V2 - [Repo](https://github.com/Uniswap/v2-subgraph) | V3 - [Repo](https://github.com/Uniswap/v3-subgraph) | Blocks |
|--|--|--|--|
| Ethereum | [Subgraph](https://thegraph.com/explorer/subgraphs/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum?view=Query&chain=arbitrum-one) | [Subgraph](https://thegraph.com/explorer/subgraphs/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV?view=Query&chain=arbitrum-one) | [Blocks](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/9A6bkprqEG2XsZUYJ5B2XXp6ymz9fNcn4tVPxMWDztYC) |
| Arbitrum | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM?view=Query&chain=arbitrum-one) | [Blocks](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/64DCU8nq48qdDABnobpDafsg7RF75Rx5soKrHiGA8mqp) |
| Base | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/43Hwfi3dJSoGpyas9VwNoDAv55yjgGrPpNSmbQZArzMG?view=Query&chain=arbitrum-one) | [Blocks](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/CEtsgUQz6M7VDwFkS8HAxQVvpf5N8ZgdGXuWD4i8CsWZ) |
| Optimism | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj?view=Query&chain=arbitrum-one) | |
| Polygon | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm?view=Query&chain=arbitrum-one) | [Blocks](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/DMnXZnphMTkcFiK5NHm6LzwhJ7yUy7seVnZuNkNsXLHp) |
| BSC | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/F85MNzUGYqgSHSHRGgeVMNsdnW1KtZSVgFULumXRZTw2?view=Query&chain=arbitrum-one) | [Blocks](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/aFYiBZ2nkQVbv1HsKTQcPpWBxCAiJY4w4pG8RXaDxge) |
| Avalanche | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/GVH9h9KZ9CqheUEL93qMbq7QwgoBu32QXQDPR6bev4Eo?view=Query&chain=arbitrum-one) | |
| Celo | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4?view=Query&chain=arbitrum-one) | [Blocks](https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/5Uhq8XrBsxdRwMKBNXcp4GuHp1SRmqPK5hgCCMqxDxhB) |
| Blast | Subgraph | [Subgraph](https://thegraph.com/explorer/subgraphs/2LHovKznvo8YmKC9ZprPjsYAZDCc4K5q4AYz8s3cnQn1?view=Query&chain=arbitrum-one) | |


##### V1

- [Explorer Page](https://thegraph.com/explorer/subgraphs/ESnjgAG9NjfmHypk4Huu4PVvz55fUwpyrRqHF21thoLJ?view=Query&chain=arbitrum-one)
- Graphql Endpoint: `https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/ESnjgAG9NjfmHypk4Huu4PVvz55fUwpyrRqHF21thoLJ`
- Code: https://github.com/graphprotocol/uniswap-subgraph

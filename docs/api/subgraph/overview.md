---
id: overview
sidebar_position: 1
title: Overview
---

## The Uniswap Subgraph

Uniswap uses multiple [subgraphs](https://thegraph.com/docs/about/introduction#what-the-graph-is) for indexing and organizing data from the Uniswap smart contracts.
These subgraphs are hosted on The Graph hosted service and can be used to query Uniswap data.

### Versions and Production Endpoints

Each version of Uniswap has its own dedicated subgraph, and governance contracts have a dedicated subgraph as well.

Each subgraph has a dedicated endpoint for querying data, as well as a page on [The Graph explorer](https://thegraph.com/explorer) that exposes the schema and available fields to query.

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

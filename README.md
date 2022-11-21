# Project Layout

### The project is broken down into 4 sections
- Concepts - General Uniswap information or concepts useful for using Uniswap products, such as *Liquidity* and *Fees*
- Contracts - The Uniswap smart contracts such as *Permit2*, or groupings such as the V3 Contracts
- SDKs - The Uniswap SDKs such the *v3-sdk*
- APIs - The Uniswap APIs such the *Subgraph API*

### Each section contains items of that category
For each item there should be:
- *Overview*
- *Guides*
- *Technical Reference*

## Deep dive into the requirements of each part

### Overview
This should be an overview of the product.
It should address points such as:

- What are the high level components of the product
- What are the high level functionalities
- Where does the source code of the product live
- Where does the code artifact live (eg *npm*) and how to integrate with it

A good example is the [V3 Smart Contracts](./docs/contracts/v3/overview.md).

### Guides
This should contain guides for using the product.
Each guide must have 3 parts:
- An introduction
- A step-by-step walk through of each line of code. The guide should not include code that is not part of the example, but should instead reference or link those pieces.
- An output or end state that users can test against

A good example is the [V3 SDK Guides](./docs//sdk/v3/guides/01-quick-start.md).

### Technical References
This should contain the technical reference for the exported interfaces.
A good example is the [V3 Smart Contracts](./docs/contracts/v3/reference/overview.md).

## Checklist for adding a new product
Let's walk through an example of adding documentation for new contract, say *Permit2* 

| Question  | Complete |
| ------------- | ------------- |
| Did I pick the right section for the product? | In this case, [contracts](./docs/contracts/)  |
| Did I create the product folder?   | In this case, [yes](./docs/contracts/permit2/)  |
| Did I introduce any new concepts? | In this case no, but if so add [here](./docs/concepts/) |
| Did I include an Overview of the product under <product_name>/overview? | Yes, I did add them [here](./docs/contracts/permit2/overview.md) |
| Did I include Guides of the product under <product_name>/guides? | They should be added [here](./docs/contracts/permit2/guides) |
| Did I include Technical Reference of the product under <product_name>/reference? | Yes I added them [here](./docs/contracts/permit2/reference) |
| Did I open a PR using the the [Contributing](./CONTRIBUTING.md) guidelines? | Yes


# Contributing to Uniswap Docs

Contributing to the docs site is a great way to get involved in the dev community and help other developers along the way! Check out our guidelines [here](https://github.com/Uniswap/uniswap-docs/blob/main/CONTRIBUTING.md).

# How to generate markdown files from solidity Natspec comments

Install solidity doc gen
`npm install solidity-docgen`

Get the correct compiler version
`npm install -D solc-0.7@npm:solc@0.7.6`

Put the updated template `contract.hbs` in a /templates folder under the same directory as /contracts that you want to generate

Run `npx solidity-docgen --solc-module solc-0.7 -t ./templates`

# How to gernerate markdown files from typescript commments

`npm install --save-dev typedoc typedoc-plugin-markdown`

`typedoc --out <docs> src/index.ts`

see https://www.npmjs.com/package/typedoc-plugin-markdown for details

# How to Update search indices with algolia

create .env file with `APPLICATION_ID` and the `API_KEY` (write access)
Edit config.json file with

- start url from updated website
- sitemap url from updated website: ex) for docs: https://docs.uniswap.org/sitemap.xml
- "v3-docs" index name
- install jq : `brew install jq`
  run `docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper`

## Installation

```console
yarn install
```

## Local Development

```console
yarn run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Clear cache

```console
yarn docusaurus clear
```

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
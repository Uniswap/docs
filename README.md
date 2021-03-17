# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

# How to generate markdown from template

Install solidity doc gen
`npm install solidity-docgen`

Get the correct compiler version
`npm install -D solc-0.7@npm:solc@0.7.6`

Put the updated template `contract.hbs` in same directory as /contracts that you want to generate

Run `npx solidity-docgen --solc-module solc-0.7`

# How to Update search indices with algolia

create .env file with `APPLICATION_ID` and the `API_KEY` (write access)
Edit config.json file with 
- start url from updated website
- sitemap url from updated website
- "v3-docs" index name
run `docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper`

# How to add a new page

Create a markdown file in its respective version directory within the main /docs/ folder

Add the new file to its respective sidebar file i.e., 'V2sidebars.js' or 'V3sidebars.js'


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

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

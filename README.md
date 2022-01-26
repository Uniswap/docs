# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

# Contributing to Nifty League Docs

Contributing to the docs site is a great way to get involved in the dev community and help other devs along the way! Check out our guidelines [here](https://github.com/NiftyLeague/docs/blob/main/CONTRIBUTING.md).

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

Edit config.json file with:

- start url from updated website
- sitemap url from updated website: ex) for docs: https://docs.niftyleague.com/sitemap.xml
- "docs" index name

install jq : `brew install jq`
run `docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper`

# How to add a new page

Create a markdown file in its respective versioned docs, or versioned SDK, directory.

## Installation

```console
yarn
```

## Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Clear cache

```console
yarn clear
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

## Translations

We use Crowdin to handle our translations https://crowdin.com/project/niftyleague-docs

Follow docs provided by Docusaurus: https://docusaurus.io/docs/i18n/crowdin

Generate the JSON translation files for the default language in website/i18n/en:

```console
yarn write-translations
```

Upload all the JSON and Markdown translation files:

```console
yarn crowdin upload
```

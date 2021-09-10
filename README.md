# [Uniswap Docs](https://docs.uniswap.org/)

This repository contains the source code for the Uniswap Docs website at [https://docs.uniswap.org/](https://docs.uniswap.org/). The website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Contribute

See [CONTRIBUTING.md](https://github.com/Uniswap/uniswap-docs/blob/main/CONTRIBUTING.md).

## Build the site

You can build the Uniswap Docs site on your local machine.

### Prerequisites

Install the Node.js and Yarn [versions required by Docusaurus](https://docusaurus.io/docs/installation#requirements).

### Set up the project

If you want to run builds locally, do the following:

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) the uniswap-docs repo.
2. Clone your fork. For example:
`git clone https://github.com/YOUR_USERNAME/uniswap-docs.git`
3. Install your local version of docs.uniswap.org:
`cd uniswap-docs`
`yarn install`
`yarn run start`

Other useful commands:

`yarn docusaurus clear` (clears the cache)
`yarn build`

### Deployment

```sh
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

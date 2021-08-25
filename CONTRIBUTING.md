# Contribution Guidelines

Thanks for giving a little extra love to our docs site! Below are some basic guidelines to follow to get your PR merged :)

## Creating a Pull Request

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository.
2. On your copy of the repo, create a new branch. Be sure that your branch is updated with the most recent changes from our main branch. 
3. Make any necessary changes. Add, commit, and push to your fork.
4. Go to the main docs repo in your browser and open a new pull request.
5. Title the PR to describe your contribution and include a short summary of the changes. If there is an open issue associated with your changes, please tag the issue by referencing the number of the issue (#123) in the summary.
6. If there is a relevant tag like "typo", "bug", or "enhancement", please also include the tag in the PR.

## Typical flow to set up your fork

Setting up your fork and branch may look like:

```
cd uniswap-docs
git remote add upstream https://github.com/Uniswap/uniswap-docs.git
git fetch upstream
git pull --rebase upstream main
git checkout -b "my-contribution"
```
## Contribution Requests

Below are a couple of ways you can start contributing:
1. Flagging confusing copy, explanations, or workflows.
A really great and easy way to contribute to docs is to flag pages, sections, and guides in the docs that you find confusing or misleading. You can submit PR requests to make changes to better explain such concepts. 

2. Updating the written style of any of our docs guides to comply with [this style guide](https://developers.google.com/style/). Some easy changes are using [first person](https://developers.google.com/style/person) and an [active voice](https://developers.google.com/style/voice).

3. Create a guide! Some ideas for guides are:
    - How to set up a test environment. This can be specific to your testing suite! It would be great to get a collecting of different testing setups on the site.
    - How to fetch on-chain data for liquidity volume, current prices, number of swaps, sizes of swaps, etc..
    - A "Hello World" guide for solidity and Uniswap development. How to set up your first contract and deploy it on a testnet.


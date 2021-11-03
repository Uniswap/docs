# Contribution Guidelines

Thanks for giving a little extra love to our docs site! Below are some basic guidelines to follow to get your PR merged :)

## Creating a Pull Request

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository.
2. On your copy of the repo, create a new branch. Be sure that your branch contains the most recent changes from the main branch.
3. Make any necessary changes, then commit and push them to your fork.
4. Go to the main docs repo in your browser and open a new pull request.
5. Title the pull request to describe your contribution, and include a short summary of the changes. If an open issue is associated with your changes, tag the issue by referencing the issue number ( i.e., #123) in the pull request summary.
6. If there is a relevant label like "typo", "bug", or "enhancement", include the label in the PR.

## A standard flow to set up a fork

Set up your fork with the following terminal commands, or an alteration of them to suit your enviornment:

```
cd uniswap-docs
git remote add upstream https://github.com/Uniswap/uniswap-docs.git
git fetch upstream
git pull --rebase upstream main
git checkout -b "my-contribution"
```

## Contribution Requests

Below are a couple of ways anyone can start contributing:

1. Flagging confusing copy, explanations, or workflows.
   An easy and effective way to contribute to docs is to flag pages, sections, and guides in the docs that you find confusing or misleading. You can submit a pull request to make changes to better explain the concepts you find confusing.

2. Updating the written style of any of our docs guides to comply with [this style guide](https://developers.google.com/style/). Some easy changes are using [first person](https://developers.google.com/style/person) and an [active voice](https://developers.google.com/style/voice).

3. Create a guide! Some ideas for guides are:
   - How to set up a local test environment. This can be specific to your testing suite! It would be great to get a collecting of different testing setups on the site.
   - How to fetch on-chain data for liquidity volume, current prices, number of swaps, sizes of swaps, etc.
   - A "Hello World" guide for solidity and Uniswap development.
   - How to set up your first contract and deploy it on a testnet.

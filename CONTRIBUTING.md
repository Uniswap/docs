# Contribution Guidelines

Thanks for giving a little extra love to the Uniswap docs! Below are some basic guidelines to get your PR merged.

## How contributions work

The docs published at [developers.uniswap.org](https://developers.uniswap.org) are built from a separate source repository. When we accept a change here, we port it into that publishing pipeline, so your fix may go live on the site before it appears in this repository. Content here is updated in batches on a regular cadence, and accepted contributions are credited as commit co-authors. See the [README](README.md) for details.

All documentation lives in the `content/` directory, and that is where content changes belong. The `archive/` directory holds the previous version of this repository for reference only; PRs against it will not be accepted.

By submitting a pull request you agree that your contribution is licensed under this repository's [MIT license](LICENSE).

## Creating a pull request

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository.
2. On your copy of the repo, create a new branch. Be sure that your branch contains the most recent changes from the main branch.
3. Make any necessary changes, then commit and push them to your fork.
4. Go to the main docs repo in your browser and open a new pull request.
5. Title the pull request to describe your contribution, and fill in the PR template. If an open issue is associated with your changes, reference it in the summary (e.g. `Fixes #123`).

A standard flow to set up a fork:

```bash
cd docs
git remote add upstream https://github.com/Uniswap/docs.git
git fetch upstream
git pull --rebase upstream main
git checkout -b "my-contribution"
```

## Ways to contribute

1. **Flag confusing copy, explanations, or workflows.** An easy and effective way to contribute is to flag pages, sections, or guides that you find confusing or misleading, either as a [docs issue](https://github.com/Uniswap/docs/issues/new/choose) or as a PR that explains the concept better.
2. **Fix incorrect or outdated content.** Contract addresses, API behavior, and code examples drift over time. If you spot something wrong, a PR with a source for the correct information (block explorer link, protocol repository, API response) is the fastest path to a merge.
3. **Improve the writing style.** We follow the [Google developer documentation style guide](https://developers.google.com/style/). Useful changes include using [second person](https://developers.google.com/style/person) and an [active voice](https://developers.google.com/style/voice).
4. **Propose a guide.** Open a [content request](https://github.com/Uniswap/docs/issues/new/choose) with the topic, audience, and references. Some ideas: setting up a local test environment, fetching on-chain data for pools and swaps, or deploying your first contract that integrates Uniswap on a testnet.

## Content conventions

- Every `.mdx` page needs `title` and `description` frontmatter (see the [README](README.md))
- Keep pages concise and cross-link related pages instead of repeating content
- Place images in the `images/` directory of the section that uses them
- All content lives under `content/`; do not add or edit files under `archive/`

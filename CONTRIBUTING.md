# Contribute to Uniswap Docs

Thanks for giving a little extra love to our docs site! :smile:

#### Table of Contents

* [Who can contribute?](#who-can-contribute)
* [Find a task](#find-a-task)
* [Set up the docs project](#set-up-the-docs-project)
* [Fix or improve content](#fix-or-improve-content)
* [Create a pull request](#create-a-pull-request)

## Who can contribute?

Anyone, really! If you can fix a typo, copy edit a doc, write a doc, or tweak some code to fix an issue with the site, we welcome your help!

## Find a task

Below are a few of ways anyone can start contributing:

* Flag confusing copy, explanations, or workflows. An easy and effective way to contribute to docs is to flag pages, sections, and guides in the docs that you find confusing or misleading. You can submit a pull request to make changes to better explain the concepts you find confusing.
* Update the written style of any of our docs guides to comply with [this style guide](https://developers.google.com/style/). Some easy changes are using [first person](https://developers.google.com/style/person) and an [active voice](https://developers.google.com/style/voice).
* Create a guide! Some ideas for guides are:
    * How to set up a local test environment. This can be specific to your testing suite! It would be great to get a collecting of different testing setups on the site.
    * How to fetch on-chain data for liquidity volume, current prices, number of swaps, sizes of swaps, etc.
    * A "Hello World" guide for solidity and Uniswap development.
    * How to set up your first contract and deploy it on a testnet.

## Set up the docs project

You can add all of the source files to your local machine. Then you can build and run the docs site locally at any time. This can be helpful for viewing changes as you fix or improve content.

To set up the project locally, see [Build the site](https://docs.github.com/Uniswap/uniswap-docs/blob/main/README.md#build-the-site).

## Fix or improve content

Assuming you set up the project correctly, you can now:

* Complete your Git configuration
* Add or edit files
* Push your changes to your forked repository

The following procedure accomplishes these tasks. Then, after the changes are in your forked repository, you can [create a pull request](#create-a-pull-request).



**Note:** There are a few workflow options. If you're unsure about any commands or want to use a different workflow, feel free. For help, checkout the [GitHub Docs](https://docs.github.com/en) and this [git cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet).

1. On your local machine, make sure you're in the uniswap-docs directory.<br>
   `cd uniswap-docs`

2. Specify the Uniswap/uniswap-docs repo as the `upstream` remote repository for your local repo (the files that are now locally on your computer).<br>
   `git remote add upstream https://github.com/Uniswap/uniswap-docs.git`

3. [Sync your fork](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-from-the-command-line) with `upstream`.
4. Create and checkout a new branch:<br>
   `git checkout -b "my-new-branch"``

5. Add or edit source files locally in the uniswap-docs directory:
   * [Add or edit Markdown files](#add-or-edit-markdown-files)
   * [Add or edit code comments and generate Markdown](#add-or-edit-code-comments-and-generate-Markdown)
6. Use `git add` to stage your changes.
7. Commit the changes and include a message with your commit:<br>
   `git commit -m "Fixed abc."``

8. Push the current branch to your fork and set the remote as upstream:<br>
   `git push --set-upstream origin my-new-branch`

You can use steps 3-8 above any time you want to add or edit doc content, just remember:

* `upstream` is Uniswap/uniswap-docs
* `origin` is your fork of Uniswap/uniswap-docs
* the `uniswap-docs` directory on your local machine is where you create branches and work with files that you later push to `origin`

### Add or edit Markdown files

Create a **.md** file in its respective versioned docs, or versioned SDK, directory.

### Add or edit code comments and generate Markdown

#### How to generate Markdown files from Solidity Natspec comments

1. Install Solidity doc gen:<br>
   `npm install solidity-docgen`

2. Get the correct compiler version:<br>
   `npm install -D solc-0.7@npm:solc@0.7.6`

3. Put the updated template **contract.hbs** in a **/templates** folder under the same directory as **/contracts** that you want to generate.
4. Run:<br>
   `npx solidity-docgen --solc-module solc-0.7 -t ./templates`

#### How to generate Markdown files from TypeScript comments

1. Install TypeDoc:<br>
   `npm install --save-dev typedoc typedoc-plugin-markdown`

2. Run:<br>
   `typedoc --out <docs> src/index.ts`

For more info, see [the plugin doc](https://www.npmjs.com/package/typedoc-plugin-markdown).

#### How to Update search indices with Algolia

1. Create an **.env** file with `APPLICATION_ID` and the `API_KEY` (write access).
2. Edit **config.json** with:
   * start url from updated website
   * sitemap url from updated website: ex) for docs: https://docs.uniswap.org/sitemap.xml
   * *"v3-docs" index name
3. Install jq:<br>
   `brew install jq run docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper`

## Create a Pull Request

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository.
2. On your copy of the repo, create a new branch. Be sure that your branch contains the most recent changes from the main branch.
3. Make any necessary changes, then commit and push them to your fork.
4. Go to the main docs repo in your browser and open a new pull request.
5. Title the pull request to describe your contribution, and include a short summary of the changes. If an open issue is associated with your changes, tag the issue by referencing the issue number ( i.e., #123) in the pull request summary.
6. If there is a relevant tag like "typo", "bug", or "enhancement", include the tag in the PR.




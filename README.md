<div align="center">

# 🦄 Uniswap Documentation

[![Made with Docusaurus](https://img.shields.io/badge/Made%20with-Docusaurus-blue.svg)](https://v2.docusaurus.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

Your comprehensive guide to all Uniswap products

</div>

---

## 📚 Table of Contents

- [🏗️ Project Layout](#-project-layout)
- [📝 Contributing Documentation](#-contributing-documentation)
- [✅ Contribution Checklist](#-contribution-checklist)
- [🔧 Generating Technical References](#-generating-technical-references)
- [🔍 How to Update search indices with algolia](#how-to-update-search-indices-with-algolia)


---

## 🏗️ Project Layout

The documentation is organized into four sections:

| Section | Description | Examples |
|---------|-------------|----------|
| 📘 **Concepts** | General Uniswap information | Liquidity, Fees |
| 📜 **Contracts** | Smart contract documentation | V3 Contracts, Permit2 |
| 🛠️ **SDKs** | Integration guides | v3-sdk, Swap Widget |
| 🔌 **APIs** | API documentation | Subgraph API |

> Each section includes:
> - ✨ Overview
> - 📋 Guides
> - 📚 Technical Reference

---

## 📝 Contributing Documentation

### Writing Overviews

A product overview should clearly address the following key points:

- **Main Components:** What are the high level components of the product?
- **Core Functionality:** What are the high level features and functions it provides?
- **Source Code Location:** Where can the product's source code be found?
- **Integration:** Where can the code artifact (e.g., npm) be accessed, and how can someone integrate it into their project?

For a good example, check out the [V3 Smart Contracts overview](./docs/contracts/v3/overview.md).

### Writing Guides

A guide is a reusable code example that illustrates a specific concept within the Uniswap ecosystem.

#### Structure of Guides

**1. Introduction:** Explain the concept of the piece of code and summarize what will be covered and the end result.

**2. Walkthrough:** Provide a step-by-step explanation of each line of code.

**3. Output:** Show the testable end results.

#### Key Principles of Guides

Each guide should:
- Be a standalone piece.
- Refer to a code example in our example repository.
- Use the least dependencies possible.
- Include input changes (e.g., address, tokens, amounts) in the code.

#### Best Practices for Guides

- Don't show unnecessary source code snippets. Instead, link to external source code or technical references.
- Keep all links and references at the bottom and reference them as footnotes to minimize distractions.
- Help the developer build something within **10 minutes** per guide, but provide references for deep dives.
- End a guide with a transition to the subsequent guide, recommendations, or real-world project examples.

By implementing these consistent principles and practices, Uniswap will have documentation that is easy to understand and produces reusable code for its community.

A good example is the [V3 SDK Guides](./docs/sdk/v3/guides/01-quick-start.md).

### Writing Technical References

These should provide technical references for the exported interfaces. For a good example, see the [V3 SDK reference](./docs/sdk/v3/reference/overview). You can create these reference files by following the [guides](#generating-technical-references) below.

---

# ✅ Contribution Checklist

### Checklist for Product Documentation

Before submitting your product documentation, ensure you've addressed the following:

1. **Did I choose the correct section for the product?**
   - Ensure the product is placed in the appropriate category.
   
2. **Did I create a folder for the product?**
   - Ensure a dedicated folder exists for the product.

3. **Did I introduce any new concepts?**
   - If yes, add them under: `/concepts/<category_name>/<product_name>`

4. **Did I include an overview of the product?**
   - The overview should be located at: `<category_name>/<product_name>/overview`

5. **Did I include guides for the product?**
   - Place them under: `<category_name>/<product_name>/guides`

6. **Did I include a technical reference for the product?**
   - The technical reference should be located at: `<category_name>/<product_name>/reference`

7. **Did I give each document a descriptive name or ID?**
   - This is crucial for clarity and the document's URL.

8. **Did I submit a PR following the [contributing](./CONTRIBUTING.md) guidelines?**
   - Ensure all steps in the contributing guide are followed.

9. **Did I update the search indices after my changes were deployed?**
   - Be sure to follow the steps outlined in [how to update search indices](#how-to-update-search-indices-with-algolia).

---

### Example: Permit2 Smart Contract

To help clarify, let’s walk through the process for the *Permit2* smart contract:

1. **Correct section chosen?**
   - Yes, under [contracts](./docs/contracts/).

2. **Product folder created?**
   - Yes, located at [contracts/permit2](./docs/contracts/permit2/).

3. **Introduced new concepts?**
   - No, no new concepts were added.

4. **Overview included?**
   - Yes, it’s added [here](./docs/contracts/permit2/overview.md).

5. **Guides included?**
   - No, but they should be added [here](./docs/contracts/permit2/guides).

6. **Technical reference included?**
   - Yes, added [here](./docs/contracts/permit2/reference).

7. **PR submitted using the contributing guidelines?**
   - Yes, following the [Contributing](./CONTRIBUTING.md) guide.

8. **Search indices updated after deployment?**
   - Yes, following the [guides below](#how-to-update-search-indices-with-algolia).

---


# 🔧 Generating Technical References

## From Solidity Natspec Comments

1. Install Solidity Docgen:
   ```bash
   npm install solidity-docgen
   ```

2. Get the correct Solidity compiler version:
	```bash
	npm install -D solc-0.7@npm:solc@0.7.6
	```
3. Place the updated contract.hbs template in a /templates folder in the same directory as /contracts.

4. Run Docgen:
	```bash
	npx solidity-docgen --solc-module solc-0.7 -t ./templates
	```

## From TypeScript Comments

1. Install Typedoc and Markdown Plugin:
	```bash
	npm install --save-dev typedoc typedoc-plugin-markdown
	```

2. (Optional) Install TypeScript if needed:
	```bash
	npm install --save-dev typescript
	```

3. Generate Documentation:
	```bash
	npx typedoc --out <docs> src/index.ts
	```

> 💡 Use the --skipErrorChecking flag if necessary to handle types fetched during transpilation (e.g., contract ABIs).

**Note:** For more details, see [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown).



# 🔍 How to Update search indices with algolia

1. **Create an `.env` file** with the following variables:
   - `APPLICATION_ID`
   - `API_KEY` (with write access)  
   If you don't have these, please ask an Engineering Manager for assistance.

2. **Edit the `config.json` file** if necessary:
   - Update the `start_url` with the new website URL.
   - Set the `sitemap_url` with the updated website URL (e.g., for docs: `https://docs.uniswap.org/sitemap.xml`).
   - Use `"v3-docs"` as the `index_name`.

3. **Install and start Docker Desktop:**  
   [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

4. **Install jq:**  
   ```bash
   brew install jq


5. Run the Docker container:
	```bash
	docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper
	```


## Installation

Run the following command to install dependencies:

```console
yarn install
```

## Local Development
Start a local development server with:

```console
yarn run start
```

This command starts a local development server and opens a browser window. Most changes are reflected live without needing to restart the server.

## Clear Cache

To clear the cache, use:

```console
yarn docusaurus clear
```

## Build

Generate static content into the `build` directory with:

```console
yarn build
```

This content can be served using any static hosting service.

## Deployment

The application is automatically deployed to production via [Vercel](https://vercel.com/uniswap/docs) upon merging into the **main** branch.

---

<div align="center">

### 🆘 Need Help?
[![Join our Discord](https://img.shields.io/badge/Join%20our%20Discord-7389D8?style=flat&logo=discord&logoColor=ffffff)](https://discord.com/invite/uniswap)
[![Twitter Follow](https://img.shields.io/twitter/follow/Uniswap?style=social)](https://twitter.com/Uniswap)

</div>


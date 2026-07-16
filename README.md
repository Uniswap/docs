# Uniswap Developer Docs

This repository contains the source content for the Uniswap developer documentation published at [developers.uniswap.org](https://developers.uniswap.org).

## Contributing

Pull requests are welcome. See the [contribution guidelines](CONTRIBUTING.md) for how to get started. The docs team reviews each contribution and ports accepted changes into the publishing pipeline, so your change may land on the site before this repository reflects it. Content here is updated periodically rather than on every deploy.

Accepted contributions are credited: when your change is included in a content update, you are listed as a co-author on the commit, so it counts on your GitHub profile and in this repository's contributor graph.

By submitting a pull request you agree that your contribution is licensed under this repository's [MIT license](LICENSE).

## Repository structure

```
├── get-started/        # Concepts and quickstart
├── trading/            # Trading and Swapping API
├── liquidity/          # Liquidity provisioning, UniswapX, Liquidity Launchpad
├── protocols/          # v2, v3, v4, Universal Router, Permit2, smart wallet
├── sdks/               # SDK documentation
├── uniswap-ai/         # Uniswap AI skills and plugins
├── unichain/           # Unichain documentation
├── ecosystem/          # Governance, subgraphs, builder support
├── community/          # Community tooling and learning resources
├── changelog/          # API and protocol change notifications
├── examples/           # Example contracts and SDK snippets
├── archive/            # Previous version of this repository, kept for reference
└── meta.json           # Root navigation configuration
```

## Content conventions

Each `.mdx` file starts with frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description for SEO and previews"
---
```

`meta.json` files control sidebar navigation per section:

```json
{
  "title": "Section Title",
  "pages": ["page-slug", "another-page"]
}
```

- Page slugs reference file names without the `.mdx` extension
- Use `---Section Name---` entries for sidebar separators
- Order in the array determines sidebar order

## License

Content and code in this repository are licensed under the [MIT license](LICENSE). See also the [disclaimer](DISCLAIMER.md).

# Uniswap Developer Docs

Source content for the Uniswap developer documentation published at [developers.uniswap.org](https://developers.uniswap.org).

## Repository structure

```
├── get-started/                    # Core concepts and quickstart
│   └── concepts/                   # AMMs, liquidity, swaps, fees, price impact
├── trading/                        # Trading integrations
│   └── swapping-api/               # Swapping API guides and reference
├── liquidity/                      # Liquidity integrations
│   ├── liquidity-launchpad/        # Token launch tooling
│   ├── liquidity-provisioning-api/ # Liquidity Provisioning API
│   └── uniswapx/                   # UniswapX: quoting, filling, concepts
├── protocols/                      # Protocol documentation
│   ├── v2/ v3/ v4/                 # Core protocol versions, concepts, guides
│   ├── universal-router/           # Universal Router
│   ├── permit2/                    # Permit2 approvals
│   ├── smart-wallet/               # Smart wallet
│   ├── the-compact/                # The Compact
│   └── protocol-fee/               # Protocol fee
├── sdks/                           # SDK documentation
│   └── v2/ v3/ v4/                 # Per-version SDK guides and reference
├── uniswap-ai/                     # Uniswap AI skills and plugins
├── unichain/                       # Unichain
│   ├── getting-started/            # Connect, bridge, deploy
│   ├── guides/                     # Builder guides
│   ├── technical-information/      # Contracts, network details
│   └── tools/                      # Ecosystem tooling
├── ecosystem/                      # Ecosystem resources
│   ├── governance/                 # Governance processes and reference
│   ├── subgraphs/                  # Subgraph data and queries
│   └── builder-support/            # Support programs for builders
├── community/                      # Community tooling and learning resources
├── changelog/                      # API and protocol change notifications
├── examples/                       # Example contracts and SDK snippets
│   ├── smart-contracts/            # Solidity examples
│   └── sdk/                        # SDK examples
├── archive/                        # Previous version of this repository, kept for reference
└── meta.json                       # Root navigation configuration
```

## Contributing

Contributions are welcome, and our team reviews every PR. See the [contribution guidelines](CONTRIBUTING.md) for how the process works and how to get started.

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

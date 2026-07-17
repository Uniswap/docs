# Uniswap Developer Docs

Source content for the Uniswap developer documentation published at [developers.uniswap.org](https://developers.uniswap.org).

All documentation lives in the [`content/`](content) directory. Content changes (fixes, new pages, examples) belong there. The [`archive/`](archive) directory holds the previous version of this repository, kept for reference only.

## Repository structure

```
├── content/                            # developers.uniswap.org content
│   ├── get-started/                    # Core concepts and quickstart
│   ├── trading/                        # Trading integrations, Swapping API
│   ├── liquidity/                      # UniswapX, Liquidity Launchpad, Provisioning API
│   ├── protocols/                      # v2, v3, v4, Universal Router, Permit2,
│   │                                   #   smart wallet, The Compact, protocol fee
│   ├── sdks/                           # SDK documentation (v2, v3, v4)
│   ├── uniswap-ai/                     # Uniswap AI skills and plugins
│   ├── unichain/                       # Unichain: getting started, guides, tooling
│   ├── ecosystem/                      # Governance, subgraphs, builder support
│   ├── community/                      # Community tooling and learning resources
│   ├── changelog/                      # API and protocol change notifications
│   ├── examples/                       # Example contracts and SDK snippets
│   └── meta.json                       # Root navigation configuration
├── archive/                            # Previous version of this repository (reference only)
├── CONTRIBUTING.md
├── DISCLAIMER.md
├── LICENSE
└── README.md
```

## Contributing

Contributions are welcome, and our team reviews every PR. Content changes go inside `content/`. See the [contribution guidelines](CONTRIBUTING.md) for how the process works and how to get started.

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

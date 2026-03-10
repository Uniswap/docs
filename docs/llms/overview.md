---
id: overview
sidebar_position: 1
title: Overview
---

# Uniswap AI Tools for Developers

Uniswap provides AI-powered development tools that help you integrate swaps, build v4 hooks, provide liquidity, and interact with the EVM from within your editor.

## Quick links

- [Uniswap AI](#uniswap-ai)
- [LLM Context Files](#llm-context-files)
- [Code Editor Setup](#code-editor-setup)

## Uniswap AI

[Uniswap AI](https://github.com/Uniswap/uniswap-ai) is an open-source collection of plugins and skills that gives AI coding agents up-to-date, protocol-specific guidance across Uniswap protocols, APIs, and smart contracts.

### Available plugins

| Plugin | Description |
| --- | --- |
| **uniswap-trading** | Integrate swaps via [Trading API](https://developers.uniswap.org/dashboard), Universal Router SDK, or direct contract calls. |
| **uniswap-hooks** | Security-first guidance for building Uniswap v4 hooks. |
| **uniswap-viem** | EVM integration with viem and wagmi. |
| **uniswap-driver** | Token discovery and swap/liquidity planning with deep links. |
| **uniswap-cca** | Configure and deploy CCA contracts for token distribution. |

### Install with the Skills CLI

Uniswap AI is available through [skills.sh](https://github.com/Uniswap/uniswap-ai). This works with any AI coding agent that supports skill files:

```bash
npx skills add uniswap/uniswap-ai
```

### Install as a Claude Code plugin

If you use [Claude Code](https://claude.ai/code), first add the Uniswap marketplace, then install individual plugins:

```bash
# Add the Uniswap marketplace
/plugin marketplace add uniswap/uniswap-ai

# Install individual plugins
claude plugin add uniswap-hooks     # v4 hook development
claude plugin add uniswap-trading   # Swap integration
claude plugin add uniswap-viem      # EVM / viem / wagmi
claude plugin add uniswap-driver    # Token discovery & deep links
claude plugin add uniswap-cca       # CCA auction configuration
```

Once installed, the plugins activate automatically when relevant to your task. You can also invoke specific skills directly. For example, **/uniswap-hooks:v4-security-foundations** for a security-first walkthrough of hook development.

## LLM Context Files

If you prefer to give your AI agent raw documentation context rather than structured skills, Uniswap publishes LLM-optimized text files that summarize the protocol documentation.

### llms.txt and llms-full.txt

AI models have a context window (the amount of text they can process at once). Providing relevant documentation upfront helps the model give better answers without hallucinating.

Uniswap offers two context files:
- **[llms.txt](https://docs.uniswap.org/v4-llms.txt)**: A compact summary with links to documentation sections. Works well with most models (100K+ token context windows).
- **[llms-full.txt](https://docs.uniswap.org/v4-llms-full.txt)**: A verbose version with more inline content. Use this if your model has a larger context window or you want more detail without following links.

## Code Editor Setup

### Cursor

1. Navigate to **Cursor Settings > Features > Docs**
2. Select **Add new doc** and paste one of the following URLs:

```
https://docs.uniswap.org/v4-llms.txt
```

```
https://docs.uniswap.org/v4-llms-full.txt
```

3. Use `@docs` → **Uniswap** to reference the documentation in your chat.

### Windsurf

Windsurf requires referencing documentation in each conversation. Add it to the Cascade window (`CMD+L`):

```
@docs:https://docs.uniswap.org/v4-llms.txt
```

```
@docs:https://docs.uniswap.org/v4-llms-full.txt
```

### Claude Code

Install the Uniswap AI plugins (see [above](#install-as-a-claude-code-plugin)) for the richest integration. The plugins provide structured skills, expert agents, and protocol-specific tools that go beyond static documentation context.
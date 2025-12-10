---
id: CCA
title: Setup
sidebar_position: 1
---

# Getting started with CCA
**Repository:** [github.com/Uniswap/continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction)

## Clone the repo
```bash
git clone https://github.com/Uniswap/continuous-clearing-auction.git
cd continuous-clearing-auction
```

## Quickstart
Currently, developing with CCA locally _requires [foundry](https://book.getfoundry.sh)_
```bash
curl -L https://foundry.paradigm.xyz | bash
```

Install dependencies
```bash
forge install
```

Build the contracts
```bash
forge build
```

Install pre-commit hooks (optional)
```bash
pre-commit install
pre-commit run --all-files
```

Remappings
Remappings are already set up in `foundry.toml` file but you may need to adjust if importing CCA into an existing foundry project.

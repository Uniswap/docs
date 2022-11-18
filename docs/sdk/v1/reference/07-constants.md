---
id: constants
title: Constants
---

Below is an exhaustive list of all external constants used in the SDK.

```typescript
import BigNumber from 'bignumber.js'

import ERC20 from './abis/ERC20.json'
import FACTORY from './abis/FACTORY.json'
import EXCHANGE from './abis/EXCHANGE.json'

export const ETH = 'ETH'

export enum SUPPORTED_CHAIN_ID {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
}

export const FACTORY_ADDRESS: { [key: number]: string } = {}

export const FACTORY_ABI: string = JSON.stringify(FACTORY)
export const EXCHANGE_ABI: string = JSON.stringify(EXCHANGE)

export enum TRADE_TYPE {
  ETH_TO_TOKEN = 'ETH_TO_TOKEN',
  TOKEN_TO_ETH = 'TOKEN_TO_ETH',
  TOKEN_TO_TOKEN = 'TOKEN_TO_TOKEN',
}

export enum TRADE_EXACT {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export enum TRADE_METHODS {
  ethToTokenSwapInput = 'ethToTokenSwapInput',
  ethToTokenTransferInput = 'ethToTokenTransferInput',
  ethToTokenSwapOutput = 'ethToTokenSwapOutput',
  ethToTokenTransferOutput = 'ethToTokenTransferOutput',
  tokenToEthSwapInput = 'tokenToEthSwapInput',
  tokenToEthTransferInput = 'tokenToEthTransferInput',
  tokenToEthSwapOutput = 'tokenToEthSwapOutput',
  tokenToEthTransferOutput = 'tokenToEthTransferOutput',
  tokenToTokenSwapInput = 'tokenToTokenSwapInput',
  tokenToTokenTransferInput = 'tokenToTokenTransferInput',
  tokenToTokenSwapOutput = 'tokenToTokenSwapOutput',
  tokenToTokenTransferOutput = 'tokenToTokenTransferOutput',
}

export const TRADE_METHOD_IDS: { [key: string]: string } = {}

export enum FIXED_UNDERFLOW_BEHAVIOR {
  ZERO = 'ZERO',
  LESS_THAN = 'LESS_THAN',
  ONE_DIGIT = 'ONE_DIGIT',
}
```

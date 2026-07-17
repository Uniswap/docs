---
title: Pool Contract (Templatized)
sidebar_position: 3
---

## Contract Details
Pools are deployed  dynamically and the addresses cannot be pre-determined. Thus the template feature of graph protocol is used and the Pool contracts to monitor are added when a new pool is deployed using the factory. The [`handlePoolCreated()`](../functions-n-handlers/mappings/factory.ts#handlepoolcreated) event handler adds a new pool contract to monitor.

## Events Tracked

|Event Name|Event handler|
|-|-|
|Initialize|[handleInitialize()](../functions-n-handlers/mappings/core.ts#handleinitialize)|
|Swap|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)|
|Mint|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)|
|Burn|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)|
|Flash|[handleFlash()](../functions-n-handlers/mappings/core.ts#handleflash)|
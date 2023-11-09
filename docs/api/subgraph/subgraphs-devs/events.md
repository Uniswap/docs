---
title: Events Monitored
sidebar_position: 4
---


|Event Name|Contract Type|Event handler|Description|
|-|-|-|-|
|PoolCreated|[Factory](./contracts/factory)|[handlePoolCreated()](../functions-n-handlers/mappings/factory.ts#handlepoolcreated)|Event emitted when a new pool is deployed using the factory contract|
|Initialize|[Pool](./contracts/pool)|[handleInitialize()](../functions-n-handlers/mappings/core.ts#handleinitialize)|Event emitted when a new deployed pool is initialized with current price and is ready for adding liquidity and doing swaps|
|Swap|[Pool](./contracts/pool)|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)|Event emitted when a swap takes place|
|Mint|[Pool](./contracts/pool)|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)|Event emitted when liquidity is added to the pool|
|Burn|[Pool](./contracts/pool)|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)|Event emitted when liquidity is removed from the pool|
|Flash|[Pool](./contracts/pool)|[handleFlash()](../functions-n-handlers/mappings/core.ts#handleflash)|Event emitted when a flash loan was taken from the pool|
|IncreaseLiquidity|[NonFungiblePositionManager](./contracts/nonfungiblepositionmanager)|[handleIncreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handleincreaseliquidity)|Event emitted when liquidity is added to a new/existing position|
|DecreaseLiquidity|[NonFungiblePositionManager](./contracts/nonfungiblepositionmanager)|[handleDecreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handledecreaseliquidity)|Event emitted when liquidity is removed from a position|
|Collect|[NonFungiblePositionManager](./contracts/nonfungiblepositionmanager)|[handleCollect()](../functions-n-handlers/mappings/position-manager.ts#handlecollect)|Event emitted when removed liquidity and it's accumulated fee collected by the position owner|
|Transfer|[NonFungiblePositionManager](./contracts/nonfungiblepositionmanager)|[handleTransfer()](../functions-n-handlers/mappings/position-manager.ts#handletransfer)|Even emitted whent the NFT representing the position ownership is transferred to a different address|

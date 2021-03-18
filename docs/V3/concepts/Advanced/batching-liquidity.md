---
id: batching-liquidity
title: Baching Liquidity
tags: advanced
---

- How does the core contract batch all the liquidity positions together
    - There are three types of state that is stored and tracked globally
        - current in range liquidity 
        - fees earned in token0/1 per uint of in range liquidity
        - fees earned above and fees earned below 
        - fees global, adjusted by feels both above and below your position, 

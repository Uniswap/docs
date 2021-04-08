---
id: faq
title: FAQ
---

## Liquidity Providing 

#### How can LPs transfer liquidity from v2 to v3?
Similarly to the v1-to-v2 transition, Uniswap Labs (“we” or “us”) is planning on providing a migration portal to help liquidity providers (“LPs”) transfer their liquidity from v2 to v3. More to be announced soon!

#### What kind of v3 analysis tools will be available to LPs?
We have a lot planned in terms of better UI and tooling — impermanent loss calculators, LP portfolio metrics etc. — but we expect that the Uniswap community will also be building many tools and apps on top of v3.

#### Will concentrated liquidity amplify impermanent loss?
All things equal, the more narrow the range, the more impermanent loss. At the same time, v3 LPs can afford to put far less capital at risk relative to their v2 counterparts while providing the same depth and earning the same fees in useful price ranges. v3 LPs can use remaining capital to hedge their risk or increase exposure to preferred assets.

#### Does Uniswap v3 offer single-sided liquidity?
LPs can pursue single-sided liquidity allocation above the current spot price if they are provisioning the higher valued token or below the current spot price if they are provisioning the lesser valued token. In the former case, the LP would effectively be selling out of their position as the asset that they provided increases in value. In the latter case, an LP would effectively be scaling into a position of the other asset as it continues to fall in price. 

#### As an LP, I’m worried about not knowing what range to provide liquidity. Is a hybrid approach to v2 and v3 possible?
The nice thing about v3 is that it can accommodate many different types of LP strategies, including the 0-to-infinity default strategy found in v2. A hybrid approach may involve setting a relatively wide range around the mid-price, or using a third party auto-LP service, which can manage rebalancings on the LP’s behalf. 

#### What is the purpose of representing LP positions by an NFT?
LP tokens are being replaced with an NFT (ERC-721) because the liquidity representation must contain the unique position boundary data. 

#### How will these NFTs integrate with other DeFi building blocks such as to allow farming?
Community members and ecosystem partners may build farming aggregators on top of v3.

#### How will liquidity be distributed between L1 and Optimism?
v3 is so much more capital efficient that we think it can easily serve the same market depth as v2 (or better) even if the protocol’s liquidity is fragmented across multiple networks. 

#### How would an LP update their price range and what are the approximate gas costs for modifying the bounds of a LP position?
Modifying the bounds, or updating a price range, of a position is just removing liquidity and adding liquidity. 
- Adding liquidity: ~ 100-170k
- Removing liquidity: ~ 55-100k
You can see more details [here](https://github.com/Uniswap/uniswap-v3-core/blob/main/test/__snapshots__/UniswapV3Pool.gas.spec.ts.snap).

#### Will there be liquidity mining in v3?
Liquidity mining programs can be introduced at any time by Uniswap protocol governance, which is separate from and not controlled by Uniswap Labs. Any liquidity mining-related proposal must pass through the standard governance processes. 
 
#### Why are there multiple pools for a pair of tokens?
This is to accommodate different fee tiers. While there is potential for multiple fee tiers to lead to a degree of liquidity fragmentation, we don’t expect this to be a significant issue as most pairs will likely have one fee tier that makes sense: for example, stablecoin/stablecoin pairs will likely opt for the lowest fee tier, 0.05%. Governance proposals can be used to add additional fee tiers if necessary. 

## Interface

#### Are there plans for a new v3 UI?
Uniswap Labs is building a new UI for v3 that will have most interactions you are familiar with today. We are also adding new flows to accommodate v3’s new features. For example, adding liquidity now requires a range definition slider. Anyone can build an interface for v3, so we expect the community to build multiple different interfaces providing access to v3.

#### Will v3 become the default app when it’s launched?
Yes, v3 will become the default for all the user interface interactions. Similar to the v1-to-v2 transition, we plan on supporting v2 interactions in the interface for a while at /v2/swap. In addition, you'll be alerted if you have v2 positions you could migrate.

## Release

#### How does the v3 BUSL license affect other DEXs that use the Uniswap protocol code?
The vast majority of other projects using the Uniswap protocol code are actually using it as an external integration, meaning that they're not copying the code for use in their own systems, but rather calling out to the Uniswap contracts once they're deployed. Any core code (and all periphery code) that you might need to safely integrate with v3 is already available via open source licenses. Additionally, the BUSL license on v3 core restricts commercial use of the code for 2 years — or less, if governance chooses to accelerate the license to GPL v. 2 or later. 

#### How does the Optimism mainnet launch affect the Uniswap v3 launch?
The initial launch will be on Ethereum mainnet, scheduled for May 5th. There will be a second deployment on L2 once Optimism is live. There is no delay due to Optimism for the initial launch.

#### Uniswap v3 was planned when Uniswap v2 was launched. Is there ongoing discussion about a v4?
There are currently no immediate plans for a Uniswap protocol v4. If there is a v4, it will be brainstormed, researched, and developed in public.

#### What’s next for Uniswap Labs beyond v3?
We plan to spend a lot of time building ecosystem tools and products around v3. When we launched v2, we immediately started working on v3 and due to limited resources were not able to build a lot of supporting infrastructure for v2. Now that v3 is out, we can spend more time building that infrastructure.

## Misc. 

#### How can I get involved on the dev side of Uniswap?
You can submit PRs for the interface, apply to the [Uniswap Grants Program](https://airtable.com/shrEXXxXB1humz7VS) for a side project, or hang out in the dev-chat channel on [Discord](https://discord.gg/UZvfWwwvwa).

#### How do gas costs for swappers compare to v2?
If a swap does not cross any ticks, swap gas costs are slightly lower than v2. Swaps that cross multiple ticks have increased gas costs. We don't expect this to be problematic as most swaps should not cross multiple ticks.

#### What improvements does v3 provide for swappers?
We expect there to be greater liquidity depth concentrated around market mid-prices, which directly translates to less slippage for traders. Additionally, gas costs for swaps that do not cross multiple ticks are slightly cheaper than swaps in v2. 

#### What will happen when the Uniswap protocol moves to L2? Is there anything we have to do?
Traders, LPs, and integration partners can continue to use the L1 Ethereum deployment as per usual. Traders and LPs that seek to use the L2 deployment of the Uniswap protocol will be required to bridge their assets over to the Optimistic rollup chain.

#### What can I use $UNI for?
UNI is a governance token that community members hold to manage the Uniswap protocol. UNI holders can vote on proposals or craft and introduce proposals to take actions that include allocating community treasury funds, making license exemptions, and promoting protocol development and adoption. 

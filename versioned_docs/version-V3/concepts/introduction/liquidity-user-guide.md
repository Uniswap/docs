---
id: liquidity-user-guide
title: Liquidity Provider & Migration User Guide
---

Uniswap v3 introduces Concentrated Liquidity.

Rather than being required to allocate liquidity across the entire price curve from zero (0) to infinity (∞), Liquidity Providers (LPs) can now concentrate their capital in price ranges they believe will see the most volume and — consequently — generate the most fees.

The additional flexibility of liquidity provision in v3 requires LPs to make more decisions when depositing capital. This is a simple guide to the v3 LP interface. For a more in-depth discussion of concentrated liquidity, please refer to the [V3 announcement post](https://uniswap.org/blog/uniswap-v3/).

- [**Migrate an existing Uniswap v2 or Sushiswap LP position to Uniswap v3**](https://docs.uniswap.org//concepts/introduction/liquidity-user-guide#v2-to-v3-migration-guide)
- [**Create a new Uniswap v3 LP position**](https://docs.uniswap.org/concepts/introduction/liquidity-user-guide#providing-liquidity-on-v3)

## Providing Liquidity on V3

### 1. Select Pair

<img src={require('./images/SelectaPair.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

As in Uniswap v1 and v2, v3 pools are structured as pairwise markets: each pool contains just two assets.

The first decision an LP must make is to select which pool they would like to market make in.

### 2. Select Fee Tier

<img src={require('./images/SelectFeeTier.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

Uniswap v3 introduces multiple fee tiers per pool. Additional fee tier flexibility allows LPs to cater their margins according to their perceived risk.

The 0.05% fee tier is ideal for token pairs that typically trade at a fixed or highly correlated rate, such as stablecoin-stablecoin token pairs (e.g. DAI-USDC). LPs take on minimal price risk in these pools, and traders expect to pay minimal fees.

The 0.30% fee tier is best suited for less correlated token pairs such as the ETH-DAI token pair, which are subject to significant price movements both to the upside and downside. This higher fee is more likely to compensate LPs for the greater price risk that they take on relative to stablecoin LPs.

The 1.00% fee tier is designed for exotic assets, where LPs take on extreme price risk. Relevant assets are those that are particularly subject to monotonic price movements.

### 3. Set Starting Price (only required for new pools)

The 'select starting price' parameter appears for pools that have not yet been created. The first LP must specify the current market price of the two assets: the toggle on the top right allows users to convert to their preferred denominator. Note that the first LP should expect to spend >5million gas for the smart contract transaction to create the new pool.

Please note that selecting a starting price that differs significantly from the global market price will expose an LP to an immediate arbitrage opportunity! We advise pool creators to double check to ensure that the starting price is correct.

### 4. Set Price Range

<img src={require('./images/SetPriceRange.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

LPs must select a price range in which to provide liquidity.

Depending on the fee tier selected (0.05% / 0.30% / 1.00% fee), the interface will offer the ability to adjust prices in either 0.10%, 0.60%, or 2.00% price tick increments. Manually entered prices will automatically adjust to the closest associated price tick.

If the price moves outside of the LP's specified range, their position will be concentrated in one of the two assets (specifically, the asset that "became cheaper" in the price movement) and not earn trading fees until the price returns to their range.

If the specified price range is above the current market price, LPs will be placing 'Range Orders': they will deposit just a single asset and only start earning trading fees once the price moves into their specified range. For more information on Range Orders, please refer to the Uniswap v3 docs.

**When making a price range decision, LPs should consider the extent to which they think prices will move over the course of their position's lifetime and their willingness to actively manage their positions (and all the costs associated with more active management).**

A narrower price range has the advantage of being more capital efficient. As an example, a v3 LP in a stablecoin-stablecoin pool can provide the same liquidity depth in the $0.99 — $1.01 price range as a v2 LP with just 0.5% of the capital.

However, a narrower price range requires LPs to manage their liquidity on a more active basis as the market price may move outside their specified price range and may increase the price risk they take on.

The following community tools simulate Uniswap v3 positions and may be useful for prospective LPs. Please note that they have not been audited by Uniswap Labs and may be subject to inaccuracies.

1. [V3.unbound.finance](https://v3.unbound.finance/)
2. [Defi-lab.xyz](https://defi-lab.xyz/uniswapv3simulator)
3. [Chainvault.io](https://app.chainvault.io/#/tools/ilcalc)

### 5. Deposit Amounts

<img src={require('./images/DepositAmounts.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

Once an LP has specified all their position parameters, they must decide how much capital to contribute.

Entering a value in one of the 'Select Deposit Amounts' modules will automatically fill the remaining module, according to the price range selected in the previous step. As an example, if the price range selected is geometrically equally spaced from the current price (e.g. 0.5× and 2.0× of current price), then the deposit amounts will be on a 50/50 split basis (similar to Uniswap v2, where it is always a 50/50 split for \[0–∞\] price range). In such a 50/50 split example, if an LP is depositing into the ETH-DAI pool and the ETH price is 2,000 DAI per ETH, a deposit amount of 1 ETH will be automatically matched with 2,000 DAI.

An LP may choose to deviate from the preview portfolio balance, adjusting their exposures by returning to the previous step — Select Price Range — and modifying either upper or lower bound. The deposit amount module in which a value was manually entered will remain fixed, while the second asset's associated value will fluctuate according to adjustments to the price range.

### 6. Approve and Add

<img src={require('./images/Approve.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

The final step in the liquidity provision process requires LPs to approve the Uniswap v3 router contract (check the contract addresses [here](https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md)) to spend tokens on their behalf. If ETH is used as one of the pair tokens then just a single 'approve' transaction will be required.

Once the 'approve' transaction has been confirmed, an LP can proceed to add their capital. LPs will be presented with a confirmation pop up with an overview of their specified parameters.

After the 'add' transaction has been confirmed, LPs can find and manage their new positions on the 'Pool' page.

## V2 to V3 migration guide:

### 1. Select a Uniswap v2 or Sushiswap LP position to migrate

<img src={require('./images/Migrate.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

Once an LP has connected their wallet and navigated to the Pool page, the Uniswap v3 interface will recognize existing Uniswap v2 and Sushiswap LP positions, and offer a seamless migration process. The migration process is entirely trustless — at no point does the LP relinquish custody of their assets. The migration contract may be [viewed here](https://github.com/Uniswap/uniswap-v3-periphery/blob/79c708f357df69f7b3a494467e0f501810a11146/contracts/V3Migrator.sol).

LPs must select which position to manage, and then click through to 'migrate'.

### 2. Select Fee Tier

<img src={require('./images/SelectFeeTierMigrate.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

Uniswap v3 introduces multiple fee tiers per pool. Additional fee tier flexibility allows LPs to cater their margins according to their perceived risk.

The 0.05% fee tier is ideal for token pairs that typically trade at a fixed or highly correlated rate, such as stablecoin-stablecoin token pairs (e.g. DAI-USDC). LPs take on minimal price risk in these pools, and traders expect to pay minimal fees.

The 0.30% fee tier is best suited for less correlated token pairs such as the ETH-DAI token pair, which are subject to significant price movements both to the upside and downside. This higher fee is more likely to compensate LPs for the greater price risk that they take on relative to stablecoin LPs.

The 1.00% fee tier is designed for exotic assets, where LPs take on extreme price risk. Relevant assets are those that are particularly subject to monotonic price movements.

### 3. Set Price Range

<img src={require('./images/SetRange.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

LPs must select a price range in which to provide liquidity.

Depending on the fee tier selected (0.05% / 0.30% / 1.00% fee), the interface will offer the ability to adjust prices in either 0.10%, 0.60%, or 2.00% price tick increments. Manually entered prices will automatically adjust to the closest associated price tick.

If the price moves outside of the LP's specified range, their position will be concentrated in one of the two assets (specifically, the asset that "became cheaper" in the price movement) and not earn trading fees until the price returns to their range.

If the specified price range is above the current market price, LPs will be placing 'Range Orders': they will deposit just a single asset and only start earning trading fees once the price moves into their specified range. For more information on Range Orders, please refer to the Uniswap v3 docs.

When making a price range decision, LPs should consider the extent to which they think prices will move over the course of their position's lifetime and their willingness to actively manage their positions (and all the costs associated with more active management).

A narrower price range has the advantage of being more capital efficient. As an example, a v3 LP in a stablecoin-stablecoin pool can provide the same liquidity depth in the $0.99 — $1.01 price range as a v2 LP with just 0.5% of the capital.

However, a narrower price range requires LPs to manage their liquidity on a more active basis as the market price may move outside their specified price range and may increase the price risk they take on.

The following community tools simulate Uniswap v3 positions and may be useful for prospective LPs. Please note that they have not been audited by Uniswap Labs and may be subject to inaccuracies.

1. [V3.unbound.finance](https://v3.unbound.finance/)
2. [Defi-lab.xyz](https://defi-lab.xyz/)
3. [Chainvault.io](https://app.chainvault.io/#/tools/ilcalc)

### 4. Approve and Add

<img src={require('./images/AllowandApprove.gif').default} alt="RangeOrder1" width="100%" height="auto" />

<br />
<br />

The final step in the liquidity provision process requires LPs to approve the Uniswap v3 router contract (check the contract addresses [here](https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md)) to spend LP tokens on their behalf.

Once the 'approve' transaction has been confirmed, an LP can proceed to add their capital. LPs will be presented with a confirmation pop up with an overview of their specified parameters.

Depending on the price range selected, migrating LPs will be refunded portions of both tokens. Note that regardless of selected price range, there will always be at least a small portion of tokens being refunded. These refunds are necessary due to rounding issues: exact underlying amounts do not perfectly correspond to liquidity amounts, so the contract must round down.

After the 'add' transaction has been confirmed, LPs can find and manage their new positions on the 'Pool' page.

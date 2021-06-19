---
id: 02-trading-from-a-smart-contract
title: Implement a Swap
tags: developer-guides, documentation
---

When trading from a smart contract, the most important thing to keep in mind is that access to an external price source is _required_. Without this, trades can be frontrun for considerable loss.

_Read [safety considerations](#safety-considerations) for more._

# Using the Router

The easiest way to safely swap tokens is to use the [router](../../reference/smart-contracts/06-router02.md), which provides a variety of methods to safely swap to and from different assets. You'll notice that there is a function for each permutation of swapping to/from an exact amount of ETH/tokens.

First you must use an external price source to calculate the safety parameters for the function you'd like to call. This is either a minimum amount received when selling an exact input or the maximum amount you are willing to pay when a buying an exact output amount

It is also important to ensure that your contract controls enough ETH/tokens to make the swap, and has granted approval to the router to withdraw this many tokens.

_Check out the [Pricing](../../concepts/03-advanced-topics/02-pricing.md#pricing-trades) page for a more in depth discussion on getting prices._

# Example

Imagine you want to swap 50 DAI for as much ETH as possible from your smart contract.

## transferFrom

Before swapping, our smart contracts needs to be in control of 50 DAI. The easiest way to accomplish this is by calling `transferFrom` on DAI with the owner set to `msg.sender`:

```solidity
uint amountIn = 50 * 10 ** DAI.decimals();
require(DAI.transferFrom(msg.sender, address(this), amountIn), 'transferFrom failed.');
```

## approve

Now that our contract owns 50 DAI, we need to approve to the [router](../../reference/smart-contracts/06-router02.md) to withdraw this DAI:

```solidity
require(DAI.approve(address(UniswapV2Router02), amountIn), 'approve failed.');
```

## swapExactTokensForETH

Now we're ready to swap:

```solidity
// amountOutMin must be retrieved from an oracle of some kind
address[] memory path = new address[](2);
path[0] = address(DAI);
path[1] = UniswapV2Router02.WETH();
UniswapV2Router02.swapExactTokensForETH(amountIn, amountOutMin, path, msg.sender, block.timestamp);
```

# Safety Considerations

Because Ethereum transactions occur in an adversarial environment, smart contracts that do not perform safety checks _can be exploited for profit_. If a smart contract assumes that the current price on Uniswap is a "fair" price without performing safety checks, _it is vulnerable to manipulation_. A bad actor could e.g. easily insert transactions before and after the swap (a "sandwich" attack) causing the smart contract to trade at a much worse price, profit from this at the trader's expense, and then return the contracts to their original state. (One important caveat is that these types of attacks are mitigated by trading in extremely liquid pools, and/or at low values.)

The best way to protect against these attacks is to use an external price feed or "price oracle". The best "oracle" is simply _traders' off-chain observation of the current price_, which can be passed into the trade as a safety check. This strategy is best for situations _where users initiate trades on their own behalf_.

However, when an off-chain price can't be used, an on-chain oracle should be used instead. Determining the best oracle for a given situation is a not part of this guide, but for more details on the Uniswap V2 approach to oracles, see [Oracles](../../concepts/02-core-concepts/04-oracles.md).

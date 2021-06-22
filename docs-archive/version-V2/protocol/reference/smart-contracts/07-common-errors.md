---
title: Common Errors
tags: smart-contracts, documentation
---

This document covers a few error codes frequently encountered while building on Uniswap V2.

# UniswapV2: K

This is an error that is frequently encountered, and requires a bit of context to understand it.

The Uniswap constant product formula is “X * Y = K”. Where X and Y represent the respective reserve balances of two ERC-20 tokens, and “K” represents the product of the reserves. It is this “K” to which the “K” error refers.

In essence, the “K” error means that a trade was attempted that somehow left the trading pair with less reserves than should be there, and as a result the transaction is reverted. 

This can have a few different causes. 

## Fee On Transfer Tokens 

The most common examples are caused by “fee on transfer” tokens. 

### Inclusive Fee On Transfer Tokens

In most cases, a fee on transfer token burns or diverts a small portion of every transfer such that the recipient of the transfer ends up with slightly less than the sender gave. This is called an “inclusive” fee on transfer.

In the case of inclusive fee on transfer tokens, you can use the corresponding swap functions in the router contract which end with [“SupportingFeeOnTransfer”](../smart-contracts/06-router02.md#swapexacttokensfortokenssupportingfeeontransfertokens). These functions succeed by adjusting the “amountOutMin” parameter to check the recipient amount rather than the sending amount when calculating the invariant.

### Exclusive Fee On Transfer Tokens

The other type, “exclusive” fee on transfer tokens, work by sending an additional transfer from the sending address after the primary transfer. Because the router contract cannot anticipate this trailing transfer when calculating the invariant, the transaction will either revert, or partially succeed by sending the primary transfer but breaking the pool upon the trailing transfer. 

In the case of exclusive fee on transfer tokens, the SupportingFeeOnTransfer functions may work, but there will be some tokens designed in such a way that they fundamentally break the router. If you are still getting a “K” error when using these functions, you may need to make a fork of the router contract that accommodates your token design. 

## Rebasing Tokens

The less common instance of the “K” error is as a result of rebasing tokens.

Rebasing tokens can alter the balance of any addresses holding their tokens arbitrarily. This usually works at pre specified intervals and as a result of a handful of variables used in the economics of a rebasing token. 

Rebasing tokens typically work in two ways.

### Negative Rebasing Tokens

A negative rebasing token, the more common variant, deflates the balances of token owners. Because the rebasing is not triggered by transfers, the router cannot expect when or how a rebasing will happen. Once it does, the pair reserves will be unbalanced, and the next person to transact with the pair will bear the cost of the delta as a result of the rebasing. 

Needless to say, an unenviable position.

Negative rebasing tokens have solved this error by altering their token contract to call [sync](../smart-contracts/02-pair.md#sync) on the trading pair at the end of every transaction involving the Uniswap router contract. Those interested in forking the router contract should anticipate that negative rebasing tokens will break the pair until the token contracts are updated to accommodate your new router. 

### Positive Rebasing Tokens 

Positive rebasing tokens arbitrarily increase the balances of token holders. When a positive rebase happens, it creates a surplus that is unaccounted for in the trading pair. Because the extra tokens are unaccounted for in the trading pair, anyone can call skim() on the trading pair and effectively steal the positive difference from the rebalance. 

While positive rebalancing does not break any functionality of Uniswap, those interested in them should be aware that the positive balance found in any pair will be freely available for taking.

### A Note on Rebasing Tokens

For those interested in building a rebasing token, a word of caution: many contracts involving decentralized trading and liquidity provisioning will break upon interacting with your token. An example approach that will lead to much easier integration in future protocols can be found in [CHAI](https://chai.money/about.html). CHAI uses a wrapper function that contains the rebalancing within the wrapper, such that the redeemable token can be easily integrated into many different systems.

# UniswapV2: LOCKED

The LOCKED error is a guard built into the router contract that prevents customized reentrancy contracts from attempting to return malicious code into the router contract at the end of a transaction.

This error is commonly encountered when using Ganache CLI to fork the Ethereum mainnet to a local instance as a part of a development environment. The error is a bug in Ganache-Cli that will hopefully be fixed in a future release by the truffle team. 

A temporary fix is available by simply restarting the local fork.


# No Access To Archive Node

This is an error with either Metamask or Ganache-CLI. It usually occurs after a local fork is instantiated and contracts are deployed but there is one failed transaction.

A temporary fix is available by restarting the local fork and resetting metamask.


# UniswapV2: TRANSFER_FAILED

This means the core contract was unable to send tokens to the recipient. This is most likely due to a scam token, where the token owner has maliciously disabled the transfer function in a way that allows users to buy the token, but not sell them. 

# UniswapV2: EXPIRED

This is a result of a transaction that took too long to be broadcast to the mainnet. 

Uniswap does not set gas prices natively, so most users default to the suggested gas prices in metamask. Sometimes metamask gets it wrong, though, and sets the gas price too low. If a swap takes more than 20 minutes to execute, the core contract won’t allow it to go through.

Finding accurate gas prices can be a challenge, for the time being, we like [Gas Now](https://www.gasnow.org/).

# Action Requires an Active Reserve

VM Exception While Processing Transaction: Action Requires an Active Reserve

This is potentially a ganache bug encountered when working on flash swaps. We haven't figured out the source of it yet. 

# Unable To Approve Transaction On The Front End 

There are rare circumstances where users are unable to approve a token on the Uniswap front end. 

This is a result of some token contracts taking steps to defend against malicious contracts that attempt to front run approvals and steal a users tokens. It happens only when the user is trying to increase an approval allowance from a preallocated amount to a larger one, and only happens with a few token contracts.

The solution is have the user manually set the router contract approval amount to zero, then to the number they want. The easiest way to do this is through Etherscan. 


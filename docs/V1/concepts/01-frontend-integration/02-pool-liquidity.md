---
id: 02-pool-liquidity
title: Pool Liquidity
---

# Formalized Model

Uniswap liquidity pools are autonomous and use the Constant Product Market Maker \(`x * y = k`\). This model was formalized and the smart contract implementation passed a lightweight formal verification.

- [Formalized Specification](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf)
- [Lightweight Verification](https://github.com/runtimeverification/verified-smart-contracts/tree/uniswap/uniswap/results)

## Create Exchange

The `createExchange` function is used to deploy exchange contracts for ERC20 tokens that do not yet have one.

```javascript
factory.methods.createExchange(tokenAddress).send();
```

Once an exchange is created the address can be retrieved with [`getExchange`](../connect-to-uniswap/#get-exchange-address).

## Exchange Reserves

Each exchange contract holds a liquidity reserve of ETH and its associated ERC20 token.

### ETH Reserve

The ETH reserve associated with an ERC20 token exchange is the ETH balance of the exchange smart contract.

```javascript
const ethReserve = web3.eth.getBalance(exchangeAddress);
```

### ERC20 Reserve

The ERC20 reserve associated with an ERC20 token exchange is the ERC20 balance of the exchange smart contract.

```javascript
const tokenReserve = tokenContract.methods.balanceOf(exchangeAddress);
```

## Add Liquidity

Anyone who wants can join a Uniswap liquidity pool by calling the `addLiquidity` function.

```javascript
exchange.methods
  .addLiquidity(min_liquidity, max_tokens, deadline)
  .send({ value: ethAmount });
```

Adding liquidity requires depositing an equivalent **value** of ETH and ERC20 tokens into the ERC20 token's associated exchange contract.

The first liquidity provider to join a pool sets the initial exchange rate by depositing what they believe to be an equivalent value of ETH and ERC20 tokens. If this ratio is off, arbitrage traders will bring the prices to equilibrium at the expense of the initial liquidity provider.

All future liquidity providers deposit ETH and ERC20's using the exchange rate at the moment of their deposit. If the exchange rate is bad there is a profitable arbitrage opportunity that will correct the price.

### Parameters

The `ethAmount` sent to `addLiquidity` is the exact amount of ETH that will be deposited into the liquidity reserves. It should be 50% of the total value a liquidity provider wishes to deposit into the reserves.

Since liquidity providers must deposit at the current exchange rate, the Uniswap smart contracts use `ethAmount` to determine the amount of ERC20 tokens that must be deposited. This token amount is the remaining 50% of total value a liquidity provider wishes to deposit. Since exchange rate can change between when a transaction is signed and when it is executed on Ethereum, `max_tokens` is used to bound the amount this rate can fluctuate. For the first liquidity provider, `max_tokens` is the exact amount of tokens deposited.

Liquidity tokens are minted to track the relative proportion of total reserves that each liquidity provider has contributed. `min_liquidity` is used in combination with `max_tokens` and `ethAmount` to bound the rate at which liquidity tokens are minted. For the first liquidity provider, `min_liquidity` does not do anything and can be set to 0.

Transaction `deadline` is used to set a time after which a transaction can no longer be executed. This limits the "free option" problem, where Ethereum miners can hold signed transactions and execute them based off market movements.

## Remove Liquidity

Liquidity providers use the `removeLiquidity` function to withdraw their portion of the reserves.

```javascript
exchange.methods.removeLiquidity(amount, min_eth, min_tokens, deadline).send();
```

Liquidity is withdrawn at the same ratio as the reserves at the time of withdrawal. If the exchange rate is bad there is a profitable arbitrage opportunity that will correct the price.

### Parameters

`amount` specifies the number of liquidity tokens that will be burned. Dividing this amount by the total liquidity token supply gives the percentage of both the ETH and ER20 reserves the provider is withdrawing.

Since exchange rate can change between when a transaction is signed and when it is executed on Ethereum, `min_eth` and `min_tokens` are used to bound the amount this rate can fluctuate.

Same as in `addLiquidity`, `deadline` is used to set a time after which a transaction can no longer be executed.

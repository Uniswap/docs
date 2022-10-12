---
id: trade-tokens
title: Trade Tokens
---

In Uniswap, there is a separate exchange contract for each ERC20 token. These exchanges hold reserves of both ETH and their associated ERC20. Instead of waiting to be matched in an order-book, users can make trades against the reserves at any time. Reserves are pooled between a decentralized network of liquidity providers who collect fees on every trade.

Pricing is automatic, based on the `x * y = k` market making formula which automatically adjusts prices based off the relative sizes of the two reserves and the size of the incoming trade. Since all tokens share ETH as a common pair, it is used as an intermediary asset for direct trading between any ERC20 ⇄ ERC20 pair.

## ETH ⇄ ERC20 Calculations

The variables needed to determine price when trading between ETH and ERC20 tokens is:

- ETH reserve size of the ERC20 exchange
- ERC20 reserve size of the ERC20 exchange
- Amount sold \(input\) or amount bought \(output\)

### Amount Bought \(sell order\)

For sell orders \(exact input\), the amount bought \(output\) is calculated:

```javascript
// Sell ETH for ERC20
const inputAmount = userInputEthValue
const inputReserve = web3.eth.getBalance(exchangeAddress)
const outputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()

// Sell ERC20 for ETH
const inputAmount = userInputTokenValue
const inputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()
const outputReserve = web3.eth.getBalance(exchangeAddress)

// Output amount bought
const numerator = inputAmount * outputReserve * 997
const denominator = inputReserve * 1000 + inputAmount * 997
const outputAmount = numerator / denominator
```

### Amount Sold \(buy order\)

For buy orders \(exact output\), the cost \(input\) is calculated:

```javascript
// Buy ERC20 with ETH
const outputAmount = userInputTokenValue
const inputReserve = web3.eth.getBalance(exchangeAddress)
const outputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()

// Buy ETH with ERC20
const outputAmount = userInputEthValue
const inputReserve = tokenContract.methods.balanceOf(exchangeAddress).call()
const outputReserve = web3.eth.getBalance(exchangeAddress)

// Cost
const numerator = outputAmount * inputReserve * 1000
const denominator = (outputReserve - outputAmount) * 997
const inputAmount = numerator / denominator + 1
```

### Liquidity Provider Fee

There is a 0.3% liquidity provider fee built into the price formula. This can be calculated:

```javascript
fee = inputAmount * 0.003
```

### Exchange Rate

The exchange rate is simply the output amount divided by the input amount.

```javascript
const rate = outputAmount / inputAmount
```

## ERC20 ⇄ ERC20 Calculations

The variables needed to determine price when trading between two ERC20 tokens is:

- ETH reserve size of the input ERC20 exchange
- ERC20 reserve size of the input ERC20 exchange
- ETH reserve size of the output ERC20 exchange
- ERC20 reserve size of the output ERC20 exchange
- Amount sold \(input\) or amount bought \(output\)

### Amount Bought \(sell order\)

For sell orders \(exact input\), the amount bought \(output\) is calculated:

```javascript
// TokenA (ERC20) to ETH conversion
const inputAmountA = userInputTokenAValue
const inputReserveA = tokenContractA.methods.balanceOf(exchangeAddressA).call()
const outputReserveA = web3.eth.getBalance(exchangeAddressA)

const numeratorA = inputAmountA * outputReserveA * 997
const denominatorA = inputReserveA * 1000 + inputAmountA * 997
const outputAmountA = numeratorA / denominatorA

// ETH to TokenB conversion
const inputAmountB = outputAmountA
const inputReserveB = web3.eth.getBalance(exchangeAddressB)
const outputReserveB = tokenContract.methods.balanceOf(exchangeAddressB).call()

const numeratorB = inputAmountB * outputReserveB * 997
const denominatorB = inputReserveB * 1000 + inputAmountB * 997
const outputAmountB = numeratorB / denominatorB
```

### Amount Sold \(buy order\)

For buy orders \(exact output\), the cost \(input\) is calculated:

```javascript
// Buy TokenB with ETH
const outputAmountB = userInputTokenBValue
const inputReserveB = web3.eth.getBalance(exchangeAddressB)
const outputReserveB = tokenContractB.methods.balanceOf(exchangeAddressB).call()

// Cost
const numeratorB = outputAmountB * inputReserveB * 1000
const denominatorB = (outputReserveB - outputAmountB) * 997
const inputAmountB = numeratorB / denominatorB + 1

// Buy ETH with TokenA
const outputAmountA = inputAmountB
const inputReserveA = tokenContractA.methods.balanceOf(exchangeAddressA).call()
const outputReserveA = web3.eth.getBalance(exchangeAddressA)

// Cost
const numeratorA = outputAmountA * inputReserveA * 1000
const denominatorA = (outputReserveA - outputAmountA) * 997
const inputAmountA = numeratorA / denominatorA + 1
```

### Liquidity Provider Fee

There is a 0.30% liquidity provider fee to swap from TokenA to ETH on the input exchange. There is another 0.3% liquidity provider fee to swap the remaining ETH to TokenB.

```javascript
const exchangeAFee = inputAmountA * 0.003
const exchangeBFee = inputAmountB * 0.003
```

Since users only inputs Token A, it can be represented to them as:

```javascript
const combinedFee = inputAmountA * 0.00591
```

### Exchange Rate

The exchange rate is simply the output amount divided by the input amount.

```javascript
const rate = outputAmountB / inputAmountA
```

## Deadlines

Many Uniswap functions include a transaction `deadline` that sets a time after which a transaction can no longer be executed. This limits miners holding signed transactions for extended durations and executing them based off market movements. It also reduces uncertainty around transactions that take a long time to execute due to issues with gas price.

Deadlines are calculated by adding the desired amount of time \(in seconds\) to the latest Ethereum block timestamp.

```javascript
web3.eth.getBlock('latest', (error, block) => {
  deadline = block.timestamp + 300 // transaction expires in 300 seconds (5 minutes)
})
```

## Recipients

Uniswap allows traders to swap tokens and transfer the output to a new `recipient` address. This allows for a type of payment where the payer sends one token and the payee receives another.

## ETH ⇄ ERC20 Trades

Coming soon...

## ERC20 ⇄ ERC20 Trades

Coming soon...

## Custom Pools

Coming soon...

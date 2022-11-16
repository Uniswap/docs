---
id: exchange
title: Exchange
---

# setup

| Parameter  |                        Description |
| :--------- | ---------------------------------: |
| token_addr | Ethereum address of an ERC20 Token |

## Smart Contract

```python
# Can only be called by factory contract during createExchange()
setup(token_addr: address):
```

## Web3

```javascript
// Can only be called by factory contract during createExchange()
exchangeContract.methods.setup((token: String)).send()
```

# addLiquidity

| Parameter     | Type    |                Description |
| :------------ | :------ | -------------------------: |
| msg.value     | uint256 |        Amount of ETH added |
| min_liquidity | uint256 |   Minimum minted liquidity |
| max_tokens    | uint256 | Maximum ERC20 tokens added |
| deadline      | uint256 |       Transaction deadline |

| Returns |                                   |
| :------ | --------------------------------: |
| uint256 | Amount of liquidity tokens minted |

## Smart Contract

```python
@payable
addLiquidity(
    min_liquidity: uint256,
    max_tokens: uint256,
    deadline: uint256
): uint256
```

## Web3

```javascript
exchangeContract.methods.addLiquidity(min_liquidity, max_tokens, deadline).send({ value: ethValue })
```

# removeLiquidity

| Parameter  | Type    |                  Description |
| :--------- | :------ | ---------------------------: |
| amount     | uint256 |   Amount of liquidity burned |
| min_eth    | uint256 |          Minimum ETH removed |
| min_tokens | uint256 | Minimum ERC20 tokens removed |
| deadline   | uint256 |         Transaction deadline |

| Returns |                                 |
| :------ | ------------------------------: |
| uint256 |           Amount of ETH removed |
| uint256 | Amount of ERC20 tokens removed. |

## Smart Contract

```python
removeLiquidity(
    amount: uint256;
    min_eth: uint256,
    min_tokens: uint256,
    deadline: uint256
): (uint256, uint256)
```

## Web3

```javascript
exchangeContract.methods.removeLiquidity(amount, min_eth, min_tokens, deadline).send()
```

# default

| Parameter | Type    |        Description |
| :-------- | :------ | -----------------: |
| msg.value | uint256 | Amount of ETH sold |

## Smart Contract

```python
# Default function in Vyper replaces the "fallback" function in Solidity
@payable
__default__():
```

## Web3

```javascript
web3.eth.sendTransaction({ value: ethAmount })
```

# ethToTokenSwapInput

| Parameter  | Type    |                 Description |
| :--------- | :------ | --------------------------: |
| msg.value  | uint256 |          Amount of ETH sold |
| min_tokens | uint256 | Minimum ERC20 tokens bought |
| deadline   | uint256 |        Transaction deadline |

| Returns |                               |
| :------ | ----------------------------: |
| uint256 | Amount of ERC20 tokens bought |

## Smart Contract

```python
@payable
ethToTokenSwapInput(
    min_tokens: uint256,
    deadline: uint256
): uint256
```

## Web3

```javascript
exchangeContract.methods.ethToTokenSwapInput(min_liquidity, max_tokens, deadline).send({ value: ethValue })
```

# ethToTokenTransferInput

| Parameter  | Type    |                        Description |
| :--------- | :------ | ---------------------------------: |
| msg.value  | uint256 |                 Amount of ETH sold |
| min_tokens | uint256 |        Minimum ERC20 tokens bought |
| deadline   | uint256 |               Transaction deadline |
| recipient  | address | Address that receives ERC20 tokens |

| Returns |                               |
| :------ | ----------------------------: |
| uint256 | Amount of ERC20 tokens bought |

## Smart Contract

```python
@payable
ethToTokenTransferInput(
    min_tokens: uint256,
    deadline: uint256,
    recipient: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .ethToTokenTransferInput(min_liquidity, max_tokens, deadline, recipient)
  .send({ value: ethValue })
```

# ethToTokenSwapOutput

| Parameter     | Type    |                   Description |
| :------------ | :------ | ----------------------------: |
| msg.value     | uint256 |              Maximum ETH sold |
| tokens_bought | uint256 | Amount of ERC20 tokens bought |
| deadline      | uint256 |          Transaction deadline |

| Returns |                    |
| :------ | -----------------: |
| uint256 | Amount of ETH sold |

## Smart Contract

```python
@payable
ethToTokenSwapOutput(
    tokens_bought: uint256,
    deadline: uint256
): uint256
```

## Web3

```javascript
exchangeContract.methods.ethToTokenSwapOutput(tokens_bought, deadline).send({ value: ethValue })
```

# ethToTokenTransferOutput

| Parameter     | Type    |                        Description |
| :------------ | :------ | ---------------------------------: |
| msg.value     | uint256 |                   Maximum ETH sold |
| tokens_bought | uint256 |      Amount of ERC20 tokens bought |
| deadline      | uint256 |               Transaction deadline |
| recipient     | address | Address that receives ERC20 tokens |

| Returns |                    |
| :------ | -----------------: |
| uint256 | Amount of ETH sold |

## Smart Contract

```python
@payable
ethToTokenTransferOutput(
    tokens_bought: uint256,
    deadline: uint256,
    recipient: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .ethToTokenTransferOutput(tokens_bought, deadline, (recipient: String))
  .send({ value: ethValue })
```

# tokenToEthSwapInput

| Parameter   | Type    |                 Description |
| :---------- | :------ | --------------------------: |
| tokens_sold | uint256 | Amount of ERC20 tokens sold |
| min_eth     | uint256 |          Minimum ETH bought |
| deadline    | uint256 |        Transaction deadline |

| Returns |                      |
| :------ | -------------------: |
| uint256 | Amount of ETH bought |

## Smart Contract

```python
tokenToEthSwapInput(
    tokens_sold: uint256,
    min_eth: uint256,
    deadline: uint256
): uint256
```

## Web3

```javascript
exchangeContract.methods.tokenToEthSwapInput(tokens_sold, min_eth, deadline).send()
```

# tokenToEthTransferInput

| Parameter   | Type    |                 Description |
| :---------- | :------ | --------------------------: |
| tokens_sold | uint256 | Amount of ERC20 tokens sold |
| min_eth     | uint256 |          Minimum ETH bought |
| deadline    | uint256 |        Transaction deadline |
| recipient   | address |   Address that receives ETH |

| Returns |                      |
| :------ | -------------------: |
| uint256 | Amount of ETH bought |

## Smart Contract

```python
tokenToEthTransferInput(
    tokens_sold: uint256,
    min_eth: uint256,
    deadline: uint256,
    recipient: address
): uint256
```

## Web3

```javascript
exchangeContract.methods.tokenToEthTransferInput(tokens_sold, min_eth, deadline, recipient).send()
```

# tokenToEthSwapOutput

| Parameter  | Type    |               Description |
| :--------- | :------ | ------------------------: |
| eth_bought | uint256 |      Amount of ETH bought |
| max_tokens | uint256 | Maximum ERC20 tokens sold |
| deadline   | uint256 |      Transaction deadline |

| Returns |                             |
| :------ | --------------------------: |
| uint256 | Amount of ERC20 tokens sold |

## Smart Contract

```python
tokenToEthSwapOutput(
    eth_bought: uint256,
    max_tokens: uint256,
    deadline: uint256
): uint256
```

## Web3

```javascript
exchangeContract.methods.tokenToEthSwapOutput(eth_bought, max_tokens, (deadline: Integer)).send()
```

# tokenToEthTransferOutput

| Parameter  | Type    |               Description |
| :--------- | :------ | ------------------------: |
| eth_bought | uint256 |      Amount of ETH bought |
| max_tokens | uint256 | Maximum ERC20 tokens sold |
| deadline   | uint256 |      Transaction deadline |
| recipient  | address | Address that receives ETH |

| Returns |                             |
| :------ | --------------------------: |
| uint256 | Amount of ERC20 tokens sold |

## Smart Contract

```python
tokenToEthTransferOutput(
    eth_bought: uint256,
    max_tokens: uint256,
    deadline: uint256,
    recipient: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToEthTransferOutput(eth_bought, max_tokens, (deadline: Integer), (recipient: String))
  .send()
```

# tokenToTokenSwapInput

| Parameter         | Type    |                        Description |
| :---------------- | :------ | ---------------------------------: |
| tokens_sold       | uint256 |  Amount of input ERC20 tokens sold |
| min_tokens_bought | uint256 | Minimum output ERC20 tokens bought |
| min_eth_bought    | uint256 | Minimum ETH bought as intermediary |
| deadline          | uint256 |               Transaction deadline |
| token_addr        | address |      Address of output ERC20 token |

| Returns |                                      |
| :------ | -----------------------------------: |
| uint256 | Amount of output ERC20 tokens bought |

## Smart Contract

```python
tokenToTokenSwapInput(
    tokens_sold: uint256,
    min_tokens_bought: uint256,
    min_eth_bought: uint256,
    deadline: uint256,
    token_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToTokenSwapInput(tokens_sold, min_tokens_bought, min_eth_bought, deadline, token_addr)
  .send()
```

# tokenToTokenTransferInput

| Parameter         | Type    |                               Description |
| :---------------- | :------ | ----------------------------------------: |
| tokens_sold       | uint256 |         Amount of input ERC20 tokens sold |
| min_tokens_bought | uint256 |        Minimum output ERC20 tokens bought |
| min_eth_bought    | uint256 |        Minimum ETH bought as intermediary |
| deadline          | uint256 |                      Transaction deadline |
| recipient         | address | Address that receives output ERC20 tokens |
| token_addr        | address |             Address of output ERC20 token |

| Returns |                                      |
| :------ | -----------------------------------: |
| uint256 | Amount of output ERC20 tokens bought |

## Smart Contract

```python
tokenToTokenTransferInput(
    tokens_sold: uint256,
    min_tokens_bought: uint256,
    min_eth_bought: uint256,
    deadline: uint256,
    recipient: address
    token_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToTokenTransferInput(tokens_sold, min_tokens_bought, min_eth_bought, deadline, recipient, token_addr)
  .send()
```

# tokenToTokenSwapOutput

| Parameter       | Type    |                          Description |
| :-------------- | :------ | -----------------------------------: |
| tokens_bought   | uint256 | Amount of output ERC20 tokens bought |
| max_tokens_sold | uint256 |    Maximum input ERC20 tokens bought |
| max_eth_sold    | uint256 |   Maximum ETH bought as intermediary |
| deadline        | uint256 |                 Transaction deadline |
| token_addr      | address |        Address of output ERC20 token |

| Returns |                                   |
| :------ | --------------------------------: |
| uint256 | Amount of input ERC20 tokens sold |

## Smart Contract

```python
tokenToTokenSwapOutput(
    tokens_bought: uint256,
    max_tokens_sold: uint256,
    max_eth_sold: uint256,
    deadline: uint256,
    token_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToTokenSwapOutput(tokens_bought, max_tokens_sold, max_eth_sold, deadline, token_addr)
  .send()
```

# tokenToTokenTransferOutput

| Parameter       | Type    |                               Description |
| :-------------- | :------ | ----------------------------------------: |
| tokens_bought   | uint256 |      Amount of output ERC20 tokens bought |
| max_tokens_sold | uint256 |         Maximum input ERC20 tokens bought |
| max_eth_sold    | uint256 |        Maximum ETH bought as intermediary |
| deadline        | uint256 |                      Transaction deadline |
| recipient       | address | Address that receives output ERC20 tokens |
| token_addr      | address |             Address of output ERC20 token |

| Returns |                                   |
| :------ | --------------------------------: |
| uint256 | Amount of input ERC20 tokens sold |

## Smart Contract

```python
tokenToTokenTransferOutput(
    tokens_bought: uint256,
    max_tokens_sold: uint256,
    max_eth_sold: uint256,
    deadline: uint256,
    recipient: address,
    token_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToTokenTransferOutput(tokens_bought, max_tokens_sold, max_eth_sold, deadline, recipient, token_addr)
  .send()
```

# tokenToExchangeSwapInput

| Parameter         | Type    |                            Description |
| :---------------- | :------ | -------------------------------------: |
| tokens_sold       | uint256 |      Amount of input ERC20 tokens sold |
| min_tokens_bought | uint256 |     Minimum output ERC20 tokens bought |
| min_eth_bought    | uint256 |     Minimum ETH bought as intermediary |
| deadline          | uint256 |                   Transaction deadline |
| exchange_addr     | address | Address of output ERC20 token exchange |

| Returns |                                      |
| :------ | -----------------------------------: |
| uint256 | Amount of output ERC20 tokens bought |

## Smart Contract

```python
tokenToTokenSwapInput(
    tokens_sold: uint256,
    min_tokens_bought: uint256,
    min_eth_bought: uint256,
    deadline: uint256,
    exchange_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToTokenSwapInput(tokens_sold, min_tokens_bought, min_eth_bought, deadline, exchange_addr)
  .send()
```

# tokenToExchangeTransferInput

| Parameter         | Type    |                               Description |
| :---------------- | :------ | ----------------------------------------: |
| tokens_sold       | uint256 |         Amount of input ERC20 tokens sold |
| min_tokens_bought | uint256 |        Minimum output ERC20 tokens bought |
| min_eth_bought    | uint256 |        Minimum ETH bought as intermediary |
| deadline          | uint256 |                      Transaction deadline |
| recipient         | address | Address that receives output ERC20 tokens |
| exchange_addr     | address |    Address of output ERC20 token exchange |

| Returns |                                      |
| :------ | -----------------------------------: |
| uint256 | Amount of output ERC20 tokens bought |

## Smart Contract

```python
tokenToExchangeTransferInput(
    tokens_sold: uint256,
    min_tokens_bought: uint256,
    min_eth_bought: uint256,
    deadline: uint256,
    recipient: address
    exchange_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToExchangeTransferInput(tokens_sold, min_tokens_bought, min_eth_bought, deadline, recipient, exchange_addr)
  .send()
```

# tokenToExchangeSwapOutput

| Parameter       | Type    |                            Description |
| :-------------- | :------ | -------------------------------------: |
| tokens_bought   | uint256 |   Amount of output ERC20 tokens bought |
| max_tokens_sold | uint256 |      Maximum input ERC20 tokens bought |
| max_eth_sold    | uint256 |     Maximum ETH bought as intermediary |
| deadline        | uint256 |                   Transaction deadline |
| exchange_addr   | address | Address of output ERC20 token exchange |

| Returns |                                   |
| :------ | --------------------------------: |
| uint256 | Amount of input ERC20 tokens sold |

## Smart Contract

```python
tokenToExchangeSwapOutput(
    tokens_bought: uint256,
    max_tokens_sold: uint256,
    max_eth_sold: uint256,
    deadline: uint256,
    exchange_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToExchangeSwapOutput(tokens_bought, max_tokens_sold, max_eth_sold, deadline, exchange_addr)
  .send()
```

# tokenToExchangeTransferOutput

| Parameter       | Type    |                               Description |
| :-------------- | :------ | ----------------------------------------: |
| tokens_bought   | uint256 |      Amount of output ERC20 tokens bought |
| max_tokens_sold | uint256 |         Maximum input ERC20 tokens bought |
| max_eth_sold    | uint256 |        Maximum ETH bought as intermediary |
| deadline        | uint256 |                      Transaction deadline |
| recipient       | address | Address that receives output ERC20 tokens |
| exchange_addr   | address |    Address of output ERC20 token exchange |

| Returns |                                   |
| :------ | --------------------------------: |
| uint256 | Amount of input ERC20 tokens sold |

## Smart Contract

```python
tokenToExchangeTransferOutput(
    tokens_bought: uint256,
    max_tokens_sold: uint256,
    max_eth_sold: uint256,
    deadline: uint256,
    recipient: address,
    exchange_addr: address
): uint256
```

## Web3

```javascript
exchangeContract.methods
  .tokenToExchangeTransferOutput(tokens_bought, max_tokens_sold, max_eth_sold, deadline, recipient, exchange_addr)
  .send()
```

# getEthToTokenInputPrice

| Parameter | Type    |        Description |
| :-------- | :------ | -----------------: |
| eth_sold  | uint256 | Amount of ETH sold |

| Returns |                                           |
| :------ | ----------------------------------------: |
| uint256 | Amount of ERC20 tokens that can be bought |

## Smart Contract

```python
@constant
getEthToTokenInputPrice(eth_sold: uint256): uint256
```

## Web3

```javascript
exchangeContract.methods.getEthToTokenInputPrice(eth_sold).call()
```

# getEthToTokenOutputPrice

| Parameter     | Type    |                   Description |
| :------------ | :------ | ----------------------------: |
| tokens_bought | uint256 | Amount of ERC20 tokens bought |

| Returns |                                 |
| :------ | ------------------------------: |
| uint256 | Amount of ETH that must be sold |

## Smart Contract

```python
@constant
getEthToTokenOutputPrice(tokens_bought: uint256): uint256
```

## Web3

```javascript
exchangeContract.methods.getEthToTokenOutputPrice(tokens_bought).call()
```

# getTokenToEthInputPrice

| Parameter   | Type    |                 Description |
| :---------- | :------ | --------------------------: |
| tokens_sold | uint256 | Amount of ERC20 tokens sold |

| Returns |                                  |
| :------ | -------------------------------: |
| uint256 | Amount of ETH that can be bought |

## Smart Contract

```python
@constant
getTokenToEthInputPrice(tokens_sold: uint256): uint256
```

## Web3

```javascript
exchangeContract.methods.getTokenToEthInputPrice(tokens_sold).call()
```

# getTokenToEthOutputPrice

| Parameter  | Type    |          Description |
| :--------- | :------ | -------------------: |
| eth_bought | uint256 | Amount of ETH bought |

| Returns |                                          |
| :------ | ---------------------------------------: |
| uint256 | Amount of ERC20 tokens that must be sold |

## Smart Contract

```python
@constant
getTokenToEthOutputPrice(eth_bought: uint256): uint256
```

## Web3

```javascript
exchangeContract.methods.getTokenToEthOutputPrice(eth_bought).call()
```

# tokenAddress

| Returns |                                         |
| :------ | --------------------------------------: |
| address | Address of ERC20 token sold on exchange |

## Smart Contract

```python
@constant
tokenAddress(): address
```

## Web3

```javascript
exchangeContract.methods.tokenAddress().call()
```

# factoryAddress

| Returns |                                          |
| :------ | ---------------------------------------: |
| address | Address of factory that created exchange |

## Smart Contract

```python
@constant
factoryAddress(): address
```

## Web3

```javascript
exchangeContract.methods.factoryAddress().call()
```

# name

| Returns |                         |
| :------ | ----------------------: |
| bytes32 | Name of liquidity token |

## Smart Contract

```python
# all exchange contracts have the same name
@constant
name(): bytes32 // Uniswap V1
```

## Web3

```javascript
exchangeContract.methods.tokenAddress().call()
```

# symbol

| Returns |                           |
| :------ | ------------------------: |
| bytes32 | Symbol of liquidity token |

## Smart Contract

```python
# all exchange contracts have the same symbol
@constant
symbol(): bytes32 // UNI-V1
```

## Web3

```javascript
exchangeContract.methods.tokenAddress().call()
```

# decimals

| Returns |                             |
| :------ | --------------------------: |
| uint256 | Decimals of liquidity token |

## Smart Contract

```python
# all exchange contracts have the same decimals
@constant
decimals(): uint256 // 18
```

## Web3

```javascript
exchangeContract.methods.decimals().call()
```

# balanceOf

| Parameter | Type    |      Description |
| :-------- | :------ | ---------------: |
| \_owner   | address | Ethereum address |

| Returns |                                    |
| :------ | ---------------------------------: |
| uint256 | Liquidity token balance of address |

## Smart Contract

```python
@constant
balanceOf(_owner: address): uint256
```

## Web3

```javascript
exchangeContract.methods.balanceOf(_owner).call()
```

# transfer

| Parameter | Type    |        Description |
| :-------- | :------ | -----------------: |
| \_to      | address |  Recipient address |
| \_value   | uint256 | Amount transferred |

| Returns |                                                 |
| :------ | ----------------------------------------------: |
| bool    | True if successful. Reverts or false on failure |

## Smart Contract

```python
transfer(
    _to: address,
    _value : uint256
): bool
```

## Web3

```javascript
exchangeContract.methods.transfer(_to, _value).send()
```

# transferFrom

| Parameter | Type    |        Description |
| :-------- | :------ | -----------------: |
| \_from    | address |     Sender address |
| \_to      | address |  Recipient address |
| \_value   | uint256 | Amount transferred |

| Returns |                                                 |
| :------ | ----------------------------------------------: |
| bool    | True if successful. Reverts or false on failure |

## Smart Contract

```python
transferFrom(
    _from: address,
    _to: address,
    _value : uint256
): bool
```

## Web3

```javascript
exchangeContract.methods.transferFrom(_from, _to, _value).send()
```

# approve

| Parameter | Type    |                 Description |
| :-------- | :------ | --------------------------: |
| \_spender | address | Address of approved spender |
| \_value   | uint256 |           Spender allowance |

| Returns |                                                 |
| :------ | ----------------------------------------------: |
| bool    | True if successful. Reverts or false on failure |

## Smart Contract

```python
approve(
    _spender: address,
    _value: uint256
): bool
```

## Web3

```javascript
exchangeContract.methods.approve(_spender, _value).send()
```

# allowance

| Parameter | Type    |                      Description |
| :-------- | :------ | -------------------------------: |
| \_owner   | address | Address of liquidity token owner |
| \_spender | uint256 |      Address of approved spender |

| Returns |                   |
| :------ | ----------------: |
| uint256 | Spender allowance |

## Smart Contract

```python
allowance(
    _owner: address,
    _spender: address
): uint256
```

## Web3

```javascript
exchangeContract.methods.allowance(_owner, _spender).call()
```

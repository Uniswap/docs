---
id: factory
title: Factory
---

# initializeFactory

| Parameter |                           Description |
| :-------- | ------------------------------------: |
| template  | Ethereum address of exchange template |

## Smart Contract

```python
initializeFactory(template: address)
```

## Web3

```javascript
factoryContract.methods.initializeFactory(template).send()
```

# createExchange

| Parameter | Type    |                        Description |
| :-------- | :------ | ---------------------------------: |
| token     | address | Ethereum address of an ERC20 token |

| Returns |                                        |
| :------ | -------------------------------------: |
| address | Ethereum address of a Uniswap exchange |

## Smart Contract

```python
createExchange(token: address): address
```

## Web3

```javascript
factoryContract.methods.createExchange(token).send()
```

# getExchange

| Parameter | Type    |                        Description |
| :-------- | :------ | ---------------------------------: |
| token     | address | Ethereum address of an ERC20 token |

| Returns |                                        |
| :------ | -------------------------------------: |
| address | Ethereum address of a Uniswap exchange |

## Smart Contract

```python
@constant
getExchange(token: address): address
```

```javascript
factoryContract.methods.getExchange(token).call()
```

# getToken

| Parameter | Type    |                            Description |
| :-------- | :------ | -------------------------------------: |
| exchange  | address | Ethereum address of a Uniswap exchange |

| Returns |                                    |
| :------ | ---------------------------------: |
| address | Ethereum address of an ERC20 token |

## Smart Contract

```python
@constant
getToken(exchange: address): address
```

## Web3

```javascript
factoryContract.methods.getToken(exchange).call()
```

# getTokenWithId

| Parameter | Type    |                   Description |
| :-------- | :------ | ----------------------------: |
| token_id  | uint256 | Uniswap ID for an ERC20 token |

| Returns |                                    |
| :------ | ---------------------------------: |
| address | Ethereum address of an ERC20 token |

## Smart Contract

```python
@constant
getTokenWithId(token_id: uint256): address
```

## Web3

```javascript
factoryContract.methods.getTokenWithId(token_id).call()
```

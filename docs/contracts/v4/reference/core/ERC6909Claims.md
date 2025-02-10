# ERC6909Claims
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/ERC6909Claims.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ERC6909](contracts/v4/reference/core/ERC6909.md)

ERC6909Claims inherits ERC6909 and implements an internal burnFrom function


## Functions
### _burnFrom

Burn `amount` tokens of token type `id` from `from`.

*if sender is not `from` they must be an operator or have sufficient allowance.*


```solidity
function _burnFrom(address from, uint256 id, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The address to burn tokens from.|
|`id`|`uint256`|The currency to burn.|
|`amount`|`uint256`|The amount to burn.|



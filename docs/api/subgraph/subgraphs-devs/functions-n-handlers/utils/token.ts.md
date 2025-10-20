---
sidebar_position: 7
title: token.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/token.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/token.ts)

### fetchTokenSymbol()
```
Params:
 - tokenAddress (Address): The ERC20 Token Address for which the symbol is returned

ReturnType: string
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Returns the string value representing the ERC20 symbol read from the contract with address `tokenAddress` using `symbol()` method. If reverted, checks if the `tokenAddres` is present in `StaticTokenDefinition`. Returns `unknown` if not found.

#### ABI Dependencies:
1. ERC20.json
2. ERC20SymbolBytes.json

#### Dependencies:
1. [isNullEthValue()](./index.ts#isnullethvalue)
2. [StaticTokenDefintion](./staticTokenDefinition.ts#statictokendefinition)
3. [StaticTokenDefintion.fromAddress()](./staticTokenDefinition.ts#fromaddress)

#### Invoked at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Logic similar to mainnet except uses `StaticTokenDefition` first and proceeds to read from contract if not found.

</TabItem>
<TabItem value="Optimism" label="Optimism">

- Logic similar to mainnet except uses `StaticTokenDefition` first and proceeds to read from contract if not found.

#### Additionally Invoked At:
1. [populateToken()](./backfill.ts#populatetoken)

</TabItem>
</Tabs>   

### fetchTokenName()
```
Params:
 - tokenAddress (Address): The ERC20 Token Address for which the Name is returned

ReturnType: string
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Returns the string value representing the ERC20 name read from the contract with address `tokenAddress` using `name()` method. If reverted, checks if the `tokenAddres` is present in `StaticTokenDefinition`. Returns `unknown` if not found.

#### ABI Dependencies:
1. ERC20.json
2. ERC20NameBytes.json

#### Dependencies:
1. [isNullEthValue()](./index.ts#isnullethvalue)
2. [StaticTokenDefintion](./staticTokenDefinition.ts#statictokendefinition)
3. [StaticTokenDefintion.fromAddress()](./staticTokenDefinition.ts#fromaddress)

#### Invoked at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Logic similar to mainnet except uses `StaticTokenDefition` first and proceeds to read from contract if not found.

</TabItem>
<TabItem value="Optimism" label="Optimism">

- Logic similar to mainnet except uses `StaticTokenDefition` first and proceeds to read from contract if not found.

#### Additionally Invoked At:
1. [populateToken()](./backfill.ts#populatetoken)

</TabItem>
</Tabs>   

### fetchTokenTotalSupply()
```
Params:
 - tokenAddress (Address): The ERC20 Token Address for which the Total Supply is 

ReturnType: BigInt
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Queries the ERC20 contract with address `tokenAddress` and returns total token supply using `totalSupply()` method. If call reverts, typecasts `null` to i32 then to BigDecimal and returns the value.

#### ABI Dependencies:
1. ERC20.json

#### Invoked at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)

</TabItem>
<TabItem value="Optimism" label="Optimism">

#### Additionally Invoked At:
1. [populateToken()](./backfill.ts#populatetoken)

</TabItem>
</Tabs>

### fetchTokenDecimals()
```
Params:
 - tokenAddress (Address): The ERC20 Token Address for which the number of decimals is returned

ReturnType: BigInt
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Queries the ERC20 contract with address `tokenAddress` and returns the decimals value for the token `decimals()` method. If call reverts, check for `tokenAddress` in `StaticTokenDefinition`. If not found, typecasts `null` to i32 then to BigDecimal and returns the value.

#### ABI Dependencies:
1. ERC20.json

#### Dependencies:
1. [StaticTokenDefintion](./staticTokenDefinition.ts#statictokendefinition)
2. [StaticTokenDefintion.fromAddress()](./staticTokenDefinition.ts#fromaddress)

#### Invoked at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Logic similar to mainnet except uses `StaticTokenDefition` first and proceeds to read from contract if not found.

</TabItem>
<TabItem value="Optimism" label="Optimism">

- Logic similar to mainnet except uses `StaticTokenDefition` first and proceeds to read from contract if not found.

#### Additionally Invoked At:
1. [populateToken()](./backfill.ts#populatetoken)

</TabItem>
</Tabs>
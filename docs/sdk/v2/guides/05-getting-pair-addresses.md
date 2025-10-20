---
id: getting-pair-addresses
title: Pair Addresses
---

## getPair

The most obvious way to get the address for a pair is to call [getPair](../../../contracts/v2/reference/smart-contracts/factory#getpair) on the factory. If the pair exists, this function will return its address, else `address(0)` (`0x0000000000000000000000000000000000000000`).

- The "canonical" way to determine whether or not a pair exists.
- Requires an on-chain lookup.

## CREATE2

Thanks to some [fancy footwork in the factory](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol#L32), we can also compute pair addresses _without any on-chain lookups_ because of [CREATE2](https://eips.ethereum.org/EIPS/eip-1014). The following values are required for this technique:

|                        |                                                                                |
| :--------------------- | :----------------------------------------------------------------------------- |
| `address`              | The [factory address](../../../contracts/v2/reference/smart-contracts/factory) |
| `salt`                 | `keccak256(abi.encodePacked(token0, token1))`                                  |
| `keccak256(init_code)` | `0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f`           |

- `token0` must be strictly less than `token1` by sort order.

* Can be computed offline.
* Requires the ability to perform `keccak256`.

## Examples

### TypeScript

This example makes use of the [Uniswap V2 SDK](../reference/getting-started). In reality, the SDK computes pair addresses behind the scenes, obviating the need to compute them manually like this.

```typescript
import { FACTORY_ADDRESS, INIT_CODE_HASH } from '@uniswap/v2-sdk'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

const token0 = '0xCAFE000000000000000000000000000000000000' // change me!
const token1 = '0xF00D000000000000000000000000000000000000' // change me!

const pair = getCreate2Address(
  FACTORY_ADDRESS,
  keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
  INIT_CODE_HASH
)
```

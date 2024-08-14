---
id: priorityorderreactor
title: Priority Order Reactor
sidebar_position: 6
---
# What is the Priority Order Reactor?
The [Priority Order Reactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol) is a new, experimental UniswapX reactor built specifically for optimal execution chains that utilize Priority Gas Auctions (PGA) for ordering transactions. This new reactor type, which is based on research presented in [Priority is All you Need](https://www.paradigm.xyz/2024/06/priority-is-all-you-need), allows fillers to bid on orders during fulfillment through setting custom priority fees. 

## Example Implementation
Alice submits a PriorityOrder offering 1 ETH in exchange for a minimum of 1000 USDC. The fair market rate for the order is 1100 USDC, resulting in around 100 USDC in potential profit. 

If we assume a filler has a desired margin of 10% of the total profit, the best price is 1090 USDC. This would be 900 bps of improvement. This filler would convert bps to mps (see below for details) to get 900 * 1000 = 900,000 mps of improvement. Thus they would set priorityFee of 900,000 wei on their fill transaction. Keep in mind that this is additional to the base fee.

# Important considerations
- The PriorityOrderReactor is only meant to be used on chains which order transactions by priority fee. 
- We do not plan to run any preliminary auctions for the start price of these orders, rather we set a minimum price that each order must be executed at.
- Each order is only executable after a certain block specified by the user. This block will be a few blocks in the future from when the order is made available through the UniswapX orders endpoint. To ensure the best UX for our users, Uniswap Labs has the ability to make the start block earlier by cosigning the order.
- Only the fill transaction with the highest priority fee will win the order, all other transactions will revert on chain.
- To minimize the gas used on reverting transactions, we revert early if the order is already filled or is not fillable yet.
- For every wei of priority fee above a certain threshold (an optional value specified in the order), the user is owed 1 milli-bps more of their output token (or less of their input token). 
- Milli-bps (or MPS) are one-thousandth of a basis point.

## Retrieving and Executing Signed Orders
All signed Priority Orders created through the Uniswap UI will be available via the UniswapX Orders Endpoint. We have [swagger documentation](https://api.uniswap.org/v2/uniswapx/docs) but see below for a quick example curl.

```
GET https://api.uniswap.org/v2/orders?orderStatus=open&chainId=8453&orderType=Priority
```

As a lower latency alternative to polling the API, fillers can also apply to register a webhook and receive a feed of all open orders. See details for registering [here](./webhooks). 

After fetching orders, use the latest version of the [UniswapX SDK](https://github.com/Uniswap/sdks/tree/main/sdks/uniswapx-sdk#parsing-orders). Requires [2.1.0-beta.13](https://www.npmjs.com/package/@uniswap/uniswapx-sdk/v/2.1.0-beta.13) or later.

### Parsing an order
```typescript
import { CosignedPriorityOrder, Order } from '@uniswap/uniswapx-sdk';

const serializedOrder = '0x1111222233334444555500000000234300234...';
const chainId = 1; 

const order: Order = CosignedPriorityOrder.parse(serializedOrder, chainId);

const orderData = order.info;
const orderHash = order.hash();
```

The existing `UniswapXOrderQuoter` can also be used to quote priority orders, however, you must use an JsonRpcProvider which supports block overrides. Without block overrides, the SDK quoter cannot validate the entire order as the block number is checked first in the contract.

## Executing an order
The [PriorityOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol) shares the same interface as all other existing UniswapX reactors. Orders are executed against the `execute` and `executeBatch` functions, and optionally a callback is available via `executeWithCallback` and `executeBatchWithCallback`.

# Deployment addresses
The PriorityOrderReactor is deployed on the following chains:
| Chain                      | Address                                                                                                               | Source                                                                                                                    |
| ---                           | ---                                                                                                                   | ---                                                                                                                       |
| Base | [0x000000001Ec5656dcdB24D90DFa42742738De729](https://basescan.org/address/0x000000001Ec5656dcdB24D90DFa42742738De729) | [PriorityOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol) |

# Timeline
We are planning to pilot using the Priority Order Reactor in early August 2024. Join the [UniswapX Fillers Channel](https://t.me/UniswapXdiscussion) for more details. 

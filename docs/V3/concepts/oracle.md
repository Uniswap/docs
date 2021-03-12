---
id: oracle
title: Oracle
---

The Uniswap v3 oracle is a subset of functions integrated into every pair contract which store historical price data directly in the pair. The historical price data can be easily queried on-chain by anyone wishing to integrate Uniswap v3 price data into their logic.

Historical price data is stored in the form of an `Observation`. A call to the v3 oracle returns an `observation` as of the call's specified time in the past. Multiple instances of observations may be returned at once, allowing historical price data logic to be executed without any data stored in the calling contract.

The number of instances of historical price data begins at `1`, and may be lengthened by any party willing to pay the transaction fees to do so with a maximum potential of `65535` instances of price data, roughly correlating to 9 days of price history given a 13 second block time.

Storing price history directly in the pair contract substantially reduces the potential for logic errors on the part of the calling contract, and reduces transaction costs by eliminating the need for storage in the integrating contract. Additionally, the v3 oracle observation array's considerable length makes oracle price manipulation significantly more difficult, as the calling contract may cheaply construct a TWAP over the full duration of the oracle array length.


For a deeper look, see [Observations], [Geometric mean TWAPs], and [Liquidity Accumulator]
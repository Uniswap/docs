## Getting started

In this guide, we will write a smart contract that calls `flash` on a V3 pool, and swaps the full amount withdrawn of `token0` and `token1` in the corresponding pools with the same token pair, but different fee tiers.

Our first step is to inherit `IUniswapV3FlashCallback` and `PeripheryPayments`, as we will use each in our logic. Note these two inherited contracts already extend many other contracts that we will be using, such as `LowGasSafeMath` which we [attach](https://docs.soliditylang.org/en/v0.7.6/contracts.html?highlight=using#using-for), to types `uint256` and `int256`.

```solidity
contract PairFlash is IUniswapV3FlashCallback, PeripheryPayments {
    using LowGasSafeMath for uint256;
    using LowGasSafeMath for int256;
```

Next we declare (TODO INVOKE ROUTER)

```solidity
    ISwapRouter swapRouter;
```


We'll declare the constructor here, which is executed once when the contract is deployed. Our constructor hard codes the address of the V3 router, factory, and the address of weth9, the [**ERC-20 wrapper**](https://weth.io/) for ether.

```solidity
    constructor(
        ISwapRouter _swapRouter,
        address _factory,
        address _WETH9
    ) PeripheryImmutableState(_factory, _WETH9) {
        swapRouter = _swapRouter;
    }
```


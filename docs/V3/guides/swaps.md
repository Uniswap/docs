
In the V3, all swaps are executed via the `swapRouter` contract, which can be imported via its interface `ISwapRouter`into solidity smart contracts via the nom artifact `@uniswap/v3-periphery`

```solidity
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}
```
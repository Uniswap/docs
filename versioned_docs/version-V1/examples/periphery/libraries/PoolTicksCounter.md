## Functions

### countInitializedTicksCrossed

```solidity
  function countInitializedTicksCrossed(
  ) internal view returns (uint32 initializedTicksCrossed)
```

This function counts the number of initialized ticks that would incur a gas cost between tickBefore and tickAfter.
When tickBefore and/or tickAfter themselves are initialized, the logic over whether we should count them depends on the
direction of the swap. If we are swapping upwards (tickAfter > tickBefore) we don't want to count tickBefore but we do
want to count tickAfter. The opposite is true if we are swapping downwards.

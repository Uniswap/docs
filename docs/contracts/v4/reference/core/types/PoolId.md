# PoolIdLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/types/PoolId.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Library for computing the ID of a pool


## Functions
### toId

Returns value equal to keccak256(abi.encode(poolKey))


```solidity
function toId(PoolKey memory poolKey) internal pure returns (PoolId poolId);
```

# PoolId
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/types/PoolId.sol)


```solidity
type PoolId is bytes32;
```


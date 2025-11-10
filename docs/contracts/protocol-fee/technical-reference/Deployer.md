# Deployer
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/Deployer.sol)


## State Variables
### TOKEN_JAR

```solidity
ITokenJar public immutable TOKEN_JAR
```


### RELEASER

```solidity
IReleaser public immutable RELEASER
```


### FEE_ADAPTER

```solidity
IV3FeeAdapter public immutable FEE_ADAPTER
```


### UNI_MINTER

```solidity
IUNIMinter public immutable UNI_MINTER
```


### RESOURCE

```solidity
address public constant RESOURCE = 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
```


### THRESHOLD

```solidity
uint256 public constant THRESHOLD = 69_420
```


### V3_FACTORY

```solidity
IUniswapV3Factory public constant V3_FACTORY =
  IUniswapV3Factory(0x1F98431c8aD98523631AE4a59f267346ea31F984)
```


### SALT_TOKEN_JAR

```solidity
bytes32 constant SALT_TOKEN_JAR = 0
```


### SALT_RELEASER

```solidity
bytes32 constant SALT_RELEASER = 0
```


### SALT_FEE_ADAPTER

```solidity
bytes32 constant SALT_FEE_ADAPTER = 0
```


## Functions
### constructor

1. Deploy the TokenJar
3. Set the releaser on the token jar.
4. Update the owner on the token jar.
RELEASER:
2. Deploy the Releaser.
5. Update the thresholdSetter on the releaser to the owner.
6. Update the owner on the releaser.
FEE_ADAPTER:
7. Deploy the FeeAdapter.
8. Update the feeSetter to the owner.
9. Store fee tiers.
10. Update the owner on the fee adapter.
UNIMinter
11. Deploy the UNIMinter
- To enable the UNIMinter, the owner must call `setMinter` on the UNI contract


```solidity
constructor() ;
```


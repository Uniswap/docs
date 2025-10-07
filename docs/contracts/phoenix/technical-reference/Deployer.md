# Deployer
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/Deployer.sol)


## State Variables
### ASSET_SINK

```solidity
IAssetSink public immutable ASSET_SINK;
```


### RELEASER

```solidity
IReleaser public immutable RELEASER;
```


### FEE_CONTROLLER

```solidity
IV3FeeController public immutable FEE_CONTROLLER;
```


### RESOURCE

```solidity
address public constant RESOURCE = 0x1000000000000000000000000000000000000000;
```


### THRESHOLD

```solidity
uint256 public constant THRESHOLD = 69_420;
```


### V3_FACTORY

```solidity
IUniswapV3Factory public constant V3_FACTORY =
  IUniswapV3Factory(0x1F98431c8aD98523631AE4a59f267346ea31F984);
```


### SALT_ASSET_SINK

```solidity
bytes32 constant SALT_ASSET_SINK = 0;
```


### SALT_RELEASER

```solidity
bytes32 constant SALT_RELEASER = 0;
```


### SALT_FEE_CONTROLLER

```solidity
bytes32 constant SALT_FEE_CONTROLLER = 0;
```


## Functions
### constructor

1. Deploy the AssetSink
3. Set the releaser on the asset sink.
4. Update the owner on the asset sink.
RELEASER:
2. Deploy the Releaser.
5. Update the thresholdSetter on the releaser to the owner.
6. Update the owner on the releaser.
FEE_CONTROLLER:
7. Deploy the FeeController.
8. Update the feeSetter to the owner.
9. Store fee tiers.
10. Update the owner on the fee controller.


```solidity
constructor();
```


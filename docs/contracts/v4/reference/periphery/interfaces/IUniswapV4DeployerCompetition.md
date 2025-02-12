# IUniswapV4DeployerCompetition
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/interfaces/IUniswapV4DeployerCompetition.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for the UniswapV4DeployerCompetition contract


## Functions
### updateBestAddress

Updates the best address if the new address has a better vanity score

*The first 20 bytes of the salt must be either address(0) or msg.sender*


```solidity
function updateBestAddress(bytes32 salt) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`salt`|`bytes32`|The salt to use to compute the new address with CREATE2|


### deploy

deploys the Uniswap v4 PoolManager contract

*The bytecode must match the initCodeHash*


```solidity
function deploy(bytes memory bytecode) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bytecode`|`bytes`|The bytecode of the Uniswap v4 PoolManager contract|


## Events
### NewAddressFound

```solidity
event NewAddressFound(address indexed bestAddress, address indexed submitter, uint256 score);
```

## Errors
### InvalidBytecode

```solidity
error InvalidBytecode();
```

### CompetitionNotOver

```solidity
error CompetitionNotOver(uint256 currentTime, uint256 deadline);
```

### CompetitionOver

```solidity
error CompetitionOver(uint256 currentTime, uint256 deadline);
```

### NotAllowedToDeploy

```solidity
error NotAllowedToDeploy(address sender, address deployer);
```

### WorseAddress

```solidity
error WorseAddress(address newAddress, address bestAddress, uint256 newScore, uint256 bestScore);
```

### InvalidSender

```solidity
error InvalidSender(bytes32 salt, address sender);
```


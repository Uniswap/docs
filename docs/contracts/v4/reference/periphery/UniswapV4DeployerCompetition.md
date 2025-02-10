# UniswapV4DeployerCompetition
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/UniswapV4DeployerCompetition.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IUniswapV4DeployerCompetition](contracts/v4/reference/periphery/interfaces/IUniswapV4DeployerCompetition.md)

A contract to crowdsource a salt for the best Uniswap V4 address


## State Variables
### bestAddressSalt
*The salt for the best address found so far*


```solidity
bytes32 public bestAddressSalt;
```


### bestAddressSubmitter
*The submitter of the best address found so far*


```solidity
address public bestAddressSubmitter;
```


### competitionDeadline
*The deadline for the competition*


```solidity
uint256 public immutable competitionDeadline;
```


### initCodeHash
*The init code hash of the V4 contract*


```solidity
bytes32 public immutable initCodeHash;
```


### deployer
*The deployer who can initiate the deployment of the v4 PoolManager, until the exclusive deploy deadline.*

*After this deadline anyone can deploy.*


```solidity
address public immutable deployer;
```


### exclusiveDeployDeadline
*The deadline for exclusive deployment by deployer after deadline*


```solidity
uint256 public immutable exclusiveDeployDeadline;
```


## Functions
### constructor


```solidity
constructor(
    bytes32 _initCodeHash,
    uint256 _competitionDeadline,
    address _exclusiveDeployer,
    uint256 _exclusiveDeployLength
);
```

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


### bestAddress

*returns the best address found so far*


```solidity
function bestAddress() public view returns (address);
```


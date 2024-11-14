# HooksTest
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/test/HooksTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## Functions
### validateHookPermissions


```solidity
function validateHookPermissions(address hookAddress, Hooks.Permissions calldata params) external pure;
```

### isValidHookAddress


```solidity
function isValidHookAddress(address hookAddress, uint24 fee) external pure returns (bool);
```

### shouldCallBeforeInitialize


```solidity
function shouldCallBeforeInitialize(address hookAddress) external pure returns (bool);
```

### shouldCallAfterInitialize


```solidity
function shouldCallAfterInitialize(address hookAddress) external pure returns (bool);
```

### shouldCallBeforeSwap


```solidity
function shouldCallBeforeSwap(address hookAddress) external pure returns (bool);
```

### shouldCallAfterSwap


```solidity
function shouldCallAfterSwap(address hookAddress) external pure returns (bool);
```

### shouldCallBeforeAddLiquidity


```solidity
function shouldCallBeforeAddLiquidity(address hookAddress) external pure returns (bool);
```

### shouldCallAfterAddLiquidity


```solidity
function shouldCallAfterAddLiquidity(address hookAddress) external pure returns (bool);
```

### shouldCallBeforeRemoveLiquidity


```solidity
function shouldCallBeforeRemoveLiquidity(address hookAddress) external pure returns (bool);
```

### shouldCallAfterRemoveLiquidity


```solidity
function shouldCallAfterRemoveLiquidity(address hookAddress) external pure returns (bool);
```

### shouldCallBeforeDonate


```solidity
function shouldCallBeforeDonate(address hookAddress) external pure returns (bool);
```

### shouldCallAfterDonate


```solidity
function shouldCallAfterDonate(address hookAddress) external pure returns (bool);
```

### getGasCostOfShouldCall


```solidity
function getGasCostOfShouldCall(address hookAddress) external view returns (uint256);
```

### getGasCostOfValidateHookAddress


```solidity
function getGasCostOfValidateHookAddress(address hookAddress, Hooks.Permissions calldata params)
    external
    view
    returns (uint256);
```


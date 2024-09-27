# MockContract
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/MockContract.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
Proxy

Mock contract that tracks the number of calls to various functions by selector

*allows for proxying to an implementation contract
if real logic or return values are needed*


## State Variables
### calls

```solidity
mapping(bytes32 => uint256) public calls;
```


### callParams

```solidity
mapping(bytes32 => mapping(bytes => uint256)) public callParams;
```


### impl
If set, delegatecall to implementation after tracking call


```solidity
address internal impl;
```


## Functions
### timesCalledSelector


```solidity
function timesCalledSelector(bytes32 selector) public view returns (uint256);
```

### timesCalled


```solidity
function timesCalled(string calldata fnSig) public view returns (uint256);
```

### calledWithSelector


```solidity
function calledWithSelector(bytes32 selector, bytes calldata params) public view returns (bool);
```

### calledWith


```solidity
function calledWith(string calldata fnSig, bytes calldata params) public view returns (bool);
```

### _implementation

exposes implementation contract address


```solidity
function _implementation() internal view override returns (address);
```

### setImplementation


```solidity
function setImplementation(address _impl) external;
```

### _beforeFallback

Captures calls by selector


```solidity
function _beforeFallback() internal;
```

### _fallback


```solidity
function _fallback() internal override;
```

### receive


```solidity
receive() external payable;
```


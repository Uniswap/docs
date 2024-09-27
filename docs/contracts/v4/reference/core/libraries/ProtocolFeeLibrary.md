# ProtocolFeeLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/ProtocolFeeLibrary.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

library of functions related to protocol fees


## State Variables
### MAX_PROTOCOL_FEE
Max protocol fee is 0.1% (1000 pips)

*Increasing these values could lead to overflow in Pool.swap*


```solidity
uint16 public constant MAX_PROTOCOL_FEE = 1000;
```


### FEE_0_THRESHOLD
Thresholds used for optimized bounds checks on protocol fees


```solidity
uint24 internal constant FEE_0_THRESHOLD = 1001;
```


### FEE_1_THRESHOLD

```solidity
uint24 internal constant FEE_1_THRESHOLD = 1001 << 12;
```


### PIPS_DENOMINATOR
the protocol fee is represented in hundredths of a bip


```solidity
uint256 internal constant PIPS_DENOMINATOR = 1_000_000;
```


## Functions
### getZeroForOneFee


```solidity
function getZeroForOneFee(uint24 self) internal pure returns (uint16);
```

### getOneForZeroFee


```solidity
function getOneForZeroFee(uint24 self) internal pure returns (uint16);
```

### isValidProtocolFee


```solidity
function isValidProtocolFee(uint24 self) internal pure returns (bool valid);
```

### calculateSwapFee

*here `self` is just a single direction's protocol fee, not a packed type of 2 protocol fees*


```solidity
function calculateSwapFee(uint16 self, uint24 lpFee) internal pure returns (uint24 swapFee);
```


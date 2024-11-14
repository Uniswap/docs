# CalldataDecoder
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/CalldataDecoder.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## State Variables
### OFFSET_OR_LENGTH_MASK
mask used for offsets and lengths to ensure no overflow

*no sane abi encoding will pass in an offset or length greater than type(uint32).max
(note that this does deviate from standard solidity behavior and offsets/lengths will
be interpreted as mod type(uint32).max which will only impact malicious/buggy callers)*


```solidity
uint256 constant OFFSET_OR_LENGTH_MASK = 0xffffffff;
```


### OFFSET_OR_LENGTH_MASK_AND_WORD_ALIGN

```solidity
uint256 constant OFFSET_OR_LENGTH_MASK_AND_WORD_ALIGN = 0xffffffe0;
```


### SLICE_ERROR_SELECTOR
equivalent to SliceOutOfBounds.selector, stored in least-significant bits


```solidity
uint256 constant SLICE_ERROR_SELECTOR = 0x3b99b53d;
```


## Functions
### decodeActionsRouterParams

*equivalent to: abi.decode(params, (bytes, bytes[])) in calldata (requires strict abi encoding)*


```solidity
function decodeActionsRouterParams(bytes calldata _bytes)
    internal
    pure
    returns (bytes calldata actions, bytes[] calldata params);
```

### decodeModifyLiquidityParams

*equivalent to: abi.decode(params, (uint256, uint256, uint128, uint128, bytes)) in calldata*


```solidity
function decodeModifyLiquidityParams(bytes calldata params)
    internal
    pure
    returns (uint256 tokenId, uint256 liquidity, uint128 amount0, uint128 amount1, bytes calldata hookData);
```

### decodeMintParams

*equivalent to: abi.decode(params, (PoolKey, int24, int24, uint256, uint128, uint128, address, bytes)) in calldata*


```solidity
function decodeMintParams(bytes calldata params)
    internal
    pure
    returns (
        PoolKey calldata poolKey,
        int24 tickLower,
        int24 tickUpper,
        uint256 liquidity,
        uint128 amount0Max,
        uint128 amount1Max,
        address owner,
        bytes calldata hookData
    );
```

### decodeBurnParams

*equivalent to: abi.decode(params, (uint256, uint128, uint128, bytes)) in calldata*


```solidity
function decodeBurnParams(bytes calldata params)
    internal
    pure
    returns (uint256 tokenId, uint128 amount0Min, uint128 amount1Min, bytes calldata hookData);
```

### decodeSwapExactInParams

*equivalent to: abi.decode(params, (IV4Router.ExactInputParams))*


```solidity
function decodeSwapExactInParams(bytes calldata params)
    internal
    pure
    returns (IV4Router.ExactInputParams calldata swapParams);
```

### decodeSwapExactInSingleParams

*equivalent to: abi.decode(params, (IV4Router.ExactInputSingleParams))*


```solidity
function decodeSwapExactInSingleParams(bytes calldata params)
    internal
    pure
    returns (IV4Router.ExactInputSingleParams calldata swapParams);
```

### decodeSwapExactOutParams

*equivalent to: abi.decode(params, (IV4Router.ExactOutputParams))*


```solidity
function decodeSwapExactOutParams(bytes calldata params)
    internal
    pure
    returns (IV4Router.ExactOutputParams calldata swapParams);
```

### decodeSwapExactOutSingleParams

*equivalent to: abi.decode(params, (IV4Router.ExactOutputSingleParams))*


```solidity
function decodeSwapExactOutSingleParams(bytes calldata params)
    internal
    pure
    returns (IV4Router.ExactOutputSingleParams calldata swapParams);
```

### decodeCurrency

*equivalent to: abi.decode(params, (Currency)) in calldata*


```solidity
function decodeCurrency(bytes calldata params) internal pure returns (Currency currency);
```

### decodeCurrencyPair

*equivalent to: abi.decode(params, (Currency, Currency)) in calldata*


```solidity
function decodeCurrencyPair(bytes calldata params) internal pure returns (Currency currency0, Currency currency1);
```

### decodeCurrencyPairAndAddress

*equivalent to: abi.decode(params, (Currency, Currency, address)) in calldata*


```solidity
function decodeCurrencyPairAndAddress(bytes calldata params)
    internal
    pure
    returns (Currency currency0, Currency currency1, address _address);
```

### decodeCurrencyAndAddress

*equivalent to: abi.decode(params, (Currency, address)) in calldata*


```solidity
function decodeCurrencyAndAddress(bytes calldata params) internal pure returns (Currency currency, address _address);
```

### decodeCurrencyAddressAndUint256

*equivalent to: abi.decode(params, (Currency, address, uint256)) in calldata*


```solidity
function decodeCurrencyAddressAndUint256(bytes calldata params)
    internal
    pure
    returns (Currency currency, address _address, uint256 amount);
```

### decodeCurrencyAndUint256

*equivalent to: abi.decode(params, (Currency, uint256)) in calldata*


```solidity
function decodeCurrencyAndUint256(bytes calldata params) internal pure returns (Currency currency, uint256 amount);
```

### decodeUint256

*equivalent to: abi.decode(params, (uint256)) in calldata*


```solidity
function decodeUint256(bytes calldata params) internal pure returns (uint256 amount);
```

### decodeCurrencyUint256AndBool

*equivalent to: abi.decode(params, (Currency, uint256, bool)) in calldata*


```solidity
function decodeCurrencyUint256AndBool(bytes calldata params)
    internal
    pure
    returns (Currency currency, uint256 amount, bool boolean);
```

### toBytes

Decode the `_arg`-th element in `_bytes` as `bytes`


```solidity
function toBytes(bytes calldata _bytes, uint256 _arg) internal pure returns (bytes calldata res);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_bytes`|`bytes`|The input bytes string to extract a bytes string from|
|`_arg`|`uint256`|The index of the argument to extract|


## Errors
### SliceOutOfBounds

```solidity
error SliceOutOfBounds();
```


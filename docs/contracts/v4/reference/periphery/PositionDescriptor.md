# PositionDescriptor
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/PositionDescriptor.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IPositionDescriptor](contracts/v4/reference/periphery/interfaces/IPositionDescriptor.md)

Produces a string containing the data URI for a JSON metadata string


## State Variables
### DAI

```solidity
address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
```


### USDC

```solidity
address private constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
```


### USDT

```solidity
address private constant USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
```


### TBTC

```solidity
address private constant TBTC = 0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa;
```


### WBTC

```solidity
address private constant WBTC = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;
```


### wrappedNative

```solidity
address public immutable wrappedNative;
```


### nativeCurrencyLabelBytes

```solidity
bytes32 private immutable nativeCurrencyLabelBytes;
```


### poolManager

```solidity
IPoolManager public immutable poolManager;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager, address _wrappedNative, bytes32 _nativeCurrencyLabelBytes);
```

### nativeCurrencyLabel

Returns the native currency label as a string


```solidity
function nativeCurrencyLabel() public view returns (string memory);
```

### tokenURI

Produces the URI describing a particular token ID

*Note this URI may be a data: URI with the JSON contents directly inlined*


```solidity
function tokenURI(IPositionManager positionManager, uint256 tokenId) external view override returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionManager`|`IPositionManager`|The position manager for which to describe the token|
|`tokenId`|`uint256`|The ID of the token for which to produce a description, which may not be valid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The URI of the ERC721-compliant metadata|


### flipRatio

Returns true if currency0 has higher priority than currency1


```solidity
function flipRatio(address currency0, address currency1) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency0`|`address`|The first currency address|
|`currency1`|`address`|The second currency address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if currency0 has higher priority than currency1|


### currencyRatioPriority

Returns the priority of a currency.
For certain currencies on mainnet, the smaller the currency, the higher the priority
And those with the higher priority values (more positive values) will be in the numerator of the price ratio


```solidity
function currencyRatioPriority(address currency) public view returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`address`|The currency address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The priority of the currency|



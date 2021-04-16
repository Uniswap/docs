Wraps Uniswap V3 positions in the ERC721 non-fungible token interface


## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### positions
```solidity
  function positions(
    uint256 tokenId
  ) external returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)
```
Returns the position information associated with a given token ID.

Throws if the token ID is not valid.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenId` | uint256 | The ID of the token that represents the position

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`nonce`| uint256 | The nonce for permits
|`operator`|  | The address that is approved for spending
|`token0`|  | The address of the token0 for a specific pool
|`token1`|  | The address of the token1 for a specific pool
|`fee`|  | The fee associated with the pool
|`tickLower`|  | The lower end of the tick range for the position
|`tickUpper`|  | The higher end of the tick range for the position
|`liquidity`|  | The liquidity of the position
|`feeGrowthInside0LastX128`|  | The fee growth of token0 as of the last action on the individual position
|`feeGrowthInside1LastX128`|  | The fee growth of token1 as of the last action on the individual position
|`tokensOwed0`|  | The uncollected amount of token0 owed to the position as of the last computation
|`tokensOwed1`|  | The uncollected amount of token1 owed to the position as of the last computation
### createAndInitializePoolIfNecessary
```solidity
  function createAndInitializePoolIfNecessary(
    address tokenA,
    address tokenB,
    uint24 fee,
    uint160 sqrtPriceX96
  ) external returns (address pool)
```
Creates a new pool if it does not exist, then initializes if not initialized

This method can be bundled with mint for the first mint of a pool to create, initialize a pool and mint at the same time

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenA` | address | The contract address of either token0 or token1
We use tokenA and tokenB when we are referring to unsorted, or unordered tokens
|`tokenB` | address | The contract address of the other token, unsorted
|`fee` | uint24 | The fee amount of the v3 pool for the specified token pair
|`sqrtPriceX96` | uint160 | The initial square root price of the pool as a Q64.96 value

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`pool`| address | Returns the pool address based on the pair of tokens and fee, will return the newly created pool address if necessary
### mint
```solidity
  function mint(
    struct INonfungiblePositionManager.MintParams params
  ) external returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)
```
Creates a new position wrapped in a NFT

Call this when the pool does exist and is initialized. Note that if the pool is created but not initialized
a method does not exist, i.e. the pool is assumed to be initialized.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct INonfungiblePositionManager.MintParams | The params necessary to mint a position, encoded as `MintParams` in calldata

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`tokenId`| struct INonfungiblePositionManager.MintParams | The ID of the token that represents the minted position
|`liquidity`|  | The amount of liquidity for this position
|`amount0`|  | The amount of token0
|`amount1`|  | The amount of token1
### tokenURI
```solidity
  function tokenURI(
  ) public returns (string)
```




### baseURI
```solidity
  function baseURI(
  ) public returns (string)
```




### increaseLiquidity
```solidity
  function increaseLiquidity(
    struct INonfungiblePositionManager.IncreaseLiquidityParams params
  ) external returns (uint128 liquidity, uint256 amount0, uint256 amount1)
```
Increases the amount of liquidity in a position, with tokens paid by the `msg.sender`


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct INonfungiblePositionManager.IncreaseLiquidityParams | tokenId The ID of the token for which liquidity is being increased,
amount0Desired The desired amount of token0 to be spent,
amount1Desired The desired amount of token1 to be spent,
amount0Min The minimum amount of token0 to spend, which serves as a slippage check,
amount1Min The minimum amount of token1 to spend, which serves as a slippage check,
deadline The time by which the transaction must be included to effect the change

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidity`| struct INonfungiblePositionManager.IncreaseLiquidityParams | The new liquidity amount as a result of the increase
|`amount0`|  | The amount of token0 to acheive resulting liquidity
|`amount1`|  | The amount of token1 to acheive resulting liquidity
### decreaseLiquidity
```solidity
  function decreaseLiquidity(
    struct INonfungiblePositionManager.DecreaseLiquidityParams params
  ) external returns (uint256 amount0, uint256 amount1)
```
Decreases the amount of liquidity in a position and accounts it to the position


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct INonfungiblePositionManager.DecreaseLiquidityParams | tokenId The ID of the token for which liquidity is being decreased,
amount The amount by which liquidity will be decreased,
amount0Min The minimum amount of token0 that should be received in the burn,
amount1Min The minimum amount of token1 that should be received in the burn,
deadline The time by which the transaction must be included to effect the change

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| struct INonfungiblePositionManager.DecreaseLiquidityParams | The amount of token0 sent to recipient
|`amount1`|  | The amount of token1 sent to recipient
### collect
```solidity
  function collect(
    struct INonfungiblePositionManager.CollectParams params
  ) external returns (uint256 amount0, uint256 amount1)
```
Collects up to a maximum amount of fees owed to a specific position to the recipient


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct INonfungiblePositionManager.CollectParams | tokenId The ID of the NFT for which tokens are being collected,
recipient The account that should receive the tokens,
amount0Max The maximum amount of token0 to collect,
amount1Max The maximum amount of token1 to collect

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| struct INonfungiblePositionManager.CollectParams | The amount of fees collected in token0
|`amount1`|  | The amount of fees collected in token1
### burn
```solidity
  function burn(
    uint256 tokenId
  ) external
```
Burns a token ID, which deletes it from the NFT contract. The token must have 0 liquidity and all tokens
must be collected first.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenId` | uint256 | The ID of the token that is being burned

### _getAndIncrementNonce
```solidity
  function _getAndIncrementNonce(
  ) internal returns (uint256)
```




### getApproved
```solidity
  function getApproved(
  ) public returns (address)
```

Returns the account approved for `tokenId` token.
Requirements:
- `tokenId` must exist.


### _approve
```solidity
  function _approve(
  ) internal
```

Overrides _approve to use the operator in the position, which is packed with the position permit nonce



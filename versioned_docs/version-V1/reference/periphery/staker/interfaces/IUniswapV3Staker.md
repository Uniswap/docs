Allows staking nonfungible liquidity tokens in exchange for reward tokens


## Functions
### factory
```solidity
  function factory(
  ) external view returns (contract IUniswapV3Factory)
```
The Uniswap V3 Factory



### nonfungiblePositionManager
```solidity
  function nonfungiblePositionManager(
  ) external view returns (contract INonfungiblePositionManager)
```
The nonfungible position manager with which this staking contract is compatible



### maxIncentiveDuration
```solidity
  function maxIncentiveDuration(
  ) external view returns (uint256)
```
The max duration of an incentive in seconds



### maxIncentiveStartLeadTime
```solidity
  function maxIncentiveStartLeadTime(
  ) external view returns (uint256)
```
The max amount of seconds into the future the incentive startTime can be set



### incentives
```solidity
  function incentives(
    bytes32 incentiveId
  ) external view returns (uint256 totalRewardUnclaimed, uint160 totalSecondsClaimedX128, uint96 numberOfStakes)
```
Represents a staking incentive


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`incentiveId` | bytes32 | The ID of the incentive computed from its parameters

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`totalRewardUnclaimed`| uint256 | The amount of reward token not yet claimed by users
|`totalSecondsClaimedX128`| uint160 | Total liquidity-seconds claimed, represented as a UQ32.128
|`numberOfStakes`| uint96 | The count of deposits that are currently staked for the incentive
### deposits
```solidity
  function deposits(
  ) external view returns (address owner, uint48 numberOfStakes, int24 tickLower, int24 tickUpper)
```
Returns information about a deposited NFT



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`owner`| address | The owner of the deposited NFT
|`numberOfStakes`| uint48 | Counter of how many incentives for which the liquidity is staked
|`tickLower`| int24 | The lower tick of the range
|`tickUpper`| int24 | The upper tick of the range
### stakes
```solidity
  function stakes(
    uint256 tokenId,
    bytes32 incentiveId
  ) external view returns (uint160 secondsPerLiquidityInsideInitialX128, uint128 liquidity)
```
Returns information about a staked liquidity NFT


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenId` | uint256 | The ID of the staked token
|`incentiveId` | bytes32 | The ID of the incentive for which the token is staked

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`secondsPerLiquidityInsideInitialX128`| uint160 | secondsPerLiquidity represented as a UQ32.128
|`liquidity`| uint128 | The amount of liquidity in the NFT as of the last time the rewards were computed
### rewards
```solidity
  function rewards(
    contract IERC20Minimal rewardToken,
    address owner
  ) external view returns (uint256 rewardsOwed)
```
Returns amounts of reward tokens owed to a given address according to the last time all stakes were updated


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`rewardToken` | contract IERC20Minimal | The token for which to check rewards
|`owner` | address | The owner for which the rewards owed are checked

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`rewardsOwed`| uint256 | The amount of the reward token claimable by the owner
### createIncentive
```solidity
  function createIncentive(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 reward
  ) external
```
Creates a new liquidity mining incentive program


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` | struct IUniswapV3Staker.IncentiveKey | Details of the incentive to create
|`reward` | uint256 | The amount of reward tokens to be distributed

### endIncentive
```solidity
  function endIncentive(
    struct IUniswapV3Staker.IncentiveKey key
  ) external returns (uint256 refund)
```
Ends an incentive after the incentive end time has passed and all stakes have been withdrawn


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` | struct IUniswapV3Staker.IncentiveKey | Details of the incentive to end

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`refund`| uint256 | The remaining reward tokens when the incentive is ended
### transferDeposit
```solidity
  function transferDeposit(
    uint256 tokenId,
    address to
  ) external
```
Transfers ownership of a deposit from the sender to the given recipient


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenId` | uint256 | The ID of the token (and the deposit) to transfer
|`to` | address | The new owner of the deposit

### withdrawToken
```solidity
  function withdrawToken(
    uint256 tokenId,
    address to,
    bytes data
  ) external
```
Withdraws a Uniswap V3 LP token `tokenId` from this contract to the recipient `to`


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenId` | uint256 | The unique identifier of an Uniswap V3 LP token
|`to` | address | The address where the LP token will be sent
|`data` | bytes | An optional data array that will be passed along to the `to` address via the NFT safeTransferFrom

### stakeToken
```solidity
  function stakeToken(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 tokenId
  ) external
```
Stakes a Uniswap V3 LP token


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` | struct IUniswapV3Staker.IncentiveKey | The key of the incentive for which to stake the NFT
|`tokenId` | uint256 | The ID of the token to stake

### unstakeToken
```solidity
  function unstakeToken(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 tokenId
  ) external
```
Unstakes a Uniswap V3 LP token


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` | struct IUniswapV3Staker.IncentiveKey | The key of the incentive for which to unstake the NFT
|`tokenId` | uint256 | The ID of the token to unstake

### claimReward
```solidity
  function claimReward(
    contract IERC20Minimal rewardToken,
    address to,
    uint256 amountRequested
  ) external returns (uint256 reward)
```
Transfers `amountRequested` of accrued `rewardToken` rewards from the contract to the recipient `to`


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`rewardToken` | contract IERC20Minimal | The token being distributed as a reward
|`to` | address | The address where claimed rewards will be sent to
|`amountRequested` | uint256 | The amount of reward tokens to claim. Claims entire reward amount if set to 0.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`reward`| uint256 | The amount of reward tokens claimed
### getRewardInfo
```solidity
  function getRewardInfo(
    struct IUniswapV3Staker.IncentiveKey key,
    uint256 tokenId
  ) external returns (uint256 reward, uint160 secondsInsideX128)
```
Calculates the reward amount that will be received for the given stake


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` | struct IUniswapV3Staker.IncentiveKey | The key of the incentive
|`tokenId` | uint256 | The ID of the token

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`reward`| uint256 | The reward accrued to the NFT for the given incentive thus far
| `secondsInsideX128` | uint160 | The seconds inside the tick range
## Events
### IncentiveCreated
```solidity
  event IncentiveCreated(
    contract IERC20Minimal rewardToken,
    contract IUniswapV3Pool pool,
    uint256 startTime,
    uint256 endTime,
    address refundee,
    uint256 reward
  )
```
Event emitted when a liquidity mining incentive has been created


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`rewardToken`| contract IERC20Minimal | The token being distributed as a reward
|`pool`| contract IUniswapV3Pool | The Uniswap V3 pool
|`startTime`| uint256 | The time when the incentive program begins
|`endTime`| uint256 | The time when rewards stop accruing
|`refundee`| address | The address which receives any remaining reward tokens after the end time
|`reward`| uint256 | The amount of reward tokens to be distributed
### IncentiveEnded
```solidity
  event IncentiveEnded(
    bytes32 incentiveId,
    uint256 refund
  )
```
Event that can be emitted when a liquidity mining incentive has ended


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`incentiveId`| bytes32 | The incentive which is ending
|`refund`| uint256 | The amount of reward tokens refunded
### DepositTransferred
```solidity
  event DepositTransferred(
    uint256 tokenId,
    address oldOwner,
    address newOwner
  )
```
Emitted when ownership of a deposit changes


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`tokenId`| uint256 | The ID of the deposit (and token) that is being transferred
|`oldOwner`| address | The owner before the deposit was transferred
|`newOwner`| address | The owner after the deposit was transferred
### TokenStaked
```solidity
  event TokenStaked(
    uint256 tokenId,
    bytes32 liquidity,
    uint128 incentiveId
  )
```
Event emitted when a Uniswap V3 LP token has been staked


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`tokenId`| uint256 | The unique identifier of an Uniswap V3 LP token
|`liquidity`| bytes32 | The amount of liquidity staked
|`incentiveId`| uint128 | The incentive in which the token is staking
### TokenUnstaked
```solidity
  event TokenUnstaked(
    uint256 tokenId,
    bytes32 incentiveId
  )
```
Event emitted when a Uniswap V3 LP token has been unstaked


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`tokenId`| uint256 | The unique identifier of an Uniswap V3 LP token
|`incentiveId`| bytes32 | The incentive in which the token is staking
### RewardClaimed
```solidity
  event RewardClaimed(
    address to,
    uint256 reward
  )
```
Event emitted when a reward token has been claimed


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`to`| address | The address where claimed rewards were sent to
|`reward`| uint256 | The amount of reward tokens claimed

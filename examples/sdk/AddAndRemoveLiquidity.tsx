import { CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { nearestUsableTick, NonfungiblePositionManager, Pool, Position } from '@uniswap/v3-sdk'
import { ethers } from 'ethers'

// default uses “http://localhost:8545”
// can also input your own connection with "https://mainnet.infura.io/v3/<YOUR-ENDPOINT-HERE>" as an input
const provider = new ethers.providers.JsonRpcProvider()

// pool address for DAI/USDC 0.05%
const poolAddress = '0x6c6bc977e13df9b0de53b251522280bb72383700'

const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider)

interface Immutables {
  factory: string
  token0: string
  token1: string
  fee: number
  tickSpacing: number
  maxLiquidityPerTick: ethers.BigNumber
}

interface State {
  liquidity: ethers.BigNumber
  sqrtPriceX96: ethers.BigNumber
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}

async function getPoolImmutables() {
  const immutables: Immutables = {
    factory: await poolContract.factory(),
    token0: await poolContract.token0(),
    token1: await poolContract.token1(),
    fee: await poolContract.fee(),
    tickSpacing: await poolContract.tickSpacing(),
    maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
  }
  return immutables
}

async function getPoolState() {
  const slot = await poolContract.slot0()
  const PoolState: State = {
    liquidity: await poolContract.liquidity(),
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  }
  return PoolState
}

async function liquidityExamples(sender: string, exampleType: number) {
  const immutables = await getPoolImmutables()
  const state = await getPoolState()
  const DAI = new Token(1, immutables.token0, 18, 'DAI', 'Stablecoin')
  const USDC = new Token(1, immutables.token1, 18, 'USDC', 'USD Coin')
  const block = await provider.getBlock(provider.getBlockNumber())
  const deadline = block.timestamp + 200

  //create a pool
  const DAI_USDC_POOL = new Pool(
    DAI,
    USDC,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick,
  )

  // create a position with the pool
  // the position is in-range, specified by the lower and upper tick
  // in this example, we will set the liquidity parameter to a small percentage of the current liquidity
  const position = new Position({
    pool: DAI_USDC_POOL,
    liquidity: state.liquidity.div(5000).toString(),
    tickLower: nearestUsableTick(state.tick, immutables.tickSpacing) - immutables.tickSpacing * 2,
    tickUpper: nearestUsableTick(state.tick, immutables.tickSpacing) + immutables.tickSpacing * 2,
  })

  // Example 0: Setting up calldata for minting a Position
  if (exampleType == 0) {
    const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
      slippageTolerance: new Percent(50, 10_000),
      recipient: sender,
      deadline: deadline,
    })
  }

  // Example 1: Setting up calldata for adding liquidity to Position
  if (exampleType == 1) {
    const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
      slippageTolerance: new Percent(50, 10_000),
      deadline: deadline,
      tokenId: 1,
    })
  }

  // Example 2: Setting up calldata for removing liquidity from Position
  if (exampleType == 2) {
    const { calldata, value } = NonfungiblePositionManager.removeCallParameters(position, {
      tokenId: 1,
      liquidityPercentage: new Percent(1),
      slippageTolerance: new Percent(50, 10_000),
      deadline: deadline,
      collectOptions: {
        expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(DAI, 0),
        expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(USDC, 0),
        recipient: sender,
      },
    })
  }
}

// call the example function by passing the sender, e.g.:
// liquidityExamples("0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf", 0)

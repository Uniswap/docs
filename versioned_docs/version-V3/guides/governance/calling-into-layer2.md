---
id: calling-into-layer2
title: Calling Into Layer 2's: Polygon
---

## Polygon's State Sync Mechanism

This example script involves Polygon's (state sync mechanism)[https://docs.polygon.technology/docs/develop/l1-l2-communication/state-transfer#overview].

```ts
import { Contract, ethers } from 'ethers'
import { Interface } from '@ethersproject/abi'
// note: contract ABIs should be imported via etherscan
import { GOVERNOR_BRAVO_ABI } from './utils'
import { FX_ROOT_CONTRACT_ABI, UNISWAP_V3_FACTORY_ABI } from './abis'

const GOVERNOR_BRAVO_ADDRESS: string = '0x408ED6354d4973f66138C91495F2f2FCbd8724C3'
const FX_ROOT_CONTRACT_ADDRESS = '0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2'
const UNISWAP_V3_FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
const FX_BASE_CHILD_TUNNEL_ADDRESS_POLYGON = '0x8a1B966aC46F42275860f905dbC75EfBfDC12374'

const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL_HERE')
const signer = provider.getSigner('YOUR_SIGNER_ADDRESS_HERE')

// Note: these are the arguments to create the 1 bip fee tier, different fee tiers will have different arguments.
const uniswapV3FactoryInterface = new Interface(UNISWAP_V3_FACTORY_ABI)
const enableFeeAmount = uniswapV3FactoryInterface.encodeFunctionData(
  'enableFee',
  [
    // Fee: The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)
    100,
    // The spacing between ticks to be enforced for all pools created with the given fee amount
    1,
  ]
)

// The ordered list of target addresses for calls to be made, with respect to the given environment in which
// they will execute. For this example, there is only one target contract in each list.
const ethereumTargets = [FX_ROOT_CONTRACT_ADDRESS]
const polygonTargets = [UNISWAP_V3_FACTORY_ADDRESS]

// The ordered list of values to be passed to the calls to be made. i.e., the amount of
// ETH (on Ethereum), or MATIC (on Polygon), values to be transferred within the transaction.
// as this example does not include the transferring of any ETH or MATIC, this list is set to once instance of zero per call.
const ethereumValues = [0]
const polygonValues = [0]

const polygonCalldata = [
  // address[] memory targets,
  polygonTargets,
  // bytes[] memory datas,
  enableFeeAmount,
  // unit256[] memory values,
  polygonValues,
]

const fxRootInterface = new Interface(FX_ROOT_CONTRACT_ABI)
const ethereumCalldata = fxRootInterface.encodeFunctionData('sendMessageToChild', [
  // address: the Fx base child tunnel address deployed on polygon
  FX_BASE_CHILD_TUNNEL_ADDRESS_POLYGON,
  // bytes memory message: the abi-encoded data for the calls to be executed on polygon
  polygonCalldata,
])

// Create a new local instance of the governorBravo contract
const governorBravo = new Contract(GOVERNOR_BRAVO_ADDRESS, GOVERNOR_BRAVO_ABI, provider)

// The ordered list of function signatures to be called. The signatures arguments
// are optional, if not provided, the function signature will be inferred from the calldata.
// note: the signature format is not used on polygon, so this argument is only relevant for ethereum.
const ethereumSignatures = ['']

// the description of the proposal.
const description = '# TITLE ## SECTION_EXPLANATION'

async function main() {
  try {
    const txResponse: ethers.providers.TransactionResponse = await governorBravo
      .connect(signer)
      .propose(ethereumTargets, ethereumValues, ethereumSignatures, ethereumCalldata, description)
    console.log(`Proposal transaction sent: ${txResponse.hash}`)
    await txResponse.wait(1)
    console.log(
      `Proposal has been mined at blocknumber: ${txResponse.blockNumber}, transaction hash: ${txResponse.hash}`
    )
  } catch (error) {
    console.error(error)
  }
}

main().then(() => console.log('done'))
```

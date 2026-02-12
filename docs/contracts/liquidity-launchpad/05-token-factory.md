---
id: token-factories
title: Token Factories
sidebar_position: 5
---

# Token Factories
The Liquidity Launchpad supports creating a new token in the same flow as creating a new CCA auction or liquidity strategy.

Two token factories are included in the [uerc20-factory](https://github.com/Uniswap/uerc20-factory) repository: UERC20Factory and USUPERC20Factory.

## Deployments
### UERC20Factory
The UERC20Factory is a factory contract for new UERC20 tokens.

| Network | Address                                    | Commit Hash                              | Version          |
| ------- | ------------------------------------------ | ---------------------------------------- | ---------------- |
| Mainnet | 0x0cde87c11b959e5eb0924c1abf5250ee3f9bd1b5 | 9705debfea9e6a641bc04352398f9e549055ac44 | v1.0.0-candidate |
| Sepolia | 0x0cde87c11b959e5eb0924c1abf5250ee3f9bd1b5 | 9705debfea9e6a641bc04352398f9e549055ac44 | v1.0.0-candidate |

### USUPERC20Factory
The USUPERC20Factory is a factory contract for new Superchain compatible UERC20 tokens. It is deployed to the same address across all Superchain compatible L2s.

| Network          | Address                                    | Commit Hash                              | Version          |
| ---------------- | ------------------------------------------ | ---------------------------------------- | ---------------- |
| Unichain         | 0x24016ed99a69e9b86d16d84351e1661266b7ac6a | 9705debfea9e6a641bc04352398f9e549055ac44 | v1.0.0-candidate |
| Unichain Sepolia | 0x24016ed99a69e9b86d16d84351e1661266b7ac6a | 9705debfea9e6a641bc04352398f9e549055ac44 | v1.0.0-candidate |

## Usage
All token factories must implement the `ITokenFactory` interface.

```solidity
interface ITokenFactory {
    /// @notice Creates a new token contract
    /// @param name          The ERC20-style name of the token.
    /// @param symbol        The ERC20-style symbol of the token.
    /// @param decimals      The number of decimal places for the token.
    /// @param initialSupply The initial supply to mint upon creation.
    /// @param recipient     The recipient of the initial supply.
    /// @param data          Additional factory-specific data required for token creation.
    /// @param graffiti      Additional data to be included in the token's salt
    /// @return tokenAddress The address of the newly created token.
    function createToken(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply,
        address recipient,
        bytes calldata data,
        bytes32 graffiti
    ) external returns (address tokenAddress);
}
```

Additional data (ex. token image, url, etc.) can be included in the `data` parameter and used by the token factory. Use `graffiti` to consider additional data in the generation of the token address. This can be particularly useful for proving a token was distributed in a specific way.

## [UERC20Factory](https://github.com/Uniswap/uerc20-factory/blob/main/src/factories/UERC20Factory.sol)
_Suggested for Ethereum Mainnet and other non Superchain networks_

[UERC20](https://github.com/Uniswap/uerc20-factory/blob/main/src/tokens/UERC20.sol) tokens are extensions of the [ERC20](https://eips.ethereum.org/EIPS/eip-20) standard.

The most notable implementation difference is that UERC20 tokens do not take any constructor arguments, but rather read them from the factory contract which they are deployed from. This gives the factory more flexibility and control in the token's address generation.

UERC20 tokens also have a metadata struct that can be used to store additional information about the token.
```solidity
struct UERC20Metadata {
    string description;
    string website;
    string image;
}

UERC20Metadata memory metadata = new UERC20Metadata();
bytes memory data = abi.encode(metadata);
```

This metadata is abi encoded and set in the `data` parameter of the `createToken` function. To elect to skip setting the metadata, pass an encoded struct of empty strings.

## [USUPERC20Factory](https://github.com/Uniswap/uerc20-factory/blob/main/src/factories/USUPERC20Factory.sol)
_Only supported for Superchain networks_

[USUPERC20](https://github.com/Uniswap/uerc20-factory/blob/main/src/tokens/USUPERC20.sol) tokens are extensions of the [ERC20](https://eips.ethereum.org/EIPS/eip-20) standard which are Superchain interop compatible. For more details, see the [Superchain ERC20 documentation](https://docs.optimism.io/app-developers/tutorials/tokens/custom-superchain-erc20).

These tokens implement `crosschainMint` and `crosschainBurn` functions from the [IERC7802](https://eips.ethereum.org/EIPS/eip-7802) interface:
```solidity
/// @notice Reverts if the caller is not the Superchain Token Bridge
    modifier onlySuperchainTokenBridge() {
        if (msg.sender != Predeploys.SUPERCHAIN_TOKEN_BRIDGE) {
            revert NotSuperchainTokenBridge(msg.sender, Predeploys.SUPERCHAIN_TOKEN_BRIDGE);
        }
        _;
    }

    /// @inheritdoc IERC7802
    function crosschainMint(address _to, uint256 _amount) external onlySuperchainTokenBridge {
        if (_to == address(0)) {
            revert RecipientCannotBeZeroAddress();
        }
        _mint(_to, _amount);

        emit CrosschainMint(_to, _amount, msg.sender);
    }

    /// @inheritdoc IERC7802
    function crosschainBurn(address _from, uint256 _amount) external onlySuperchainTokenBridge {
        _burn(_from, _amount);

        emit CrosschainBurn(_from, _amount, msg.sender);
    }
```

To create a new USUPERC20 token from the factory, pass in all of the required parameters defined in the `ITokenFactory` interface in addition to the `data` parameter which should be encoded as follows:

```solidity
struct UERC20Metadata {
    string description;
    string website;
    string image;
}

UERC20Metadata memory metadata = new UERC20Metadata();
bytes memory data = abi.encode(homeChainId, creator, metadata);
```

The `homeChainId` is the chain ID of the network the token is being created on. The `creator` is the account which is creating the token. The `metadata` is the metadata of the token (ex. description, website, image). To elect to skip setting the metadata, pass an encoded struct of empty strings.

Notes on differences between home chain and other superchain networks:
- The token's metadata is **only** set on the home chain.
- The transaction sender of `createToken` can **only** be the `creator` on the home chain, but it can be any account on other networks.
- `recipient` and `totalSupply` may be zero on other networks.

For more details, see the [Superchain ERC20 documentation](https://docs.optimism.io/app-developers/tutorials/tokens/custom-superchain-erc20).

# Creating a token within the Liquidity Launchpad
The [LiquidityLauncher](https://github.com/Uniswap/liquidity-launcher/blob/main/src/LiquidityLauncher.sol) contract supports creating a new token in the same flow as creating a new CCA auction or liquidity strategy.

This is done via the `createToken` function:
```solidity
/// @inheritdoc ILiquidityLauncher
    function createToken(
        address factory,
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint128 initialSupply,
        address recipient,
        bytes calldata tokenData
    ) external override returns (address tokenAddress) {
        if (recipient == address(0)) {
            revert RecipientCannotBeZeroAddress();
        }
        tokenAddress = ITokenFactory(factory)
            .createToken(name, symbol, decimals, initialSupply, recipient, tokenData, getGraffiti(msg.sender));

        emit TokenCreated(tokenAddress);
    }

    /// @inheritdoc ILiquidityLauncher
    function getGraffiti(address originalCreator) public pure returns (bytes32 graffiti) {
        graffiti = keccak256(abi.encode(originalCreator));
    }
```

The `factory` is the address of the token factory to use. The `name`, `symbol`, `decimals`, `initialSupply`, and `recipient` are the same as the parameters passed to the `createToken` function of the token factory. The `tokenData` is the data to pass to the token factory. By default, the `graffiti` is set to the msg.sender of the transaction to prevent frontrunning of token deploys.

It is recommended to use the built in `multicall` function to deploy and distribute a token in a single transaction.

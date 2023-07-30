![yeoldepunks-24x24](https://github.com/Uniswap/docs/assets/129458935/b3ff4681-b7a0-4146-96b7-358bc46ff0d8)
---
id: pair
title: Pair
---

This documentation covers Uniswap-specific functionality. For ERC-20 functionality, see [Pair (ERC-20)](../smart-contracts/pair-erc-20).

# Code

[`UniswapV2Pair.sol`](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)

# Address

See [Pair Addresses](../../guides/smart-contract-integration/getting-pair-addresses).

# Events

## Mint

```solidity
event Mint(address indexed sender, uint amount0, uint amount1);
```

Emitted each time liquidity tokens are created via [mint](#mint-1).

## Burn

```solidity
event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Emitted each time liquidity tokens are destroyed via [burn](#burn-1).

## Swap

```solidity
event Swap(
  address indexed sender,
  uint amount0In,
  uint amount1In,
  uint amount0Out,
  uint amount1Out,
  address indexed to
);
```

Emitted each time a swap occurs via [swap](#swap-1).

## Sync

```solidity
event Sync(uint112 reserve0, uint112 reserve1);
```

Emitted each time reserves are updated via [mint](#mint-1), [burn](#burn-1), [swap](#swap-1), or [sync](#sync-1).

# Read-Only Functions

## MINIMUM_LIQUIDITY

```solidity
function MINIMUM_LIQUIDITY() external pure returns (uint);
```

Returns `1000` for all pairs. See [Minimum Liquidity](../../concepts/protocol-overview/smart-contracts#minimum-liquidity).

## factory

```solidity
function factory() external view returns (address);
```

Returns the [factory address](../smart-contracts/factory#address).

## token0

```solidity
function token0() external view returns (address);
```

Returns the address of the pair token with the lower sort order.

## token1

```solidity
function token1() external view returns (address);
```

Returns the address of the pair token with the higher sort order.

## getReserves

```solidity
function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
```

Returns the reserves of token0 and token1 used to price trades and distribute liquidity. See [Pricing](../../concepts/advanced-topics/pricing). Also returns the `block.timestamp` (mod `2**32`) of the last block during which an interaction occured for the pair.

## price0CumulativeLast

```solidity
function price0CumulativeLast() external view returns (uint);
```

See [Oracles](../../concepts/core-concepts/oracles).

## price1CumulativeLast

```solidity
function price1CumulativeLast() external view returns (uint);
```

See [Oracles](../../concepts/core-concepts/oracles).

## kLast

```solidity
function kLast() external view returns (uint);
```

Returns the product of the reserves as of the most recent liquidity event. See [Protocol Charge Calculation](../../concepts/advanced-topics/fees#protocol-charge-calculation).

# State-Changing Functions

## mint

```solidity
function mint(address to) external returns (uint liquidity);
```

Creates pool tokens.

- Emits [Mint](#mint), [Sync](#sync), [Transfer](../smart-contracts/pair-erc-20#transfer).

## burn

```solidity
function burn(address to) external returns (uint amount0, uint amount1);
```

Destroys pool tokens.

- Emits [Burn](#burn), [Sync](#sync), [Transfer](../smart-contracts/pair-erc-20#transfer).

## swap

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
```

Swaps tokens. For regular swaps, `data.length` must be `0`. Also see [Flash Swaps](../../concepts/core-concepts/flash-swaps).

- Emits [Swap](#swap), [Sync](#sync).

## skim

```solidity
function skim(address to) external;
```

See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a>.

## sync

```solidity
function sync() external;
```

See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a>.

- Emits [Sync](#sync).

# Interface

```solidity
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
```

```solidity
pragma solidity >=0.5.0;

interface IUniswapV2Pair {
  event Approval(address indexed owner, address indexed spender, uint value);
  event Transfer(address indexed from, address indexed to, uint value);

  function name() external pure returns (string memory);
  function symbol() external pure returns (string memory);
  function decimals() external pure returns (uint8);
  function totalSupply() external view returns (uint);
  function balanceOf(address owner) external view returns (uint);
  function allowance(address owner, address spender) external view returns (uint);

  function approve(address spender, uint value) external returns (bool);
  function transfer(address to, uint value) external returns (bool);
  function transferFrom(address from, address to, uint value) external returns (bool);

  function DOMAIN_SEPARATOR() external view returns (bytes32);
  function PERMIT_TYPEHASH() external pure returns (bytes32);
  function nonces(address owner) external view returns (uint);

  function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

  event Mint(address indexed sender, uint amount0, uint amount1);
  event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
  event Swap(
      address indexed sender,
      uint amount0In,
      uint amount1In,
      uint amount0Out,
      uint amount1Out,
      address indexed to
  );
  event Sync(uint112 reserve0, uint112 reserve1);

  function MINIMUM_LIQUIDITY() external pure returns (uint);
  function factory() external view returns (address);
  function token0() external view returns (address);
  function token1() external view returns (address);
  function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
  function price0CumulativeLast() external view returns (uint);
  function price1CumulativeLast() external view returns (uint);
  function kLast() external view returns (uint);

  function mint(address to) external returns (uint liquidity);
  function burn(address to) external returns (uint amount0, uint amount1);
  function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
  function skim(address to) external;
  function sync() external;
}
```

# ABI

```typescript
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
```

[https://unpkg.com/@uniswap/v2-core@1.0.0/build/IUniswapV2Pair.json](https://unpkg.com/@uniswap/v2-core@1.0.0/build/IUniswapV2Pair.json)

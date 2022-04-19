## Functions

### hasMultiplePools

```solidity
  function hasMultiplePools(
    bytes path
  ) internal returns (bool)
```

Returns true iff the path contains two or more pools

#### Parameters:

| Name   | Type  | Description           |
| :----- | :---- | :-------------------- |
| `path` | bytes | The encoded swap path |

#### Return Values:

| Type | Description                                         |
| :--- | :-------------------------------------------------- |
| bool | if path contains two or more pools, otherwise false |

### decodeFirstPool

```solidity
  function decodeFirstPool(
    bytes path
  ) internal returns (address tokenA, address tokenB, uint24 fee)
```

Decodes the first pool in path

#### Parameters:

| Name   | Type  | Description                 |
| :----- | :---- | :-------------------------- |
| `path` | bytes | The bytes encoded swap path |

#### Return Values:

| Name     | Type    | Description                        |
| :------- | :------ | :--------------------------------- |
| `tokenA` | address | The first token of the given pool  |
| `tokenB` | address | The second token of the given pool |
| `fee`    | uint24  | The fee level of the pool          |

### getFirstPool

```solidity
  function getFirstPool(
    bytes path
  ) internal returns (bytes)
```

Gets the segment corresponding to the first pool in the path

#### Parameters:

| Name   | Type  | Description                 |
| :----- | :---- | :-------------------------- |
| `path` | bytes | The bytes encoded swap path |

#### Return Values:

| Type  | Description                                                                |
| :---- | :------------------------------------------------------------------------- |
| bytes | segment containing all data necessary to target the first pool in the path |

### skipToken

```solidity
  function skipToken(
    bytes path
  ) internal returns (bytes)
```

Skips a token + fee element from the buffer and returns the remainder

#### Parameters:

| Name   | Type  | Description   |
| :----- | :---- | :------------ |
| `path` | bytes | The swap path |

#### Return Values:

| Type  | Description                                |
| :---- | :----------------------------------------- |
| bytes | remaining token + fee elements in the path |

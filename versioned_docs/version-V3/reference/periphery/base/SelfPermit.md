Functionality to call permit on any EIP-2612-compliant token for use in the route

These functions are expected to be embedded in multicalls to allow EOAs to approve a contract and call a function
that requires an approval in a single transaction.

## Functions

### selfPermit

```solidity
  function selfPermit(
    address token,
    uint256 value,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) public
```

Permits this contract to spend a given token from `msg.sender`

The `owner` is always msg.sender and the `spender` is always address(this).

#### Parameters:

| Name       | Type    | Description                                                                     |
| :--------- | :------ | :------------------------------------------------------------------------------ |
| `token`    | address | The address of the token spent                                                  |
| `value`    | uint256 | The amount that can be spent of token                                           |
| `deadline` | uint256 | A timestamp, the current blocktime must be less than or equal to this timestamp |
| `v`        | uint8   | Must produce valid secp256k1 signature from the holder along with `r` and `s`   |
| `r`        | bytes32 | Must produce valid secp256k1 signature from the holder along with `v` and `s`   |
| `s`        | bytes32 | Must produce valid secp256k1 signature from the holder along with `r` and `v`   |

### selfPermitIfNecessary

```solidity
  function selfPermitIfNecessary(
    address token,
    uint256 value,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Permits this contract to spend a given token from `msg.sender`

The `owner` is always msg.sender and the `spender` is always address(this).
Can be used instead of #selfPermit to prevent calls from failing due to a frontrun of a call to #selfPermit

#### Parameters:

| Name       | Type    | Description                                                                     |
| :--------- | :------ | :------------------------------------------------------------------------------ |
| `token`    | address | The address of the token spent                                                  |
| `value`    | uint256 | The amount that can be spent of token                                           |
| `deadline` | uint256 | A timestamp, the current blocktime must be less than or equal to this timestamp |
| `v`        | uint8   | Must produce valid secp256k1 signature from the holder along with `r` and `s`   |
| `r`        | bytes32 | Must produce valid secp256k1 signature from the holder along with `v` and `s`   |
| `s`        | bytes32 | Must produce valid secp256k1 signature from the holder along with `r` and `v`   |

### selfPermitAllowed

```solidity
  function selfPermitAllowed(
    address token,
    uint256 nonce,
    uint256 expiry,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) public
```

Permits this contract to spend the sender's tokens for permit signatures that have the `allowed` parameter

The `owner` is always msg.sender and the `spender` is always address(this)

#### Parameters:

| Name     | Type    | Description                                                                   |
| :------- | :------ | :---------------------------------------------------------------------------- |
| `token`  | address | The address of the token spent                                                |
| `nonce`  | uint256 | The current nonce of the owner                                                |
| `expiry` | uint256 | The timestamp at which the permit is no longer valid                          |
| `v`      | uint8   | Must produce valid secp256k1 signature from the holder along with `r` and `s` |
| `r`      | bytes32 | Must produce valid secp256k1 signature from the holder along with `v` and `s` |
| `s`      | bytes32 | Must produce valid secp256k1 signature from the holder along with `r` and `v` |

### selfPermitAllowedIfNecessary

```solidity
  function selfPermitAllowedIfNecessary(
    address token,
    uint256 nonce,
    uint256 expiry,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Permits this contract to spend the sender's tokens for permit signatures that have the `allowed` parameter

The `owner` is always msg.sender and the `spender` is always address(this)
Can be used instead of #selfPermitAllowed to prevent calls from failing due to a frontrun of a call to #selfPermitAllowed.

#### Parameters:

| Name     | Type    | Description                                                                   |
| :------- | :------ | :---------------------------------------------------------------------------- |
| `token`  | address | The address of the token spent                                                |
| `nonce`  | uint256 | The current nonce of the owner                                                |
| `expiry` | uint256 | The timestamp at which the permit is no longer valid                          |
| `v`      | uint8   | Must produce valid secp256k1 signature from the holder along with `r` and `s` |
| `r`      | bytes32 | Must produce valid secp256k1 signature from the holder along with `v` and `s` |
| `s`      | bytes32 | Must produce valid secp256k1 signature from the holder along with `r` and `v` |

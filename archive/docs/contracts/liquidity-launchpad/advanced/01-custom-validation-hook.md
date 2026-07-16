---
id: custom-validation-hook
title: Custom Validation Hook
sidebar_position: 1
---

# Custom Validation Hook
This guide will outline how to create a custom validation hook for a CCA auction. Hooks are powerful extensions to CCA which unlock a wide range of features like bidding limits, allowlisting, and more.

## Prerequisites
- [Foundry](https://getfoundry.sh/introduction/installation)
- Basic understanding of the CCA contracts and Solidity

If you haven't already, please check out the [quickstart guide](../quickstart/local-deployment.md).

## Interface
All validation hooks must implement the [IValidationHook](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IValidationHook.sol) interface.

```solidity
interface IValidationHook {
    function validate(uint256 maxPrice, uint128 amount, address owner, address sender, bytes calldata hookData) external;
}
```

This function is called by the auction contract during bid submission. To reject a bid, your hook MUST revert.

### Parameters
- `maxPrice`: The maximum price the bidder is willing to pay
- `amount`: The amount of currency the user is bidding
- `owner`: The address of the user who will receive any purchased tokens or refunded currency
- `sender`: The address of the user who is submitting the bid
- `hookData`: Any extra data

Note that `hookData` is arbitrarily specified by the bidder and should NOT be trusted.

## Introspection
It is highly recommended to implement basic [ERC165](https://eips.ethereum.org/EIPS/eip-165) introspection support for your hook. This will allow users to query for which capabilities the hook supports.

```solidity
interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

You can also inherit from the base contract [ValidationHookIntrospection](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/periphery/validationHooks/ValidationHookIntrospection.sol) which automatically implements support for `IERC165` and `IValidationHook`. Make sure to override the `supportsInterface` function to return `true` for your specific hook interface.

```solidity
interface ICustomValidationHook is IValidationHook, IERC165 {
    // Your custom hook interface here
}

contract CustomValidationHook is ValidationHookIntrospection {
    function supportsInterface(bytes4 interfaceId) public view override(ValidationHookIntrospection, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId) || interfaceId == type(ICustomValidationHook).interfaceId;
    }
}
```

## Deployment
Hooks must be deployed before the auction is created as they must be set in the `validationHook` parameter of the auction. If your hook requires that only the auction is able to call `validate`, you can initialize the hook after deployment.

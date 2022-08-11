---
id: swap-widget-api
slug: swap-widget/api
title: Swap Widget API Reference
sidebar_label: API Reference
sidebar_position: 3
---

# Swap Widget API Reference

<div className="widget-api">

## Required Parameters {#required-parameters}

| Prop Name         | Prop Type | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jsonRpcEndpoint` | `string`  | `undefined`   | URI of your JSON-RPC endpoint. Strongly recommended in order to provide trade quotes prior to the user connecting a wallet. If none is provided, the widget will be completely disabled until the user connects a wallet. Once a wallet is connected, the widget will use the wallet’s JSON-RPC. See [Understanding the Swap Widget States](../swap-widget#understanding-widget-states). |
| `provider`        | `any`     | `undefined`   | An [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) provider. This is required to swap.                                                                                                                                                                                                                                                                                               |

## Optional Parameters {#optional-parameters}

| Prop Name                   | Prop Type                     | Default Value           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ----------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `convenienceFee`            | `number`                      | `undefined`             | Optionally, you may charge a convenience fee on top of swaps executed through your web app. The allowed range is 1 to 100 basis points (inclusive of 100) consistent with the Uniswap v3 Periphery contract.                                                                                                                                                                                                                                                                                                                         |
| `convenienceFeeRecipient`   | `{[chainId: number]: string}` | `undefined`             | The address to receive the convenience fee on each network. Required if `convenienceFee` is provided.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `defaultInputTokenAddress`  | `{[chainId: number]: string}` | `string` or `'NATIVE'`  | Address of the token to be selected by default in the input field (e.g. USDC) for each network chain ID. If left empty the widget will use the native token of the connected chain as default. This can be explicitly defined by the special string `'NATIVE'`. For convenience you may pass a single string instead of a `chainId` mapping. In this case, the widget will assume that string corresponds to an L1 Ethereum address with `chaindId=1`. Any addresses provided in this parameter must be included in the `tokenList`. |
| `defaultInputAmount`   | `number`                      | `0`                     | Default amount for the input field (e.g. 1 ETH). This value will respect the decimals of the `defaultInputTokenAddress`. This parameter is valid only if `defaultInputTokenAddress` is also set. This parameter is mutually exclusive with `defaultOutputAmount`, so you may set only one of `defaultInputAmount` and `defaultOutputAmount`.                                                                                                                                                                          |
| `defaultOutputTokenAddress` | `{[chainId: number]: string}` | `string` or `undefined` | Address of the token to be selected by default in the input field (e.g. USDC) for each network chain ID. None if left empty. Any addresses provided in this parameter must be included in the `tokenList`.                                                                                                                                                                                                                                                                                                                           |
| `defaultOutputAmount`  | `number`                      | `0`                     | Default amount for the input field (e.g. 100 USDC). This value will respect the decimals of the `defaultOutputTokenAddress`. This parameter is mutually exclusive with `defaultInputAmount`, so you may set only one of `defaultInputAmount` and `defaultOutputAmount`.                                                                                                                                                                                                                                               |
| `locale`                    | `SupportedLocale`             | `en-US`                 | Specifies an explicit locale to use for the widget interface. This can be set to one of the values exported by the library in [`SUPPORTED_LOCALES`](https://github.com/Uniswap/widgets/blob/main/src/constants/locales.ts).                                                                                                                                                                                                                                                                                                        |
| `onConnectWallet`           | `() => void`                  | `undefined`             | If passed, the “Connect your wallet” message will be clickable, and clicking it will trigger this handler function. This can be used to trigger your own wallet connection flow from the widget.                                                                                                                                                                                                                                                                                                                                     |
| `onError`                   | `ErrorHandler`                | `undefined`             | An error handler which receives any errors that occur in the widget. This can be used for collecting error metrics.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `onTokenSelectorClick` | `() => void \| () => Promise<boolean \| void>` | `undefined` | A click handler fired when the user clicks on the token selector dropdown. To manage progression to the native token selector view (i.e. to utilize your own external token selector UI), return a resolved promise with resolve(true/false). |
| `theme`                     | `Theme`                       | `lightTheme`            | Specifies a custom theme (colors, font, and border radii). See [Customizing the Theme](../swap-widget#customizing-theme).                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tokenList`                 | `string`                      | `TokenInfo[]`           | Specifies the set of tokens that appear by default in the token selector list. Accepts either a URI of a token list as defined by the Token Lists standard, or an inline array of tokens. If none is provided, the Uniswap Labs default token list will be used. See [Customizing the Default Token List](../swap-widget#customizing-default-token-list).                                                                                                                                                                            |
| `width`                     | `number` or `string`          | `360`                   | Specifies the width of the widget. If specified as a number, this is in pixels; otherwise, it is interpreted as a CSS `<length>` data type. Recommended width is 360px. Minimum width is 270px. See [Customizing the Width](../swap-widget#customizing-width).                                                                                                                                                                                                                                                                       |

## Subscribing to Events

During the lifecycle of the swap widget, most of the events you will need are available on the web3 provider. For example, the below snippet shows how to listen for events when the wallet account changes or a new wallet connects. You can see more event examples in the [MetaMask](https://docs.metamask.io/guide/ethereum-provider.html) docs.

```js
// Subscribe to messages
interface ProviderMessage {
  type: string;
  data: unknown;
}

ethereum.on(
  'message',
  handler: (message: ProviderMessage) => void
);
```

</div>

:::note Questions?
Join the [Discord channel](https://discord.com/channels/597638925346930701/941447445844463676) to ask questions and get support from the Uniswap community.
:::

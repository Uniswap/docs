---
id: 06-token-listing
title: Token Listing
---

<Info>
Uniswap V1, while still fully functional, is no longer under active development. Looking for <Link to='/docs/v2/'>V2 documentation</Link>?
</Info>

It is possible that a token you are interested in is not included in the token dropdown on [https://app.uniswap.org/#/swap?use=v1](https://app.uniswap.org/#/swap?use=v1), however, all tokens that have a deployed uniswap exchange are supported on the front-end.

There are three ways to interact with tokens that are not yet included on the default list.

## 1. Paste the token address into the search box.

If a token is not included in the list, try pasting the token address into the search box. It will populate the dropdown with the token you are looking for.

## 2. Custom Linking

[https://app.uniswap.org/#/swap?use=v1](https://app.uniswap.org/#/swap?use=v1) supports custom linking to all tokens that have a Uniswap exchange. See <Link to='/docs/v1/frontend-integration/custom-linking'>Custom Linking</Link> for details on how to link.

For example, to populate the output token field with an unlisted token, we can specify the outputCurrency in the URL and pass in the token's address like this:

`https://app.uniswap.org/#/swap?use=v1?outputCurrency=0xfA3E941D1F6B7b10eD84A0C211bfA8aeE907965e`

## 3. Make a request to get your token listed

For tokens that have high market caps, high liquidity provision, or high trading volume, you can fill out a [request to be added to the dropdown menu](https://docs.google.com/forms/d/e/1FAIpQLSdQMI4KnQ1lCB0aiwzQ8xGTL59EX5FtkF6f2nT-JeQcxpW2Sw/formResponse)

## Token Details and Assets

Token information (including decimals, symbol, name, etc.) is pulled from token contracts directly. Logo images are pulled from TrustWallet. If you'd like your token logo updated make a pull request into the TrustWallet assets repo [https://github.com/trustwallet/assets](https://github.com/trustwallet/assets).

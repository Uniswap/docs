---
id: 05-iframe-integration
title: Iframe Integration
---

Uniswap can be used within other sites as an iframe. An iframe shows an exact version of the app.uniswap.org site and can have custom prefilled settings.

# Why You May Want This

Integrating the Uniswap site directly into your web application can be useful for a variety of reasons.

v1.app.uniswap.org allows users to buy, sell, send, or provide liquidity for ERC20 tokens. An iframe integration may be useful if your application provides services around these ERC20 tokens. \(For example, users can buy DAI through a Uniswap iframe on your site, then allow users to lend that DAI on your site\).

It can also be useful if your application requires users to acquire some token in order to use some service \(For example, allow users to buy "REP" token so they can engage in prediction markets on the Augur Dapp\).

# iframe vs. custom UI

One benefit of an iframe integration is that the your site will automatically keep up with any improvements/additions to the v1.app.uniswap.org site. After the initital integration is setup no further work is needed to pull in updates as the exchange site is updated over time.

# Live Example

An example of an Iframe integration can be found on the FOAM site [https://map.foam.space/](https://map.foam.space/#/at/?lng=-74.0045300&lat=40.6771800&zoom=5.00)

To see the Iframe click the dropdown in the top right and click "get foam".

# Add To Your Site

To include a Uniswap iframe within your site just add an iframe element within your website code and link to the Uniswap exchange.

Linking to a ETH &lt;-&gt; DAI swap page would look something like this. To link to a token of your choice replace the address after "outputCurrency" with the token address of the token you want to link to.

```text
<iframe
  src="https://app.uniswap.org/#/swap?use=v1?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
  height="660px"
  width="100%"
  style="
    border: 0;
    margin: 0 auto;
    display: block;
    border-radius: 10px;
    max-width: 600px;
    min-width: 300px;
  "
  id="myId"
/>
```

You can customize the selected page, selected custom tokens and more using URL query parameters. See <Link to='/docs/v1/frontend-integration/custom-linking'>Custom Linking</Link>.

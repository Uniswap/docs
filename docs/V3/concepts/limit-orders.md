---
id: limit-orders
title: Range Orders
---
Customizable liquidity positions, along with single-sided asset provisioning, allows for a new style of swapping with automated market makers: the **range order**.

In typical order book markets, anyone can easily set a limit order: to buy or sell an asset at a specific pre-determined price, allowing the order to be filled at an indeterminate time in the future. 

With Uniswap V3, one can approximate a limit order by providing a single asset as liquidity within a specific range. Like traditional limit orders, range orders may be set with the expectation they will execute at some point in the future, with the destination asset available for withdrawal after the spot price has crossed the full range of the order. 

Unlike standard limit orders, where the order maker typically pays fees when the order is filled, the range order maker **generates fees** while the order is filled. This is due to the range order technically being a form of liquidity provisioning rather than a typical swap. 

One important distinction: range orders, unlike traditional limit orders, will be **unfilled** if the spot price crosses the range and then reverses and recrosses in the opposite direction before the destination asset is withdrawn. While you will be earning LP fees during this time, if the goal is to exit fully in the desired destination asset, you will need to keep an eye on the order and manually remove your liquidity when the order has been filled.

An example:
> If you want to swap 1 ETH for DAI at 1,500 DAI per ETH, you will provide liquidity at a concentration of your choosing with 1,500 DAI / ETH as the geometric mean price, potentially a spread of ETH between 1,490 and 1,510 DAI. When the price of ETH reaches 1,490 DAI, the ETH you provided as liquidity will be continuously swapped for DAI until the price of ETH reaches 1,510, at which point your ETH will have been fully swapped for DAI, and ~1,500 DAI will be available to your address (plus the fees generated while your liquidity was in use)

Notes: 

* Because fees are generated in both tokens when swapping, the fees due to your liquidity position will be denominated in both tokens of the given pair. So, in the above example, 1,500 DAI will be redeemable along with the commensurate fees due in both DAI and ETH.

* Approaches to concentration when setting range orders are up to the user. Selecting a wider range may generate more fees if there is price churn within your range, at the cost of potentially having your order unfilled if the spot price reverses before completing your full range.
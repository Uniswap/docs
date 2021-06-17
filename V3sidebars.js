module.exports = {
  SDKsidebar: [
    "SDK/readme",
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      items: [
        "SDK-guides/getting-started",
        "SDK-guides/creating-a-pool",
      ]
    },
    {
      type: "category",
      label: "Reference", // generate sidebar slice from the docs folder (or versioned_docs/<version>)
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            "SDK/classes/Pool",
            "SDK/classes/Position",
            "SDK/classes/Route",
            "SDK/classes/Tick",
            "SDK/classes/NoTickDataProvider",
            "SDK/classes/Trade",
            "SDK/classes/NonfungiblePositionManager",
            "SDK/classes/SelfPermit",
            "SDK/classes/SwapRouter",
            "SDK/classes/FullMath",
            "SDK/classes/LiquidityMath",
            "SDK/classes/SqrtPriceMath",
            "SDK/classes/SwapMath",
            "SDK/classes/TickList",
            "SDK/classes/TickMath",
          ],
        },
        {
          type: "category",
          label: "Enums",
          items: ["SDK/enums/FeeAmount"],
        },
        {
          type: "category",
          label: "Functions",
          items: [
            "SDK/functions/tradeComparator",
            "SDK/functions/toHex",
            "SDK/functions/computePoolAddress",
            "SDK/functions/encodeRouteToPath",
            "SDK/functions/encodeSqrtRatioX96",
            "SDK/functions/isSorted",
            "SDK/functions/maxLiquidityForAmounts",
            "SDK/functions/mostSignificantBit",
            "SDK/functions/nearestUsableTick",
            "SDK/functions/priceToClosestTick",
            "SDK/functions/tickToPrice",
          ],
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            "SDK/interfaces/AllowedPermitArguments",
            "SDK/interfaces/BestTradeOptions",
            "SDK/interfaces/CollectOptions",
            "SDK/interfaces/CommonAddLiquidityOptions",
            "SDK/interfaces/FeeOptions",
            "SDK/interfaces/IncreaseSpecificOptions",
            "SDK/interfaces/MethodParameters",
            "SDK/interfaces/MintSpecificOptions",
            "SDK/interfaces/NFTPermitOptions",
            "SDK/interfaces/RemoveLiquidityOptions",
            "SDK/interfaces/StandardPermitArguments",
            "SDK/interfaces/SwapOptions",
            "SDK/interfaces/TickConstructorArgs",
            "SDK/interfaces/TickDataProvider",
          ],
        },
        {
          type: "category",
          label: "Modules",
          items: ["SDK/modules/constants", "SDK/modules/utils"],
        },
        {
          type: "category",
          label: "Types",
          items: [
            "SDK/types/nonfungiblepositionmanager.addliquidityoptions",
            "SDK/types/nonfungiblepositionmanager.increaseoptions",
            "SDK/types/nonfungiblepositionmanager.mintoptions",
            "SDK/types/selfpermit.permitoptions",
          ],
        },
        {
          type: "category",
          label: "Variables",
          items: [
            "SDK/variables/constants.address_zero",
            "SDK/variables/constants.factory_address",
            "SDK/variables/constants.pool_init_code_hash",
            "SDK/variables/constants.tick_spacings",
            "SDK/variables/internalconstants.negative_one",
            "SDK/variables/internalconstants.one",
            "SDK/variables/internalconstants.q192",
            "SDK/variables/internalconstants.q96",
            "SDK/variables/internalconstants.zero",
          ],
        },
      ],
    },
  ],
  docs: [
    {
      type: "category",
      label: "Core Concepts",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Introduction",
          items: [
            "concepts/introduction/what-is-uniswap",
            "concepts/introduction/swaps",
            "concepts/introduction/liquidity-user-guide",
          ],
        },
        {
          type: "category",
          label: "V3 Overview",
          items: [
            "concepts/V3-overview/faq",
            "concepts/V3-overview/concentrated-liquidity",
            "concepts/V3-overview/fees",
            "concepts/V3-overview/range-orders",
            "concepts/V3-overview/oracle",
            "concepts/V3-overview/glossary",
          ],
        },
        {
          type: "category",
          label: "Advanced Topics",
          items: [
            "concepts/advanced/research",
            "concepts/advanced/resources",
            "concepts/advanced/integration-issues",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: [
        {
          type: "category",
          label: "Flash Transactions",
          items: [
            "guides/inheritance-constructors",
            "guides/calling-flash",
            "guides/flash-callback",
            "guides/final-contract",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/smart-contracts",
        "reference/deployments",
        {
          type: "category",
          label: "Periphery",
          items: [
            {
              type: "category",
              label: "Base",
              items: [
                "reference/periphery/base/BlockTimestamp",
                "reference/periphery/base/ERC721Permit",
                "reference/periphery/base/LiquidityManagement",
                "reference/periphery/base/Multicall",
                "reference/periphery/base/PeripheryImmutableState",
                "reference/periphery/base/PeripheryPayments",
                "reference/periphery/base/SelfPermit",
              ],
            },
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "category",
                  label: "External",
                  items: [
                    "reference/periphery/interfaces/external/IERC20PermitAllowed",
                    "reference/periphery/interfaces/external/IERC1271",
                    "reference/periphery/interfaces/external/IERC20PermitAllowed",
                  ],
                },
                "reference/periphery/interfaces/IERC20Metadata",
                "reference/periphery/interfaces/IERC721Permit",
                "reference/periphery/interfaces/IMulticall",
                "reference/periphery/interfaces/INonfungiblePositionManager",
                "reference/periphery/interfaces/INonfungibleTokenPositionDescriptor",
                "reference/periphery/interfaces/IPeripheryImmutableState",
                "reference/periphery/interfaces/IPeripheryPayments",
                "reference/periphery/interfaces/IQuoter",
                "reference/periphery/interfaces/ISelfPermit",
                "reference/periphery/interfaces/ISwapRouter",
                "reference/periphery/interfaces/ITickLens",
                "reference/periphery/interfaces/IV3Migrator",
              ],
            },
            {
              type: "category",
              label: "Lens",
              items: [
                "reference/periphery/lens/Quoter",
                "reference/periphery/lens/TickLens",
              ],
            },
            {
              type: "category",
              label: "Libraries",
              items: [
                "reference/periphery/libraries/Base64",
                "reference/periphery/libraries/BytesLib",
                "reference/periphery/libraries/CallbackValidation",
                "reference/periphery/libraries/ChainId",
                "reference/periphery/libraries/HexStrings",
                "reference/periphery/libraries/LiquidityAmounts",
                "reference/periphery/libraries/NFTDescriptor",
                "reference/periphery/libraries/Path",
                "reference/periphery/libraries/PoolAddress",
                "reference/periphery/libraries/PositionKey",
                "reference/periphery/libraries/TokenRatioSortOrder",
                "reference/periphery/libraries/TransferHelper",
              ],
            },
            "reference/periphery/NonfungiblePositionManager",
            "reference/periphery/NonfungibleTokenPositionDescriptor",
            "reference/periphery/SwapRouter",
            "reference/periphery/V3Migrator",
          ],
        },
        {
          type: "category",
          label: "Core",
          items: [
            {
              type: "category",
              label: "Libraries",
              items: [
                "reference/core/libraries/BitMath",
                "reference/core/libraries/FixedPoint96",
                "reference/core/libraries/FixedPoint96",
                "reference/core/libraries/FixedPoint128",
                "reference/core/libraries/FullMath",
                "reference/core/libraries/LiquidityMath",
                "reference/core/libraries/LowGasSafeMath",
                "reference/core/libraries/Oracle",
                "reference/core/libraries/Position",
                "reference/core/libraries/SafeCast",
                "reference/core/libraries/SecondsOutside",
                "reference/core/libraries/SqrtPriceMath",
                "reference/core/libraries/SwapMath",
                "reference/core/libraries/Tick",
                "reference/core/libraries/TickBitmap",
                "reference/core/libraries/TransferHelper",
                "reference/core/libraries/UnsafeMath",
              ],
            },
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "category",
                  label: "Callback",
                  items: [
                    "reference/core/interfaces/callback/IUniswapV3FlashCallback",
                    "reference/core/interfaces/callback/IUniswapV3MintCallback",
                    "reference/core/interfaces/callback/IUniswapV3SwapCallback",
                  ],
                },
                {
                  type: "category",
                  label: "Pool",
                  items: [
                    "reference/core/interfaces/pool/IUniswapV3PoolActions",
                    "reference/core/interfaces/pool/IUniswapV3PoolDerivedState",
                    "reference/core/interfaces/pool/IUniswapV3PoolEvents",
                    "reference/core/interfaces/pool/IUniswapV3PoolImmutables",
                    "reference/core/interfaces/pool/IUniswapV3PoolOwnerActions",
                    "reference/core/interfaces/pool/IUniswapV3PoolState",
                  ],
                },
                "reference/core/interfaces/IERC20Minimal",
                "reference/core/interfaces/IUniswapV3Factory",
                "reference/core/interfaces/IUniswapV3Pool",
                "reference/core/interfaces/IUniswapV3PoolDeployer",
              ],
            },
            "reference/core/UniswapV3Factory",
            "reference/core/UniswapV3Pool",
            "reference/core/UniswapV3PoolDeployer",
          ],
        },
      ],
    },
  ],

  // guides: [
  //   {
  //     type: 'category',
  //     label:'Landing',
  //     items: [
  //       'guides/landing',
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label:'Guides Overview',
  //     items: [
  //       'guides/guides-holder',
  //     ],
  //   },
  // ],

  // reference: [
  //   {
  //     type: 'category',
  //     label:'Reference Overview',
  //     items: [
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Libraries',
  //     items: [
  //       'reference/core/libraries/BitMath',
  //       'reference/core/libraries/FixedPoint96',
  //     ]
  //   },
  //   {
  //     type: 'category',
  //     label: 'Interfaces',
  //     items: [
  //       {
  //         type: 'category',
  //         label: 'Callback',
  //         items: [
  //             'reference/core/interfaces/callback/IUniswapV3FlashCallback',
  //             'reference/core/interfaces/callback/IUniswapV3MintCallback',
  //             'reference/core/interfaces/callback/IUniswapV3SwapCallback'
  //         ]
  //       },
  //       {
  //         type: 'category',
  //         label: 'Pool',
  //         items: [
  //           'reference/core/interfaces/pool/IUniswapV3PoolActions',
  //           'reference/core/interfaces/pool/IUniswapV3PoolDerivedState',
  //           'reference/core/interfaces/pool/IUniswapV3PoolEvents',
  //           'reference/core/interfaces/pool/IUniswapV3PoolImmutables',
  //           'reference/core/interfaces/pool/IUniswapV3PoolOwnerActions',
  //           'reference/core/interfaces/pool/IUniswapV3PoolState',
  //         ]
  //       },
  //       'reference/core/interfaces/IERC20Minimal',
  //       'reference/core/interfaces/IUniswapV3Factory',
  //       'reference/core/interfaces/IUniswapV3Pool',
  //       'reference/core/interfaces/IUniswapV3PoolDeployer',
  //     ]
  //   },
  //   'reference/NoDelegateCall',
  //   'reference/UniswapV3Factory',
  //   'reference/UniswapV3Pool',
  //   'reference/UniswapV3PoolDeployer',

  // ],
};

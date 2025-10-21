import math from 'remark-math'
import katex from 'rehype-katex'
import tailwindPlugin from './plugins/tailwind-config.cjs'
import dotenv from 'dotenv'
import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

dotenv.config()

const config: Config = {
  staticDirectories: ['static'],
  customFields: {
    // Analytics proxy URL
    analyticsProxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
    // Determines if staging env
    stagingEnv: process.env.REACT_APP_STAGING,
    // From node
    nodeEnv: process.env.NODE_ENV,
  },
  title: 'Uniswap',
  tagline: 'Documentation and Guides',
  url: 'https://docs.uniswap.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },
  favicon: 'img/favicon.png',
  organizationName: 'Uniswap',
  projectName: 'Uniswap-docs',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'strict-origin-when-cross-origin',
      },
    },
  ],
  themeConfig: {
    image: 'img/twitter_card_bg.jpg',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: {
      apiKey: '32465e2ab6f7554ff014e64c0d92171c', //  Search-Only API Key (Public & safe to commit)
      indexName: 'v3-docs',
      appId: 'S0IDD0YGLZ',
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      items: [
        {
          type: 'doc',
          docId: 'concepts/overview',
          label: 'Concepts',
        },
        {
          type: 'doc',
          docId: 'contracts/v4/overview',
          label: 'Contracts',
        },
        {
          type: 'doc',
          docId: 'sdk/v4/overview',
          label: 'SDKs',
        },
        {
          type: 'doc',
          docId: 'api/subgraph/overview',
          label: 'APIs',
        },
        {
          type: 'doc',
          docId: 'llms/overview',
          label: 'LLMs',
        },
        {
          label: "Give Feedback",
          to: 'https://share.hsforms.com/14XvN41xQTyC8KPamgaM8Jwsdca9',
          target: '_blank',
          rel: 'noreferrer',
        },
        {
          label: "Uniswap Foundation",
          to: 'https://www.uniswapfoundation.org/',
          target: '_blank',
          rel: 'noreferrer',
        },
        {
          label: "Whitepaper",
          to: 'https://app.uniswap.org/whitepaper-v4.pdf',
          target: '_blank',
          rel: 'noreferrer',
        },
        {
          label: "GitHub",
          to: 'https://github.com/Uniswap/docs/',
          target: '_blank',
          rel: 'noreferrer',
        },
      ],
      /* using custom navbar */
    },
    footer: {
      /* using custom footer */
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',
      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/uniswap/uniswap-docs/tree/main/',
          includeCurrentVersion: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    tailwindPlugin,
    ['@saucelabs/theme-github-codeblock', {}],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/sdk/v3/guides/background',
            from: '/sdk/v3/guides/quick-start',
          },
          {
            to: '/sdk/v3/guides/swaps/quoting',
            from: ['/sdk/v3/guides/creating-a-pool', '/sdk/v3/guides/fetching-prices'],
          },
          {
            to: '/sdk/v3/guides/swaps/trading',
            from: ['/sdk/v3/guides/creating-a-trade', '/sdk/guides/creating-a-trade'],
          },
          {
            to: '/sdk/v3/guides/swaps/routing',
            from: '/sdk/v3/guides/auto-router',
          },
          {
            to: '/sdk/v3/guides/liquidity/modifying-position',
            from: ['/sdk/v3/guides/liquidity/adding', '/sdk/v3/guides/liquidity/removing'],
          },
          {
            to: '/concepts/protocol/integration-issues',
            from: '/protocol/concepts/advanced/integration-issues',
          },
          {
            to: '/contracts/v4/guides/hooks/your-first-hook',
            from: [
                '/contracts/v4/first-hook/building-your-own-hook',
                '/tutorials/',
                '/contracts/v4/guides/hooks/setup'
            ]
          },
          {
            to: '/contracts/v2/guides/smart-contract-integration/using-flash-swaps',
            from: '/protocol/guides/flash-swaps',
          },
          {
            to: '/contracts/v4/guides/hooks/hook-deployment',
            from: [
                '/contracts/v4/concepts/hook-deployment',
                '/contracts/v4/first-hook/hook-deployment',
                '/contracts/v4/first-hook/testing-hooks'
            ]
          },
          {
            to: '/contracts/v3/guides/flash-integrations/flash-callback',
            from: '/guides/flash-callback',
          },
          {
            to: '/contracts/v2/concepts/advanced-topics/fees',
            from: [
                '/v2/advanced-topics/understanding-fees/',
                '/v2/advanced-topics/fees'
            ]
          },
          {
            to: '/sdk/v1/overview',
            from: [
                '/sdk/1.0.0/reference/format',
                '/sdk/1.0.0/'
            ]
          },
          {
            to: '/contracts/v4/quickstart/hooks/async-swap',
            from: '/contracts/v4/quickstart/hooks/NoOp',
          },
          {
            to: '/concepts/glossary',
            from: [
                //'/contracts/V2/concepts/protocol-overview/glossary',
                '/protocol/V2/concepts/protocol-overview/glossary',
                '/v2/glossary'
            ]
          },
          {
            to: '/contracts/v4/overview',
            from: [
                '/contracts/v4/concepts/v4-architecture-overview',
                '/contracts/v4/concepts/v4-',
                '/contracts/v4/concepts/overview',
                '/contracts/v4/concepts/intro-to-v4',
                '/concepts/overview4',
                '/contracts/v4/concepts/in-tro-to-v4',
                '/protocol/reference/core',
                '/protocol',
                '/v4',
                '/contracts/',
                '/reference/smart-contracts'
            ]
          },
          {
            to: '/contracts/v2/overview',
            from: [
                '/protocol/V2',
                '/protocol/V2/concepts/protocol-',
                '/v2/',
                '/contracts/v2',
                '/contracts/v2/overview.md',
                '/contracts/v2/concepts/protocol-overview/how-',
                '/protocol/v2/introduction'
            ]
          },
          {
            to: '/contracts/v4/guides/custom-accounting',
            from: '/contracts/v4/guides/hooks/Volatility-fee-hook',
          },
          {
            to: '/sdk/v3/guides/swaps/routing',
            from: '/sdk/guides/auto-router/quick-start',
          },
          {
            to: '/sdk/web3-react/guides/connect-wallet',
            from: '/docs/wrappers/integrating-with-wallets',
          },
          {
            to: '/api/subgraph/overview',
            from: '/protocol/reference/v3/guides/querying-data',
          },
          {
            to: '/contracts/v4/quickstart/create-pool',
            from: '/sdk/guides/creating-a-pool',
          },
          {
            to: '/sdk/v3/reference/interfaces/MintSpecificOptions',
            from: '/sdk/reference/interfaces/MintSpecificOptions',
          },
          {
            to: '/sdk/v3/reference/interfaces/IncreaseSpecificOptions',
            from: '/sdk/reference/interfaces/IncreaseSpecificOptions',
          },
          {
            to: '/sdk/v3/reference/interfaces/RemoveLiquidityOptions',
            from: '/sdk/reference/interfaces/RemoveLiquidityOptions',
          },
          {
            to: '/concepts/protocol/swaps',
            from: '/protocol/concepts/V3-overview/swaps',
          },
          {
            to: '/sdk/v3/reference/interfaces/CommonAddLiquidityOptions',
            from: '/sdk/reference/interfaces/CommonAddLiquidityOptions',
          },
          {
            to: '/concepts/protocol/concentrated-liquidity',
            from: [
                '/concepts/introduction/liquidity-user-guide',
                '/concepts/V3-overview/oracle',
                '/concepts/V3-overview/concentrated-liquidity',
                '/protocol/concepts/V3-overview/concentrated-liquidity'
            ]
          },
          {
            to: '/concepts/protocol/fees',
            from: '/protocol/concepts/V3-overview/fees',
          },
          {
            to: '/contracts/v2/concepts/protocol-overview/smart-contracts',
            from: '/protocol/V2/reference/smart-contracts',
          },
          {
            to: '/sdk/v3/guides/liquidity/swap-and-add',
            from: '/protocol/V3/reference/smart-order-router',
          },
          {
            to: '/concepts/protocol/range-orders',
            from: '/protocol/concepts/V3-overview/range-orders',
          },
          {
            to: '/contracts/v4/concepts/PoolManager',
            from: '/contracts/v4/concepts/lock-mechanism',
          },
          {
            to: '/contracts/v4/reference/core/interfaces/IUnlockCallback',
            from: '/src/interfaces/callback/IUnlockCallback.sol/interface.IUnlockCallback.md',
          },
          {
            to: '/sdk/v4/overview',
            from: [
                '/sdk',
                '/sdk/guides'
            ]
          },
          {
            to: '/sdk/v1/reference/computation',
            from: '/sdk/1.0.0/reference/computation',
          },
          {
            to: '/concepts/protocol/fees',
            from: '/protocol/V2/concepts/advanced-topics/fees',
          },
          {
            to: '/concepts/protocol/swaps',
            from: '/protocol/V2/concepts/core-concepts/swaps',
          },
          {
            to: '/sdk/v3/guides/background',
            from: '/sdk/v3/guides/advanced/01-background.md',
          },
          {
            to: '/concepts/uniswap-protocol',
            from: [
                '/protocol/V2/concepts/protocol-overview/how-uniswap-works',
                '/protocol/V2/concepts/core-',
                '/contracts/v2/concepts/protocol-overview/how-uniswap-work',
                '/V2/concepts/protocol-overview/01-how-uniswap-works',
                '/protocol/V2/concepts/protocol'
            ]
          },
          {
            to: '/contracts/v2/concepts/protocol-overview/smart-contracts',
            from: '/protocol/V2/concepts/protocol-overview/smart-contracts',
          },
          {
            to: '/contracts/v4/guides/position-manager',
            from: '/contracts/v4/concepts/managing-positions',
          },
          {
            to: '/contracts/v2/guides/interface-integration/using-the-api',
            from: '/protocol/V2/guides/smart-',
          },
          {
            to: '/concepts/governance/overview',
            from: [
                '/contracts/v3/reference/governance/overview.md',
                '/protocol/V2/concepts/governance/governance-reference',
                '/protocol/concepts/governance',
                '/protocol/reference/Governance/governance-reference',
                '/contracts/v2/reference/Governance/governance-'
            ]
          },
          {
            to: '/sdk/v3/guides/liquidity/minting',
            from: '/sdk/v3/guides/liquidity/01-minting-position.md',
          },
          {
            to: '/contracts/v2/concepts/advanced-topics/understanding-returns',
            from: '/protocol/V2/concepts/advanced-topics/understanding-returns',
          },
          {
            to: '/sdk/v2/overview',
            from: [
                '/sdk/2.0.0/introduction',
                '/sdk/2.0.0/reference/getting-started',
                '/v2/SDK/getting-started'
            ]
          },
          {
            to: '/concepts/overview',
            from: '/concepts',
          },
          {
            to: '/concepts/protocol/oracle',
            from: '/v2/core-concepts/oracles/',
          },
          {
            to: '/contracts/v3/reference/periphery/interfaces/IQuoter',
            from: '/reference/periphery/interfaces/IQuoter',
          },
          {
            to: '/sdk/v3/guides/web3-development-basics',
            from: '/protocol/reference/smart-contracts',
          },
          {
            to: '/contracts/v3/guides/providing-liquidity/collect-fees',
            from: '/sdk/v3/guides/liquidity/04-collecting-fees.md',
          },
          {
            to: '/contracts/v3/guides/providing-liquidity/collect-fees',
            from: '/sdk/v3/guides/liquidity/03-collecting-fees.md',
          },
          {
            to: '/contracts/v1/guides/pool-liquidity',
            from: '/protocol/V1/guides/pool-liquidity',
          },
          {
            to: '/concepts/resources',
            from: '/protocol/concepts/advanced/resources',
          },
          {
            to: '/contracts/v2/concepts/protocol-overview/smart-contracts',
            from: '/contracts/v2/reference/smart-co',
          },
          {
            to: '/contracts/v3/reference/core/interfaces/callback/IUniswapV3SwapCallback',
            from: '/reference/core/interfaces/callback/IUniswapV3SwapCallback',
          },
          {
            to: '/contracts/v3/reference/deployments/',
            from: '/contracts/v3/reference/deploymentsletWETHAddress',
          },
          {
            to: '/contracts/v3/guides/liquidity-mining/overview',
            from: '/protocol/guides/liquidity-mining/liquidity-mining-overview',
          },
          {
            to: '/contracts/v3/reference/core/interfaces/IUniswapV3Factory',
            from: '/contracts/v3/reference/reference/core/interfaces/IUniswapV3Factory.md',
          },
          {
            to: '/sdk/v3/guides/swaps/trading',
            from: '/sdk/v3/guides/swaps/02-trading',
          },
          {
            to: '/contracts/v4/guides/swap-routing',
            from: '/contracts/universal-router/',
          },
          {
            to: '/concepts/overview',
            from: '/concepts/uniswap-',
          },
          {
            to: '/sdk/v3/reference/overview',
            from: '/sdk/v3/reference/README.md',
          },
          {
            to: '/contracts/v3/reference/core/libraries/LowGasSafeMath',
            from: '/reference/core/libraries/LowGasSafeMath',
          },
          {
            to: '/sdk/v3/guides/swaps/routing',
            from: '/sdk/v3/guides/trading/03-routing.md',
          },
          {
            to: '/sdk/v3/guides/swaps/quoting',
            from: '/sdk/v3/guides/quoting',
          },
          {
            to: '/sdk/v1/reference/constants',
            from: '/sdk/1.0.0/reference/constants',
          },
          {
            to: '/concepts/uniswap-protocol',
            from: '/protocol/V2/concepts/protocol-overview/',
          },
          {
            to: '/contracts/v3/reference/periphery/NonfungiblePositionManager',
            from: '/sdk/reference/classes/NonfungiblePositionManager',
          },
          {
            to: '/sdk/v2/guides/pricing',
            from: '/sdk/2.0.0/guides/pricing',
          },
          {
            to: '/api/subgraph/overview',
            from: '/sdk/subgraph/subgraph-data',
          },
          {
            to: '/contracts/v1/overview',
            from: '/protocol/V1/introduction',
          },
          {
            to: '/sdk/web3-react/guides/connectors',
            from: '/sdk/web3-react/guides/connectors.md',
          },
          {
            to: '/concepts/protocol/hooks',
            from: '/protocol/concepts/',
          },
          {
            to: '/sdk/v1/reference/orchestration',
            from: '/sdk/1.0.0/reference/orchestration',
          },
          {
            to: '/contracts/v3/reference/core/UniswapV3Factory',
            from: '/reference/core/UniswapV3Factory',
          },
          {
            to: '/sdk/v1/reference/data',
            from: '/sdk/1.0.0/reference/data',
          },
          {
            to: '/sdk/v1/reference/transact',
            from: '/sdk/1.0.0/reference/transact',
          },
          {
            to: '/sdk/v1/guides/getting-started',
            from: '/sdk/core/reference/modules.md',
          },
          {
            to: '/sdk/v2/guides/trading',
            from: '/sdk/2.0.0/guides/trading',
          },
          {
            to: '/concepts/protocol/hooks',
            from: '/concepts/protocol',
          },
          {
            to: '/contracts/v1/guides/custom-linking',
            from: '/protocol/V1/guides/custom-linking',
          },
          {
            to: '/contracts/v4/deployments',
            from: '/arbitrum/guides/how-to-connect',
          },
          {
            to: '/contracts/v4/deployments',
            from: '/optimism/guides/how-to-connect',
          },
          {
            to: '/concepts/research',
            from: '/protocol/concepts/advanced/research',
          },
          {
            to: '/sdk/v2/guides/pricing',
            from: '/v2/advanced-topics/pricing',
          },
          {
            to: '/contracts/v3/guides/swaps/single-swaps',
            from: '/sdk/v3/guides/swaps/01-background.md',
          },
          {
            to: '/api/subgraph/guides/v4-examples',
            from: '/sdk/subgraph/subgraph-examples',
          },
          {
            to: '/contracts/v3/overview',
            from: '/contracts/v3/overvie',
          },
          {
            to: '/contracts/v1/guides/token-listing',
            from: '/protocol/V1/guides/token-listing',
          },
          {
            to: '/contracts/v4/concepts/v4-vs-v3',
            from: '/contracts/v4/concepts/',
          },
          {
            to: '/concepts/protocol/hooks',
            from: '/protocol/reference',
          },
          {
            to: '/sdk/v2/guides/pricing',
            from: '/sdk/2.0.0/guides/pring',
          },
          {
            to: '/',
            from: [
                '/developers/',
                '/conce'
            ]
          },
          {
            to: '/contracts/v3/reference/core/interfaces/pool/IUniswapV3PoolActions',
            from: '/reference/core/interfaces/pool/IUniswapV3PoolActions',
          },
          {
            to: '/sdk/web3-react/guides/connect-wallet',
            from: '/sdk/web3-react/guides/01-setting-up.md',
          },
          {
            to: '/concepts/research',
            from: '/protocol/V2/concepts/advanced-topics/research',
          },
          {
            to: '/sdk/v2/reference/trade',
            from: '/sdk/2.0.0/reference/trade',
          },
          {
            to: '/contracts/v3/overview',
            from: '/contracts/v3/',
          },
          {
            to: '/concepts/protocol/oracle',
            from: '/protocol/concepts/V3-overview/oracle',
          },
          {
            to: '/contracts/v3/reference/periphery/interfaces/ISwapRouter',
            from: '/reference/periphery/interfaces/ISwapRouter',
          },
          {
            to: '/sdk/v1/reference/types',
            from: '/sdk/1.0.0/reference/types',
          },
          {
            to: '/contracts/v4/quickstart/hooks/async-swap',
            from: '/contracts/v4/guides/hooks/NoOp',
          },
          {
            to: '/sdk/v3/guides/swaps/routing',
            from: '/sdk/v3/guides/routing',
          },
          {
            to: '/sdk/v3/guides/swaps/trading',
            from: '/sdk/v3/guides/trading',
          },
          {
            to: '/contracts/v4/quickstart/manage-liquidity/mint-position',
            from: '/contracts/v4/guides/manage-liquidity/mint-position',
          },
          {
            to: '/contracts/v4/quickstart/manage-liquidity/batch-liquidity',
            from: '/contracts/v4/guides/manage-liquidity/batch-liquidity',
          },
          {
            to: '/contracts/v4/quickstart/manage-liquidity/setup-liquidity',
            from: '/contracts/v4/guides/manage-liquidity/setup-liquidity',
          },
          {
            to: '/contracts/v4/quickstart/manage-liquidity/burn-liquidity',
            from: '/contracts/v4/guides/manage-liquidity/burn-liquidity',
          },
          {
            to: '/contracts/v3/reference/deployments/',
            from: '/contracts/v3/reference/Deployments.md',
          },
          {
            to: '/sdk/v3/guides/local-development',
            from: '/sdk/v3/guides/02-local-development',
          },
          {
            to: '/sdk/v3/guides/liquidity/swap-and-add',
            from: '/sdk/guides/liquidity/adding',
          },
          {
            to: '/contracts/v4/quickstart/manage-liquidity/collect',
            from: '/contracts/v4/guides/manage-liquidity/collect',
          },
          {
            to: '/contracts/v4/concepts/subscribers',
            from: '/contracts/v4/guides/subscriber',
          },
          {
            to: '/sdk/v3/guides/liquidity/modifying-position',
            from: '/sdk/v3/guides/liquidity/03-modifying-position.md',
          },
          {
            to: '/contracts/v2/reference/API/overview',
            from: '/protocol/V2/reference/core',
          },
          {
            to: '/contracts/v4/quickstart/manage-liquidity/increase-liquidity',
            from: '/contracts/v4/guides/manage-liquidity/increase-liquidity',
          },
          {
            to: '/contracts/v3/reference/overview',
            from: '/sdk/v3/reference/modules.md',
          },
          {
            to: '/contracts/v4/quickstart/create-pool',
            from: '/contracts/v4/guides/create-pool',
          },
          {
            to: '/contracts/v1/guides/custom-linking',
            from: '/v1/frontend-integration/custom-linking',
          },
          {
            to: '/contracts/v3/guides/providing-liquidity/decrease-liquidity',
            from: '/contracts/v4/guides/manage-liquidity/decrease-liquidity',
          },
          {
            to: '/sdk/v2/guides/fetching-data',
            from: '/sdk/v2/reference/fetcher',
          },
          {
            to: '/sdk/v2/guides/quick-start',
            from: '/sdk/v2/reference/token',
          },
          {
            to: '/sdk/core/reference/enums/ChainId',
            from: '/sdk/core/reference/enums/SupportedChainId',
          },
          {
            to: '/concepts/protocol/swaps',
            from: '/concepts/introduction/swaps',
          },
          {
            to: '/contracts/v2/concepts/core-concepts/pools',
            from: '/protocol/V2/concepts/core-concepts/pools',
          },
          {
            to: '/contracts/v3/guides/local-environment',
            from: '/protocol/V3/guides/getting-started',
          },
          {
            to: '/contracts/uniswapx/fillers/mainnet/createfiller',
            from: '/contracts/uniswapx/guides/createfiller',
          },
          {
            to: '/contracts/uniswapx/fillers/arbitrum/arbitrumfiller',
            from: '/contracts/uniswapx/guides/arbitrumfiller',
          },
          {
            to: '/contracts/uniswapx/fillers/mainnet/becomequoter',
            from: '/contracts/uniswapx/guides/becomequoter',
          },
          {
            to: '/contracts/uniswapx/fillers/priority/priorityorderreactor',
            from: '/contracts/uniswapx/guides/priorityorderreactor',
          },
          // Missing concept page redirects
          {
            to: '/concepts/protocol/concentrated-liquidity',
            from: '/concepts/protocol/liquidity',
          },
        ],
        createRedirects(existingPath) {
          // v3 Redirects
          if (existingPath.includes('/concepts/overview')) {
            return [existingPath.replace('/concepts/overview', '/protocol/introduction')]
          }
          if (existingPath.includes('/contracts/v3/reference')) {
            return [existingPath.replace('/contracts/v3/reference', '/protocol/reference')]
          }
          if (existingPath.includes('/contracts/v3/guides')) {
            return [existingPath.replace('/contracts/v3/guides', '/protocol/guides')]
          }
          // V2 Redirects
          if (existingPath.includes('/contracts/v2/reference')) {
            return [existingPath.replace('/contracts/v2/reference', '/protocol/V2/reference')]
          }
          if (existingPath.includes('/contracts/v2/guides')) {
            return [existingPath.replace('/contracts/v2/guides', '/protocol/V2/guides')]
          }
          // Permit2 Redirects
          if (existingPath.includes('/contracts/permit2')) {
            return [existingPath.replace('/contracts/permit2', '/protocol/permit2')]
          }
          // v3-sdk Redirects
          if (existingPath.includes('/sdk/v3/overview')) {
            return [existingPath.replace('/sdk/v3/overview', '/sdk/introduction')]
          }
          if (existingPath.includes('/sdk/v3/guides')) {
            return [existingPath.replace('/sdk/v3/guides', '/sdk/guides')]
          }
          // swap-widgets Redirects
          if (existingPath.includes('/sdk/swap-widget/overview')) {
            return [existingPath.replace('/sdk/swap-widget/overview', '/sdk/widgets/swap-widget')]
          }
          if (existingPath.includes('/sdk/swap-widget/reference/v2')) {
            return [existingPath.replace('/sdk/swap-widget/reference/v2', '/sdk/widgets/swap-widget/api')]
          }
          if (existingPath.includes('/concepts')) {
            return [existingPath.replace('/concepts', '/protocol/concepts')]
          }

          // Return a falsy value: no redirect created
          return undefined
        },
      },
    ],
    ['docusaurus-plugin-llms',
    {
      // Options here
      generateLLMsTxt: true,
      generateLLMsFullTxt: true,
      docsDir: 'docs',
      ignoreFiles: [
        'examples/*',
        'plugins/*',
        'scripts/*',
        'src/*',
        'static/*',
        'submodules/*',
        'CONTRIBUTING.md',
        '02-overview.mdx',
        'docs/api/subgraph/guides/v3-subgraph-example.md',
        'docs/archived',
        'docs/concepts',
        'docs/contracts/permit2',
        'docs/contracts/smart-wallet',
        'docs/contracts/uniswapx',
        'docs/contracts/universal-router',
        'docs/contracts/v1',
        'docs/contracts/v2',
        'docs/contracts/v3',
        'docs/sdk/core',
        'docs/sdk/swap-widget',
        'docs/sdk/v1',
        'docs/sdk/v2',
        'docs/sdk/v3',
        'docs/sdk/web3-react',
        'docs/universal-router-legacy',
      ],
      title: 'LLMs.txt for Uniswap v4 Documentation',
      description: 'Complete reference documentation for Uniswap v4',
      llmsTxtFilename: 'v4-llms.txt',
      llmsFullTxtFilename: 'v4-llms-full.txt',
      includeBlog: false,
      // Content cleaning options
      excludeImports: true,
      removeDuplicateHeadings: true,
      // Control documentation order
      includeOrder: [
        // 'docs/contracts/v4/*',
        // 'docs/sdk/v4/*',
        // 'docs/api/*',
      ],
      includeUnmatchedLast: true,
      // Path transformation options
      pathTransformation: {
        // Paths to ignore when constructing URLs (will be removed if found)
        ignorePaths: ['docs'],
        // Paths to add when constructing URLs (will be prepended if not already present)
        addPaths: [],
      },
      // Custom LLM files for specific documentation sections
      customLLMFiles: [
      ],
    }
    ]
  ],
}
export default config

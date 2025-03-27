const math = require('remark-math')
const katex = require('rehype-katex')
require('dotenv').config()

module.exports = {
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
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.png',
  organizationName: 'Uniswap', // Usually your GitHub org/user name.
  projectName: 'Uniswap-docs', // Usually your repo name.
  themeConfig: {
    image: 'img/twitter_card_bg.jpg',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: {
      apiKey: '32465e2ab6f7554ff014e64c0d92171c',
      indexName: 'v3-docs',
      appId: 'S0IDD0YGLZ',
    },
    navbar: {
      title: 'Uniswap Docs',
      logo: {
        alt: 'Uniswap Unicorn',
        src: 'img/uni_dark_icon.svg',
      },
      items: [
        {
          to: '/concepts/overview',
          label: 'Concepts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/contracts/v4/overview',
          label: 'Contracts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/sdk/v4/overview',
          label: 'SDKs',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/api/subgraph/overview',
          label: 'APIs',
          position: 'left',
          className: 'V3_active',
        },
        {
          label: 'Give Feedback',
          to: 'https://forms.gle/13XtjmkwdXQ2jMn26',
          position: 'right',
          className: 'persistent',
        },
        {
          label: 'Uniswap Foundation',
          to: 'https://www.uniswapfoundation.org/',
          position: 'right',
          className: 'persistent',
        },
        
        {
          to: 'https://app.uniswap.org/whitepaper-v4.pdf',
          label: 'Whitepaper',
          position: 'right',
          className: 'persistent',
        },
        {
          label: 'GitHub',
          to: 'https://github.com/Uniswap/docs/',
          position: 'right',
          className: 'persistent',
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Dev Chat',
              href: 'https://discord.com/invite/uniswap',
            },
            {
              label: 'Feedback',
              href: 'https://forms.gle/13XtjmkwdXQ2jMn26',
            },
            {
              label: 'Bug Bounty',
              href: 'https://blog.uniswap.org/v4-bug-bounty',
            },
            {
              label: 'Whitepaper',
              href: 'https://app.uniswap.org/whitepaper-v4.pdf',
            },
          ],
        },
        {
          title: 'GitHub',
          items: [
            {
              label: 'uniswap-v4-core',
              href: 'https://github.com/Uniswap/v4-core',
            },
            {
              label: 'uniswap-v4-sdk',
              href: 'https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk',
            },
            {
              label: 'uniswap-v4-periphery',
              href: 'https://github.com/Uniswap/v4-periphery',
            },
            {
              label: 'Deployment addresses',
              href: '/contracts/v4/deployments',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'App',
              href: 'https://app.uniswap.org/',
            },
            {
              label: 'Analytics',
              href: 'https://info.uniswap.org/home',
            },
            {
              label: 'Token Lists',
              href: 'https://tokenlists.org/',
            },
            {
              label: 'Brand Assets',
              href: 'https://github.com/Uniswap/brand-assets/raw/main/Uniswap%20Brand%20Assets.zip',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              href: 'https://blog.uniswap.org/',
            },
            {
              label: 'Governance',
              href: 'https://gov.uniswap.org/',
            },
            {
              label: 'Uniswap Labs Twitter',
              href: 'https://twitter.com/Uniswap',
            },
            {
              label: 'Uniswap Foundation Twitter',
              href: 'https://x.com/UniswapFND',
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/uniswap/uniswap-docs/tree/main/',
          includeCurrentVersion: true,
        },
        blog: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          path: 'blog/',
          blogTitle: 'Engineering Blog',
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
        },
      },
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
    ['@saucelabs/theme-github-codeblock', {}],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // 1/9/23 v3 SDK Guide Redirects
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
            from: '/sdk/v3/guides/creating-a-trade',
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
            to: '/contracts/v2/concepts/advanced-topics/fees',
            from: '/docs/v2/advanced-topics/fees/',
          },
          {
            to: '/contracts/v2/concepts/advanced-topics/fees',
            from: '/docs/v2/advanced-topics/understanding-',
          },
          {
            to: '/contracts/v2/concepts/advanced-topics/fees',
            from: '/docs/v2/advanced-topics/understanding-fees/',
          },
          {
            to: '/contracts/v2/concepts/core-concepts/oracles',
            from: '/docs/v2/core-concepts/oracles',
          },
          {
            to: '/sdk/v2/overview',
            from: '/docs/v2/SDK/getting-started/',
          },
          {
            to: 'https://blog.uniswap.org/uniswap-v3-dominance',
            from: '/TheDominanceofUniswapv3Liquidity',
          },
          {
            to: '/concepts/glossary',
            from: '/docs/v2/glossary/',
          },
          {
            to: '/contracts/v1/guides/custom-linking',
            from: '/docs/v1/frontend-integration/custom-linking/',
          },
          {
            to: 'https://app.uniswap.org/whitepaper-v4.pdf',
            from: '/whitepaper.eps',
          },
          {
            to: 'https://app.uniswap.org/whitepaper-v4.pdf',
            from: '/whitep',
          },
          {
            to: '/sdk/v3/guides/swaps/trading',
            from: '/sdk/guides/creating-a-trade',
          },
          {
            to: '/concepts/protocol/oracle',
            from: '/protocol/concepts/V3-overview/oracle?ref=hackernoon.com',
          },
          {
            to: '/sdk/web3-react/overview',
            from: '/sdk/web3-react/overview钱包集成https://web3auth.iohttps://walletconnect.comhttps://esemonday.notion.site/GISMA-Business-School-University-of-Applied-Sciences-17a97d40f91c4310ac113c3d3dd8b5f9DeFi',
          },
          {
            to: '/protocol/concepts/advanced/integration-issues',
            from: '/protocol/concepts/advanced/integration-issues',
          },
          {
            to: '/contracts/v4/guides/hooks/your-first-hook',
            from: '/contracts/v4/first-hook/building-your-own-hook',
          },
          {
            to: '/contracts/v2/guides/smart-contract-integration/using-flash-swaps',
            from: '/protocol/guides/flash-swaps',
          },
          {
            to: '/contracts/v4/guides/hooks/hook-deployment',
            from: '/contracts/v4/concepts/hook-deployment',
          },
          {
            to: '/contracts/v4/guides/hooks/hook-deployment',
            from: '/contracts/v4/first-hook/hook-deployment',
          },
          {
            to: '/contracts/v4/overview',
            from: '/contracts/v4/concepts/intro-to-v4',
          },
          {
            to: '/contracts/v3/guides/flash-integrations/flash-callback',
            from: '/guides/flash-callback',
          },
          {
            to: '/contracts/v2/concepts/advanced-topics/fees',
            from: '/contracts/v2/concepts/advanced-',
          },
          {
            to: '/sdk/v1/overview',
            from: '/sdk/1.0.0/reference/format',
          },
          {
            to: '/contracts/v4/quickstart/hooks/async-swap',
            from: '/contracts/v4/quickstart/hooks/NoOp',
          },
          {
            to: '/contracts/v2/overview',
            from: '/protocol/V2',
          },
          {
            to: '/contracts/v4/guides/custom-accounting#hook-fees-inv4',
            from: '/contracts/v4/guides/hooks/Volatility-fee-hook',
          },
          {
            to: '/sdk/v3/guides/swaps/routing',
            from: '/sdk/guides/auto-router/quick-start',
          },
          {
            to: '/api/subgraph/overview',
            from: '/protocol/reference/v3/guides/querying-data',
          }, 
          {
            to: '/sdk/web3-react/guides/connect-wallet',
            from: '/docs/wrappers/integrating-with-wallets',
          },
          {
            to: '/contracts/v4/quickstart/create-pool',
            from: '/sdk/guides/creating-a-pool',
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
  ],
}
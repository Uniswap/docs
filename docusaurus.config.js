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
  url: 'https://docs.uniswap.org/',
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
          to: '/contracts/v3/overview',
          label: 'Contracts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/sdk/v3/overview',
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
          label: 'Whitepaper',
          to: 'https://uniswap.org/whitepaper-v3.pdf',
          position: 'right',
          className: 'persistent',
        },
        {
          href: 'https://github.com/uniswap/uniswap-docs',
          label: 'GitHub',
          position: 'right',
          className: 'persistent',
        },
        {
          href: 'https://unigrants.org/',
          label: 'Grants',
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
              label: 'Feedback',
              href: 'https://forms.gle/13XtjmkwdXQ2jMn26',
            },
            {
              label: 'Bug Bounty',
              href: 'https://github.com/Uniswap/uniswap-v3-periphery/blob/main/bug-bounty.md',
            },
            {
              label: '#dev-chat',
              href: 'https://discord.gg/ybKVQUWb4s',
            },
            {
              label: 'Whitepaper',
              href: 'https://uniswap.org/whitepaper-v3.pdf',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'uniswap-v3-core',
              href: 'https://github.com/Uniswap/uniswap-v3-core',
            },
            {
              label: 'uniswap-v3-sdk',
              href: 'https://github.com/Uniswap/uniswap-v3-sdk',
            },
            {
              label: 'uniswap-v3-periphery',
              href: 'https://github.com/Uniswap/uniswap-v3-periphery',
            },
            {
              label: 'Deployment addresses',
              href: 'https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Home',
              href: 'https://uniswap.org/',
            },
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
              href: 'https://uniswap.org/Uniswap_brand_assets.zip',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Governance',
              href: 'https://gov.uniswap.org/',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/ybKVQUWb4s',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Uniswap',
            },
            {
              label: 'Blog',
              href: 'https://uniswap.org/blog/',
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
          id: 'contracts',
          path: 'docs/contracts',
          routeBasePath: 'contracts/',
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sdk',
        path: 'docs/sdk',
        routeBasePath: 'sdk',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        includeCurrentVersion: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'api/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        includeCurrentVersion: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'concepts',
        path: 'docs/concepts',
        routeBasePath: 'concepts/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        includeCurrentVersion: true,
      },
    ],
    {
      createRedirects(existingPath) {
        // V3 Redirects
        if (existingPath.includes('/protocol/introduction')) {
          return [existingPath.replace('/protocol/introduction', '/concepts/overview')]
        }
        if (existingPath.includes('/protocol/reference')) {
          return [existingPath.replace('/protocol/reference', 'contracts/v3/reference')]
        }
        if (existingPath.includes('/protocol/guides')) {
          return [existingPath.replace('/protocol/guides', 'contracts/v3/guides')]
        }
        // V2 Redirects
        if (existingPath.includes('/protocol/v2/reference')) {
          return [existingPath.replace('/protocol/v2/reference', 'contracts/v2/reference')]
        }
        if (existingPath.includes('/protocol/v2/guides')) {
          return [existingPath.replace('/protocol/v2/guides', 'contracts/v2/guides')]
        }
        // Permit2 Redirects
        if (existingPath.includes('/protocol/permit2')) {
          return [existingPath.replace('/contracts/permit2', 'contracts/permit2')]
        }
        // v3-sdk Redirects
        if (existingPath.includes(' /sdk/introduction')) {
          return [existingPath.replace('/sdk/introduction', '/sdk/v3/overview')]
        }
        if (existingPath.includes('/sdk/guides')) {
          return [existingPath.replace('/sdk/guides', 'sdk/v3/guides')]
        }
        // swap-widgets Redirects
        if (existingPath.includes('sdk/widgets/swap-widget')) {
          return [existingPath.replace('sdk/widgets/swap-widget', 'sdk/swap-widget/overview')]
        }
        if (existingPath.includes('/sdk/widgets/swap-widget/api')) {
          return [existingPath.replace('/sdk/widgets/swap-widget/api', '/sdk/swap-widget/reference/v2')]
        }

        // Return a falsy value: no redirect created
        return undefined
      },
    },
  ],
}

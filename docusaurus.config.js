module.exports = {
  title: 'Nifty League',
  tagline: 'Documentation and Guides',
  url: 'https://docs.niftyleague.com/',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.png',
  organizationName: 'NiftyLeague', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: [
      'af',
      'ar',
      'cs',
      'da',
      'nl',
      'en',
      'fi',
      'fr',
      'de',
      'el',
      'he',
      'hu',
      'id',
      'it',
      'ja',
      'ko',
      'no',
      'pl',
      'pt-BR',
      'ro',
      'ru',
      'sr',
      'es-ES',
      'sv-SE',
      'tr',
      'uk',
      'vi',
      'zh-CN',
    ],
  },
  themeConfig: {
    image: 'img/twitter_card_bg.png',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: {
      apiKey: '2c367ae53326c8a85e805323aee56a75',
      indexName: 'docs',
      appId: 'R1BEZXQES6',
    },
    navbar: {
      title: 'Nifty League Docs',
      logo: {
        alt: 'Nifty League Logo',
        src: 'img/nl_logo_black.svg',
      },
      items: [
        // {
        //   type: 'docsVersionDropdown',
        //   //// Optional
        //   position: 'left',
        //   dropdownActiveClassDisabled: true,
        //   docsPluginId: 'default',
        //   className: 'persistent',
        // },
        {
          to: '/docs/overview/intro',
          label: 'Overview',
          position: 'left',
          className: 'V1_active',
        },
        {
          to: '/docs/guides/set-up',
          label: 'Guides',
          position: 'left',
          className: 'V1_active',
        },
        {
          to: '/docs/faq/general',
          label: 'FAQ',
          position: 'left',
          className: 'V1_active',
        },
        // {
        //   to: 'https://niftyleague.com/whitepaper.pdf',
        //   label: 'Whitepaper',
        //   position: 'right',
        //   className: 'persistent',
        // },
        {
          href: 'https://niftyleague.com/',
          label: 'Website',
          position: 'right',
          className: 'persistent',
        },
        {
          href: 'https://github.com/NiftyLeague/docs',
          label: 'GitHub',
          position: 'right',
          className: 'persistent',
        },
        {
          href: 'https://discord.gg/niftyleague',
          label: 'Discord',
          position: 'right',
          className: 'persistent',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        //   className: 'persistent',
        // },
      ],
    },
    footer: {
      links: [
        {
          title: 'Official',
          items: [
            {
              label: 'Website',
              href: 'https://niftyleague.com',
            },
            {
              label: 'Feedback',
              href: 'https://feedback.niftyleague.com/',
            },
            {
              label: 'Subgraph',
              href: 'https://thegraph.com/explorer/subgraph?id=0x87e1237074760f57b424121edca06f082700dbc2-0&view=Overview',
            },
            {
              label: 'Nifty DAO Treasury',
              href: 'https://etherscan.io/address/0xd06ae6fb7eade890f3e295d69a6679380c9456c1',
            },
            // {
            //   label: 'Brand Assets',
            //   href: 'https://niftyleague.com/brand_assets.zip',
            // },
          ],
        },
        {
          title: 'NFTL',
          items: [
            {
              label: 'SushiSwap NFTL/ETH LP',
              href: 'https://analytics.sushi.com/pairs/0xf79321e80acd5fa590936f09acb90ec6471fcbc4',
            },
            {
              label: 'CoinGecko',
              href: 'https://www.coingecko.com/en/coins/nifty-league',
            },
            {
              label: 'CoinMarketCap',
              href: 'https://coinmarketcap.com/currencies/nifty-league',
            },
            {
              label: 'Etherscan Token Contract',
              href: 'https://etherscan.io/token/0x3c8D2FCE49906e11e71cB16Fa0fFeB2B16C29638',
            },
            {
              label: 'Dextools',
              href: 'https://www.dextools.io/app/ether/pair-explorer/0xf79321e80acd5fa590936f09acb90ec6471fcbc4',
            },
          ],
        },
        {
          title: 'NFTs',
          items: [
            {
              label: 'OpenSea - DEGENS',
              href: 'https://opensea.io/collection/niftydegen',
            },
            {
              label: 'OpenSea - COMICS',
              href: 'https://opensea.io/collection/nifty-league-launch-comics',
            },
            {
              label: 'nft20 DEGEN20 Pool',
              href: 'https://nft20.io/asset/0xe4b895820f163b957d166f5a8ccc444e1fac4ff3',
            },
            {
              label: 'NiftyDegen NFT Contract',
              href: 'https://etherscan.io/token/0x986aea67C7d6A15036e18678065eb663Fc5BE883',
            },
            {
              label: 'Nifty Launch Comics Contract',
              href: 'https://etherscan.io/address/0xBc8542e65ab801f7c9e3edd23238d37a2e3972d6',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/niftyleague',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/NiftyLeague',
            },
            {
              label: 'Twitch',
              href: 'https://www.twitch.tv/NiftyLeagueOfficial',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/NiftyLeague',
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

      // Dark/light switch icon options
      switchConfig: {
        // Icon for the switch while in dark mode
        darkIcon: '\u{263D}',

        // Unicode icons such as '\u2600' will work
        // Unicode with 5 chars require brackets: '\u{1F602}'
        lightIcon: '\u{263C}',
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/NiftyLeague/docs/tree/main/',
          includeCurrentVersion: false,
        },

        googleAnalytics: {
          trackingID: 'G-DKL8WWG236',
          anonymizeIP: true,
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
        },
      },
    ],
  ],
};

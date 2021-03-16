module.exports = {
  title: 'Uniswap',
  tagline: 'Documentation and Guides',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Uniswap', // Usually your GitHub org/user name.
  projectName: 'Uniswap-docs', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['solidity'],
    },
    navbar: {
      title: '/ Docs',
      logo: {
        alt: 'My Site Logo',
        src: 'img/union.svg',
      },
      items: [
        
        // {
        //   label: 'Version',
        //   position: 'right',
        //   items: [
        //     {
        //       label: 'V3',
        //       to: 'docs/V3/concepts/landing'
        //     },
        //     {
        //       label: 'V2',
        //       to: 'docs/V2/concepts'
        //     },
        //     {
        //       label: 'V1',
        //       to: 'docs/V1/concepts'
        //     }

        //   ]
        // },
        
        {
          href: 'https://github.com/uniswap/uniswap-docs',
          label: 'GitHub',
          position: 'right'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/uniswap',
            },
          ],
        },
      ],
      copyright: `unlicensed`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'versionthree',
          path: 'docs/V3',
          routeBasePath: '/',
          sidebarPath: require.resolve('./V3sidebars.js'),
          includeCurrentVersion: true,
          editUrl: 'https://github.com/uniswap/uniswap-docs',

        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    
    [
    '@docusaurus/plugin-content-docs',
    {
      id: 'versiontwo',
      path: 'docs/V2',
      routeBasePath: 'docs/V2',
      sidebarPath: require.resolve('./V2sidebars.js'),
    },
  ],
    [
    '@docusaurus/plugin-content-docs',
    {
      id: 'versionone',
      path: 'docs/V1',
      routeBasePath: 'docs/V1',
      sidebarPath: require.resolve('./V1sidebars.js'),
    },
  ],
 ],
};

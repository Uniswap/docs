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
    navbar: {
      title: 'Uniswap Documentation',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'doc',
        //   docId: 'landing',

        //   //// Optional
        //   position: 'left',
        //   label: 'Guides',
        //   activeSidebarClassName: 'navbar__link--active',
        //   docsPluginId: 'default',
        // },

        {
          to: 'docs/V3/concepts',
          label: 'Concepts',
          position: 'left',
          items: [
            {
              label: 'V3',
              href: '/docs/V3/concepts'
            },
            {
              label: 'V2',
              href: '/docs/V2/concepts'
            },
            {
              label: 'V1',
              href: '/docs/V1/concepts'
            }
          ]
        },
        {
          to: 'docs/V3/guides', 
          label: 'Guides', 
          position: 'left',
          items: [
            {
              label: 'V3',
              href: '/docs/V3/guides'
            },
            {
              label: 'V2',
              href: '/docs/V2/guides'
            },
            {
              label: 'V1',
              href: '/docs/V1/guides'
            }
          ]
        },
        {
          to: './reference',
          label: 'Reference',
          position: 'left',
          activeBasePath: 'docs',
          items: [
            {
              label: 'V3',
              href: '/docs/reference'
            },
            {
              label: 'V2',
              href: '/docs/V2/reference'
            },
            {
              label: 'V1',
              href: '/docs/V1/reference'
            }
          ]
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          docsPluginId: 'versionthree',
          // dropdownItemsAfter: [
          //   {
          //     to: '/docs_versions',
          //   },
          // ],
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          docsPluginId: 'versiontwo',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          docsPluginId: 'versionone',

        },
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
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
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
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
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
          routeBasePath: 'docs/V3',
          sidebarPath: require.resolve('./V3sidebars.js'),
          includeCurrentVersion: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
          //Version: 'v2',
          // lastVersion: 'current',
          // versions: {
            
          //   Example configuration: 
          //   'v3': {
          //     label: 'V3',
          //     path: '/',
          //   },
          //   'v2': {
          //     label: 'V2',
          //     path: '/',
          //   },
          //   'v1': {
          //     label: 'V1',
          //     path: '/',
          //   },
            
          // },
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

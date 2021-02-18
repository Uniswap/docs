module.exports = {
  title: 'My Site',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Uniswap Documentation',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'docsVersionDropdown',
        //   position: 'right',
        //   dropdownItemsBefore: [],
        //   dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],

        //   // Do not add the link active class when browsing docs.
        //   dropdownActiveClassDisabled: true,
        // },
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right'
        },
        {
          to: 'docs/guides', 
          activeBasePath: 'docs/guides',
          label: 'Guides', 
          position: 'left'
        },
        {
          to: 'docs/reference',
          activeBasePath: 'docs/reference',
          label: 'Reference',
          position: 'left'
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
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
          routeBasePath: '/docs',
        },
        // docs: {
        //   id: 'guides',
        //   path: 'guides',
        //   sidebarPath: require.resolve('./sidebars.js'),
        //   routeBasePath: '/docs/guides',
        // },

        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
  //   [
  //     '@docusaurus/plugin-content-docs',
  //   {
  //     id: 'guides',
  //     path: 'guides',
  //     routeBasePath: '/guides',
  //     sidebarPath: require.resolve('./sidebars.js'),
  //   },
  // ],
  //   [
  //     '@docusaurus/plugin-content-docs',
  //   {
  //     id: 'docs',
  //     path: 'docs',
  //     sidebarPath: require.resolve('./sidebars.js'),
  //     routeBasePath: '/docs',
  //   },
  // ],
 ],
};

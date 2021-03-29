module.exports = {
  title: "Uniswap",
  tagline: "Documentation and Guides",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "Uniswap", // Usually your GitHub org/user name.
  projectName: "Uniswap-docs", // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ["solidity"],
    },
    algolia: {
      apiKey: "32465e2ab6f7554ff014e64c0d92171c",
      indexName: "v3-docs",
      appId: "S0IDD0YGLZ"
    },
    navbar: {
      title: "Uniswap Documentation",
      logo: {
        alt: "Uniswap Unicorn",
        src: "img/uni_dark_icon.svg",
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
          label: "Concepts",
          to: "docs/v3/concepts",
          position: "right",
        },
        {
          label: "Guides",
          to: "docs/v3/concepts",
          position: "right",
        },
        {
          label: "References",
          to: "docs/v3/concepts",
          position: "right",
        },
        {
          href: "https://github.com/uniswap/uniswap-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    // footer: {
    //   style: "dark",
    //   links: [
    //     {
    //       title: "Ecosystem",
    //       items: [
    //         {
    //           label: "Home",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //         {
    //           label: "App",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //         {
    //           label: "Analytics",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Developers",
    //       items: [
    //         {
    //           label: "Whitepaper",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //         {
    //           label: "Audit",
    //           href: "https://twitter.com/docusaurus",
    //         },
    //         {
    //           label: "Bug Bounty",
    //           href: "https://twitter.com/docusaurus",
    //         },
    //         {
    //           label: "GitHub",
    //           href: "https://github.com/uniswap",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Community",
    //       items: [
    //         {
    //           label: "Discord",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //         {
    //           label: "Twitter",
    //           href: "https://twitter.com/docusaurus",
    //         },
    //         {
    //           label: "Reddit",
    //           href: "https://twitter.com/docusaurus",
    //         },
    //         {
    //           label: "Blog",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //       ],
    //     },
    //   ],
    //   // copyright: `unlicensed`,
    // },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          id: "versionthree",
          path: "docs/V3",
          routeBasePath: "/",
          sidebarPath: require.resolve("./V3sidebars.js"),
          includeCurrentVersion: true,
          editUrl: "https://github.com/uniswap/uniswap-docs",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
          customCss2: require.resolve("./src/css/colors.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "versiontwo",
        path: "docs/V2",
        routeBasePath: "docs/V2",
        sidebarPath: require.resolve("./V2sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "versionone",
        path: "docs/V1",
        routeBasePath: "docs/V1",
        sidebarPath: require.resolve("./V1sidebars.js"),
      },
    ],
  ],
};

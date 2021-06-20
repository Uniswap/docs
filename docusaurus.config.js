module.exports = {
  title: "Uniswap",
  tagline: "Documentation and Guides",
  url: "https://docs.uniswap.org/",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",
  favicon: "img/favicon.png",
  organizationName: "Uniswap", // Usually your GitHub org/user name.
  projectName: "Uniswap-docs", // Usually your repo name.
  themeConfig: {
    // hideableSidebar: true,
    prism: {
      additionalLanguages: ["solidity"],
    },
    algolia: {
      apiKey: "32465e2ab6f7554ff014e64c0d92171c",
      indexName: "v3-docs",
      appId: "S0IDD0YGLZ",
    },
    navbar: {
      title: "Uniswap Documentation",
      logo: {
        alt: "Uniswap Unicorn",
        src: "img/uni_dark_icon.svg",
      },
      items: [
        {
          label: "Protocol",
          position: "left",
          to: "/",
        },
        {
          label: "SDK",
          position: "left",
          to: "SDK/",
        },
        {
          label: "Whitepaper",
          to: "https://uniswap.org/whitepaper-v3.pdf",
          position: "right",
        },
        {
          href: "https://github.com/uniswap/uniswap-docs",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://github.com/Uniswap/uniswap-v3-sdk",
          label: "SDK",
          position: "right",
        },
        {
          type: 'docsVersionDropdown',

          //// Optional
          position: 'right',
          // Add additional dropdown items at the beginning/end of the dropdown.
          // dropdownItemsBefore: [],
          // dropdownItemsAfter: [{to: '/versions', label: 'V1'}],
          // Do not add the link active class when browsing docs.
          // dropdownActiveClassDisabled: false,
          docsPluginId: 'default',
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Ecosystem",
          items: [
            {
              label: "Home",
              href: "https://uniswap.org/",
            },
            {
              label: "App",
              href: "https://app.uniswap.org/",
            },
            {
              label: "Analytics",
              href: "https://info.uniswap.org/home",
            },
          ],
        },
        {
          title: "Developers",
          items: [
            {
              label: "Bug Bounty",
              href: "https://github.com/Uniswap/uniswap-v3-periphery/blob/main/bug-bounty.md",
            },
            {
              label: "GitHub | Protocol",
              href: "https://github.com/uniswap",
            },
            {
              label: "GitHub | SDK",
              href: "https://github.com/Uniswap/uniswap-v3-sdk",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Governance",
              href: "https://gov.uniswap.org/",
            },
            {
              label: "Discord",
              href: "https://discord.gg/FCfyBSbCU5",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/Uniswap",
            },
            {
              label: "Blog",
              href: "https://uniswap.org/blog/",
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs/V3",
          routeBasePath: "/",
          sidebarPath: require.resolve("./V3sidebars.js"),
          includeCurrentVersion: true,
          editUrl: "https://github.com/uniswap/uniswap-docs/tree/main/",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
          customCss2: require.resolve("./src/css/colors.css"),
        },
      },
    ],
  ],
  plugins: [
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "SDK",
    //     path: "SDK",
    //     routeBasePath: "/",
    //     sidebarPath: require.resolve("./sdkSidebar.js"),
    //   },
    // ],
  ],
  //   ],
  //   [
  //     "@docusaurus/plugin-content-docs",
  //     {
  //       id: "versionone",
  //       path: "docs/V1",
  //       routeBasePath: "docs/V1",
  //       sidebarPath: require.resolve("./V1sidebars.js"),
  //     },
  //   ],
  // ],
};

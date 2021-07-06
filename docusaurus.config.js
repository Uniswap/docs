module.exports = {
  title: "Uniswap",
  tagline: "Documentation and Guides",
  url: "https://docs.uniswap.org/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "ignore",
  favicon: "img/favicon.png",
  organizationName: "Uniswap", // Usually your GitHub org/user name.
  projectName: "Uniswap-docs", // Usually your repo name.
  themeConfig: {
    image: "img/twitter_card_bg.jpg",
    prism: {
      additionalLanguages: ["solidity"],
    },
    algolia: {
      apiKey: "32465e2ab6f7554ff014e64c0d92171c",
      indexName: "v3-docs",
      appId: "S0IDD0YGLZ",
    },
    navbar: {
      title: "Uniswap Docs",
      logo: {
        alt: "Uniswap Unicorn",
        src: "img/uni_dark_icon.svg",
      },
      items: [
        {
          type: "docsVersionDropdown",
          //// Optional
          position: "left",
          // Add additional dropdown items at the beginning/end of the dropdown.
          // dropdownItemsBefore: [],
          // dropdownItemsAfter: [{to: '/versions', label: 'V1'}],
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: false,
          docsPluginId: "default",
          className: "persistent",
        },
        {
          to: "/protocol/reference/smart-contracts",
          label: "Contracts",
          position: "left",
          className: "V3_active",
        },
        {
          to: "/sdk/landing",
          label: "SDK",
          position: "left",
          className: "V3_active",
        },
        {
          to: "/protocol/V2/guides/smart-contract-integration/01-quick-start",
          label: "Contracts",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/sdk/2.0.0/readme",
          label: "SDK",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/protocol/V2/reference/API/01-overview",
          label: "Subgraph (API)",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/protocol/V2/reference/Governance/05-governance-reference",
          label: "Governance",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/protocol/V1/guides/01-connect-to-uniswap",
          label: "Contracts",
          position: "left",
          className: "V1_active",
        },
        {
          to: "/sdk/1.0.0/readme",
          label: "SDK",
          position: "left",
          className: "V1_active",
        },
        {
          label: "Whitepaper",
          to: "https://uniswap.org/whitepaper-v3.pdf",
          position: "right",
          className: "persistent",
        },
        {
          href: "https://github.com/uniswap/uniswap-docs",
          label: "GitHub",
          position: "right",
          className: "persistent",
        },
        {
          href: "https://unigrants.org/",
          label: "Grants",
          position: "right",
          className: "persistent",
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
    colorMode: {
      // "light" | "dark"
      defaultMode: "dark",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,

      // Dark/light switch icon options
      switchConfig: {
        // Icon for the switch while in dark mode
        darkIcon: "\u{263D}",

        // CSS to apply to dark icon,
        // React inline style object
        // see https://reactjs.org/docs/dom-elements.html#style
        darkIconStyle: {
          marginLeft: "2px",
        },

        // Unicode icons such as '\u2600' will work
        // Unicode with 5 chars require brackets: '\u{1F602}'
        lightIcon: "\u{263C}",

        lightIconStyle: {
          marginLeft: "1px",
        },
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "protocol",
          routeBasePath: "protocol/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/uniswap/uniswap-docs/tree/main/",
          includeCurrentVersion: false,
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
        id: "SDK",
        path: "sdk",
        routeBasePath: "sdk/",
        sidebarPath: require.resolve("./sdkSidebars.js"),
        includeCurrentVersion: false,
      },
    ],
  ],
};

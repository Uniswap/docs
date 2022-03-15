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
          dropdownActiveClassDisabled: true,
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
          to: "/sdk/introduction",
          label: "SDK",
          position: "left",
          className: "V3_active",
        },
        {
          to: "/sdk/widgets/swap-widget",
          label: "Widgets",
          position: "left",
          className: "V3_active",
        },
        {
          to: "/sdk/subgraph/subgraph-data",
          label: "Subgraph (API)",
          position: "left",
          className: "V3_active",
        },
        {
          to: "/protocol/concepts/governance/overview",
          label: "Governance",
          position: "left",
          className: "V3_active",
        },
        {
          to: "/protocol/V2/guides/smart-contract-integration/quick-start",
          label: "Contracts",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/sdk/2.0.0/",
          label: "SDK",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/protocol/V2/reference/API/overview",
          label: "Subgraph (API)",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/protocol/concepts/governance/overview",
          label: "Governance",
          position: "left",
          className: "V2_active",
        },
        {
          to: "/protocol/V1/guides/connect-to-uniswap",
          label: "Contracts",
          position: "left",
          className: "V1_active",
        },
        {
          to: "/sdk/1.0.0/",
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
        {
          type: "localeDropdown",

          //// Optional
          position: "right",
          // Add additional dropdown items at the beginning/end of the dropdown.
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            {
              to: "https://my-site.com/help-us-translate",
              label: "Help us translate",
            },
          ],
        },
      ],
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: "Developers",
          items: [
            {
              label: "Bug Bounty",
              href: "https://github.com/Uniswap/uniswap-v3-periphery/blob/main/bug-bounty.md",
            },
            {
              label: "#dev-chat",
              href: "https://discord.gg/ybKVQUWb4s",
            },
            {
              label: "Whitepaper",
              href: "https://uniswap.org/whitepaper-v3.pdf",
            },
          ],
        },
        {
          title: "Github",
          items: [
            {
              label: "uniswap-v3-core",
              href: "https://github.com/Uniswap/uniswap-v3-core",
            },
            {
              label: "uniswap-v3-sdk",
              href: "https://github.com/Uniswap/uniswap-v3-sdk",
            },
            {
              label: "uniswap-v3-periphery",
              href: "https://github.com/Uniswap/uniswap-v3-periphery",
            },
            {
              label: "Deployment addresses",
              href: "https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md",
            },
          ],
        },
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
            {
              label: "Token Lists",
              href: "https://tokenlists.org/",
            },
            {
              label: "Brand Assets",
              href: "https://uniswap.org/Uniswap_brand_assets.zip",
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
              href: "https://discord.gg/ybKVQUWb4s",
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
          versions: {
            V3: {
              banner: "none",
            },
            V2: {
              banner: "none",
            },
            V1: {
              banner: "none",
            },
          },
        },
        googleAnalytics: {
          trackingID: "UA-128182339-7",
          anonymizeIP: true,
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
        versions: {
          "3.0.0": {
            banner: "none",
          },
          "2.0.0": {
            banner: "none",
          },
          "1.0.0": {
            banner: "none",
          },
        },
      },
    ],
  ],
};

module.exports = {
  
    docs: [
    {
      type: 'category',
      label:'Protocol Overview',
      items: [
        '01-protocol-overview/01-how-uniswap-works',
        '01-protocol-overview/02-ecosystem-participants',
        '01-protocol-overview/03-smart-contracts',
        '01-protocol-overview/04-glossary',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        '02-core-concepts/01-swaps',
        '02-core-concepts/02-pools',
        '02-core-concepts/03-flash-swaps',
        '02-core-concepts/04-oracles',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        '03-advanced-topics/01-fees',
        '03-advanced-topics/02-pricing',
        '03-advanced-topics/03-understanding-returns',
        '03-advanced-topics/04-security',
        '03-advanced-topics/05-math',
        '03-advanced-topics/06-research'
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        '11-governance/01-overview',
        '11-governance/02-process',
        '11-governance/03-guide-to-voting',
        '11-governance/04-glossary',
        '11-governance/05-adversarial-circumstances',
        '11-governance/06-governance-reference',
      ],
    },
  ],


  guides: [
    {
      type: 'category',
      label: 'Smart Contract Integration',
      items: [
        'guides/smart-contract-integration/01-quick-start',
        'guides/smart-contract-integration/02-trading-from-a-smart-contract',
        'guides/smart-contract-integration/03-providing-liquidity',
        'guides/smart-contract-integration/04-building-an-oracle',
        'guides/smart-contract-integration/05-using-flash-swaps',
        'guides/smart-contract-integration/06-getting-pair-addresses',
        'guides/smart-contract-integration/07-supporting-meta-transactions',
        
      ],
    },
    {
      type: 'category',
      label: 'Interface Integration',
      items: [
        'guides/interface-integration/01-using-the-api',
        'guides/interface-integration/02-custom-interface-linking',
        'guides/interface-integration/03-iframe-integration',
      ],
    },
    {
      type: 'category',
      label: 'Javascript SDK',
      items: [
        'guides/javascript-sdk/01-quick-start',
        'guides/javascript-sdk/02-fetching-data',
        'guides/javascript-sdk/03-pricing',
        'guides/javascript-sdk/04-trading',
        'guides/javascript-sdk/05-getting-pair-addresses',
      ],
    },
  ],

  reference: [
    {
      type: 'category',
      label: 'Smart Contracts',
      items: [
        'reference/smart-contracts/01-factory',
        'reference/smart-contracts/02-pair',
        'reference/smart-contracts/03-pair-erc-20',
        'reference/smart-contracts/04-library',
        'reference/smart-contracts/05-router01',
        'reference/smart-contracts/06-router02',
        'reference/smart-contracts/07-common-errors',
        
      ],
    },
    {
      type: 'category',
      label: 'SDK',
      items: [
        'reference/smart-contracts/01-factory',
        'reference/smart-contracts/02-pair',
        
      ],
    },
  ],

};
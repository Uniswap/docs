import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Discord from '@site/static/img/discord.svg'
import GitHub from '@site/static/img/github.svg'
import Npm from '@site/static/img/npm.svg'
import UGP from '@site/static/img/UGP.png'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import { TraceEvent } from '@uniswap/analytics'
import {
  BrowserEvent,
  DocsHomepageElementName as ElementName,
  DocsSectionName as SectionName,
  SharedEventName,
} from '@uniswap/analytics-events'
import { ArrowUpRight as LinkIcon, BookOpen, HelpCircle, Info, MessageCircle } from 'react-feather'

import SearchBarWithAnalytics from '../theme/SearchBar'

export const actions = [
  {
    title: 'What is Uniswap',
    icon: Info,
    to: '/concepts/overview',
    text: `Learn about the core concepts of the Uniswap Protocol, Swaps, Pools, Concentrated Liquidity and more.`,
  },
  {
    title: 'Integrate with Uniswap',
    icon: HelpCircle,
    to: '/sdk/v3/overview',
    text: `Learn how to integrate with Uniswap by building a dApp through guided examples.`,
  },
  {
    title: 'The Uniswap smart contracts',
    icon: BookOpen,
    to: '/contracts/v3/overview',
    text: `Learn about the architecture of the Uniswap Protocol smart contracts through guided examples.`,
  },
]

export const developerLinks = [
  {
    title: 'uniswap-v3-core',
    href: 'https://github.com/Uniswap/uniswap-v3-core',
    icon: GitHub,
  },
  {
    title: 'uniswap-v3-sdk',
    href: 'https://github.com/Uniswap/uniswap-v3-sdk',
    icon: GitHub,
  },
  {
    title: 'uniswap-v3-periphery',
    href: 'https://github.com/Uniswap/uniswap-v3-periphery',
    icon: GitHub,
  },
  {
    title: 'Deployment addresses',
    href: 'https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md',
    icon: GitHub,
  },
  {
    title: 'widgets',
    href: 'https://www.npmjs.com/package/@uniswap/widgets',
    icon: Npm,
  },
]

export const dAppGuides = [
  {
    title: 'Fetch token prices',
    text: 'Fetch the price of tokens in a specific Pool',
    to: 'sdk/v3/guides/swaps/quoting',
  },
  {
    title: 'Create a Trade',
    text: 'Fetch a Quote for a Trade and execute the Trade',
    to: '/sdk/v3/guides/swaps/trading',
  },
  {
    title: 'Route trades',
    text: 'Use Routing to get optimized prices for your Trades',
    to: '/sdk/v3/guides/swaps/routing',
  },
  {
    title: 'Provide liquidity',
    text: "Contribute to a Pool's liquidity by using tokens to earn fees",
    to: '/sdk/v3/guides/liquidity/minting',
  },
  {
    title: 'UI Component',
    text: 'Integrate with the Swap Widget, a React component that works out of the box ',
    to: '/sdk/swap-widget/overview',
  },
]
export const smartContractGuides = [
  {
    title: 'Setup your environment',
    text: 'Prepare your local environment by installing the required dependencies',
    to: '/contracts/v3/guides/local-environment',
  },
  {
    title: 'Implement a Swap',
    text: 'Start swapping from a smart contract in Solidity',
    to: '/contracts/v3/guides/swaps/single-swaps',
  },
  {
    title: 'Provide Liquidity',
    text: 'Provide liquidity from a smart contract in Solidity',
    to: '/contracts/v3/guides/providing-liquidity/setting-up',
  },
  {
    title: 'Mine Liquidity',
    text: 'Start Mining liquidity from a smart contract in Solidity',
    to: '/contracts/v3/guides/liquidity-mining/overview',
  },
  {
    title: 'Implement Flash Swaps',
    text: 'Implement Flash Swaps from a smart contract in Solidity',
    to: '/contracts/v3/guides/flash-integrations/inheritance-constructors',
  },
]

export default function Home() {
  // return (
  //   <div>
  //     <p className="!serif-heading-0">Build with Uniswap</p>
  //     <p className="!body-2">
  //       Dive into the world of DeFi apps, integrations, and developer tooling built on top of the Uniswap Protocol.
  //     </p>
  //     <p className="!caption-1">Whereas disregard and contempt for human rights have resulted</p>
  //   </div>
  // )
  return (
    <Layout title={`Uniswap Docs`} description="Technical Documentation For The Uniswap Protocol">
      <div>
        <div>
          <div>
            <h1 > Welcome to Uniswap Docs</h1>
            <div>
              <SearchBarWithAnalytics />
            </div>
          </div>
          {/* <StyledTitleImage
            sources={{
              light: useBaseUrl('/img/grow.png'),
              dark: useBaseUrl('/img/grow2.png'),
            }}
          /> */}
          <div>
            {actions.map((action) => (
              <TraceEvent
                key={action.to}
                element={action.to}
                events={[BrowserEvent.onClick]}
                name={SharedEventName.PAGE_CLICKED}
                section={SectionName.WELCOME_LINKS}
              >
                <Link to={action.to}>
                  <div key={action.title}>
                    <div>
                      <div>
                        <action.icon style={{ width: '24px' }} />
                      </div>
                      <div>
                        <LinkIcon />
                      </div>
                    </div>
                    <h3 >{action.title}</h3>
                    <p >{action.text}</p>
                  </div>
                </Link>
              </TraceEvent>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h2>Integrate your dApp</h2>
            <p>Explore these guided tutorials to get started integrating with Uniswap in your dApp.</p>
            <div>
              {dAppGuides.map((action) => (
                <TraceEvent
                  key={action.to}
                  element={action.to}
                  events={[BrowserEvent.onClick]}
                  name={SharedEventName.PAGE_CLICKED}
                  section={SectionName.DAPP_LINKS}
                >
                  <Link  key={action.title} to={action.to}>
                    <div key={action.title} >
                      <div>
                        <div>
                          <h3 >{action.title}</h3>
                        </div>
                        <div>
                          <LinkIcon />
                        </div>
                      </div>
                      <p>{action.text}</p>
                    </div>
                  </Link>
                </TraceEvent>
              ))}
            </div>
          </div>
          <div>
            <h2>Integrate your smart contracts</h2>
            <p>Explore these guided tutorials to get started integrating with Uniswap in your smart contracts.</p>
            <div>
              {smartContractGuides.map((action) => (
                <TraceEvent
                  key={action.to}
                  element={action.to}
                  events={[BrowserEvent.onClick]}
                  name={SharedEventName.PAGE_CLICKED}
                  section={SectionName.SMART_CONTRACT_LINKS}
                >
                  <Link key={action.title} to={action.to}>
                    <div key={action.title}>
                      <div>
                        <div>
                          <h3>{action.title}</h3>
                        </div>
                        <div>
                          <LinkIcon />
                        </div>
                      </div>
                      <p>{action.text}</p>
                    </div>
                  </Link>
                </TraceEvent>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div>
          {/* <StyledImage
            style={{ maxHeight: '400px' }}
            sources={{
              light: useBaseUrl('/img/use.png'),
              dark: useBaseUrl('/img/use2.png'),
            }}
          /> */}
          <div>
            <h2>Developer Links</h2>
            {developerLinks.map((action) => (
              <TraceEvent
                key={action.href}
                element={action.href}
                name={SharedEventName.PAGE_CLICKED}
                events={[BrowserEvent.onClick]}
                section={SectionName.DEVELOPER_LINKS}
              >
                <Link key={action.href} to={action.href}>
                  <div key={action.href} style={{ marginBottom: '0.5rem' }}>
                    <div>
                      <div>
                        <div>
                          <div>
                            <action.icon />
                          </div>
                        </div>
                        {action.title}
                      </div>
                      <div>
                        <LinkIcon />
                      </div>
                    </div>
                  </div>
                </Link>
              </TraceEvent>
            ))}
          </div>
        </div>
        <hr />
        <div>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            element={ElementName.DISCORD}
            section={SectionName.BOTTOM_MENU_LINKS}
            name={SharedEventName.PAGE_CLICKED}
          >
            <Link href={'https://discord.gg/ybKVQUWb4s'}>
              <div>
                <Discord />
                <div>
                  <h3>Discord</h3>
                  <p>Join our Developer Community.</p>
                </div>
              </div>
            </Link>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            element={ElementName.GRANTS}
            section={SectionName.BOTTOM_MENU_LINKS}
            name={SharedEventName.PAGE_CLICKED}
          >
            <Link href={'https://gov.uniswap.org/'}>
              <div>
                <MessageCircle />
                <div>
                  <h3>Forum</h3>
                  <p>Discuss governance and more.</p>
                </div>
              </div>
            </Link>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            section={SectionName.BOTTOM_MENU_LINKS}
            element={ElementName.GITHUB}
            name={SharedEventName.PAGE_CLICKED}
          >
            <Link href={'https://github.com/Uniswap'}>
              <div>
                <div>
                  <GitHub />
                </div>
                <div>
                  <h3>GitHub</h3>
                  <p>View all Uniswap repositories.</p>
                </div>
              </div>
            </Link>
          </TraceEvent>
        </div>
        <Link href={'https://unigrants.org/'}>
          <div>
            <img src={UGP} width={'120px'} />
            <div>
              <h2>Uniswap Grants Program</h2>
              <p>
                Uniswap Governance offers grant funding for people who are building apps, tools, and activities for
                Uniswap Protocol users, builders, and community members.{' '}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

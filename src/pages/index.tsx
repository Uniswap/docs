import './styles.module.css'

import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styled from '@emotion/styled'
import {
  BookOpenIcon,
  ChatIcon,
  CodeIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
import Discord from '@site/static/img/discord.svg'
import UGP from '@site/static/img/UGP.png'
import Layout from '@theme/Layout'
import ThemedImage from '@theme/ThemedImage'
import { TraceEvent } from '@uniswap/analytics'
import {
  BrowserEvent,
  DocsHomepageElementName as ElementName,
  DocsSectionName as SectionName,
  EventName,
} from '@uniswap/analytics-events'
import React from 'react'

import SearchBarWithAnalytics from '../theme/SearchBar'

export const actions = [
  {
    title: 'What is Uniswap',
    href: '#',
    icon: InformationCircleIcon,
    to: './concepts/overview',
    text: `Learn about the core concepts of the Uniswap Protocol. Swaps, Pools, Concentrated Liquidity and more.`,
    name: ElementName.WHAT_IS_UNISWAP,
  },
  {
    title: 'Integrate with Uniswap',
    href: '#',
    icon: QuestionMarkCircleIcon,
    to: './sdk/v3/overview',
    text: `Learn how to integrate with Uniswap through guided examples to power your dApp.`,
    name: ElementName.V3_SDK,
  },
  {
    title: 'The Uniswap smart contracts',
    href: '#',
    icon: BookOpenIcon,
    to: './contracts/v3/overview',
    text: `Learn about the architecture of the Uniswap Protocol smart contracts through guided examples.`,
    name: ElementName.SMART_CONTRACT_OVERVIEW,
  },
]

export const github = [
  {
    title: 'uniswap-v3-core',
    href: 'https://github.com/Uniswap/uniswap-v3-core',
    icon: CodeIcon,
    name: ElementName.V3_CORE,
  },
  {
    title: 'uniswap-v3-sdk',
    href: 'https://github.com/Uniswap/uniswap-v3-sdk',
    icon: CodeIcon,
    name: ElementName.V3_SDK,
  },
  {
    title: 'uniswap-v3-periphery',
    href: 'https://github.com/Uniswap/uniswap-v3-periphery',
    icon: CodeIcon,
    name: ElementName.V3_PERIPHERY,
  },
  {
    title: 'Deployment addresses',
    href: 'https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md',
    name: ElementName.V3_CONTRACT_ADDRESS,
  },
  {
    title: '@uniswap/widgets',
    href: 'https://www.npmjs.com/package/@uniswap/widgets',
    icon: CodeIcon,
    name: ElementName.V3_WIDGETS,
  },
]

export const guides = [
  {
    title: 'SDK Quick Start',
    text: 'Integrate with the Uniswap Protocol using JavaScript',
    to: './sdk/v3/guides/quick-start',
    name: ElementName.SDK_QUICK_START,
  },
  {
    title: 'Implementing a Swap',
    text: 'Start swapping from a smart contract in Solidity',
    to: './contracts/v3/guides/swaps/single-swaps',
    name: ElementName.IMPLEMENT_SWAP,
  },
  {
    title: 'Embedding a Swap Widget',
    text: 'Let your users trade tokens without leaving your dApp',
    to: './sdk/swap-widget/overview',
    name: ElementName.EMBED_SWAP_WIDGET,
  },
  {
    title: 'Providing Liquidity',
    text: 'Provide liquidity from a smart contract in Solidity',
    to: './contracts/v3/guides/providing-liquidity/setting-up',
    name: ElementName.PROVIDE_LIQUIDITY,
  },
  {
    title: 'Building an Oracle',
    text: 'Learn how Uniswap v3 pools can serve as oracles',
    to: './concepts/protocol/oracle',
    name: ElementName.BUILD_ORACLE,
  },
]

export const quickLinks = [
  {
    title: 'Smart Contracts',
    text: 'Start swapping from a smart contract',
    to: './contracts/v3/overview',
    name: ElementName.SMART_CONTRACTS,
  },
  {
    title: 'SDK',
    text: 'Start swapping from a smart contract',
    to: './sdk/v3/overview',
    name: ElementName.SDK,
  },
  {
    title: 'Swap Widget',
    text: 'Get started with the swap widget',
    to: './sdk/swap-widget/overview',
    name: ElementName.WIDGETS,
  },
  {
    title: 'Whitepaper',
    text: 'Read the Uniswap V3 whitepaper',
    to: 'https://uniswap.org/whitepaper-v3.pdf',
    name: ElementName.WHITEPAPER,
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 960px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    max-width: 100%;
    margin: 0 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TwoRow = styled(Row)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 48px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);
  /* flex: 1 1 0px; */

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`

const CenterCard = styled(Card)`
  min-width: 250px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0px;
  }
`

const ShadowCard = styled(Card)`
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff10;
  backdrop-filter: blur(10px);
  min-height: 200px;
  /* background-color: var(--ifm-color-emphasis-0); */
`

const WideCard = styled(ShadowCard)`
  max-height: auto;

  @media (max-width: 960px) {
    margin: 0 2rem;
    max-height: fit-content;
    width: fit-content;
  }
`

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`

const TopSection = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const LinkRow = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  a h3 {
    color: black !important;
  }
`

const DocsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
`

const StyledImage = styled(ThemedImage)`
  position: relative;
  z-index: -1;
  width: 100%;
  object-fit: cover;
`

const StyledTitleImage = styled(StyledImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  position: absolute;
  opacity: 0.2;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`

const StyledGithubIcon = styled.div`
  svg {
    fill: var(--ifm-font-color-base);
  }
`

const HideMedium = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`

export default function Home() {
  return (
    <Layout title={`Uniswap Docs`} description="Technical Documentation For The Uniswap Protocol">
      <Container>
        <DocsHeader>
          <div
            style={{
              padding: '4rem 0  ',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontWeight: 600 }}> Welcome to the Uniswap Docs</h1>
            <HideMedium>
              <SearchBarWithAnalytics />
            </HideMedium>
          </div>
          <StyledTitleImage
            alt="Docusaurus themed image"
            sources={{
              light: useBaseUrl('/img/grow.png'),
              dark: useBaseUrl('/img/grow2.png'),
            }}
          />
          <Row>
            {actions.map((action) => (
              <TraceEvent
                key={action.name}
                element={action.name}
                events={[BrowserEvent.onClick]}
                name={EventName.PAGE_CLICKED}
                section={SectionName.WELCOME_LINKS}
              >
                <Link style={{ textDecoration: 'none' }} to={action.to}>
                  <ShadowCard key={action.title}>
                    <TopSection>
                      <IconWrapper>
                        <action.icon style={{ width: '24px' }} />
                      </IconWrapper>
                      <svg
                        style={{ width: '24px', opacity: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </TopSection>
                    <h3 style={{ marginBottom: '.75rem', fontWeight: 500 }}>{action.title}</h3>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 300 }}>{action.text}</p>
                  </ShadowCard>
                </Link>
              </TraceEvent>
            ))}
          </Row>
        </DocsHeader>
        <TwoRow
          style={{
            gap: '56px',
            marginTop: '4rem',
          }}
        >
          <div>
            <h2>Getting Started</h2>
            <p>
              Explore these docs to get started integrating the Uniswap Protocol in your dApp, smart contract or
              project.
            </p>
            <div>
              {guides.map((action) => (
                <TraceEvent
                  key={action.name}
                  element={action.name}
                  events={[BrowserEvent.onClick]}
                  name={EventName.PAGE_CLICKED}
                  section={SectionName.DEVELOPER_LINKS}
                >
                  <Link style={{ textDecoration: 'none' }} key={action.title} to={action.to}>
                    <Card key={action.title} style={{ marginBottom: '1rem' }}>
                      <LinkRow>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ marginBottom: '0rem' }}>{action.title}</h3>
                        </div>
                        <svg
                          style={{ width: '24px', opacity: 0.2 }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                      </LinkRow>
                      <p style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.text}</p>
                    </Card>
                  </Link>
                </TraceEvent>
              ))}
            </div>
          </div>
          <div>
            <h2>Developer Links</h2>
            <p>The Uniswap codebase is comprised of an ecosystem of open source components.</p>
            {github.map((action) => (
              <TraceEvent
                key={action.name}
                name={EventName.PAGE_CLICKED}
                element={action.name}
                events={[BrowserEvent.onClick]}
                section={SectionName.GITHUB_LINKS}
              >
                <Link style={{ textDecoration: 'none' }} href={action.href}>
                  <Card key={action.title} style={{ marginBottom: '1rem' }}>
                    <LinkRow>
                      <StyledGithubIcon style={{ display: 'flex', alignItems: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.78 117.79" style={{ width: '24px' }}>
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                              <path
                                className="cls-1"
                                d="M60.39,0A60.39,60.39,0,0,0,41.3,117.69c3,.56,4.12-1.31,4.12-2.91,0-1.44-.05-6.19-.08-11.24C28.54,107.19,25,96.42,25,96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67,6.07.43,9.26,6.22,9.26,6.22,5.39,9.23,14.13,6.57,17.57,5,.55-3.9,2.11-6.56,3.84-8.07C36,85.55,21.85,80.37,21.85,57.23A23.35,23.35,0,0,1,28.08,41c-.63-1.52-2.7-7.66.58-16,0,0,5.07-1.62,16.61,6.19a57.36,57.36,0,0,1,30.25,0C87,23.42,92.11,25,92.11,25c3.28,8.32,1.22,14.46.59,16a23.34,23.34,0,0,1,6.21,16.21c0,23.2-14.12,28.3-27.57,29.8,2.16,1.87,4.09,5.55,4.09,11.18,0,8.08-.06,14.59-.06,16.57,0,1.61,1.08,3.49,4.14,2.9A60.39,60.39,0,0,0,60.39,0Z"
                              />
                              <path
                                className="cls-2"
                                d="M22.87,86.7c-.13.3-.6.39-1,.19s-.69-.61-.55-.91.61-.39,1-.19.69.61.54.91Z"
                              />
                              <path
                                className="cls-2"
                                d="M25.32,89.43c-.29.27-.85.14-1.24-.28a.92.92,0,0,1-.17-1.25c.3-.27.84-.14,1.24.28s.47,1,.17,1.25Z"
                              />
                              <path
                                className="cls-2"
                                d="M27.7,92.91c-.37.26-1,0-1.35-.52s-.37-1.18,0-1.44,1,0,1.35.51.37,1.19,0,1.45Z"
                              />
                              <path
                                className="cls-2"
                                d="M31,96.27A1.13,1.13,0,0,1,29.41,96c-.53-.49-.68-1.18-.34-1.54s1-.27,1.56.23.68,1.18.33,1.54Z"
                              />
                              <path
                                className="cls-2"
                                d="M35.46,98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7,1.51-.49,1.13.76,1,1.24Z"
                              />
                              <path
                                className="cls-2"
                                d="M40.4,98.58c0,.5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91,1.29-.92,1.3.39,1.3.88Z"
                              />
                              <path
                                className="cls-2"
                                d="M45,97.8c.09.49-.41,1-1.12,1.12s-1.35-.17-1.44-.66.42-1,1.12-1.12,1.35.17,1.44.66Z"
                              />
                            </g>
                          </g>
                        </svg>
                        <h3 style={{ marginBottom: '0rem', marginLeft: '16px', fontWeight: 350 }}>{action.title}</h3>
                      </StyledGithubIcon>
                      <svg
                        style={{ width: '24px', height: '24px', opacity: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </LinkRow>
                  </Card>
                </Link>
              </TraceEvent>
            ))}
          </div>
        </TwoRow>
        <hr />
        <TwoRow
          style={{
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <StyledImage
            style={{ maxHeight: '400px' }}
            sources={{
              light: useBaseUrl('/img/use.png'),
              dark: useBaseUrl('/img/use2.png'),
            }}
          />
          <div>
            <h2>Quick Links</h2>
            {quickLinks.map((action) => (
              <TraceEvent
                key={action.name}
                name={EventName.MENU_CLICKED}
                element={action.name}
                events={[BrowserEvent.onClick]}
                section={SectionName.QUICK_LINKS}
              >
                <Link style={{}} to={action.to}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3 style={{ marginBottom: '0rem', fontWeight: 300 }}>{action.title}</h3>
                    <svg
                      style={{ width: '16px', opacity: 0.2 }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </div>
                </Link>
              </TraceEvent>
            ))}
          </div>
        </TwoRow>

        <hr />

        <Row>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            element={ElementName.DISCORD}
            section={SectionName.BOTTOM_MENU_LINKS}
            name={EventName.PAGE_CLICKED}
          >
            <Link style={{ textDecoration: 'none' }} href={'https://discord.gg/ybKVQUWb4s'}>
              <CenterCard>
                <Discord style={{ width: '48px', height: '48px' }} />
                <div>
                  <h3>Discord</h3>
                  <p>Hop in to the #dev-chat to get realtime help.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            element={ElementName.GRANTS}
            section={SectionName.BOTTOM_MENU_LINKS}
            name={EventName.PAGE_CLICKED}
          >
            <Link style={{ textDecoration: 'none' }} href={'https://gov.uniswap.org/'}>
              <CenterCard>
                <ChatIcon style={{ width: '48px', height: '48px' }} />
                <div>
                  <h3>Forum</h3>
                  <p>Discuss governance and more.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            section={SectionName.BOTTOM_MENU_LINKS}
            element={ElementName.GITHUB}
            name={EventName.PAGE_CLICKED}
          >
            <Link style={{ textDecoration: 'none' }} href={'https://github.com/Uniswap'}>
              <CenterCard>
                <StyledGithubIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.78 117.79" style={{ width: '48px' }}>
                    <defs></defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          className="cls-1"
                          d="M60.39,0A60.39,60.39,0,0,0,41.3,117.69c3,.56,4.12-1.31,4.12-2.91,0-1.44-.05-6.19-.08-11.24C28.54,107.19,25,96.42,25,96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67,6.07.43,9.26,6.22,9.26,6.22,5.39,9.23,14.13,6.57,17.57,5,.55-3.9,2.11-6.56,3.84-8.07C36,85.55,21.85,80.37,21.85,57.23A23.35,23.35,0,0,1,28.08,41c-.63-1.52-2.7-7.66.58-16,0,0,5.07-1.62,16.61,6.19a57.36,57.36,0,0,1,30.25,0C87,23.42,92.11,25,92.11,25c3.28,8.32,1.22,14.46.59,16a23.34,23.34,0,0,1,6.21,16.21c0,23.2-14.12,28.3-27.57,29.8,2.16,1.87,4.09,5.55,4.09,11.18,0,8.08-.06,14.59-.06,16.57,0,1.61,1.08,3.49,4.14,2.9A60.39,60.39,0,0,0,60.39,0Z"
                        />
                        <path
                          className="cls-2"
                          d="M22.87,86.7c-.13.3-.6.39-1,.19s-.69-.61-.55-.91.61-.39,1-.19.69.61.54.91Z"
                        />
                        <path
                          className="cls-2"
                          d="M25.32,89.43c-.29.27-.85.14-1.24-.28a.92.92,0,0,1-.17-1.25c.3-.27.84-.14,1.24.28s.47,1,.17,1.25Z"
                        />
                        <path
                          className="cls-2"
                          d="M27.7,92.91c-.37.26-1,0-1.35-.52s-.37-1.18,0-1.44,1,0,1.35.51.37,1.19,0,1.45Z"
                        />
                        <path
                          className="cls-2"
                          d="M31,96.27A1.13,1.13,0,0,1,29.41,96c-.53-.49-.68-1.18-.34-1.54s1-.27,1.56.23.68,1.18.33,1.54Z"
                        />
                        <path
                          className="cls-2"
                          d="M35.46,98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7,1.51-.49,1.13.76,1,1.24Z"
                        />
                        <path
                          className="cls-2"
                          d="M40.4,98.58c0,.5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91,1.29-.92,1.3.39,1.3.88Z"
                        />
                        <path
                          className="cls-2"
                          d="M45,97.8c.09.49-.41,1-1.12,1.12s-1.35-.17-1.44-.66.42-1,1.12-1.12,1.35.17,1.44.66Z"
                        />
                      </g>
                    </g>
                  </svg>{' '}
                </StyledGithubIcon>
                <div>
                  <h3>GitHub</h3>
                  <p>View all Uniswap repositories.</p>
                </div>
              </CenterCard>
            </Link>
          </TraceEvent>
        </Row>
        <Link
          style={{
            textDecoration: 'none',
            maxWidth: '960px',
            margin: '0 auto 4rem auto',
            width: '100%',
          }}
          href={'https://unigrants.org/'}
        >
          <WideCard
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            <img src={UGP} width={'120px'} />
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Uniswap Grants Program</h2>
              <p style={{ margin: '0rem' }}>
                Uniswap Governance offers grant funding for people who are building apps, tools, and activities for
                Uniswap Protocol users, builders, and community members.{' '}
              </p>
            </div>
          </WideCard>
        </Link>
      </Container>
    </Layout>
  )
}

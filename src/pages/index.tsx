import React, { FC } from 'react'

import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import cn from 'classnames'
// eslint-disable-next-line
const UPG = require('../../static/img/UGP.png').default

import {
  Emblem1,
  Emblem2,
  ThickX,
  Hexagon,
  BookOpen,
  ArrowRight,
  Github,
  Npm,
  HelpCircle,
  Chat,
  Globe,
} from '../components/Icons'
import NewsletterForm from '../components/NewsletterForm'

export const actions = [
  {
    title: 'What is Uniswap?',
    icon: 'book-open',
    to: '/concepts/overview',
    text: 'Learn about the core concepts of the Uniswap Protocol, Swaps, Pools, Liquidity, and more.',
    color: 'pink',
  },
  {
    title: 'Troubleshoot an issue',
    icon: 'x',
    to: '/sdk/v3/overview',
    text: 'Learn how to troubleshoot an issue.',
    color: 'blue',
  },
  {
    title: 'How to use Uniswap',
    icon: 'hexagon',
    to: '/contracts/v3/overview',
    text: 'Learn how to integrate with Uniswap by building a dApp.',
    color: 'green',
  },
]

export const developerLinks = [
  {
    title: 'uniswap-v3-core',
    href: 'https://github.com/Uniswap/uniswap-v3-core',
    icon: 'github',
  },
  {
    title: 'uniswap-v3-sdk',
    href: 'https://github.com/Uniswap/uniswap-v3-sdk',
    icon: 'github',
  },
  {
    title: 'uniswap-v3-periphery',
    href: 'https://github.com/Uniswap/uniswap-v3-periphery',
    icon: 'github',
  },
  {
    title: 'Deployment addresses',
    href: 'https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md',
    icon: 'github',
  },
  {
    title: 'widgets',
    href: 'https://www.npmjs.com/package/@uniswap/widgets',
    icon: 'npm',
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

const connectBlock = {
  title: 'Connect with us',
  supportTitle: 'Get Support',
  supportButton: {
    url: 'https://help.uniswap.org/',
    name: 'Help center',
  },
  socialTitle: 'Insights and news from the team',
  socialButton: {
    url: 'https://blog.uniswap.org/',
    name: 'Help center',
  },
  newsletterTitle: 'Sign up for research and updates from the Uniswap Labs team',
}

const Home = () => {
  return (
    <Layout title="Uniswap Docs" description="Technical Documentation For The Uniswap Protocol">
      <div className="content-page-padding w-full flex flex-col">
        <div className="w-full flex flex-col items-center px-6 py-20 sm:py-16 rounded-large bg-light-surface-2 dark:bg-dark-surface-2">
          <h1 className="text-center serif-heading-0 text-light-neutral-1 dark:text-dark-neutral-1 flex flex-row items-center flex-wrap justify-center">
            <span>Build</span>
            <Emblem1 className="mx-2" />
            <span>with</span>
            <Emblem2 className="mx-2" />
            <span>Uniswap</span>
          </h1>
          <p className="mt-2 text-center subheading-2 text-light-neutral-2 dark:text-dark-neutral-2">
            Dive into the world of DeFi apps, integrations, and developer tooling built on top of the Uniswap Protocol.
          </p>
        </div>

        <div className="default-grid py-padding-x-large">
          {actions.map((action, i) => {
            return (
              <Link
                key={action.title}
                to={action.to}
                className={cn('col-span-full rounded-medium p-padding-medium', {
                  'md:col-span-4': i === 0,
                  'sm:col-span-4 md:col-span-2': i > 0,
                  'bg-light-accent-2 dark:bg-dark-accent-2': action.color === 'pink',
                  'bg-light-blue dark:bg-dark-blue': action.color === 'blue',
                  'bg-light-green dark:bg-dark-green': action.color === 'green',
                })}
              >
                <div>
                  <div className="mb-8 flex">
                    {action.icon === 'book-open' ? (
                      <div className="flex flex-row items-center py-2 px-3 bg-light-surface-1 dark:bg-dark-surface-1 rounded-small">
                        <BookOpen />
                        <span className="ml-1 button-label-4 text-light-accent-1 dark:text-dark-accent-1">
                          Getting started
                        </span>
                      </div>
                    ) : null}
                    {action.icon === 'x' ? <ThickX /> : null}
                    {action.icon === 'hexagon' ? <Hexagon /> : null}
                  </div>
                  <div>
                    <h3
                      className={cn('subheading-1', {
                        'text-light-accent-1 dark:text-dark-accent-1': action.color === 'pink',
                        'text-blue-base': action.color === 'blue',
                        'text-green-base dark:text-green-vibrant': action.color === 'green',
                      })}
                    >
                      {action.title}
                    </h3>
                    <p className="mt-1 body-3 text-light-neutral-2 dark:text-dark-neutral-2">{action.text}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="divider"></div>

        <div className="py-padding-x-large">
          <h3 className="text-light-neutral-1 dark:text-dark-neutral-1 heading-2">Integrate your Smart Contracts</h3>
          <div className="default-grid mt-6">
            {dAppGuides.map((card) => (
              <ArticleLinkCard key={card.title} title={card.title} description={card.text} url={card.to} />
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="py-padding-x-large">
          <h3 className="text-light-neutral-1 dark:text-dark-neutral-1 heading-2">Integrate your dApp</h3>
          <div className="default-grid mt-6">
            {smartContractGuides.map((card) => (
              <ArticleLinkCard key={card.title} title={card.title} description={card.text} url={card.to} />
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="py-padding-x-large">
          <h3 className="text-light-neutral-1 dark:text-dark-neutral-1 heading-2">Quick Links</h3>
          <div className="flex flex-wrap">
            {developerLinks.map((devLink) => {
              return (
                <Link
                  key={devLink.title}
                  to={devLink.href}
                  className="mt-6 mr-4 group flex flex-row items-center transition rounded-medium py-padding-small px-padding-medium bg-light-surface-2 dark:bg-dark-surface-2 hover:bg-light-accent-2 hover:dark:bg-dark-accent-2"
                >
                  <>
                    {devLink.icon === 'github' ? <Github className="w-6 h-6" /> : null}
                    {devLink.icon === 'npm' ? <Npm className="w-5 h-5" /> : null}
                    <p className="transition group-hover:text-light-accent-1 group-hover:dark:text-dark-accent-1 ml-3 subheading-2 text-light-neutral-1 dark:text-dark-neutral-1">
                      {devLink.title}
                    </p>
                  </>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="divider" />

        <div className="ConnectBlock pt-padding-x-large">
          <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-1">{connectBlock.title}</h3>
          <div className="default-grid mt-margin-mobile sm:mt-padding-x-large">
            <div className="col-span-4 flex flex-col justify-between rounded-large bg-light-orange-fade p-8 dark:bg-dark-orange-fade-80 sm:min-h-[15.625rem] sm:pt-[1.8125rem] md:col-span-2">
              <h3 className="heading-3 dark:dark-orange-vibrant max-w-[17rem] text-light-orange-vibrant">
                {connectBlock.supportTitle}
              </h3>
              <IconButton
                href={connectBlock.supportButton.url}
                label={connectBlock.supportButton.name}
                color="orange-vibrant"
              />
            </div>
            <div className="col-span-4 flex flex-col justify-between rounded-large bg-light-brown-fade p-8 dark:bg-dark-brown-fade-80 sm:min-h-[15.625rem] sm:pt-[1.8125rem] md:col-span-2">
              <h3 className="heading-3 dark:dark-brown-vibrant max-w-[17rem] text-light-brown-vibrant">
                {connectBlock.socialTitle}
              </h3>
              <IconButton
                href={connectBlock.socialButton.url}
                label={connectBlock.socialButton.name}
                color="brown-vibrant"
              />
            </div>
            <div className="col-span-4 flex min-h-[15.625rem] flex-col justify-between space-y-12 rounded-large bg-light-pink-fade p-8 dark:bg-dark-pink-fade-80 sm:col-span-8 sm:space-y-0 sm:pt-[1.8125rem] md:col-span-4">
              <NewsletterForm
                inputClass="bg-light-surface-1 p-3 pl-[2.1875rem] text-light-accent-1 placeholder:text-light-accent-1 dark:bg-dark-surface-1 dark:text-dark-accent-1 dark:placeholder:text-dark-accent-1 border-none"
                globeColorClass="pink-vibrant"
                headerTextClass="dark:text-dark-accent-1 max-w-[25rem] text-light-accent-1"
                headerText={connectBlock.newsletterTitle}
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-light-surface-2 dark:bg-dark-surface-2 rounded-large mt-4">
          <div className="default-grid ">
            <div className="flex flex-col md:justify-between p-8 col-span-full sm:col-span-7 md:col-span-4">
              <div>
                <h3 className="heading-3 text-light-neutral-1 dark:text-dark-neutral-1">Uniswap Grants Program</h3>
                <p className="mt-2 body-2 text-light-neutral-2 dark:text-dark-neutral-2 max-w-[28rem]">
                  Uniswap Governance offers grant funding for people who are building apps, tools, and activities for
                  Uniswap Protocol users, builders, and community members.
                </p>
              </div>
              <div className="flex mt-5">
                <Link
                  className="group flex items-center justify-center rounded-large bg-light-surface-3 p-3 transition hover:bg-light-surface-3-hovered dark:bg-dark-surface-3 dark:hover:bg-dark-surface-3-hovered"
                  to="https://unigrants.org/"
                >
                  <Globe className="mr-2 h-6 w-6" color="neutral-1" />
                  <span className={cn('button-label-1 transition text-light-neutral-1 dark:text-dark-neutral-1')}>
                    Learn more
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center col-span-full md:col-span-4 min-h-[50vw] md:min-h-[25vw]">
              <img src={UPG} className="absolute md:right-0 p-8" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

const IconButton: FC<{
  href: string
  ariaLabel?: string
  label: string
  color: 'orange-vibrant' | 'brown-vibrant'
}> = ({ href, label, color }) => {
  return (
    <div className="mt-12 flex">
      <Link
        className="group flex items-center justify-center rounded-large bg-light-surface-1 p-3 hover:bg-light-surface-3-hovered dark:bg-dark-surface-1 transition dark:hover:bg-dark-surface-3-hovered"
        to={href}
      >
        {color === 'orange-vibrant' && <HelpCircle className="mr-2 h-6 w-6" color={color} />}
        {color === 'brown-vibrant' && <Chat className="mr-2 h-6 w-6" color={color} />}
        <span
          className={cn('button-label-1 transition', {
            'text-light-orange-vibrant dark:text-dark-orange-vibrant': color === 'orange-vibrant',
            'text-light-brown-vibrant dark:text-dark-brown-vibrant': color === 'brown-vibrant',
          })}
        >
          {label}
        </span>
      </Link>
    </div>
  )
}

const ArticleLinkCard: FC<{
  title: string
  description: string
  url: string
}> = ({ title, description, url }) => {
  return (
    <Link
      href={url}
      className="col-span-full sm:col-span-4 md:col-span-2 group flex flex-row transition rounded-medium py-padding-small px-padding-medium bg-light-surface-2 dark:bg-dark-surface-2 hover:bg-light-accent-2 hover:dark:bg-dark-accent-2"
      target="_self"
    >
      <div className="flex flex-col w-full space-y-1">
        <h4 className="transition subheading-2 text-light-neutral-1 dark:text-dark-neutral-1 group-hover:text-light-pink-vibrant dark:group-hover:text-dark-pink-vibrant">
          {title}
        </h4>
        <p className="body-3 text-light-neutral-2 dark:text-dark-neutral-2">{description}</p>
      </div>
      <div className="transition opacity-0 group-hover:opacity-100">
        <ArrowRight className="my-1 w-5 h-5" />
      </div>
    </Link>
  )
}

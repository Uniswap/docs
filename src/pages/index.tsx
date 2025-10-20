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
    title: 'Integrate with Uniswap',
    icon: 'x',
    to: '/sdk/v4/overview',
    text: `Learn how to integrate with Uniswap by building a dApp through guided examples.`,
    color: 'blue',
  },
  {
    title: 'The Uniswap smart contracts',
    icon: 'hexagon',
    to: '/contracts/v4/overview',
    text: `Learn about the architecture of the Uniswap Protocol smart contracts through guided examples.`,
    color: 'green',
  },
]

export const developerLinks = [
  {
    title: 'Uniswap/v4-core',
    href: 'https://github.com/Uniswap/v4-core/',
    icon: 'github',
  },
  {
    title: 'Uniswap/v4-periphery',
    href: 'https://github.com/Uniswap/v4-periphery',
    icon: 'github',
  },
  {
    title: 'Uniswap/v4-sdk',
    href: 'https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk',
    icon: 'github',
  },
  {
    title: 'Deployment addresses',
    href: '/contracts/v4/deployments',
    icon: 'github',
  },
]

export const dAppGuides = [
  {
    title: 'Fetch token prices',
    text: 'Fetch the price of tokens in a specific Pool',
    to: 'sdk/v4/guides/swaps/quoting',
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
    to: '/contracts/v4/quickstart/hooks/setup',
  },
  {
    title: 'Implement a Swap',
    text: 'Start swapping from a smart contract in Solidity',
    to: 'contracts/v4/quickstart/swap',
  },
  {
    title: 'Provide Liquidity',
    text: 'Provide liquidity from a smart contract in Solidity',
    to: 'contracts/v4/quickstart/manage-liquidity/setup-liquidity',
  },
  {
    title: 'Implement Flash Swaps',
    text: 'Implement Flash Swaps from a smart contract in Solidity',
    to: '/contracts/v4/guides/flash-accounting',
  },
  {
    title: 'Create a Hook',
    text: 'Create your first hook to customize pool behavior in Solidity',
    to: '/contracts/v4/guides/hooks/your-first-hook',
  },
]

const connectBlock = {
  title: 'Connect with us',
  supportTitle: 'Join us on Discord to get support',
  supportButton: {
    url: 'https://discord.com/invite/uniswap',
    name: 'Dev Chat',
  },
  socialTitle: 'Insights and news from the UF team',
  socialButton: {
    url: 'https://www.uniswapfoundation.org/blog',
    name: 'Blog',
  },
  newsletterTitle: 'Sign up for research and updates from the Uniswap Foundation',
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
                <h3 className="heading-3 text-light-neutral-1 dark:text-dark-neutral-1">Uniswap Foundation</h3>
                <p className="mt-2 body-2 text-light-neutral-2 dark:text-dark-neutral-2 max-w-[28rem]">
                  In pursuit of a more open and fair financial system, the Uniswap Foundation supports the growth,
                  decentralization, and sustainability of the Uniswap community.
                </p>
              </div>
              <div className="flex mt-5">
                <Link
                  className="group flex items-center justify-center rounded-large bg-light-surface-3 p-3 transition hover:bg-dark-accent-2 dark:bg-dark-surface-3 hover:dark:bg-light-accent-2"
                  to="https://unigrants.org/"
                >
                  <div className="mr-2 h-6 w-6 transition text-light-neutral-1 dark:text-dark-neutral-1 group-hover:text-dark-accent-1 group-hover:dark:text-light-accent-1">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.55351 8.50001C4.65351 10.5533 5.34684 12.6467 6.55351 14.5067C3.72684 13.88 1.57352 11.46 1.35352 8.50001H4.55351ZM6.55351 1.49334C3.72684 2.12 1.57352 4.54001 1.35352 7.50001H4.55351C4.65351 5.44668 5.34684 3.35334 6.55351 1.49334ZM8.13352 1.33334H7.86684L7.66685 1.62001C6.40018 3.42001 5.66017 5.48668 5.55351 7.50001H10.4469C10.3402 5.48668 9.60018 3.42001 8.33352 1.62001L8.13352 1.33334ZM5.55351 8.50001C5.66017 10.5133 6.40018 12.58 7.66685 14.38L7.86684 14.6667H8.13352L8.33352 14.38C9.60018 12.58 10.3402 10.5133 10.4469 8.50001H5.55351ZM11.4469 8.50001C11.3469 10.5533 10.6535 12.6467 9.44686 14.5067C12.2735 13.88 14.4269 11.46 14.6469 8.50001H11.4469ZM14.6469 7.50001C14.4269 4.54001 12.2735 2.12 9.44686 1.49334C10.6535 3.35334 11.3469 5.44668 11.4469 7.50001H14.6469Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className={cn('button-label-1 transition text-light-neutral-1 dark:text-dark-neutral-1 group-hover:text-dark-accent-1 group-hover:dark:text-light-accent-1')}>
                    Learn more
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative justify-center col-span-full md:col-span-4 min-h-[50vw] md:min-h-[25vw] hidden md:flex">
              <img src={UPG} className="absolute md:right-0 p-8 max-w-[16rem]" />
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
        className="group flex items-center justify-center rounded-large bg-light-surface-1 p-3 transition hover:bg-dark-accent-2 dark:bg-dark-surface-1 hover:dark:bg-light-accent-2"
        to={href}
      >
        {color === 'orange-vibrant' && <HelpCircle className="mr-2 h-6 w-6" color={color} />}
        {color === 'brown-vibrant' && <Chat className="mr-2 h-6 w-6" color={color} />}
        <span
          className={cn('button-label-1 transition group-hover:text-dark-accent-1 group-hover:dark:text-light-accent-1', {
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

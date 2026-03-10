import React, { FC } from 'react'

import { MiniUnicon, Github, X, Discord } from '../components/Icons'

import { LinkBase, TextButton } from '../components/base/Button'

const footerData = {
  footerLinks: [
    {
      title: 'Developers',
      links: [
        {
          label: 'Dev Chat',
          href: 'https://discord.com/invite/uniswap',
        },
        {
          label: 'Feedback',
          href: '/feedback',
        },
        {
          label: 'Bug Bounty',
          href: 'https://blog.uniswap.org/v4-bug-bounty',
        },
        {
          label: 'Whitepaper',
          href: 'https://app.uniswap.org/whitepaper-v4.pdf',
        },
      ],
    },
    {
      title: 'GitHub',
      links: [
        {
          label: 'v4-core',
          href: 'https://github.com/Uniswap/v4-core',
        },
        {
          label: 'v4-sdk',
          href: 'https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk',
        },
        {
          label: 'v4-periphery',
          href: 'https://github.com/Uniswap/v4-periphery',
        },
        {
          label: 'Deployments',
          href: '/contracts/v4/deployments',
        },
      ],
    },
    {
      title: 'Ecosystem',
      links: [
        {
          label: 'App',
          href: 'https://app.uniswap.org/',
        },
        {
          label: 'Analytics',
          href: 'https://info.uniswap.org/home',
        },
        {
          label: 'Token Lists',
          href: 'https://tokenlists.org/token-list?url=https://ipfs.io/ipns/tokens.uniswap.org',
        },
        {
          label: 'Brand Assets',
          href: 'https://github.com/Uniswap/brand-assets/raw/main/Uniswap%20Brand%20Assets.zip',
        },
      ],
    },
    {
      title: 'Community',
      links: [
        {
          label: 'X',
          href: 'https://twitter.com/Uniswap',
        },
        {
          label: 'Blog',
          href: 'https://docs.uniswap.org/blog/',
        },
        {
          label: 'Help Center',
          href: 'https://support.uniswap.org/hc/en-us',
        },
        {
          label: 'Governance',
          href: 'https://gov.uniswap.org/',
        }
      ],
    },
  ],
  footerGithubLink: 'https://github.com/uniswap/uniswap-docs',
  footerXLink: 'https://x.com/Uniswap',
  footerDiscordLink: 'https://discord.com/invite/uniswap',
}

const Footer: FC = () => {
  return (
    <footer className="Footer bg-light-surface-1 px-margin-mobile pt-margin-web dark:bg-dark-surface-1 sm:px-margin-web sm:pb-margin-web">
      <h2 className="sr-only">Footer</h2>
      <div className="default-grid sm:mb-20">
        <div className="mb-12 hidden items-start sm:col-span-8 sm:flex md:col-span-4 md:mb-0">
          <LinkBase href="/" className="flex flex-row items-center">
            <MiniUnicon color="neutral-1" className="mb-[0.1875rem] h-8 w-8" />
            <p className="body-1 ml-2 text-light-neutral-1 dark:text-dark-neutral-1">Uniswap Docs</p>
          </LinkBase>
        </div>
        <div className="col-span-4 sm:col-span-8 sm:flex sm:grid-cols-8 md:col-span-4">
          <nav className="grid w-full grid-cols-2 gap-gap-large sm:grid-cols-4">
            {footerData.footerLinks && footerData.footerLinks.length > 0 ? (
              <>
                {footerData.footerLinks.map((section) => (
                  <div key={section.title} className="space-y-[0.3125rem]">
                    <h3 className="body-1 text-light-neutral-1 dark:text-dark-neutral-1">{section.title}</h3>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <TextButton
                            textClassName="body-2 text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1 transition-colors"
                            href={link.href}
                            label={link.label}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            ) : null}
          </nav>
        </div>
      </div>
      <div className="flex flex-col-reverse border-light-surface-3 dark:border-dark-surface-3 sm:flex-row sm:items-center sm:justify-between sm:border-t sm:pt-padding-large">
        <p className="body-3 my-padding-large text-light-neutral-2 dark:text-dark-neutral-2 sm:my-0">
          @{new Date().getFullYear()} Uniswap Docs
        </p>
        <div className="flex flex-row space-x-gap-large border-b border-light-surface-3 px-2 py-margin-web dark:border-dark-surface-3 sm:border-0 sm:px-0 sm:py-0">
          {footerData?.footerGithubLink ? (
            <LinkBase className="group" href={footerData.footerGithubLink} ariaLabel="Link to Uniswap Labs Github">
              <Github className="h-6 w-6" />
            </LinkBase>
          ) : null}
          {footerData?.footerXLink ? (
            <LinkBase className="group" href={footerData.footerXLink} ariaLabel="Link to Uniswap Labs X account">
              <X className="h-6 w-6" />
            </LinkBase>
          ) : null}
          {footerData?.footerDiscordLink ? (
            <LinkBase className="group" href={footerData.footerDiscordLink} ariaLabel="Link to Uniswap Labs Discord">
              <Discord className="h-6 w-6" />
            </LinkBase>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export default Footer

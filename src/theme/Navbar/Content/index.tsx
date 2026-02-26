import React, { type ReactNode } from 'react'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import SearchBar from '@theme/SearchBar'
import Link from '@docusaurus/Link'
import { Menu, MiniUnicon } from '@site/src/components/Icons'
import clsx from 'clsx'

// function useNavbarItems() {
//   // TODO temporary casting until ThemeConfig type is improved
//   return useThemeConfig().navbar.items as NavbarItemConfig[]
// }

// function NavbarItems({ items }: { items: NavbarItemConfig[] }): ReactNode {
//   return (
//     <>
//       {items.map((item, i) => (
//         <ErrorCauseBoundary
//           key={i}
//           onError={(error) =>
//             new Error(
//               `A theme navbar item failed to render.
// Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
// ${JSON.stringify(item, null, 2)}`,
//               { cause: error },
//             )
//           }
//         >
//           <NavbarItem {...item} />
//         </ErrorCauseBoundary>
//       ))}
//     </>
//   )
// }

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar()

  const navLinks = [
    { label: 'Concepts', to: '/concepts/overview' },
    { label: 'Contracts', to: '/contracts/v4/overview' },
    { label: 'SDKs', to: '/sdk/v4/overview' },
    { label: 'APIs', to: '/api/overview' },
    { label: 'Support', to: '/builder-support/get-funded' },
    { label: 'LLMs', to: '/llms/overview' },
  ]

  return (
    <div
      className={clsx(
        'navbar__inner',
        'w-full h-nav-h flex flex-row items-center px-4 py-3 sm:px-[0.9375rem] sm:py-3',
      )}
    >
      {/* Logo - Left aligned */}
      <Link className="flex min-w-0 flex-row items-center" to="/" target="_self" aria-label="Uniswap Documentation Home">
        <MiniUnicon className="w-8 h-8 mr-3" />
        <p className="Navbar__logo-text body-1 text-light-accent-1 dark:text-dark-accent-1 mb-0 whitespace-nowrap max-[380px]:hidden">
          Uniswap Docs
        </p>
      </Link>

      {/* Mobile search and menu */}
      <div className="ml-auto flex shrink-0 flex-row items-center gap-3 min-[997px]:hidden">
        <div className="w-[clamp(148px,34vw,196px)] min-w-[148px] max-w-[196px]">
          <SearchBar />
        </div>
        <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-small" onClick={mobileSidebar.toggle}>
          <Menu />
        </button>
      </div>

      {/* Right side - Nav Links, Search, Theme Toggle, Feedback */}
      <div className="hidden min-[997px]:flex min-w-0 flex-1 justify-end items-center gap-2 md:gap-3 mr-2 md:mr-4 h-8">
      <nav className="flex h-8 flex-row items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="inline-flex h-8 items-center body-2 text-light-neutral-2 dark:text-dark-neutral-2 hover:text-light-accent-1 hover:dark:text-dark-accent-1 transition-colors shrink-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex h-8 items-center gap-3 shrink-0">
        <div className="w-[190px]">
            <SearchBar />
          </div>
          <NavbarColorModeToggle />
        </div>

        <Link
          className="button-label-4 inline-flex h-8 items-center px-3 bg-light-accent-2 dark:bg-dark-accent-2 hover:bg-light-accent-2-hovered hover:dark:bg-dark-accent-2-hovered transition rounded-small shrink-0"
          to="/feedback"
          target="_self"
        >
          <span className="text-light-accent-1 dark:text-dark-accent-1">Submit Feedback</span>
        </Link>
      </div>
    </div>
  )
}

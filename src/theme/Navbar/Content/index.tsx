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
    { label: 'APIs', to: '/api/subgraph/overview' },
  ]

  return (
    <div
      className={clsx(
        'navbar__inner',
        'w-full h-nav-h flex flex-row items-center px-4 py-[1.15625rem] sm:px-[0.9375rem] sm:py-3',
      )}
    >
      {/* Logo - Left aligned */}
      <Link className="flex flex-row items-center flex-shrink-0" to="/" target="_self" aria-label="Uniswap Documentation Home">
        <MiniUnicon className="w-8 h-8 mr-3" />
        <p className="Navbar__logo-text body-1 text-light-accent-1 dark:text-dark-accent-1 mb-0">Uniswap Docs</p>
      </Link>

      {/* Mobile search and menu */}
      <div className="flex flex-row items-center sm:hidden gap-3 ml-auto">
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>
        <button className="flex items-center" onClick={mobileSidebar.toggle}>
          <Menu />
        </button>
      </div>

      {/* Right side - Nav Links, Search, Theme Toggle, Feedback */}
      <div className="hidden sm:flex flex-1 justify-end items-center space-x-6 mr-4">
        {/* Navigation Links */}
        <nav className="flex flex-row items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="body-2 text-light-neutral-2 dark:text-dark-neutral-2 hover:text-light-accent-1 hover:dark:text-dark-accent-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <SearchBar />
        <NavbarColorModeToggle />
        <Link
          className="button-label-4 py-2 px-3 bg-light-accent-2 dark:bg-dark-accent-2 hover:bg-light-accent-2-hovered hover:dark:bg-dark-accent-2-hovered transition rounded-small"
          to="https://share.hsforms.com/14XvN41xQTyC8KPamgaM8Jwsdca9"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-light-accent-1 dark:text-dark-accent-1">Submit Feedback</span>
        </Link>
      </div>
    </div>
  )
}

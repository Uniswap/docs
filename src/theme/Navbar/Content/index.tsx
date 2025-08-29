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

  // const items = useNavbarItems()
  // const [leftItems, rightItems] = splitNavbarItems(items)

  // const searchBarItem = items.find((item) => item.type === 'search')

  return (
    <div
      className={clsx(
        'navbar__inner',
        'w-full h-nav-h flex flex-row justify-between items-center px-4 py-[1.15625rem] sm:px-[0.9375rem] sm:py-3',
      )}
    >
      <Link className="flex flex-row items-center" to="/" target="_self" aria-label="Uniswap Documentation Home">
        <MiniUnicon className="w-8 h-8 mr-3" />
        <p className="Navbar__logo-text body-1 text-light-accent-1 dark:text-dark-accent-1 mb-0">Uniswap Docs</p>
      </Link>
      <div className="flex flex-row items-center">
        <SearchBar />
        <button className="ml-3 flex items-center md:hidden" onClick={mobileSidebar.toggle}>
          <Menu />
        </button>
      </div>

      <div className="hidden md:flex flex-row items-center">
        <NavbarColorModeToggle />
        <Link
          className="button-label-4 py-2 px-3 bg-light-accent-2 dark:bg-dark-accent-2 hover:bg-light-accent-2-hovered hover:dark:bg-dark-accent-2-hovered transition rounded-small ml-2"
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

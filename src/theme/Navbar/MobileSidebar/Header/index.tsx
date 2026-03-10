import React, { type ReactNode } from 'react'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import IconClose from '@theme/Icon/Close'
import Link from '@docusaurus/Link'

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar()
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  )
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar()

  return (
    <div className="navbar-sidebar__brand">
      <div className="flex w-full items-center gap-2 pl-4 pr-2">
        <NavbarColorModeToggle />

        <Link
          to="/feedback"
          onClick={() => mobileSidebar.toggle()}
          className="button-label-4 inline-flex h-8 items-center px-3 rounded-small bg-light-accent-2 dark:bg-dark-accent-2 hover:bg-light-accent-2-hovered hover:dark:bg-dark-accent-2-hovered transition"
        >
          <span className="text-light-accent-1 dark:text-dark-accent-1">Feedback</span>
        </Link>

        <div className="ml-auto">
          <CloseButton />
        </div>
      </div>
    </div>
  )
}

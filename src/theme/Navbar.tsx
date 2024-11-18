import React, { FC } from 'react'

import Link from '@docusaurus/Link'
import OriginalSearchbar from '@theme-original/SearchBar'
import { MiniUnicon, Menu } from '../components/Icons'
import ThemeSwitch from '../components/ThemeSwitch'

const Navbar: FC = () => {
  return (
    <>
      {/* docusaurus expects class name "navbar". adding fake div for handling error that is looking for "navbar" class */}
      <div className="navbar hidden"></div>
      <nav className="Navbar fixed left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:bg-dark-surface-1 dark:border-dark-surface-3">
        <div className="w-full h-nav-h flex flex-row justify-between items-center px-4 py-[1.15625rem] sm:px-[0.9375rem] sm:py-3">
          <Link className="flex flex-row items-center" to="/" target="_self" aria-label="Uniswap Documentation Home">
            <MiniUnicon className="w-8 h-8 mr-3" />
            <p className="Navbar__logo-text body-1 text-light-accent-1 dark:text-dark-accent-1 mb-0">Uniswap Docs</p>
          </Link>
          <div className="flex flex-row items-center">
            <OriginalSearchbar />
            <button
              className="ml-3 flex items-center md:hidden"
              onClick={() => {
                console.log('open mobile menu')
              }}
            >
              <Menu />
            </button>
          </div>
          <div className="hidden md:flex flex-row items-center">
            <ThemeSwitch />
            <Link
              className="button-label-4 py-2 px-3 bg-light-accent-2 dark:bg-dark-accent-2 hover:bg-light-accent-2-hovered hover:dark:bg-dark-accent-2-hovered transition rounded-small ml-2"
              to="https://docs.google.com/forms/d/e/1FAIpQLSdjSkZam8KiatL9XACRVxCHjDJjaPGbls77PCXDKFn4JwykXg/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-light-accent-1 dark:text-dark-accent-1">Submit Feedback</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

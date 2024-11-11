import React from 'react'

import OriginalSearchbar from '@theme-original/SearchBar'
import { MiniUnicon, Menu } from '../components/Icons'
import ThemeSwitch from '../components/ThemeSwitch'

export default function Navbar(props: { className: string; label: string }) {
  return (
    <nav className="Navbar fixed left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:border-dark-surface-3 dark:bg-dark-surface-1">
      <div className="w-full h-nav-h flex flex-row justify-between items-center px-4 py-[1.15625rem] sm:px-[0.9375rem] sm:py-3">
        <a className="flex flex-row items-center" href="/" target="_self">
          <MiniUnicon className="w-8 h-8 mr-3" />
          <p className="Navbar__logo-text body-1 text-light-accent-1 dark:text-dark-accent-1 mb-0">Uniswap Docs</p>
        </a>
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
          <a
            className="button-label-4 text-light-accent-1 dark:text-dark-accent-1 py-2 px-3 bg-light-accent-2 dark:bg-dark-accent-2 rounded-small ml-2"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdjSkZam8KiatL9XACRVxCHjDJjaPGbls77PCXDKFn4JwykXg/viewform"
          >
            Submit Feedback
          </a>
        </div>
      </div>
    </nav>
  )
}

import React, { FC } from 'react'

import LayoutProvider from '@theme/Layout/Provider'
import { PageMetadata } from '@docusaurus/theme-common'
import Navbar from '@theme/Navbar'
import Footer from '@theme/Footer'
import type { Props } from '@theme/Layout'

const Layout: FC<Props> = ({ title, description, children }) => {
  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />
      <Navbar />
      <main className="pt-nav-h min-h-screen flex flex-row bg-light-surface-1 dark:bg-dark-surface-1">{children}</main>
      <Footer />
    </LayoutProvider>
  )
}

export default Layout

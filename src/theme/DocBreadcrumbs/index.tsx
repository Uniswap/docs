import React, { type ReactNode } from 'react'
import Link from '@docusaurus/Link'
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useHomePageRoute } from '@docusaurus/theme-common/internal'
import useBaseUrl from '@docusaurus/useBaseUrl'
import clsx from 'clsx'

import styles from './styles.module.css'

function BreadcrumbsItemLink({ children, href }: { children: ReactNode; href?: string }): ReactNode {
  const className = clsx('breadcrumbs__link', styles.breadcrumbsItemLink)
  return href ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  )
}

function BreadcrumbsItem({ children, active }: { children: ReactNode; active?: boolean }): ReactNode {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
    </li>
  )
}

function HomeBreadcrumbItem() {
  const homeHref = useBaseUrl('/')
  return (
    <BreadcrumbsItem>
      <BreadcrumbsItemLink href={homeHref}>Home</BreadcrumbsItemLink>
    </BreadcrumbsItem>
  )
}

export default function DocBreadcrumbs(): ReactNode | null {
  const breadcrumbs = useSidebarBreadcrumbs()
  const homePageRoute = useHomePageRoute()

  if (!breadcrumbs) {
    return null
  }

  return (
    <nav className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer)} aria-label="breadcrumbs">
      <ul className="breadcrumbs">
        {homePageRoute && <HomeBreadcrumbItem />}
        {breadcrumbs.map((item, idx) => (
          <BreadcrumbsItem key={idx} active={idx === breadcrumbs.length - 1}>
            <BreadcrumbsItemLink href={item.href}>{item.label}</BreadcrumbsItemLink>
          </BreadcrumbsItem>
        ))}
      </ul>
    </nav>
  )
}

import Link from '@docusaurus/Link'
import { ThemeClassNames, useHomePageRoute, useSidebarBreadcrumbs } from '@docusaurus/theme-common'
import useBaseUrl from '@docusaurus/useBaseUrl'
import clsx from 'clsx'
import React, { type ReactNode } from 'react'

import styles from './styles.module.css'

function BreadcrumbsItemLink({ children, href }: { children: ReactNode; href?: string }): JSX.Element {
  const className = clsx('breadcrumbs__link', styles.breadcrumbsItemLink)
  return href ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  )
}

function BreadcrumbsItem({ children, active }: { children: ReactNode; active?: boolean }): JSX.Element {
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

export default function DocBreadcrumbs(): JSX.Element | null {
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

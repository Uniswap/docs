import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useWindowSize } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocVersionBanner from '@theme/DocVersionBanner'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocItemFooter from '@theme/DocItem/Footer'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemContent from '@theme/DocItem/Content'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import ContentVisibility from '@theme/ContentVisibility'
import EditThisPage from '@theme/EditThisPage'
import type { Props } from '@theme/DocItem/Layout'

import styles from './styles.module.css'
import { Edit } from '@site/src/components/Icons'
import CopyToAI from '@site/src/components/CopyToAI'

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()

  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0

  const mobile = canRender ? <DocItemTOCMobile /> : undefined

  const desktop = canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? <DocItemTOCDesktop /> : undefined

  return {
    hidden,
    mobile,
    desktop,
  }
}

export default function DocItemLayout({ children }: Props): ReactNode {
  const docTOC = useDocTOC()
  const { metadata } = useDoc()
  const { editUrl } = metadata
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      <div className="col col--3 Toc__container">
        {docTOC.desktop && (
          <div>
            <p className="Toc__title">On this page</p>
            {docTOC.desktop}
          </div>
        )}

        {/* Copy to AI Integration */}
        <div className="mt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <CopyToAI className="w-full" />
        </div>

        {editUrl && (
          <div className="flex flex-row space-x-1 items-center group/edit-icon mt-4">
            <Edit className="Toc__edit-icon h-4 w-4" />
            <EditThisPage editUrl={editUrl} />
          </div>
        )}
      </div>
    </div>
  )
}

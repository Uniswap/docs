import React, { useEffect } from 'react'
import { useLocation } from '@docusaurus/router'

import { initializeAnalytics, sendAnalyticsEvent, Trace, user, OriginApplication } from '@uniswap/analytics'
import { CustomUserProperties, EventName, PageName, getBrowser } from '@uniswap/analytics-events'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { getCLS, getFCP, getFID, getLCP, Metric } from 'web-vitals'

// Placeholder API key. Actual API key used in the proxy server
const ANALYTICS_DUMMY_KEY = '00000000000000000000000000000000'

function getCurrentPageFromLocation(locationPathname: string): PageName | undefined | string {
  if (locationPathname === '/') {
    return 'home page'
  }
  const pathWithoutInitialSlash = locationPathname.slice(1)
  const pathWithSlashesReplaced = pathWithoutInitialSlash.replace(/\//g, ' ')
  const pageName = pathWithSlashesReplaced.concat(' page')
  return pageName
}

// Default implementation, that you can customize
export default function Root({ children }: React.PropsWithChildren<{ open: boolean }>) {
  const { pathname } = useLocation()
  const currentPage = getCurrentPageFromLocation(pathname)

  const { siteConfig } = useDocusaurusContext()

  const proxyUrl = typeof siteConfig.customFields.analytics === 'string' ? siteConfig.customFields.analytics : undefined
  const nodeEnv = siteConfig.customFields.nodeEnv
  const stagingEnv = Boolean(siteConfig.customFields.stagingEnv)
  const isProductionEnv = !stagingEnv && nodeEnv === 'production'

  try {
    initializeAnalytics(ANALYTICS_DUMMY_KEY, OriginApplication.DOCS, {
      proxyUrl,
      isProductionEnv,
    })
  } catch {}

  // Fires on initial render of the page
  useEffect(() => {
    sendAnalyticsEvent(EventName.APP_LOADED, {
      referer: document.referrer,
    })
    user.set(CustomUserProperties.USER_AGENT, navigator.userAgent)
    user.set(CustomUserProperties.BROWSER, getBrowser())
    user.set(CustomUserProperties.SCREEN_RESOLUTION_HEIGHT, window.screen.height)
    user.set(CustomUserProperties.SCREEN_RESOLUTION_WIDTH, window.screen.width)
    getCLS(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { cumulative_layout_shift: delta }))
    getFCP(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { first_contentful_paint_ms: delta }))
    getFID(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { first_input_delay_ms: delta }))
    getLCP(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { largest_contentful_paint_ms: delta }))
  }, [])

  // Fires on route change
  useEffect(() => {
    sendAnalyticsEvent(EventName.PAGE_VIEWED, {
      page: getCurrentPageFromLocation(pathname),
    })
  }, [pathname])

  return (
    <>
      <Trace page={currentPage}>{children}</Trace>
    </>
  )
}

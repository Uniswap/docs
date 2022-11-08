import React, { useEffect } from 'react'
import { useLocation } from '@docusaurus/router'

import { initializeAnalytics, sendAnalyticsEvent, Trace, user } from '@uniswap/analytics'
import { CustomUserProperties, EventName, PageName } from '@uniswap/analytics-events'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { getCLS, getFCP, getFID, getLCP, Metric } from 'web-vitals'
import { getBrowser } from '../utils/browser'

// Placeholder API key. Actual API key used in the proxy server
const ANALYTICS_DUMMY_KEY = '00000000000000000000000000000000'

function getCurrentPageFromLocation(locationPathname: string): PageName | undefined {
  switch (locationPathname) {
    case '/swap':
      return PageName.SWAP_PAGE
    case '/vote':
      return PageName.VOTE_PAGE
    case '/pool':
      return PageName.POOL_PAGE
    case '/tokens':
      return PageName.TOKENS_PAGE
    default:
      return undefined
  }
}

// Default implementation, that you can customize
export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext()

  const analyticsUrl = typeof siteConfig.customFields.analytics === 'string' ? siteConfig.customFields.analytics : null
  initializeAnalytics(ANALYTICS_DUMMY_KEY, analyticsUrl)

  useEffect(() => {
    sendAnalyticsEvent(EventName.APP_LOADED)
    user.set(CustomUserProperties.USER_AGENT, navigator.userAgent)
    user.set(CustomUserProperties.BROWSER, getBrowser())
    user.set(CustomUserProperties.SCREEN_RESOLUTION_HEIGHT, window.screen.height)
    user.set(CustomUserProperties.SCREEN_RESOLUTION_WIDTH, window.screen.width)
    getCLS(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { cumulative_layout_shift: delta }))
    getFCP(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { first_contentful_paint_ms: delta }))
    getFID(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { first_input_delay_ms: delta }))
    getLCP(({ delta }: Metric) => sendAnalyticsEvent(EventName.WEB_VITALS, { largest_contentful_paint_ms: delta }))
  }, [])

  const { pathname } = useLocation()
  const currentPage = getCurrentPageFromLocation(pathname)

  return <><Trace page={currentPage}>{children}</Trace></>
}

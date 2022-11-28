import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { initializeAnalytics, OriginApplication, sendAnalyticsEvent, Trace, user } from '@uniswap/analytics'
import { CustomUserProperties, EventName, getBrowser } from '@uniswap/analytics-events'
import React, { useEffect } from 'react'
import { getCLS, getFCP, getFID, getLCP, Metric } from 'web-vitals'

// Placeholder API key. Actual API key used in the proxy server
const ANALYTICS_DUMMY_KEY = '00000000000000000000000000000000'

// Default implementation, that you can customize
export default function Root({ children }: React.PropsWithChildren<{ open: boolean }>) {
  const { pathname } = useLocation()

  const { siteConfig } = useDocusaurusContext()

  const analyticsProxyUrl =
    typeof siteConfig.customFields.analyticsProxyUrl === 'string'
      ? siteConfig.customFields.analyticsProxyUrl
      : undefined
  const nodeEnv = siteConfig.customFields.nodeEnv
  const stagingEnv = Boolean(siteConfig.customFields.stagingEnv)
  const isProductionEnv = !stagingEnv && nodeEnv === 'production'

  // Only initialized analytics once, catching and ignoring the error that is raised on re-initialization
  try {
    initializeAnalytics(ANALYTICS_DUMMY_KEY, OriginApplication.DOCS, {
      proxyUrl: analyticsProxyUrl,
      isProductionEnv,
    })
  } catch {}

  // Fires on initial render of the page
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

  // Fires on route change
  useEffect(() => {
    sendAnalyticsEvent(EventName.PAGE_VIEWED, {
      page: pathname,
    })
  }, [pathname])

  return (
    <>
      <Trace page={pathname}>{children}</Trace>
    </>
  )
}

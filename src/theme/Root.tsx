import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { initializeAnalytics, OriginApplication, sendAnalyticsEvent, Trace, user } from '@uniswap/analytics'
import { CustomUserProperties, getBrowser, SharedEventName } from '@uniswap/analytics-events'
import React, { useEffect } from 'react'
import { getCLS, getFCP, getFID, getLCP, Metric } from 'web-vitals'

// Add gtag to window object for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Placeholder API key. Actual API key used in the proxy server
const ANALYTICS_DUMMY_KEY = '00000000000000000000000000000000'

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-QZ13ZBKXMN'

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

  // Initialize Google Analytics
  useEffect(() => {
    // Only load GA in production environment
    if (isProductionEnv && !window.gtag) {
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      
      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `
      
      document.head.appendChild(script1)
      document.head.appendChild(script2)
      
      // Make gtag available globally
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }
    }
  }, [isProductionEnv])

  // Fires on initial render of the page
  useEffect(() => {
    sendAnalyticsEvent(SharedEventName.APP_LOADED)
    user.set(CustomUserProperties.USER_AGENT, navigator.userAgent)
    user.set(CustomUserProperties.BROWSER, getBrowser())
    user.set(CustomUserProperties.SCREEN_RESOLUTION_HEIGHT, window.screen.height)
    user.set(CustomUserProperties.SCREEN_RESOLUTION_WIDTH, window.screen.width)
    getCLS(({ delta }: Metric) => sendAnalyticsEvent(SharedEventName.WEB_VITALS, { cumulative_layout_shift: delta }))
    getFCP(({ delta }: Metric) => sendAnalyticsEvent(SharedEventName.WEB_VITALS, { first_contentful_paint_ms: delta }))
    getFID(({ delta }: Metric) => sendAnalyticsEvent(SharedEventName.WEB_VITALS, { first_input_delay_ms: delta }))
    getLCP(({ delta }: Metric) =>
      sendAnalyticsEvent(SharedEventName.WEB_VITALS, { largest_contentful_paint_ms: delta })
    )
  }, [])

  // Fires on route change
  useEffect(() => {
    // Send to Amplitude via Uniswap analytics
    sendAnalyticsEvent(SharedEventName.PAGE_VIEWED, {
      page: pathname,
    })
    
    // Send to Google Analytics
    if (window.gtag && isProductionEnv) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [pathname, isProductionEnv])

  return (
    <>
      <Trace page={pathname}>{children}</Trace>
    </>
  )
}

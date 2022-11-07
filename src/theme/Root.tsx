import React, { useEffect } from 'react'
import { useLocation } from '@docusaurus/router'

import { initializeAnalytics } from '@uniswap/analytics'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// Placeholder API key. Actual API key used in the proxy server
const ANALYTICS_DUMMY_KEY = '00000000000000000000000000000000'

// Default implementation, that you can customize
export default function Root({ children }) {
  const location = useLocation()
  const { siteConfig } = useDocusaurusContext()

  const analyticsUrl = typeof siteConfig.customFields.analytics === 'string' ? siteConfig.customFields.analytics : null
  initializeAnalytics(ANALYTICS_DUMMY_KEY, analyticsUrl)

  useEffect(() => {
    console.log('Location changed: ', location.pathname)
  }, [location])

  return <>{children}</>
}

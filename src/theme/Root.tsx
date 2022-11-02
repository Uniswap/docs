import React, { useEffect } from 'react'
import { useLocation } from '@docusaurus/router'

import { EventName, initializeAnalytics, sendAnalyticsEvent } from '@uniswap/analytics'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// Default implementation, that you can customize
export default function Root({ children }) {
  const location = useLocation()
  const { siteConfig } = useDocusaurusContext()

  const analyticsUrl = siteConfig.customFields.analytics

  useEffect(() => {
    console.log('Location changed: ', location.pathname)
  }, [location])

  useEffect(() => {
    initializeAnalytics(analyticsUrl)
    sendAnalyticsEvent(EventName.EXPLORE_BANNER_CLICKED, {})
  }, [location])

  return <>{children}</>
}

import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs'
import { DocsSentimentSection } from '@uniswap/analytics-events'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

export default function DocBreadcrumbs(props) {

  return (
    <div>
      <OriginalDocBreadcrumbs {...props} />
      <div>
        <SentimentTracking analyticsSection={DocsSentimentSection.TOP_SECTION} />
      </div>
    </div>
  )
}

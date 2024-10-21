import OriginalDocPaginator from '@theme-original/DocPaginator'
import { DocsSentimentSection } from '@uniswap/analytics-events'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

export default function DocPaginator(props) {
  return (
    <>
      <div>
        <SentimentTracking analyticsSection={DocsSentimentSection.BOTTOM_SECTION} />
      </div>
      <OriginalDocPaginator {...props} />
    </>
  )
}

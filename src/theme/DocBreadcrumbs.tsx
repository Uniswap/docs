import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

export default function DocBreadcrumbs(props) {
  return (
    <>
      <OriginalDocBreadcrumbs {...props} />
      <SentimentTracking />
    </>
  )
}

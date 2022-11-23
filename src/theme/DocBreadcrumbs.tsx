import React from 'react'
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs'
import SentimentTracking from '../components/SentimentTracking'

export default function DocBreadcrumbs(props) {
  return (
    <>
      <OriginalDocBreadcrumbs {...props} />
      <SentimentTracking />
    </>
  )
}

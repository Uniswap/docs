import OriginalTOCItems from '@theme-original/TOCItems'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

export default function TOCItems(props) {
  return (
    <>
      <OriginalTOCItems {...props} />
      <SentimentTracking />
    </>
  )
}

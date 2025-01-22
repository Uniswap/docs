import styled from '@emotion/styled'
import OriginalDocPaginator from '@theme-original/DocPaginator'
import { DocsSentimentSection } from '@uniswap/analytics-events'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

const SentimentTrackingContainer = styled.div`
  margin-top: 1.5rem;
`

export default function DocPaginator(props) {
  return (
    <>
      {/* <SentimentTrackingContainer>
        <SentimentTracking analyticsSection={DocsSentimentSection.BOTTOM_SECTION} />
      </SentimentTrackingContainer> */}
      <OriginalDocPaginator {...props} />
    </>
  )
}

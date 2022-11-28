import styled from '@emotion/styled'
import OriginalDocPaginator from '@theme-original/DocPaginator'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

const SentimentTrackingContainer = styled.div`
  margin-top: 1.5rem;
`

export default function DocPaginator(props) {
  return (
    <>
      <SentimentTrackingContainer>
        <SentimentTracking />
      </SentimentTrackingContainer>
      <OriginalDocPaginator {...props} />
    </>
  )
}

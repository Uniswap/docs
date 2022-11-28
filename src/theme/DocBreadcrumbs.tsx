import styled from '@emotion/styled'
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const SentimentTrackingContainer = styled.div`
  margin-bottom: 0.7rem;
`

export default function DocBreadcrumbs(props) {
  return (
    <Container>
      <OriginalDocBreadcrumbs {...props} />
      <SentimentTrackingContainer>
        <SentimentTracking />
      </SentimentTrackingContainer>
    </Container>
  )
}

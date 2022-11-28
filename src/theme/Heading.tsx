import styled from '@emotion/styled'
import OriginalHeading from '@theme-original/Heading'
import React from 'react'

import SentimentTracking from '../components/SentimentTracking'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const SentimentTrackingContainer = styled.div`
  margin-bottom: 1rem;
`

export default function TOCItems(props) {
  return (
    <Container>
      <OriginalHeading {...props} />
      <SentimentTrackingContainer>
        <SentimentTracking />
      </SentimentTrackingContainer>
    </Container>
  )
}

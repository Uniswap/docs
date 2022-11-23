import React, { useState } from 'react'

import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent } from '@uniswap/analytics-events'
import { ThumbsUp, ThumbsDown } from 'react-feather'

import styled from '@emotion/styled'

const ANALYTICS_SECTION_NAME = 'RATING'
const ANALYTICS_POSITIVE_ELEMENT_NAME = 'POSITIVE_SENTIMENT'
const ANALYTICS_NEGATIVE_ELEMENT_NAME = 'NEGATIVE_SENTIMENT'
const ANALYTICS_EVENT_NAME = 'RATING_CLICKED'
const POSITIVE_SENTIMENT_COLOR = 'green'
const NEGATIVE_SENTIMENT_COLOR = 'red'
const UNSELECTED_SENTIMENT_COLOR = 'clear'

enum Sentiment {
  NEGATIVE = 'NEGATIVE',
  POSITIVE = 'POSITIVE',
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
`

const SentimentContainer = styled.div`
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
`

const PositiveSentimentIcon = styled(ThumbsUp)<{ isSelect: boolean }>`
  fill: ${(props) => (props.isSelect ? POSITIVE_SENTIMENT_COLOR : UNSELECTED_SENTIMENT_COLOR)};
  opacity: ${(props) => (props.isSelect ? 1 : 0.5)};

  &:hover {
    fill: ${POSITIVE_SENTIMENT_COLOR};
  }
`

const NegativeSentimentIcon = styled(ThumbsDown)<{ isSelect: boolean }>`
  fill: ${(props) => (props.isSelect ? NEGATIVE_SENTIMENT_COLOR : UNSELECTED_SENTIMENT_COLOR)};
  opacity: ${(props) => (props.isSelect ? 1 : 0.5)};

  &:hover {
    fill: ${NEGATIVE_SENTIMENT_COLOR};
  }
`

export default function Rating() {
  const [selectedSentiment, setSelectedSentiment] = useState<null | Sentiment>(null)

  return (
    <Container>
      <TraceEvent
        element={ANALYTICS_POSITIVE_ELEMENT_NAME}
        name={ANALYTICS_EVENT_NAME}
        events={[BrowserEvent.onClick]}
        section={ANALYTICS_SECTION_NAME}
      >
        Helpful?
        <SentimentContainer>
          <PositiveSentimentIcon
            isSelect={selectedSentiment && selectedSentiment === Sentiment.POSITIVE}
            onClick={() => {
              setSelectedSentiment(Sentiment.POSITIVE)
            }}
          />
        </SentimentContainer>
      </TraceEvent>
      <TraceEvent
        element={ANALYTICS_NEGATIVE_ELEMENT_NAME}
        name={ANALYTICS_EVENT_NAME}
        events={[BrowserEvent.onClick]}
        section={ANALYTICS_SECTION_NAME}
      >
        <SentimentContainer>
          <NegativeSentimentIcon
            isSelect={selectedSentiment && selectedSentiment === Sentiment.NEGATIVE}
            onClick={() => {
              setSelectedSentiment(Sentiment.NEGATIVE)
            }}
          />
        </SentimentContainer>
      </TraceEvent>
    </Container>
  )
}

import React, { useCallback, useMemo, useState } from 'react'

import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent } from '@uniswap/analytics-events'
import { ThumbsUp, ThumbsDown } from 'react-feather'
import { colors } from '../../theme/color'

import styled from '@emotion/styled'

const ANALYTICS_SECTION_NAME = 'RATING'
const ANALYTICS_POSITIVE_ELEMENT_NAME = 'POSITIVE_SENTIMENT'
const ANALYTICS_NEGATIVE_ELEMENT_NAME = 'NEGATIVE_SENTIMENT'
const ANALYTICS_EVENT_NAME = 'RATING_CLICKED'

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

const PositiveSentimentIcon = styled(ThumbsUp)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.greenVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};

  &:hover {
    fill: ${colors.greenVibrant};
  }
`

const NegativeSentimentIcon = styled(ThumbsDown)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.redVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};

  &:hover {
    fill: ${colors.redVibrant};
  }
`

const StyledTextDiv = styled.div`
  font-size: 1.25rem;
  padding-right: 0.5rem;
`

export default function SentimentTracking() {
  const [selectedSentiment, setSelectedSentiment] = useState<null | Sentiment>(null)

  const isSentimentSelected = useCallback(
    (sentiment: Sentiment) => selectedSentiment && selectedSentiment === sentiment,
    [selectedSentiment]
  )

  return (
    <Container>
      <TraceEvent
        element={ANALYTICS_POSITIVE_ELEMENT_NAME}
        name={ANALYTICS_EVENT_NAME}
        events={[BrowserEvent.onClick]}
        section={ANALYTICS_SECTION_NAME}
      >
        <StyledTextDiv>Helpful?</StyledTextDiv>
        <SentimentContainer>
          <PositiveSentimentIcon
            isSelected={isSentimentSelected(Sentiment.POSITIVE)}
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
            isSelected={isSentimentSelected(Sentiment.NEGATIVE)}
            onClick={() => {
              setSelectedSentiment(Sentiment.NEGATIVE)
            }}
          />
        </SentimentContainer>
      </TraceEvent>
    </Container>
  )
}

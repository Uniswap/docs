import styled from '@emotion/styled'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent } from '@uniswap/analytics-events'
import React, { useCallback, useState } from 'react'
import { Frown, Meh, Smile } from 'react-feather'

import { colors } from '../../theme/color'

const ANALYTICS_SECTION_NAME = 'RATING'
const ANALYTICS_POSITIVE_ELEMENT_NAME = 'POSITIVE_SENTIMENT'
const ANALYTICS_NEGATIVE_ELEMENT_NAME = 'NEGATIVE_SENTIMENT'
const ANALYTICS_NEUTRAL_ELEMENT_NAME = 'NEUTRAL_SENTIMENT'
const ANALYTICS_EVENT_NAME = 'RATING_CLICKED'

enum Sentiment {
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const PositiveSentimentIcon = styled(Smile)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.greenVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};

  &:hover {
    fill: ${colors.greenVibrant};
  }
`

const NegativeSentimentIcon = styled(Frown)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.redVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};

  &:hover {
    fill: ${colors.redVibrant};
  }
`

const NeutralSentimentIcon = styled(Meh)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.yellowVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
  margin: 0 0.2rem;

  &:hover {
    fill: ${colors.yellowVibrant};
  }
`

const StyledTextDiv = styled.div`
  font-size: 1rem;
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
      <StyledTextDiv>Helpful?</StyledTextDiv>
      <TraceEvent
        element={ANALYTICS_POSITIVE_ELEMENT_NAME}
        name={ANALYTICS_EVENT_NAME}
        events={[BrowserEvent.onClick]}
        section={ANALYTICS_SECTION_NAME}
      >
        <PositiveSentimentIcon
          isSelected={isSentimentSelected(Sentiment.POSITIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.POSITIVE)
          }}
        />
      </TraceEvent>
      <TraceEvent
        element={ANALYTICS_NEUTRAL_ELEMENT_NAME}
        name={ANALYTICS_EVENT_NAME}
        events={[BrowserEvent.onClick]}
        section={ANALYTICS_SECTION_NAME}
      >
        <NeutralSentimentIcon
          isSelected={isSentimentSelected(Sentiment.NEUTRAL)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEUTRAL)
          }}
        />
      </TraceEvent>
      <TraceEvent
        element={ANALYTICS_NEGATIVE_ELEMENT_NAME}
        name={ANALYTICS_EVENT_NAME}
        events={[BrowserEvent.onClick]}
        section={ANALYTICS_SECTION_NAME}
      >
        <NegativeSentimentIcon
          isSelected={isSentimentSelected(Sentiment.NEGATIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEGATIVE)
          }}
        />
      </TraceEvent>
    </Container>
  )
}

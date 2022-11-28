import styled from '@emotion/styled'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, DocsSentiment, DocsSentimentSection, EventName } from '@uniswap/analytics-events'
import React, { useCallback, useState } from 'react'
import { Frown, Meh, Smile } from 'react-feather'

import { colors } from '../../theme/color'
import { Opacity } from '../../theme/style'

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
  opacity: ${(props) => (props.isSelected ? Opacity.FULL : Opacity.MEDIUM)};

  &:hover {
    fill: ${colors.greenVibrant};
  }
`

const NegativeSentimentIcon = styled(Frown)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.redVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? Opacity.FULL : Opacity.MEDIUM)};

  &:hover {
    fill: ${colors.redVibrant};
  }
`

const NeutralSentimentIcon = styled(Meh)<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? colors.yellowVibrant : 'transparent')};
  opacity: ${(props) => (props.isSelected ? Opacity.FULL : Opacity.MEDIUM)};
  margin: 0 0.2rem;

  &:hover {
    fill: ${colors.yellowVibrant};
  }
`

const StyledTextDiv = styled.div`
  font-size: 1rem;
  padding-right: 0.5rem;
`

export default function SentimentTracking({ analyticsSection }: { analyticsSection: DocsSentimentSection }) {
  const [selectedSentiment, setSelectedSentiment] = useState<null | Sentiment>(null)

  const isSentimentSelected = useCallback(
    (sentiment: Sentiment) => selectedSentiment && selectedSentiment === sentiment,
    [selectedSentiment]
  )

  return (
    <Container>
      <StyledTextDiv>Helpful?</StyledTextDiv>
      <TraceEvent
        element={DocsSentiment.POSITIVE_SENTIMENT}
        name={EventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        <PositiveSentimentIcon
          isSelected={isSentimentSelected(Sentiment.POSITIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.POSITIVE)
          }}
        />
      </TraceEvent>
      <TraceEvent
        element={DocsSentiment.NEUTRAL_SENTIMENT}
        name={EventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        <NeutralSentimentIcon
          isSelected={isSentimentSelected(Sentiment.NEUTRAL)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEUTRAL)
          }}
        />
      </TraceEvent>
      <TraceEvent
        element={DocsSentiment.NEGATIVE_SENTIMENT}
        name={EventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
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

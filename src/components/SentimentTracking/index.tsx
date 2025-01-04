import styled from '@emotion/styled'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, DocsSentiment, DocsSentimentSection, SharedEventName } from '@uniswap/analytics-events'
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

const PositiveSentimentIcon = styled(Smile)<{ selected: boolean }>`
  fill: ${(props) => (props.selected ? colors.greenVibrant : 'transparent')};
  opacity: ${(props) => (props.selected ? Opacity.FULL : Opacity.MEDIUM)};

  &:hover {
    fill: ${colors.greenVibrant};
  }
`

const NegativeSentimentIcon = styled(Frown)<{ selected: boolean }>`
  fill: ${(props) => (props.selected ? colors.redVibrant : 'transparent')};
  opacity: ${(props) => (props.selected ? Opacity.FULL : Opacity.MEDIUM)};

  &:hover {
    fill: ${colors.redVibrant};
  }
`

const NeutralSentimentIcon = styled(Meh)<{ selected: boolean }>`
  fill: ${(props) => (props.selected ? colors.yellowVibrant : 'transparent')};
  opacity: ${(props) => (props.selected ? Opacity.FULL : Opacity.MEDIUM)};
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
 // Temporarily disabled feedback widget
 return null

   /* Original return:
  return (
    <Container>
      <StyledTextDiv>Helpful?</StyledTextDiv>
      <TraceEvent
        element={DocsSentiment.POSITIVE_SENTIMENT}
        name={SharedEventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        <PositiveSentimentIcon
          selected={isSentimentSelected(Sentiment.POSITIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.POSITIVE)
          }}
        />
      </TraceEvent>
      <TraceEvent
        element={DocsSentiment.NEUTRAL_SENTIMENT}
        name={SharedEventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        <NeutralSentimentIcon
          selected={isSentimentSelected(Sentiment.NEUTRAL)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEUTRAL)
          }}
        />
      </TraceEvent>
      <TraceEvent
        element={DocsSentiment.NEGATIVE_SENTIMENT}
        name={SharedEventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        <NegativeSentimentIcon
          selected={isSentimentSelected(Sentiment.NEGATIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEGATIVE)
          }}
        />
      </TraceEvent>
    </Container>
  )
    */
}

import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, DocsSentiment, DocsSentimentSection, SharedEventName } from '@uniswap/analytics-events'
import React, { useCallback, useState } from 'react'
import { Frown, Meh, Smile } from 'react-feather'

enum Sentiment {
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
}

export default function SentimentTracking({ analyticsSection }: { analyticsSection: DocsSentimentSection }) {
  const [selectedSentiment, setSelectedSentiment] = useState<null | Sentiment>(null)

  const isSentimentSelected = useCallback(
    (sentiment: Sentiment) => selectedSentiment && selectedSentiment === sentiment,
    [selectedSentiment]
  )

  return (
    <div>
      <div>Helpful?</div>
      <TraceEvent
        element={DocsSentiment.POSITIVE_SENTIMENT}
        name={SharedEventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        {/* <PositiveSentimentIcon
          selected={isSentimentSelected(Sentiment.POSITIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.POSITIVE)
          }}
        /> */}
      </TraceEvent>
      <TraceEvent
        element={DocsSentiment.NEUTRAL_SENTIMENT}
        name={SharedEventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        {/* <NeutralSentimentIcon
          selected={isSentimentSelected(Sentiment.NEUTRAL)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEUTRAL)
          }}
        /> */}
      </TraceEvent>
      <TraceEvent
        element={DocsSentiment.NEGATIVE_SENTIMENT}
        name={SharedEventName.SENTIMENT_SUBMITTED}
        events={[BrowserEvent.onClick]}
        section={analyticsSection}
      >
        {/* <NegativeSentimentIcon
          selected={isSentimentSelected(Sentiment.NEGATIVE)}
          onClick={() => {
            setSelectedSentiment(Sentiment.NEGATIVE)
          }}
        /> */}
      </TraceEvent>
    </div>
  )
}

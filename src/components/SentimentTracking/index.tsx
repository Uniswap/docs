import { DocsSentimentSection } from '@uniswap/analytics-events'
import React, { useCallback, useState } from 'react'
import { Happy, Sad, Neutral } from '../Icons'
import SentimentButton from './SentimentButton'

export enum Sentiment {
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
}

export default function SentimentTracking({ analyticsSection }: { analyticsSection: DocsSentimentSection }) {
  const [selectedSentiment, setSelectedSentiment] = useState<null | Sentiment>(null)

  const isSentimentSelected = useCallback(
    (sentiment: Sentiment) => selectedSentiment && selectedSentiment === sentiment,
    [selectedSentiment],
  )

  return (
    <div className="flex flex-row space-x-4 !mt-9">
      <div className="Sentiment__question">Was this helpful?</div>
      <div className="flex flex-row space-x-1">
        <SentimentButton
          sentiment={Sentiment.POSITIVE}
          icon={<Happy className="h-5 w-5 group/positive" />}
          selected={isSentimentSelected(Sentiment.POSITIVE)}
          onSelect={setSelectedSentiment}
          analyticsSection={analyticsSection}
        />
        <SentimentButton
          sentiment={Sentiment.NEUTRAL}
          icon={<Neutral className="h-5 w-5 group/neutral" />}
          selected={isSentimentSelected(Sentiment.NEUTRAL)}
          onSelect={setSelectedSentiment}
          analyticsSection={analyticsSection}
        />
        <SentimentButton
          sentiment={Sentiment.NEGATIVE}
          icon={<Sad className="h-5 w-5 group/negative" />}
          selected={isSentimentSelected(Sentiment.NEGATIVE)}
          onSelect={setSelectedSentiment}
          analyticsSection={analyticsSection}
        />
      </div>
    </div>
  )
}

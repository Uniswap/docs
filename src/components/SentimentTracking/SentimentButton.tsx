import React from 'react'
import { Sentiment } from '.'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, DocsSentiment, DocsSentimentSection, SharedEventName } from '@uniswap/analytics-events'
import cn from 'classnames'

interface SentimentButtonProps {
  sentiment: Sentiment
  icon: React.ReactNode
  selected: boolean
  onSelect: (sentiment: Sentiment) => void
  analyticsSection: DocsSentimentSection
}

const SentimentButton: React.FC<SentimentButtonProps> = ({ sentiment, icon, selected, onSelect, analyticsSection }) => {
  const sentimentMap: Record<Sentiment, DocsSentiment> = {
    [Sentiment.POSITIVE]: DocsSentiment.POSITIVE_SENTIMENT,
    [Sentiment.NEUTRAL]: DocsSentiment.NEUTRAL_SENTIMENT,
    [Sentiment.NEGATIVE]: DocsSentiment.NEGATIVE_SENTIMENT,
  }

  const handleClick = () => onSelect(sentiment)

  return (
    <TraceEvent
      element={sentimentMap[sentiment]}
      name={SharedEventName.SENTIMENT_SUBMITTED}
      events={[BrowserEvent.onClick]}
      section={analyticsSection}
    >
      <button
        onClick={handleClick}
        className={cn(`group/${sentiment.toLowerCase()}`, { selected })}
        aria-label={`Rate as ${sentiment.toLowerCase()}`}
      >
        {icon}
      </button>
    </TraceEvent>
  )
}

export default SentimentButton

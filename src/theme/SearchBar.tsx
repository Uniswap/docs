import React from 'react'
import OriginalSearchBar from '@theme-original/SearchBar'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, EventName } from '@uniswap/analytics-events'

export default function SearchBarWithAnalytics(props) {
  return (
    <>
      <TraceEvent events={[BrowserEvent.onClick]} name={EventName.SEARCH_BAR_CLICKED}>
        <div>
          <OriginalSearchBar {...props} />
        </div>
      </TraceEvent>
    </>
  )
}

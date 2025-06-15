import OriginalSearchBar from '@theme-original/SearchBar'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, SharedEventName } from '@uniswap/analytics-events'
import React from 'react'

export default function SearchBarWithAnalytics(props: React.ComponentProps<typeof OriginalSearchBar>) {
  return (
    <>
      <TraceEvent events={[BrowserEvent.onClick]} name={SharedEventName.SEARCH_BAR_CLICKED}>
        {/* Required for onClick to register */}
        <div>
          <OriginalSearchBar {...props} />
        </div>
      </TraceEvent>
    </>
  )
}

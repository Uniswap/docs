import styled from '@emotion/styled'
import OriginalSearchBar from '@theme-original/SearchBar'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, SharedEventName } from '@uniswap/analytics-events'
import React from 'react'

const SearchWrapper = styled.div`
  div[class*="searchBox_"] {
    position: static !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .DocSearch.DocSearch-Button {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;
  }
`

export default function SearchBarWithAnalytics(props) {
  return (
    <TraceEvent 
      events={[BrowserEvent.onClick]} 
      name={SharedEventName.SEARCH_BAR_CLICKED}
    >
      <SearchWrapper>
        <OriginalSearchBar {...props} />
      </SearchWrapper>
    </TraceEvent>
  )
}
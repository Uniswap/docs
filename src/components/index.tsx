import React from 'react'

import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, DocsHomepageElementName, EventName } from '@uniswap/analytics-events'

export default function Rating() {
  return (
    <>
      <TraceEvent
        element={DocsHomepageElementName.BUILD_ORACLE}
        events={[BrowserEvent.onClick]}
        name={EventName.APP_LOADED}
      ></TraceEvent>
    </>
  )
}

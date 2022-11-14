import React from 'react'
import OriginalDocSidebarItem from '@theme-original/DocSidebarItem'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, EventName } from '@uniswap/analytics-events'

export default function DocSidebarItem(props: { item }) {
  return (
    <>
      <TraceEvent events={[BrowserEvent.onClick]} element={props.item.label} name={EventName.MENU_CLICK}>
        {/* Required for onClick to register */}
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <OriginalDocSidebarItem {...props} />
        </div>
      </TraceEvent>
    </>
  )
}

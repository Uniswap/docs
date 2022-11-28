import OriginalDocSidebarItem from '@theme-original/DocSidebarItem'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, EventName } from '@uniswap/analytics-events'
import React from 'react'

const DOCUSAURUS_LINK_ITEM_TYPE = 'link'

export default function DocSidebarItem(props: { item }) {
  return (
    <>
      <TraceEvent
        events={[BrowserEvent.onClick]}
        element={props.item.href}
        name={EventName.MENU_CLICKED}
        shouldLogImpression={props.item.type === DOCUSAURUS_LINK_ITEM_TYPE}
      >
        {/* Required for onClick to register */}
        <div
          onClick={(event) => {
            //  Prevents the analytics event from being fired for encapsulating menu items, limiting to only the most granular element
            event.stopPropagation()
          }}
        >
          <OriginalDocSidebarItem {...props} />
        </div>
      </TraceEvent>
    </>
  )
}

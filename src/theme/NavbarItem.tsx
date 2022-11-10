import React from 'react'
import OriginalNavBarItem from '@theme-original/NavbarItem'
import { useLocation } from '@docusaurus/router'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, EventName } from '@uniswap/analytics-events'

const getElementName = (version: string, elementName: string) => {
  return version + ' ' + elementName
}

const getClassName = (version: string, className: string) => {
  return className + ' ' + version
}

export default function NavbarItem(props: { className: string; label: string }) {
  const { pathname } = useLocation()

  const versionDoc = pathname.split('/')
  let activeNav: null | string = null

  if (versionDoc[2] === 'V2' || versionDoc[2] === '2.0.0') {
    activeNav = 'V2'
  } else if (versionDoc[2] === 'V1' || versionDoc[2] === '1.0.0') {
    activeNav = 'V1'
  } else {
    activeNav = 'V3'
  }

  return (
    <>
      <TraceEvent
        events={[BrowserEvent.onClick]}
        element={getElementName(activeNav, props.label)}
        name={EventName.NAVBAR_CLICK}
      >
        <OriginalNavBarItem {...props} className={getClassName(activeNav, props.className)} />
      </TraceEvent>
    </>
  )
}

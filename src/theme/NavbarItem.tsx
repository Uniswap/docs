import React from 'react'
import OriginalNavBarItem from '@theme-original/NavbarItem'
import { useLocation } from '@docusaurus/router'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, EventName } from '@uniswap/analytics-events'

enum ProtocolVersion {
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3',
}

const getElementName = (version: string, elementName: string) => {
  if (elementName in ProtocolVersion) {
    return elementName
  }
  return version + ' ' + elementName
}

const getClassName = (version: string, className: string) => {
  return className + ' ' + version
}

export default function NavbarItem(props: { className: string; label: string }) {
  const { pathname } = useLocation()

  const versionDoc = pathname.split('/')
  let activeNav: null | string = null

  if (versionDoc[2] === ProtocolVersion.V2 || versionDoc[2] === '2.0.0') {
    activeNav = ProtocolVersion.V2
  } else if (versionDoc[2] === ProtocolVersion.V1 || versionDoc[2] === '1.0.0') {
    activeNav = ProtocolVersion.V1
  } else {
    activeNav = ProtocolVersion.V3
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

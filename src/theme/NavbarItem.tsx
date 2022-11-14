import React from 'react'
import OriginalNavBarItem from '@theme-original/NavbarItem'
import { useLocation } from '@docusaurus/router'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, EventName, DocsProtocolVersion } from '@uniswap/analytics-events'

enum ProtocolVersion {
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3',
}

const getSection = (version: string) => {
  if (version === ProtocolVersion.V2) {
    return DocsProtocolVersion.V2
  }

  if (version === ProtocolVersion.V1) {
    return DocsProtocolVersion.V1
  }

  return DocsProtocolVersion.V3
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
        element={props.label}
        name={EventName.NAVBAR_CLICKED}
        section={getSection(activeNav)}
      >
        <OriginalNavBarItem {...props} className={getClassName(activeNav, props.className)} />
      </TraceEvent>
    </>
  )
}

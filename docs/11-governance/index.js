import React from 'react'
import { Redirect } from '@reach/router'

export default function Redirector({ path }) {
  return <Redirect from={path} to={`${path}overview/`} noThrow />
}

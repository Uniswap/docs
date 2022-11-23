import React from 'react'
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs'
import Rating from '../components/Rating'

export default function DocBreadcrumbs(props) {
  return (
    <>
      <OriginalDocBreadcrumbs {...props} />
      <Rating />
    </>
  )
}

import React from 'react'
import { RedocStandalone } from 'redoc'

export default function ApiReference() {
  return (
    <RedocStandalone
      specUrl={'https://beta.api.uniswap.org/v1/nft/docs'}
      options={{
        scrollYOffset: '.navbar', // hides the fixed sidebar and scrolling play nicely with docusaurus navbar
        hideLoading: true, // hides the loading bar
        theme: {
          colors: {
            primary: {
              main: '#25c2a0',
            },
          },
          typography: {
            fontSize: 'var(--ifm-font-size-base)',
            lineHeight: 'var(--ifm-line-height-base)',
            fontFamily: 'var(--ifm-font-family-base)',
            headings: {
              fontFamily: 'var(--ifm-font-family-base)',
              fontWeight: 'var(--ifm-heading-font-weight)',
            },
            code: {
              lineHeight: 'var(--ifm-pre-line-height)',
              fontFamily: 'var(--ifm-font-family-monospace)',
            },
          },
          sidebar: {
            width: '200px', // about the same as the sidebar in the docs area, for consistency
          },
        },
      }}
    />
  )
}

import React from 'react'
import { RedocStandalone } from 'redoc'

export default function ApiReference() {
  return (
    <RedocStandalone
      specUrl={'https://beta.api.uniswap.org/v1/nft/docs'}
      options={{
        scrollYOffset: '.navbar', // hides the fixed sidebar and scrolling play nicely with docusaurus navbar
        hideLoading: true,
        disableSearch: true,
        theme: {
          schema: {
            defaultDetailsWidth: '100%',
          },
          colors: {
            primary: {
              light: 'white',
              dark: 'black',
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
            sidebar: {
              width: '0px', // about the same as the sidebar in the docs area, for consistency
            },
          },
        },
      }}
    />
  )
}

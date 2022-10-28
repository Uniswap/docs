import { init, track } from '@amplitude/analytics-browser'
import { isProductionEnv } from 'src/utils/env'

const API_KEY = isProductionEnv() ? process.env.REACT_APP_AMPLITUDE_KEY : process.env.REACT_APP_AMPLITUDE_TEST_KEY

/**
 * Initializes Amplitude with API key for project.
 *
 * Uniswap has two Amplitude projects: test and production. You must be a
 * member of the organization on Amplitude to view details.
 */
export function initializeAnalytics() {
  if (typeof API_KEY === 'undefined') {
    const keyName = isProductionEnv() ? 'REACT_APP_AMPLITUDE_KEY' : 'REACT_APP_AMPLITUDE_TEST_KEY'
    console.error(`${keyName} is undefined, Amplitude analytics will not run.`)
    return
  }
  init(
    API_KEY,
    /* userId= */ undefined, // User ID should be undefined to let Amplitude default to Device ID
    /* options= */
    {
      // Disable tracking of private user information by Amplitude
      trackingOptions: {
        // IP is being dropped before ingestion on Amplitude side, only being used to determine country.
        ipAddress: isProductionEnv() ? false : true,
        carrier: false,
        city: false,
        region: false,
        dma: false, // designated market area
      },
    }
  )
}

/** Sends an event to Amplitude. */
export function sendAnalyticsEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  const origin = window.location.origin
  if (!API_KEY) {
    console.log(`[analytics(${eventName})]: ${JSON.stringify(eventProperties)}`)
    return
  }

  track(eventName, { ...eventProperties, origin })
}

import React from 'react'
import Layout from '@theme/Layout'
import FeedbackForm from '@site/src/components/FeedbackForm'
import { Envelope } from '../components/Icons'

export default function FeedbackPage() {
  return (
    <Layout title="Submit Feedback" description="Share your feedback with Uniswap Labs">
      <main className="content-page-padding !pt-12 pb-padding-x-large">
        <div className="mx-auto w-full max-w-[640px]">
          <div className="mb-3 flex justify-start">
            <Envelope className="h-8 w-8" color="pink-vibrant" />
          </div>
          <h1 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-1 mb-6">Submit Feedback</h1>
          <FeedbackForm />
        </div>
      </main>
    </Layout>
  )
}

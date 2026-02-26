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
        <div className="mb-3 flex justify-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-small bg-light-pink-fade dark:bg-dark-pink-fade-80">
          <Envelope className="h-6 w-6" color="pink-vibrant" />
        </div>
       </div>
        </div>
          <h1 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-1 mb-6">Submit Feedback</h1>
          <FeedbackForm />
        </div>
      </main>
    </Layout>
  )
}

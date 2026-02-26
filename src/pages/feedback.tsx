import React from 'react'
import Layout from '@theme/Layout'
import FeedbackForm from '@site/src/components/FeedbackForm'

export default function FeedbackPage() {
  return (
    <Layout title="Submit Feedback" description="Share your feedback with Uniswap Labs">
      <main className="content-page-padding py-padding-x-large">
        <h1 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-1 mb-6">Submit Feedback</h1>
        <FeedbackForm />
      </main>
    </Layout>
  )
}
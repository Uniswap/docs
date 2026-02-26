import React, { useState } from 'react'

const FEEDBACK_TYPES = ['Bug', 'Feature request', 'Question', 'Other'] as const

export default function FeedbackForm() {
  const [email, setEmail] = useState('')
  const [feedbackType, setFeedbackType] = useState<(typeof FEEDBACK_TYPES)[number] | ''>('')
  const [followUp, setFollowUp] = useState<boolean | null>(null)
  const [issue, setIssue] = useState('')
  const [challenges, setChallenges] = useState('')
  const [docsUsefulness, setDocsUsefulness] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setErrorMsg('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          feedbackType,
          issue,
          followUp,
          challenges,
          docsUsefulness,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          website: '', 
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        setStatus('error')
        setErrorMsg(data?.details || data?.error || 'Failed to submit feedback.')
        return
      }

      setStatus('success')
      setEmail('')
      setFeedbackType('Bug')
      setIssue('')
      setFollowUp(true)
      setChallenges('')
      setDocsUsefulness('')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-large bg-light-surface-2 dark:bg-dark-surface-2 p-6 space-y-5">
        <div className="rounded-large overflow-hidden bg-light-pink-fade dark:bg-dark-pink-fade-80 mb-2">
          <img
            src="/img/feedback-banner.webp"
            alt="Developers banner"
            className="block w-full h-auto"
            loading="lazy"
          />
        </div>
  
        <h2 className="heading-3 text-light-neutral-1 dark:text-dark-neutral-1">
          Thanks for submitting your feedback
        </h2>
        <p className="body-2 text-light-neutral-2 dark:text-dark-neutral-2">
          We appreciate it. Your input helps us improve Uniswap Docs.
        </p>
  
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setAcceptedTerms(false)
          }}
          className="rounded-large bg-light-pink-vibrant dark:bg-dark-pink-vibrant !text-white px-5 py-3 transition-colors hover:bg-light-pink-vibrant/70 dark:hover:bg-dark-pink-vibrant/70"
        >
          Submit another response
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-large bg-light-surface-2 dark:bg-dark-surface-2 p-6 space-y-5">

      <div className="rounded-large overflow-hidden bg-light-pink-fade dark:bg-dark-pink-fade-80 mb-6">
        <img
          src="/img/feedback-banner.webp"
          alt="Developers banner"
          className="block w-full h-auto"
          loading="lazy"
        />
      </div>


      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">Email*</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-large bg-light-surface-1 dark:bg-dark-surface-1 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
        />
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">Type of feedback*</label>
        <div className="mt-2 space-y-2">
          {FEEDBACK_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 body-2 text-light-neutral-1 dark:text-dark-neutral-1">
              <input
                type="radio"
                name="feedback-type"
                value={type}
                checked={feedbackType === type}
                onChange={() => setFeedbackType(type)}
                required
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">What's the issue, idea, or question?*</label>
        <textarea
          required
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="mt-2 w-full min-h-[120px] rounded-large bg-light-surface-1 dark:bg-dark-surface-1 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
        />
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">Can we follow up with you about your feedback?*</label>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 body-2 text-light-neutral-1 dark:text-dark-neutral-1">
          <input
            type="radio"
            name="follow-up"
            checked={followUp === true}
            onChange={() => setFollowUp(true)}
            required
          />
            Yes
          </label>
          <label className="flex items-center gap-2 body-2 text-light-neutral-1 dark:text-dark-neutral-1">
          <input
            type="radio"
            name="follow-up"
            checked={followUp === false}
            onChange={() => setFollowUp(false)}
            required
          />
            No
          </label>
        </div>
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
          What has been the most challenging part of building on or integrating with Uniswap? (Optional)
        </label>
        <textarea
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          className="mt-2 w-full min-h-[100px] rounded-large bg-light-surface-1 dark:bg-dark-surface-1 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
        />
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
          Have you found Uniswap docs to be useful? (Optional)
        </label>
        <textarea
          value={docsUsefulness}
          onChange={(e) => setDocsUsefulness(e.target.value)}
          className="mt-2 w-full min-h-[100px] rounded-large bg-light-surface-1 dark:bg-dark-surface-1 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
          placeholder="What sections have been most helpful? Are there any that felt confusing, incomplete, or missing?"
        />
      </div>

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      

      <label className="flex items-start gap-2 body-2 text-light-neutral-2 dark:text-dark-neutral-2">
  <input
    type="checkbox"
    checked={acceptedTerms}
    onChange={(e) => setAcceptedTerms(e.target.checked)}
    className="mt-1"
    required
  />
        <span>
          By submitting, I agree to{' '}
          <a
            className="body-2 text-light-accent-1 dark:text-dark-accent-1 underline"
            href="https://support.uniswap.org/hc/en-us/articles/30935100859661-Uniswap-Labs-Terms-of-Service"
            target="_blank"
            rel="noreferrer"
          >
            Uniswap Labs Terms of Service
          </a>{' '}
          and{' '}
          <a
            className="body-2 text-light-accent-1 dark:text-dark-accent-1 underline"
            href="https://support.uniswap.org/hc/en-us/articles/30934457771405-Uniswap-Labs-Privacy-Policy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={loading || !acceptedTerms}
        className="rounded-large bg-light-pink-vibrant dark:bg-dark-pink-vibrant !text-white px-5 py-3 transition-colors hover:bg-light-pink-vibrant/70 dark:hover:bg-dark-pink-vibrant/70 active:bg-light-pink-vibrant/70 active:dark:bg-dark-pink-vibrant/70 active:!text-white disabled:!text-white disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {status === 'success' && (
        <div className="space-y-2">
          <p className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
            Thank you for your feedback!
          </p>
          <p className="body-2 text-light-neutral-2 dark:text-dark-neutral-2">
            We really appreciate you taking the time to share your thoughts.
          </p>
          <p className="body-2 text-light-neutral-2 dark:text-dark-neutral-2">
            If you left your contact info, we’ll follow up with updates or questions as we make improvements.
          </p>
        </div>
      )}
      {status === 'error' && <p className="body-2 text-light-orange-vibrant">{errorMsg}</p>}

    </form>
  )
}
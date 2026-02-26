import React, { useState } from 'react'

const FEEDBACK_TYPES = ['Bug', 'Feature request', 'Question', 'Other'] as const

const DISALLOWED_CHARS_REGEX = /[<>&"']/g

function sanitizeInput(value: string, maxLength: number): string {
  return value.replace(DISALLOWED_CHARS_REGEX, '').slice(0, maxLength)
}

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
      setFeedbackType('')
      setIssue('')
      setFollowUp(null)
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
      <div className="p-0 space-y-5">
  
        <h2 className="heading-3 text-light-neutral-1 dark:text-dark-neutral-1">
          Thanks for submitting your feedback
        </h2>
        <p className="body-2 text-light-neutral-2 dark:text-dark-neutral-2">
          We really appreciate you taking the time to share your thoughts.
        </p>
        <p className="body-2 text-light-neutral-2 dark:text-dark-neutral-2">
          If you left your contact info, we'll follow up with updates or questions as we make improvements.
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
    <form onSubmit={onSubmit} className="space-y-5">


      <div>
      <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
        Email<span className="text-light-pink-vibrant dark:text-dark-pink-vibrant ml-1 font-normal">*</span>
      </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(sanitizeInput(e.target.value, 254))}
          maxLength={254}
          className="mt-2 w-full rounded-large bg-light-surface-2 dark:bg-dark-surface-2 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
        />
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
          Type of feedback<span className="text-light-pink-vibrant dark:text-dark-pink-vibrant ml-1 font-normal">*</span>
        </label>
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
      <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
        What's the issue, idea, or question?<span className="text-light-pink-vibrant dark:text-dark-pink-vibrant ml-1 font-normal">*</span>
      </label>
      <textarea
        required
        value={issue}
        onChange={(e) => setIssue(sanitizeInput(e.target.value, 2000))}
        maxLength={2000}
        className="mt-2 w-full resize-none rounded-large bg-light-surface-2 dark:bg-dark-surface-2 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
      />
      </div>

      <div>
      <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
        Can we follow up with you about your feedback?<span className="text-light-pink-vibrant dark:text-dark-pink-vibrant ml-1 font-normal">*</span>
      </label>
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
          What has been the most challenging part of building on or integrating with Uniswap?
        </label>
        <textarea
          value={challenges}
          onChange={(e) => setChallenges(sanitizeInput(e.target.value, 1000))}
          maxLength={1000}
          className="mt-2 w-full resize-none rounded-large bg-light-surface-2 dark:bg-dark-surface-2 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
        />
      </div>

      <div>
        <label className="body-2 text-light-neutral-1 dark:text-dark-neutral-1">
          Have you found Uniswap docs to be useful?
        </label>
        <textarea
          value={docsUsefulness}
          onChange={(e) => setDocsUsefulness(sanitizeInput(e.target.value, 1000))}
          maxLength={1000}
          className="mt-2 w-full resize-none rounded-large bg-light-surface-2 dark:bg-dark-surface-2 border border-light-surface-3 dark:border-dark-surface-3 p-3 text-light-neutral-1 dark:text-dark-neutral-1"
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

      {status === 'error' && <p className="body-2 text-light-orange-vibrant">{errorMsg}</p>}

    </form>
  )
}
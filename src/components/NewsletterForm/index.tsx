import React, { useState } from 'react'
import { Envelope } from '../../components/Icons'
import cn from 'classnames'

interface NewsletterFormProps {
  headerText: string
  headerTextClass?: string
  globeColorClass: 'pink-vibrant' | 'neutral-2'
  inputClass?: string
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  headerText,
  headerTextClass,
  inputClass,
  globeColorClass,
}) => {
  const [emailInputValue, setEmailInputValue] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailInputValue) {
      setError('Please provide a valid email address.')
      return
    }

    try {
      // Replace '/some-api' with the actual API endpoint
      const response = await fetch('/some-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailInputValue }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setError('')
      } else {
        const data = await response.json()
        setError(data.message || 'Subscription failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <h3 className={cn('heading-3', headerTextClass)}>{headerText}</h3>
      <form onSubmit={handleSubscribe}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full">
            <input
              className={cn('button-label-2 w-full flex-grow rounded-large p-3 pl-[2.7rem]', inputClass)}
              aria-label="Enter Email"
              type="email"
              placeholder="Enter Email"
              value={emailInputValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
            />
            <Envelope className="absolute left-3 top-[50%] h-6 w-6 translate-y-[-50%]" color={globeColorClass} />
          </div>
          <button className="group mt-2 flex items-center justify-center rounded-large bg-light-pink-vibrant p-3 sm:w-32 transition hover:bg-dark-accent-2 dark:bg-dark-pink-vibrant hover:dark:bg-light-accent-2 sm:ml-2 sm:mt-0 w-full !px-0 sm:!px-3">
            <span className="button-label-1 text-white transition group-hover:text-dark-accent-1 group-hover:dark:text-light-accent-1">
              Submit
            </span>
          </button>
        </div>
        <div>
          {!isSubscribed && error && (
            <p className="body-3 mt-2 text-light-status-critical-1 dark:text-dark-status-critical-1">{error}</p>
          )}
          {isSubscribed && (
            <p className="body-3 mt-2 text-light-status-success-1 dark:text-dark-status-success-1">
              Successfully subscribed
            </p>
          )}
        </div>
      </form>
    </>
  )
}

export default NewsletterForm

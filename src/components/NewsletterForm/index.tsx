import React, { useState } from 'react'
import { Envelope } from '../../components/Icons'
import cn from 'classnames'
import Link from '@docusaurus/Link'

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

  return (
    <>
      <h3 className={cn('heading-3', headerTextClass)}>{headerText}</h3>
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full">
           
          <Link to="https://share.hsforms.com/1-5C0iYu9TN2nvz2tz7_5xQsdca9" target="_blank" className="group mt-2 flex items-center justify-center rounded-large bg-light-pink-vibrant p-3 sm:w-32 transition hover:bg-dark-accent-2 dark:bg-dark-pink-vibrant hover:dark:bg-light-accent-2 sm:ml-2 sm:mt-0 w-full !px-0 sm:!px-3">
            <span className="button-label-1 text-white transition group-hover:text-dark-accent-1 group-hover:dark:text-light-accent-1">
              Sign up
            </span>
          </Link>
        </div>
        </div>
      
    </>
  )
}

export default NewsletterForm

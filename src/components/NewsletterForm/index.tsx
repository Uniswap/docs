import React from 'react'
// import { Envelope } from '../../components/Icons'
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
}) => {

  return (
    <>
      <h3 className={cn('heading-3', headerTextClass)}>{headerText}</h3>
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full">
           
          <Link to="https://uniswap.substack.com/" target="_blank" className="group mt-2 flex items-center justify-center rounded-large bg-light-pink-vibrant p-3 sm:w-32 transition-colors duration-150 hover:bg-light-pink-vibrant/70 dark:bg-dark-pink-vibrant dark:hover:bg-dark-pink-vibrant/70 sm:ml-2 sm:mt-0 w-full !px-0 sm:!px-3">
            <span className="button-label-1 text-white transition-colors">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NewsletterForm
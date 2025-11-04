import React from 'react'
import clsx from 'clsx'

export function Cards({ children }) {
  return (
    <div className="grid gap-gap-large sm:grid-cols-2 md:grid-cols-3 mt-padding-medium">
      {children}
    </div>
  )
}

export function Card({ title, href, highlight }) {
  return (
    <a
      href={href}
      className={clsx(
        'flex items-center justify-between rounded-medium border px-padding-large py-padding-medium font-semibold transition-all duration-200 shadow-light-short',
        'hover:-translate-y-[2px] hover:shadow-light-medium',
        'dark:shadow-dark-short hover:dark:shadow-dark-medium',
        highlight
          ?
            'bg-light-pink-fade text-light-accent-1 border-light-accent-1 hover:bg-light-accent-2-hovered hover:border-light-accent-1-hovered dark:bg-dark-pink-fade dark:text-dark-pink-vibrant dark:border-dark-pink-vibrant dark:hover:bg-dark-pink-fade-80'
          :
            'bg-light-surface-1 border-light-surface-3 text-light-neutral-1 hover:border-light-accent-1 hover:text-light-accent-1 dark:bg-dark-surface-1 dark:border-dark-surface-3 dark:text-dark-neutral-1 dark:hover:border-dark-accent-1 dark:hover:text-dark-accent-1'
      )}
    >
      <span>{title}</span>
    </a>
  )
}

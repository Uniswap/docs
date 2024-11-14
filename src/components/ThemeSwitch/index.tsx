import React, { FC, useState, useEffect } from 'react'

import { Switch } from '@headlessui/react'
import { IconMap, Sun, Moon } from '../Icons'

import { ThemeManager } from '../../utils/storage'

import cn from 'classnames'

const ThemeSwitch: FC<{ className?: string }> = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = ThemeManager.get()

      if (!currentTheme) {
        ThemeManager.set('light')
      } else {
        setTheme(currentTheme)
      }
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      ThemeManager.set(newTheme)
      return newTheme
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('class', theme)
  }, [theme])

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      className={cn('group relative inline-flex h-8 w-[3.75rem] items-center rounded-full', className, {
        'bg-light-surface-3': theme === 'light',
        'bg-dark-surface-3': theme === 'dark',
      })}
      aria-label="Toggle theme"
    >
      <span className="flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8">
        <IconMap className="h-4 w-4" icon={theme === 'dark' ? 'moon' : 'sun'} />
      </span>
      <Sun className="absolute left-2 h-4 w-4" />
      <Moon className="absolute right-2 h-4 w-4" />
    </Switch>
  )
}

export default ThemeSwitch

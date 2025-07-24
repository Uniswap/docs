import React, { type ReactNode } from 'react'
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import type { Props } from '@theme/Navbar/ColorModeToggle'
import { Switch } from '@headlessui/react'
import { IconMap, Sun, Moon } from '@site/src/components/Icons'
import cn from 'classnames'

export default function NavbarColorModeToggle({ className }: Props): ReactNode {
  const disabled = useThemeConfig().colorMode.disableSwitch
  const { colorMode, setColorMode } = useColorMode()

  if (disabled) {
    return null
  }

  return (
    <Switch
      checked={colorMode === 'dark'}
      onChange={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      className={cn('group relative inline-flex h-8 w-[3.75rem] items-center rounded-full', className, {
        'bg-light-surface-3': colorMode === 'light',
        'bg-dark-surface-3': colorMode === 'dark',
      })}
      aria-label="Toggle theme"
    >
      <span className="flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8">
        <IconMap className="h-4 w-4" icon={colorMode === 'dark' ? 'moon' : 'sun'} />
      </span>
      <Sun className="absolute left-2 h-4 w-4" />
      <Moon className="absolute right-2 h-4 w-4" />
    </Switch>
  )
}

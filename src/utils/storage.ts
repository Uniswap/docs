import Cookies from 'js-cookie'

export class StorageManager<T> {
  key: string

  constructor(key: string) {
    this.key = key
  }

  set(value: T): void {
    const valueToSet = JSON.stringify(value)
    Cookies.set(this.key, valueToSet, { expires: 365 })
  }

  get(): T | undefined {
    const value = Cookies.get(this.key)

    if (value) {
      return JSON.parse(value)
    }

    return undefined
  }

  remove(): void {
    Cookies.remove(this.key)
  }
}

export type Theme = 'dark' | 'light'

const THEME_STORAGE_NAME = 'uniswap-ui-theme'
export const ThemeManager = new StorageManager<Theme>(THEME_STORAGE_NAME)

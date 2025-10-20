import Cookies from 'js-cookie'

export class StorageManager<T> {
  key: string

  constructor(key: string) {
    this.key = key
  }

  set(value: T): void {
    const valueToSet = JSON.stringify(value)
    Cookies.set(this.key, valueToSet, { expires: 365 })
    localStorage.setItem('theme', value as string)
  }

  get(): T | undefined {
    const cookieValue = Cookies.get(this.key)
    if (cookieValue) {
      try {
        return JSON.parse(cookieValue)
      } catch {
        return cookieValue as unknown as T
      }
    }

    const lsValue = localStorage.getItem('theme')
    if (lsValue) {
      try {
        const parsed = JSON.parse(lsValue)
        this.set(parsed as T)
        return parsed
      } catch {
        this.set(lsValue as unknown as T)
        return lsValue as unknown as T
      }
    }

    return undefined
  }

  remove(): void {
    Cookies.remove(this.key)
    localStorage.removeItem('theme')
  }
}

export type Theme = 'dark' | 'light'

const THEME_STORAGE_NAME = 'uniswap-ui-theme'
export const ThemeManager = new StorageManager<Theme>(THEME_STORAGE_NAME)

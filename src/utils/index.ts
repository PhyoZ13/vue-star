import { JACKPOT_CONFIG } from '@/constants'

export const formatJackpot = (amount: number): string => {
  if (!amount || amount === 0) {
    return '0'
  }

  if (amount >= JACKPOT_CONFIG.MILLION_THRESHOLD) {
    return (amount / JACKPOT_CONFIG.MILLION_THRESHOLD).toFixed(JACKPOT_CONFIG.DECIMAL_PLACES) + 'M'
  } else if (amount >= JACKPOT_CONFIG.THOUSAND_THRESHOLD) {
    return (amount / JACKPOT_CONFIG.THOUSAND_THRESHOLD).toFixed(JACKPOT_CONFIG.DECIMAL_PLACES) + 'K'
  }
  
  return amount.toString()
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = window.setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  
  return obj
} 
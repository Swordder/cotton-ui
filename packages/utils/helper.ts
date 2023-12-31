import { isEmpty } from './types'
export function extractNonEmptyField<T extends Object,P extends keyof T>(obj:T): T[P]{
  return Object.fromEntries(Object.entries(obj).filter(([key,value]) => !isEmpty(value)))
}



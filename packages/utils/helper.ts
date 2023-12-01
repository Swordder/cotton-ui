import { isEmpty } from './types'
export function extractNonEmptyField(obj:Object) {
  return Object.fromEntries(Object.entries(obj).filter(([key,value]) => !isEmpty(value)))
}

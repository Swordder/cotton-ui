export const isString = e => typeof e === 'string'
export const isNumber = e => typeof e === 'number'
export const isBoolean = e => typeof e === 'boolean'
export const isUndefined = e => typeof e === 'undefined'
export const isSymbol = e => typeof e === 'symbol'
export const isNull = e => isUndefined(e.__proto__)
export const isArray = e => Array.isArray(e)
export const isObject = e => Object.prototype.toString.call(e) === '[object Object]'
export const isPicture = (e: string) => {
  return /\.(apng | avif | bmp | gif | ico | cur | jpeg | jpg | png | svg | tif | webp)$/.test(e)
}
export const isEmpty = (e:any) => {
  if (isString(e)) return e ? false : true
  if (isObject(e)) return Reflect.ownKeys(e).length ? false : true
  if (isArray(e)) return e.length ? false : true
  if (isUndefined(e) || isNull(e)) return true
  return false
}

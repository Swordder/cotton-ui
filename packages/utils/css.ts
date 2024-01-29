export const getMergedCls = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(' ')
}

export const useNamespace = (block) => {
  const namespace = 'ct'
  const blockSeperater = '-'
  const elementSeperater = '__'
  const modifySeperater = '--'
  const b = namespace + blockSeperater + block
  const e = (element) => element ? b + elementSeperater + element : ''
  const m = (modifier) => modifier ? b + modifySeperater + modifier : ''
  const em = (element, modifier) => b + elementSeperater + element + modifySeperater + modifier
  const is = (key:string, status?:boolean) => status ? 'is-' + key : ''
  return {
    b,e,m,em,is,
  }
}

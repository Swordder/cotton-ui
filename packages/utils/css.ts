export const getMergedCls = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(' ')
}

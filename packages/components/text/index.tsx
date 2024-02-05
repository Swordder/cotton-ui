import { type } from 'os'
import './style/index.css'
import * as React from 'react'
import { getMergedCls, useNamespace } from '@cotton-ui/utils'

interface Ellipsis {
  type: 'single' | 'multiple'
  count?: number
}
export interface TextProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'error'
  ellipsis?: Ellipsis
  weight?: number
  italic?: boolean
  editable?: boolean
  copyable?: boolean
  children?: React.ReactNode
  className?: string
}

const Text: React.FC<TextProps> = props => {
  const {
    type,
    ellipsis,
    weight,
    italic,
    editable,
    copyable,
    children,
    className
  } = props
  const {b,e,is} = useNamespace('text')
  const mergedCls = getMergedCls(b, e(type && 'color-' + type),className)
  return (
    <div className={mergedCls}></div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Text.displayName = 'Text';
}

export default Text

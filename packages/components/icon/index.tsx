import './style/index.css'
import React from 'react'
import { getMergedCls, isString } from '@cotton-ui/utils'

export interface IconProps {
  size?: string | number
  prefix? : string
  name: string
  color? : string
  rotate?: number
  className?: string
  onClick?: () => void
}

const Icon: React.FC<IconProps> = (props) => {
  const { prefix, name, size, color, rotate, className, onClick} = props
  const serialSize = size ? isString(size) ? size as string : size + 'px' : 'inherit'
  const dynamaicStyle = {
    fontSize: serialSize,
    color: color,
    transform: `rotate(${rotate ?? 0}deg)`
  }
  const mergedCls = getMergedCls('ct-icon', prefix, name, className)
  return (
    <span className={mergedCls} style={dynamaicStyle} onClick={onClick}></span>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Icon.displayName = 'Icon';
}

export default Icon

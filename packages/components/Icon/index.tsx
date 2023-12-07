import './style/index.css'
import React from 'react'
import { isString } from '@cotton-ui/utils'

export interface IconProps {
  size?: string | number
  prefix : string
  name: string
  color? : string
  rotate?: number
  onClick?: () => void
}

const Icon: React.FC<IconProps> = (props) => {
  const { prefix, name, size, color, rotate, onClick} = props
  let dynamaicStyle = {}
  const serialSize = size ? isString(size) ? size as string : size + 'px' : '20px'
  dynamaicStyle = {
    ...dynamaicStyle,
    fontSize: serialSize,
    color: color || 'initial',
    transform: `rotate(${rotate ?? 0}deg)`
  }
  return (
    <span className={`ct-icon ${prefix} ${name}`} style={dynamaicStyle} onClick={onClick}></span>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Icon.displayName = 'Icon';
}

export default Icon

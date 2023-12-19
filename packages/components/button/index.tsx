import './style/index.css'
import * as React from 'react'
import { extractNonEmptyField, getMergedCls, tinycolor } from '@cotton-ui/utils'
import Icon from '../icon'

export interface ButtonProps {
  size?: 'large' | 'small'
  type?: 'primary'|'success'|'warning'|'danger'|'error'|'info'
  plain?: boolean
  color?: string
  round?: boolean
  circle?:boolean
  disabled?: boolean
  loadingIcon?: React.ReactNode
  loading?: boolean
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = props => {
  const {size,type,plain,color,round,circle,disabled,loadingIcon,loading,children,onClick} = props
  const sizeCls = size ? 'ct-button--' + size : ''
  const typeCls = type ? 'ct-button--' + type : ''
  const plainCls = plain ? 'is-plain' : ''
  const roundCls = round ? 'is-round' : ''
  const circleCls = circle ? 'is-circle' : ''
  const disabledCls = disabled ? 'is-disabled' : ''
  const loadingCls = loading ? 'is-loading' : ''
  const mergedCls = getMergedCls('ct-button', sizeCls,typeCls,plainCls,roundCls,circleCls,disabledCls,loadingCls)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const handleClick = (e) => {
    if (disabled) return 
    onClick?.(e)
  }

  const getCustomButtonStyles = () => {
    let bgColor, borderColor, textColor, hoverBgColor, hoverBorderColor, hoverTextColor, disabledBgColor, disabledBorderColor, disabledTextColor

    const getMixedColor = (amount=0) => {
      return tinycolor.mix(color,'#fff',amount)?.toRgbString()
    }
    if (color) {
          textColor = hoverTextColor = disabledTextColor = '#fff'
          hoverBorderColor = hoverBgColor = getMixedColor(30)!
          disabledBorderColor = disabledBgColor = getMixedColor(50)!
          borderColor = bgColor = color
          if (plain) {
            textColor = hoverBgColor = hoverBorderColor = color
            bgColor = disabledBgColor = getMixedColor(90)!
            borderColor = disabledTextColor = getMixedColor(50)!
            hoverTextColor = '#fff'
            disabledBorderColor = getMixedColor(80)!
          }
    }
    return {
      '--ct-button-text-color': textColor,
      '--ct-button-bg-color': bgColor,
      '--ct-button-border-color': borderColor,
      '--ct-button-hover-text-color': hoverTextColor,
      '--ct-button-hover-border-color': hoverBorderColor,
      '--ct-button-hover-bg-color': hoverBgColor,
      '--ct-button-disabled-text-color': disabledTextColor,
      '--ct-button-disabled-border-color': disabledBorderColor,
      '--ct-button-disabled-bg-color': disabledBgColor
    }
  }
  const customButtonStyles = getCustomButtonStyles() as React.CSSProperties
  
  const LoadingIcon = loadingIcon ?? <Icon name='ct-icon-loading' className={loading ? 'is-loading' : ''}></Icon>
  return (
    <button className={mergedCls}  ref={buttonRef} onClick={handleClick} style={customButtonStyles}>
      {loading && LoadingIcon}
      {children}
    </button>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

export default Button

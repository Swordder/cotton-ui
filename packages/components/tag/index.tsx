import { getMergedCls, tinycolor, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'
import Icon from '../icon'

export interface TagProps {
  type?: 'primary'|'success'|'warning'|'danger'|'error'|'info'
  size?: 'large' | 'small'
  round?: boolean
  plain?: boolean
  closable?: boolean
  children?: React.ReactNode
  color?: string
  onClose?: React.MouseEventHandler<HTMLDivElement>
  className?: string
}

const Tag: React.FC<TagProps> = props => {
  const {type, size, round, plain, closable, color, children, onClose, className} = props

  const {b, e, m, is} = useNamespace('tag')
  const mergedCls = getMergedCls(b, m(type), m(size), is('round',round), is('plain',plain), className)

  const getCustomTagStyles = () => {
    let bgColor, borderColor, textColor, closeColor, closeHoverColor, closeHoverBgColor

    const getMixedColor = (amount=0) => {
      return tinycolor.mix(color,'#fff',amount)?.toRgbString()
    }
    if (color) {
          textColor = closeColor = closeHoverColor = '#fff'
          borderColor = bgColor = color
          closeHoverBgColor = getMixedColor(30)
          if (plain) {
            textColor = borderColor = closeColor = closeHoverBgColor = color
            bgColor = closeHoverColor = '#fff'
          }
    }
    return {
      '--ct-tag-border-color': borderColor,
      '--ct-tag-bg-color': bgColor,
      '--ct-tag-close-color': closeColor,
      '--ct-tag-close-hover-bg-color': closeHoverBgColor,
      '--ct-tag-close-hover-color': closeHoverColor,
      color: textColor,
    }
  }
  const customTagStyles = getCustomTagStyles()

  const CloseIcon = <Icon name='ct-icon-close'></Icon>
  return (
    <div className={mergedCls} onClick={onClose} style={customTagStyles}>
      <div className={e('content')}>{children}</div>
      {closable && <div className={e('close')}>{CloseIcon}</div>}
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}

export default Tag

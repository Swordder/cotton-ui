import { getMergedCls, isNumber, isString, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'
import Icon from '../icon'

export interface AvatarProps {
  src?: string
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down' |'none'
  alt?: string
  circle?: boolean
  defaultSrc?: string
  size?: number | 'large' | 'small'
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLImageElement>
}

const Avatar: React.FC<AvatarProps> = props => {
  const { src, fit, alt, defaultSrc, circle, size, className, children, onClick } = props

  const {b,e,is} = useNamespace('avatar')
  const mergedCls = getMergedCls(b, is('circle', circle), className)

  let width,height
  width = height = size ? isString(size) ?`var(--ct-avatar-size-${size})` : size + 'px' : ''
  const defaultAvatarSize = size === 'large' ? 28 : size === 'small' ? 15 : isNumber(size) ? size! - 6 : 20

  const [hasError, setHasError] = React.useState(false)

  // 图片请求发起的重试次数限制
  const reRequestLimit = 5
  const [errorRequestCount, setErrorRequestCount] = React.useState(0)
  let DefaultAvatar = <Icon name='ct-icon-default-avatar' size={defaultAvatarSize}></Icon>
  const handleError = (e) => {
    setErrorRequestCount(count => count + 1)
    if (errorRequestCount < reRequestLimit) {
      if (defaultSrc) {
        e.target.src = defaultSrc
        return
      } else {
        setHasError(true)
      }
    } else {
      setHasError(true)
    }
  }

  return (
    <div className={mergedCls} style={{width, height}}>
      {src  && !hasError && <img className={e('image')} src={src} alt={alt} style={{objectFit: fit}} onClick={onClick} onError={handleError}/>}
      {hasError && DefaultAvatar}
      {children}
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}

export default Avatar

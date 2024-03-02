import './style/index.css'
import * as React from 'react'
import Col from '../col'
import Icon from '../icon'
import { TabsContext } from '../tabs'
import { getMergedCls, useNamespace } from '@cotton-ui/utils'
import { IconProps } from '../tabs'

export interface TabItemProps {
  icon?: IconProps
  children?: React.ReactNode
  className?: string
  index: number
  onClick?: (index: number, itemWidth: number) => void
  onItemClose?: (e: React.SyntheticEvent, index: number) => void
}

const TabItem = React.forwardRef<HTMLDivElement, TabItemProps>((props,ref) => {
  const { icon, children, className,index, onClick,onItemClose } = props
  const {b} = useNamespace('tabItem')
  const mergedCls = getMergedCls(b, className)
  const { closeable } = React.useContext(TabsContext)
  const TabItemIcon = icon && <Icon prefix={icon?.prefix} name={icon.name}></Icon>

  const handleClick:React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.(index,(e.target as HTMLDivElement).clientWidth)
  }
  return (
    <Col className={mergedCls}>
      <div onClick={handleClick} ref={ref}>
        {TabItemIcon}
        {children}
        {closeable && <Icon name='ct-icon-close' size={12} onClick={onItemClose}></Icon>} 
      </div>
    </Col>
  )
})

if (process.env.NODE_ENV !== 'production') {
  TabItem.displayName = 'TabItem';
}

export default TabItem

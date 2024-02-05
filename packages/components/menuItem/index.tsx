import './style/index.css'
import * as React from 'react'
import { Fragment, useContext } from 'react'
import { MenuContext } from '../menu'
import { LevelContext } from '../menu'
import { getMergedCls, useNamespace } from '@cotton-ui/utils'

export interface MenuItemProps {
  label: string
  index: string | number
  icon?: React.ReactNode
  rightSlot?: React.ReactNode
  className?: string
  onClick?: (label:string, index: string | number) => void
}


const MenuItem: React.FC<MenuItemProps> = props => {
  const { label, index, icon, rightSlot, className, onClick } = props

  const {b, e} = useNamespace('menuItem')
  const mergedCls = getMergedCls(b,className)

  const menuContext = useContext(MenuContext)
  const {textColor,activeTextColor,activeIndex,menuTrigger} = menuContext
  const levelContext = useContext(LevelContext)

  const handleClick: React.MouseEventHandler = e => {
    menuContext.updateActiveIndex?.(index)
    e.stopPropagation()
    onClick && onClick(label,index)
  }
  return (
    <Fragment key={index}>
        <li onClick={handleClick} className={mergedCls} style={{color: activeIndex === index ? activeTextColor : textColor,paddingLeft: 20 * levelContext}}>
          {icon}
          <span className={e('title')}>{ label }</span>
          {rightSlot}
        </li>
    </Fragment>
  )
}

if (process.env.NODE_ENV !== 'production') {
  MenuItem.displayName = 'MenuItem';
}

export default MenuItem

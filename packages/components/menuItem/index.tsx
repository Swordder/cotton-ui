import './style/index.css'
import * as React from 'react'
import { Fragment, useContext } from 'react'
import Icon from '../Icon'
import {MenuContext} from '../menu'

export interface MenuItemProps {
  label: string
  index: string
  icon?: {
    prefix: string
    name: string
  }
  onClick?: (label:string, index: string) => void
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { label, index, icon, onClick } = props
  const menuContext = useContext(MenuContext)
  const {textColor,activeTextColor,activeIndex,menuTrigger} = menuContext
  const handleClick: React.MouseEventHandler = e => {
    menuContext.updateActiveIndex(index)
    e.stopPropagation()
    onClick && onClick(label,index)
  }
  return (
    <Fragment key={index}>
      <li onClick={handleClick} className='ct-menuItem' style={{color: activeIndex === index ? activeTextColor : textColor}}>
        {icon && <Icon name={icon.name} prefix={icon.prefix}></Icon>}
        <span className='ct-menuItem__title'>{ label }</span>
      </li>
    </Fragment>
  )
}

if (process.env.NODE_ENV !== 'production') {
  MenuItem.displayName = 'MenuItem';
}

export default MenuItem

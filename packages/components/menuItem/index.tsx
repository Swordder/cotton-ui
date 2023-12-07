import './style/index.css'
import * as React from 'react'
import { Fragment, useContext } from 'react'
import { MenuContext } from '../menu'
import { LevelContext } from '../menu'

export interface MenuItemProps {
  label: string
  index: string
  icon?: React.ReactNode
  rightSlot?: React.ReactNode
  onClick?: (label:string, index: string) => void
}


const MenuItem: React.FC<MenuItemProps> = props => {
  const { label, index, icon, rightSlot, onClick } = props
  const menuContext = useContext(MenuContext)
  const {textColor,activeTextColor,activeIndex,menuTrigger} = menuContext
  const handleClick: React.MouseEventHandler = e => {
    menuContext.updateActiveIndex(index)
    e.stopPropagation()
    onClick && onClick(label,index)
  }
  const levelContext = useContext(LevelContext)
  return (
    <Fragment key={index}>
        <li onClick={handleClick} className='ct-menuItem' style={{color: activeIndex === index ? activeTextColor : textColor,paddingLeft: 20 * levelContext}}>
          {icon}
          <span className='ct-menuItem__title'>{ label }</span>
          {rightSlot}
        </li>
    </Fragment>
  )
}

if (process.env.NODE_ENV !== 'production') {
  MenuItem.displayName = 'MenuItem';
}

export default MenuItem

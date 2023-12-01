import './style/index.css'
import * as React from 'react'
import Icon from '../Icon'
import { Fragment, useContext } from 'react'
import { MenuContext } from '../menu'
import type { IconProps } from '../Icon'
import { LevelContext } from '../menu'

export interface SubMenuProps {
  label: string
  index: string
  childrenCount: number
  icon?: IconProps
  disabled?: boolean
  children?: React.ReactNode
}


const SubMenu: React.FC<SubMenuProps> = React.forwardRef<HTMLLIElement,SubMenuProps>((props,ref) => {
  const { label, index, icon, children, childrenCount, disabled} = props
  const menuContext = useContext(MenuContext)
  const {textColor,activeTextColor,activeIndex,menuTrigger} = menuContext
  const [isExpand, setIsExpand] = React.useState(false)
  const rotate = isExpand ? 0 : 180
  const level = useContext(LevelContext)

  const dynamaicSubMenuStyle = {
    color: activeIndex === index ? activeTextColor : textColor,
    paddingLeft: 20 * level + 'px',
  }
  const dynamicMenuItemStyle = {
    paddingLeft: 0,
    color: activeIndex === index ? activeTextColor : textColor,
    maxHeight: isExpand  ? `calc(var(--ct-menu-item-height) * ${childrenCount})`: '0',
    overflow: isExpand ? 'auto': 'hidden',
    opacity: isExpand ? 1 : 0,
    transition: 'var(--ct-transition-all)'
  }


  const handleSubMenuClick = (e) => {
    menuContext.updateActiveIndex(index)
    setIsExpand(isExpand => !isExpand)
  }
  const handleMenuItemClick = (a,b) => {
    console.log(a, b)
  }
  return (
    <Fragment key={index}>
      <LevelContext.Provider value={level + 1}>
        <li className='ct-subMenu' onClick={handleSubMenuClick} style={dynamaicSubMenuStyle} ref={ref}>
          <div className='ct-subMenu__head'>
            {icon && <Icon {...icon}></Icon>}
            <span className='ct-subMenu__label'>{label}</span>
          </div>
          <Icon name='ct-icon-arrow-up' prefix='ct-icon' rotate={rotate} size={18}></Icon>
        </li>
        <ul style={dynamicMenuItemStyle}>
          {children}
        </ul>
      </LevelContext.Provider>
    </Fragment>
  )
})

if (process.env.NODE_ENV !== 'production') {
  SubMenu.displayName = 'SubMenu';
}

export default SubMenu

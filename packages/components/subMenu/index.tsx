import './style/index.css'
import * as React from 'react'
import MenuItem from '../menuItem'
import Icon from '../Icon'
import { Fragment, useContext } from 'react'
import { MenuContext } from '../menu'
import { extractNonEmptyField } from '@cotton-ui/utils'

export interface SubMenuProps {
  label: string
  index: string
  icon?: {
    prefix: string
    name: string
  }
  disabled?: boolean
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = React.forwardRef<HTMLLIElement,SubMenuProps>((props,ref) => {
  const { label, index, icon, children, disabled} = props
  const menuContext = useContext(MenuContext)
  const {textColor,activeTextColor,activeIndex,menuTrigger} = menuContext
  const [isExpand, setIsExpand] = React.useState(false)
  const rotate = isExpand ? 0 : 180
  const dynamicMenuItemStyle = extractNonEmptyField({
    color: activeIndex === index ? activeTextColor : textColor,
    maxHeight: isExpand ? '400px': '0',
    overflow: isExpand ? 'auto': 'hidden',
    opacity: isExpand ? 1 : 0,
    transition: 'var(--ct-transition-all)'
  })
  const handleSubMenuClick = (e) => {
    menuContext.updateActiveIndex(index)
    setIsExpand(isExpand => !isExpand)
  }
  const handleMenuItemClick = (a,b) => {
    console.log(a, b)
  }
  return (
    <Fragment key={index}>
      <li className='ct-subMenu' onClick={handleSubMenuClick} style={{color: activeIndex === index ? activeTextColor : textColor}} ref={ref}>
        <div className='ct-subMenu__head'>
          {icon && <Icon name={icon.name} prefix={icon.prefix} size={16}></Icon>}
          <span className='ct-subMenu__label'>{label}</span>
        </div>
        <Icon name='ct-icon-arrow-up' prefix='ct-icon' rotate={rotate} size={18}></Icon>
      </li>
      <ul style={dynamicMenuItemStyle}>
        {children}
      </ul>
    </Fragment>
  )
})

if (process.env.NODE_ENV !== 'production') {
  SubMenu.displayName = 'SubMenu';
}

export default SubMenu

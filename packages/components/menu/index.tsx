import { getMergedCls, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'
import { createContext } from 'react'

export interface MenuProps {
  mode?: 'horizontal' | 'vertical'
  width?: string | number
  backgroundColor?: string
  textColor?: string
  activeTextColor?: string
  defaultActiveIndex?: string | number
  menuTrigger?: 'click' | 'hover'
  className?: string
  children: React.ReactNode
}

export const MenuContext = createContext<{
  textColor?: string
  activeTextColor?: string
  activeIndex?: string | number
  menuTrigger?: 'click' | 'hover'
  updateActiveIndex?: (index: string | number) => void
} >({})

export const LevelContext = React.createContext(1)

const Menu: React.FC<MenuProps> = props => {
  const { 
    width,
    mode, 
    backgroundColor, 
    textColor = '#303133',
    activeTextColor = '#5D5FEF',
    defaultActiveIndex = '',
    menuTrigger = 'click',
    className,
    children,
  } = props
  const {b} = useNamespace('menu')
  const mergedCls = getMergedCls(b,className)
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex)
  const menuContext = React.useContext(MenuContext)
  const contextValue = {
    width,
    ...menuContext,
    textColor,
    activeTextColor,
    activeIndex,
    updateActiveIndex: setActiveIndex
  }

  return (
    <ul className={mergedCls} style={{backgroundColor,width}}>
        <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
    </ul>
  )
}
 
if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

export default Menu


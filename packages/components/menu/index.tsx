import './style/index.css'
import * as React from 'react'
import { createContext } from 'react'

export interface MenuProps {
  mode?: 'horizontal' | 'vertical'
  backgroundColor?: string
  textColor?: string
  activeTextColor?: string
  defaultActiveIndex?: string
  menuTrigger?: 'click' | 'hover'
  children: React.ReactNode
}

export const MenuContext = createContext({
  textColor: '',
  activeTextColor: '',
  activeIndex: '',
  menuTrigger: '',
  updateActiveIndex: (index: string) => {}
})
const Menu: React.FC<MenuProps> = props => {
  const { 
    mode, 
    backgroundColor, 
    textColor = '#303133',
    activeTextColor = '#5D5FEF',
    defaultActiveIndex = '',
    menuTrigger = 'hover',
    children,
  } = props
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex)
  const menuContext = React.useContext(MenuContext)
  const contextValue = {
    ...menuContext,
    textColor,
    activeTextColor,
    activeIndex,
    updateActiveIndex: setActiveIndex
  }
  return (
    <ul className='ct-menu' style={{backgroundColor}}>
      <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
    </ul>
  )
}
 
if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

export default Menu


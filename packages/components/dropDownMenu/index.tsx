import './style/index.css'
import * as React from 'react'
import { extractNonEmptyField, getMergedCls, tinycolor, useNamespace }from '@cotton-ui/utils'
import { createContext } from 'react'

export interface DropDownMenuProps {
  dropDownTargrt: React.ReactNode
  children: React.ReactNode
  itemCount: number
  hideOnClick?: boolean
  color?: string
  className?:string
  onItemClick?: (e: Event,index:string) => void
}

// export const DropDownMenuContext = createContext({
//   customDropDownMenuItemStyles: {},
//   handleExpand: (fn: (isExpand:boolean) => boolean) => {},
//   handleItemClick: (e: Event,index:string) => {}
// })
export const DropDownMenuContext = createContext<{
  customDropDownMenuItemStyles?: any
  handleExpand?: (fn: (isExpand: boolean) => boolean) => void
  handleItemClick?: (e: Event, index: string) => void
}>({
  // customDropDownMenuItemStyles: {},
  // handleExpand: (fn: (isExpand:boolean) => boolean) => {},
})
const DropDownMenu: React.FC<DropDownMenuProps> = props => {
  const {dropDownTargrt, children, itemCount, hideOnClick, color, className, onItemClick} = props

  const {b, e} = useNamespace('dropDownMenu')
  const mergedCls = getMergedCls(b, className)

  const getCustomDropDownMenuItemStyles = () => {
    let hoverBgColor, hoverBorderColor, hoverTextColor, disabledBgColor, disabledBorderColor, disabledTextColor

    const getMixedColor = (amount=0) => {
      return tinycolor.mix(color,'#fff',amount)?.toRgbString()
    }
    if (color) {
      hoverBgColor = hoverBorderColor = getMixedColor(90)
      hoverTextColor = color
    }
    return {
      '--ct-dropDownMenuItem-hover-bg-color': hoverBgColor,
      '--ct-dropDownMenuItem-hover-border-color': hoverBorderColor,
      '--ct-dropDownMenuItem-hover-color': hoverTextColor
    }
  }
  const customDropDownMenuItemStyles = getCustomDropDownMenuItemStyles()

  const [isExpand, setIsExpand] = React.useState(false)

  // const dropDownMenuContext = React.useContext('')
  const contextValue = {
    customDropDownMenuItemStyles,
    handleExpand: setIsExpand,
    handleItemClick: onItemClick
  } 

  const dynamicStyle = {
    maxHeight: isExpand ? itemCount * 32 + 'px' : 0,
    overflow: isExpand ? 'visible' : 'hidden',
    padding: isExpand ? '4px 0' : 0,
  }
  return (
    <div className={mergedCls}>
      <div onClick={() => contextValue.handleExpand!(pre => !pre)}>{dropDownTargrt}</div>
      <ul className={e('wrapper')} style={dynamicStyle}>
        <DropDownMenuContext.Provider value={contextValue}>
          {children}
        </DropDownMenuContext.Provider>
      </ul>
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  DropDownMenu.displayName = 'DropDownMenu';
}

export default DropDownMenu

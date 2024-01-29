import './style/index.css'
import * as React from 'react'
import { getMergedCls, tinycolor, useNamespace }from '@cotton-ui/utils'
import { createContext } from 'react'
import { on } from 'events'

export interface DropDownMenuProps {
  dropDownTargrt: React.ReactNode
  children: React.ReactNode
  maxHeight?: number
  hideOnClick?: boolean
  color?: string
  className?:string
  onVisibleChange?: (visible: boolean) => void
  onItemClick?: (index:string | number | object) => void
}

export const DropDownMenuContext = createContext<{
  customDropDownMenuItemStyles?: any
  handleExpand?: () => void
  handleItemClick?: (index: string | number | object) => void
}>({})
const DropDownMenu: React.FC<DropDownMenuProps> = props => {
  const {dropDownTargrt, children, maxHeight, hideOnClick, color, className, onVisibleChange, onItemClick} = props

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

  const contextValue = {
    customDropDownMenuItemStyles,
    handleExpand: function() {
      onVisibleChange?.(!isExpand)
      setIsExpand(pre => !pre)
    } ,
    handleItemClick: onItemClick
  } 

  const dynamicStyle = isExpand ? {
    maxHeight: maxHeight + 'px',
    transform: 'translate(-50%,100%) scaleY(1)',
    opacity: 1
  } : {
    maxHeight: maxHeight + 'px',
  }
  return (
    <div className={mergedCls}>
      <div onClick={contextValue.handleExpand}>{dropDownTargrt}</div>
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

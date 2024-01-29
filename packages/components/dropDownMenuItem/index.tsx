import { getMergedCls, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'
import { Fragment } from 'react'
import { DropDownMenuContext } from '../dropDownMenu'

export interface DropDownMenuItemProps {
  metaData: string | number | object
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const DropDownMenuItem: React.FC<DropDownMenuItemProps> = props => {
  const { metaData, icon, className, children,  } = props

  const {b, e} = useNamespace('dropDownMenuItem')
  const mergedCls = getMergedCls(b, className)

  const dropDownMenuContext = React.useContext(DropDownMenuContext)
  const handleClick = (e) => {
    dropDownMenuContext.handleExpand!()
    dropDownMenuContext.handleItemClick?.(metaData)
  }
  return (
    <>
      <li className={mergedCls} style={dropDownMenuContext.customDropDownMenuItemStyles} onClick={handleClick}>
        {icon && <div className={e('icon')}></div>}
        {children}
        </li>
    </>
  )
}

if (process.env.NODE_ENV !== 'production') {
  DropDownMenuItem.displayName = 'DropDownMenuItem';
}

export default DropDownMenuItem

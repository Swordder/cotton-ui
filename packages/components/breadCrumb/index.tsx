import { getMergedCls, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'

export interface BreadCrumbProps {
  list: {label: string,to?: string}[]
  seperater: React.ReactNode | string
  className?:string
}

const BreadCrumb: React.FC<BreadCrumbProps> = props => {
  const { list, seperater, className } = props
  const {b,e} = useNamespace('breadCrumb')
  const mergedCls = getMergedCls(b,className)
  return (
    <div className={mergedCls}>
      {
        list.map((item,index) => {
          return index < list.length -1 ? 
          (<>
            <a className={e('title')} href={item.to}>{item.label}</a>
            <span className={e('seperater')}>{seperater}</span>
          </> ):
          <a className={e('title')} href={item.to}>{item.label}</a>
        })
      }
    </div>
   
  )
}

if (process.env.NODE_ENV !== 'production') {
  BreadCrumb.displayName = 'BreadCrumb';
}

export default BreadCrumb

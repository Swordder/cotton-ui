import './style/index.css'
import * as React from 'react'

export interface BreadCrumbProps {
  list: {label: string,to?: string}[]
  seperater: React.ReactNode | string
}

const BreadCrumb: React.FC<BreadCrumbProps> = props => {
  const { list, seperater } = props

  return (
    <div className='ct-breadCrumb'>
      {
        list.map((item,index) => {
          return index < list.length -1 ? 
          (<>
            <a className='ct-breadCrumb__title' href={item.to}>{item.label}</a>
            <span className='ct-breadCrumb__seperater'>{seperater}</span>
          </> ):
          <div className='ct-breadCrumb__title'>{item.label}</div>
        })
      }
    </div>
   
  )
}

if (process.env.NODE_ENV !== 'production') {
  BreadCrumb.displayName = 'BreadCrumb';
}

export default BreadCrumb

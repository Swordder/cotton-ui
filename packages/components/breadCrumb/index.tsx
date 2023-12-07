import './style/index.css'
import * as React from 'react'

export interface BreadCrumbProps {
  list: string[]
  seperater: React.ReactNode | string
}

const BreadCrumb: React.FC<BreadCrumbProps> = props => {
  const { list, seperater } = props
  const Seperater = <div className='ct-breadCrumb__seperater'>{seperater}</div>
  return (
    // list.join(Seperater)
  )
}

if (process.env.NODE_ENV !== 'production') {
  BreadCrumb.displayName = 'BreadCrumb';
}

export default BreadCrumb

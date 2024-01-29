import { getMergedCls, useNamespace } from '../../utils/css'
import './style/index.css'
import * as React from 'react'

export interface PaginationProps {
  className?: string
}

const Pagination: React.FC<PaginationProps> = props => {
  const { className } = props

  const {b} = useNamespace('pagination')
  const mergedCls = getMergedCls(b,className)


  return (
    <div className={mergedCls}>
      <div>total 400</div>
      <select>
        <option value="hhhh"></option>
      </select>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Pagination.displayName = 'Pagination';
}

export default Pagination

import { getMergedCls, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'

type Justify = 'flex-start' | 'flex-end' | 'justify-center' | 'space-around' | 'space-between' | 'space-evenly'
type Align = 'start' | 'align-center' | 'end' | 'baseline' | 'stretch'
export interface RowProps {
  justify?: Justify
  align?: Align
  gutter?: [number, number]
  wrap?: boolean
  children?: React.ReactNode
  className?: string
}

export const RowContext = React.createContext({
  gutter: [0,0],
  wrap: false
})
const Row: React.FC<RowProps> = props => {
  const { 
    justify = 'flex-center',
    align = 'align-center',
    gutter = [0,0],
    wrap = false,
    children,
    className
  } = props
  const {b,is} = useNamespace('row')
  const mergedCls = getMergedCls(b,is(justify,justify),is(align,align),is('wrap',wrap),className)

  const gutterStyle = React.useMemo(() => {
    let style = {} as React.CSSProperties
    if (gutter[0] === 0 && gutter[1] === 0) return {}
    else {
      if (gutter[0]) {
        style.marginLeft = style.marginRight = `-${gutter[0] / 2}px`
      }
      if (gutter[1]) {
        style.marginTop = style.marginBottom = `-${gutter[1] / 2}px`
      }
    }
    return style
  }, [gutter])

  return (
    <div className={mergedCls} style={gutterStyle}>
      <RowContext.Provider value={{gutter,wrap}}>
        {children}
      </RowContext.Provider>
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Row.displayName = 'Row';
}

export default Row

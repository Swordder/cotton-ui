import { getMergedCls, isNumber, isUndefined, useNamespace } from '@cotton-ui/utils'
import './style/index.css'
import * as React from 'react'
import { RowContext } from '../row'

interface ResponsiveObj {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export interface ColProps extends ResponsiveObj {
  flex?: string
  xs?: number | ResponsiveObj
  sm?: number | ResponsiveObj
  md?: number | ResponsiveObj
  lg?: number | ResponsiveObj
  xl?: number | ResponsiveObj
  children?: React.ReactNode
  className?: string
}

function parseFlex(flex): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
}

const Col: React.FC<ColProps> = props => {
  const {
    span,
    offset,
    pull,
    push,
    flex,
    xs,
    sm,
    md,
    lg,
    xl,
    children,
    className
  } = props
  const {b, e} = useNamespace('col')

  const responsiveCls = React.useMemo(() => {
    let cls = [] as string[]

    ;['span','offset','pull','push'].forEach
      (item => {
          if (item === 'span') cls.push(e(isUndefined(props[item]) ? 24 : props[item]))
          else cls.push(e(isUndefined(props[item]) ? 0 : `${item}-${props[item]}`))
    })
    ;['xs','sm','md','lg','xl'].forEach(item => {
      if (typeof props[item] === 'number') {
        cls.push(e(`${item}-${props[item]}`)) 
      }
      if (typeof props[item] === 'object') {
        Object.entries(props[item]).forEach(([key, value]) => {
          if (key === 'span') cls.push(e(`${item}-${value}`)) 
          else cls.push(e(`${item}-${key}-${value}`))
        })
      }
    })
    return cls
  }, [span,offset,pull,push,xs,sm,md,lg,xl])
  const mergedCls = getMergedCls(b, ...responsiveCls, className)

  const {gutter, wrap} = React.useContext(RowContext)
  
  const colStyle = React.useMemo(() => {
    let style = {} as React.CSSProperties
    if (gutter[0] === 0 && gutter[1] === 0 && !flex) return {}
    else {
      if (gutter[0]) {
        style.paddingLeft = style.paddingRight = `${gutter[0] / 2}px`
      }
      if (gutter[1]) {
        style.paddingTop = style.paddingBottom = `${gutter[1] / 2}px`
      }
    }
    if (flex) {
      style.flex = parseFlex(flex);
    }
    return style
  }, [gutter,flex])
  return (
    <div className={mergedCls} style={colStyle}>{children}</div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Col.displayName = 'Col';
}

export default Col

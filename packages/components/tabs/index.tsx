import * as React from 'react'
import './style/index.css'
import Row, { Justify } from '../row'
import TabItem from '../tabItem'
import { getMergedCls, useNamespace } from '@cotton-ui/utils'

export interface IconProps {
  prefix?: string
  name: string
}
export interface TabItem {
  label: string
  icon?: IconProps
  tabPane: React.ReactNode
  className?: string
}
export interface TabsProps {
  active?: number
  tabs: TabItem[]
  type?: 'line' | 'card'
  closeable?: boolean
  addable?: boolean
  className?: string
  justify?: Justify
  onChangeTab?: (index: number) => void
  onCloseTab?: (index: number) => void
}
export const TabsContext = React.createContext<{
  closeable?: boolean
}>({})

const Tabs: React.FC<TabsProps> = (props) => {
  const { active , tabs, type = 'line', closeable, addable, justify, className, onChangeTab, onCloseTab } = props
  const { b, e, is } = useNamespace('tabs')
  const mergedCls = getMergedCls(b, e(type), className)

  const reducer = (state: TabItem[],action:any) => {
    switch(action.type) {
      case 'add':
        return [...state,action.payload]
      case 'remove':
        return state.filter((item,index) => index != action.payload)
      default:
        throw new Error('please provide a valid action type')
    }
  }
  const [_tabs, dispatch] = React.useReducer<(state: TabItem[],action: any) => TabItem[]>(reducer, tabs)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const tabItemRef = [React.useRef<HTMLDivElement>(null),React.useRef<HTMLDivElement>(null)]
  const [currentActive, setCurrentActive] = React.useState(active ?? 0)
  const setTrack = (index:number,withAnimation: boolean = false) => {
    trackRef.current!.style.transform = `translateX(${tabItemRef[index].current!.offsetLeft}px)`
    withAnimation && (trackRef.current!.style.transition = 'transform .3s ease-out')
    trackRef.current!.style.width = tabItemRef[index].current!.clientWidth + 'px'
  }
  React.useEffect(() => {
    trackRef.current!.style.width = tabItemRef[currentActive].current!.clientWidth + 'px'
    setTrack(currentActive)
  }, [])

  const handleItemClick = (index: number) => {
    if(currentActive === index) return
    else {
      setCurrentActive(index)
      setTrack(index, true)
      onChangeTab?.(index)
    }
  }

  const handleClose = (e:React.SyntheticEvent,index:number) => { 
    e.stopPropagation()
    dispatch({type: 'remove', payload: index})
    if (index <  _tabs.length -1 ) {
      trackRef.current!.style.width = tabItemRef[index + 1].current!.clientWidth + 'px'
    }
    else {
      if (_tabs.length <= 1)
      trackRef.current!.style.width = '0px'
    }
    onCloseTab?.(index)
  }
  return (
    <div className={mergedCls}>
      <Row className={e('wrap')} justify={justify}>
        <TabsContext.Provider value={{closeable}}>
          {_tabs.map((tab, index) => {
            return (
              <TabItem 
              key={index} 
              className={getMergedCls(is('active', index == currentActive), tab.className)}
               icon={tab.icon}
              index={index} 
              onClick={handleItemClick} ref={tabItemRef[index]} onItemClose={(e) => handleClose(e,index)}>
                {tab.label}
              </TabItem>
            )
          })}
        </TabsContext.Provider>
      </Row>
      <div className={e('track')} ref={trackRef}></div>
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs'
}

export default Tabs

import React from "react"
import "./style/index.css"

export interface TabsProps {
  tabs: any[]
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { tabs } = props
  return (
    tabs.map((tab,index) => <div key={index}>{ tab }</div>) 
  )
}

export default Tabs

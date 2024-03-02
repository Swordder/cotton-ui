import './style/index.css'
import {getMergedCls, isArray, isEmpty, isObject, useNamespace} from '@cotton-ui/utils'
import DropDownMenu from '../dropDownMenu'
import DropDownMenuItem from '../dropDownMenuItem'
import Input from '../input'
import Tag from '../tag'
import * as React from 'react'
import Icon from '../icon'

type SelectedValue = string[] | number[] | object[]
export interface SelectProps {
  value?: SelectedValue
  placeholder?: string
  options: object[] | string[] | number[]
  valueKey?: string
  labelKey?: string
  clearable?: boolean
  className?: string
  onChange?: (v: any) => void
}

const Multiple: React.FC<SelectProps> = props => {
  const { value, labelKey, valueKey, placeholder, options, onChange, className } = props

  const {b,e,em} = useNamespace('select')
  const mergedCls = getMergedCls(b,className)

  const [rotateDeg, setRotateDeg] = React.useState(180)

  if (value && !isArray(value)) {
    throw new Error('value should be an array')
  }
  const reducer = (state,action) => {
    switch(action.type) {
      case 'add':
        return [...state,action.payload]
      case 'remove':
        return state.filter(item => item != action.payload)
      case 'clear':
        return []
      default:
        throw new Error('please provide a valid action type')
    }
  }
  const [selectedValue,dispatch] = React.useReducer(reducer, value, v => {
    if (!v) return []
    else {
      return options.filter(item => {
        return v.includes(valueKey ? item[valueKey] : item)
      })
    }
  }) 
  const handleDelete = (e,payload) => {
    e.stopPropagation()
    dispatch({type: 'remove', payload})
    const v = selectedValue.filter(item => item != payload)
    const resV = valueKey ? v.map(item => item[valueKey]) : v
    onChange?.(resV)
  }
  const SelectTrigger = React.useMemo(() => {
    const MultipleSelectInner = isEmpty(selectedValue) ? placeholder
      : 
      selectedValue.map((item,index) => {
        if (isObject(item) && !labelKey) throw new Error('labelKey is required when options is an object array')
        const inner = isObject(item) ? item[labelKey!] : item
        return <Tag type='info' closable key={index} onClose={event => handleDelete(event,item)}><span >{inner}</span></Tag>
      }) 
      return <div className={e('trigger')}>
        <div className={em('trigger', 'content')}>{MultipleSelectInner}</div>
        <Icon name='ct-icon-arrow-up' color='#a8abb2'  size={'1.2em'} rotate={rotateDeg}></Icon>
        </div>
  }, [selectedValue, placeholder, labelKey, options, rotateDeg])

  const SelectMenu = React.useMemo(() => {
    return options.map((item,index) => {
      if (isObject(item) && !labelKey) throw new Error('labelKey is required when options is an object array')
      const inner = isObject(item) ? item[labelKey!] : item
      return <DropDownMenuItem metaData={item} key={index}>{inner}</DropDownMenuItem>
    })
  }, [options, labelKey])
  const handleItemClick =  (data) => {
    if(selectedValue.find(item => item == data)) {
      dispatch({type: 'remove', payload: data})
    } else {
      dispatch({type: 'add', payload: data})
    }
    const resV = valueKey ? [...selectedValue,data].map(item => item[valueKey]) : [...selectedValue,data]
    onChange?.(resV)
  }
  const handleVisibleChange = (visible) => {
    setRotateDeg(visible ? 0 : 180)
  } 
  return (
    <div className={mergedCls}>
      <DropDownMenu dropDownTargrt={SelectTrigger} onItemClick={handleItemClick} onVisibleChange={handleVisibleChange}>
        {SelectMenu}
      </DropDownMenu>
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Multiple.displayName = 'MultipleSelect';
}

export default Multiple




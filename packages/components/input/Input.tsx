import { getMergedCls, useNamespace } from '@cotton-ui/utils'
import Icon from '../icon'
import './style/index.css'
import * as React from 'react'

export interface InputProps {
  prepend?: React.ReactNode
  append?: React.ReactNode
  showWordLimit?: boolean
  clearable?: boolean
  formatter?: (v: string) => string
  value?: string
  placeholder?: string
  size?: number
  readonly?: boolean
  required?: boolean 
  autofocus?: boolean
  autocomplete?: boolean
  maxLength?: number
  minLength?: number
  onChange?:(v:string) => void
  onEnter?: (v:string) => void
  className?: string
} 
const Input = React.forwardRef<HTMLInputElement,InputProps>((props,ref) => {
  const { className, prepend, append, showWordLimit, clearable, formatter, onEnter, ...inputAttribute } = props

  const {b, e} = useNamespace('input')
  const mergedCls = getMergedCls(b, className)

  const { value, onChange,...otherInputAttribute  } = inputAttribute
  const {maxLength} = otherInputAttribute
  const inputEl = document.getElementById('ct-input__inner') as HTMLInputElement

  // 非受控
  const [text, setText] = React.useState(value ?? '')

  // 清除输入
  const handleClear = () => {
    console.log(ref,'ref')
    inputEl.value = ''
    setText('')
    onChange?.(inputEl.value)
  }
  const clearIcon = <Icon name="ct-icon-clear" size={16} color="var(--ct-text-color-placeholder)" onClick={handleClear}></Icon>

  const handleChange = e => {
    onChange?.(e.target.value) ?? setText(e.target.value)
  }

  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') onEnter?.(e.target.value)
  }
  
  return (
    <div className={mergedCls}>
      <div className={e('prepend')}>{prepend}</div>
      <input id='ct-input__inner' className={e('inner')} value={text} ref={ref} onChange={handleChange} onKeyDown={handleKeyDown} {...otherInputAttribute}/>
      {clearable && <div className={e('clear')}>{text && clearIcon}</div>}
      {(showWordLimit && maxLength) && <div className={e('wordLimit')}>{`${text?.length} / ${maxLength}`}</div>}
      <div className={e('append')}>{append}</div>
    </div>
  )
})


if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Input';
}

export default Input

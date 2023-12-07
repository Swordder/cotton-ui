import { useRef } from 'react'
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
} 
const Input = React.forwardRef<HTMLInputElement,InputProps>((props,ref) => {
  const { prepend, append, showWordLimit, clearable, formatter, onEnter, ...inputAttribute } = props
  const { value, onChange,...otherInputAttribute  } = inputAttribute
  const {maxLength} = otherInputAttribute
  const inputEl = document.getElementById('ct-input__inner') as HTMLInputElement

  // 非受控
  const [text, setText] = React.useState(value ?? '')

  // 清除输入
  const handleClear = () => {
    inputEl.value = ''
    setText('')
    onChange?.(inputEl.value)
  }
  const clearIcon = <Icon name="ct-icon-clear" prefix="ct-icon" size={16} color="var(--ct-text-color-placeholder)" onClick={handleClear}></Icon>

  const handleChange = e => {
    onChange?.(e.target.value) ?? setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onEnter?.(e.target.value)
  }
  
  return (
    <div className='ct-input'>
      <div className='ct-input__prepend'>{prepend}</div>
      <input id='ct-input__inner' className='ct-input__inner' value={text} ref={ref} onChange={handleChange} onKeyDown={handleKeyDown} {...otherInputAttribute}/>
      {clearable && <div className='ct-input__clear'>{text && clearIcon}</div>}
      {(showWordLimit && maxLength) && <div className='ct-input__wordLimit'>{`${text?.length} / ${maxLength}`}</div>}
      <div className='ct-input__append'>{append}</div>
    </div>
  )
})


if (process.env.NODE_ENV !== 'production') {
  Input.displayName = 'Input';
}

export default Input

import * as React from 'react'

export interface SelectProps {
  value: SelectedValue
  placeholder?: string
  options: SelectItem[] | string[] | number[]
  valueKey?: string
  labelKey?: string
  clearable?: boolean
  className?: string
  onChange?: (v: any) => void
}
const BaseSelect:React.FC<SelectProps> = props => {

}
export default BaseSelect

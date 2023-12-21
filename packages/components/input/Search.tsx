import Input, { InputProps } from "./Input";
import Icon from '../icon'
import React, { useRef } from "react";
interface SearchProps extends InputProps {

}
const Search:React.FC<SearchProps> = props => {
  const { ...inputProps } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const searchIcon = <Icon name="ct-icon-search" size={16} color="var(--ct-text-color-placeholder)"></Icon>
  return (
    <Input prepend={searchIcon}  placeholder="请输入" ref={inputRef} {...inputProps} ></Input>
  )
}
export default Search
 
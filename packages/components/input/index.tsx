import BaseInput,{type InputProps} from "./Input";
import Search from "./Search";

type CompoundedComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Search: typeof Search;
  // TextArea: typeof TextArea;
  // Password: typeof Password;
};

const Input = BaseInput as CompoundedComponent
Input.Search = Search
export default Input

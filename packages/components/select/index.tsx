import Multiple from './Multiple'
// import Single from './Single'
// import Group from  './Group'
type CompoundedComponent = {
  Multiple: typeof Multiple
  // Single: typeof Single
  // Group: typeof Group
};

const Select = {
  Multiple,
  // Single,
  // Group
} as CompoundedComponent

export default Select

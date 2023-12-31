export type Falsy<T> =  T extends false | 0 | '' | null | undefined ? never : T

export type GenericFunction = (...params: any[]) => any
export type GenericClass<T> = { new (...args: any[]): T }
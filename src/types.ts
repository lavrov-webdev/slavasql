export type TMethodParamField = {
  name: string,
  id: number,
  value: string
}
export type TMethodField = {
  name: string,
  id: number
}
export type TField<T> = {
  value: T,
  error?: string
}

export type TRes = {
  data?: string,
  error?: string
}

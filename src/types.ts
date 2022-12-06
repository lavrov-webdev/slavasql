export type TMethodParamField = {
  name: string,
  id: number,
  value: string
}
export type TMethodField = {
  name: string,
  id: number
}
export type TRequiredStringField = {
  value: string,
  error?: string
}

export type TRes = {
  data?: string,
  error?: string
}

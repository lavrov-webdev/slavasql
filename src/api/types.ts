export type TMethodParam = {
  id: number,
  param: string
}

export type TMethod = {
  id: number,
  method: string,
  params: TMethodParam[]
}

export type TDatamarts = {
  id: number,
  datamart: string
}

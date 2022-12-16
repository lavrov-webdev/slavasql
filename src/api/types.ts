export type TMethodParam = {
  id: number,
  param: string,
  method_id: number
}

export type TMethod = {
  id: number,
  method: string,
  datamard_id: number,
  params: TMethodParam[]
}

export type TDatamarts = {
  id: number,
  datamart: string,
  methods: TMethod[]
}

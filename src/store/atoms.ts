import {atom, selector, useRecoilValue} from "recoil";
import {TRequiredStringField, TMethodField, TMethodParamField, TRes} from "../types";
import {TDatamarts, TMethod, TMethodParam} from "../api/types";

export const methodParamsFieldsAtom = atom<TMethodParamField[]>({
  key: "methodParamsFieldsAtom",
  default: []
})

export const methodsAtom = atom<TMethod[]>({
  key: "methodsAtom",
  default: []
})

export const selectedMethodAtom = atom<TMethodField>({
  key: "selectedMethodAtom",
  default: undefined
})

export const datamartsAtom = atom<TDatamarts[]>({
  key: "datamartsAtom",
  default: []
})

export const selectedDatamartAtom = atom<string>({
  key: "selectedDatamartAtom",
  default: ""
})

export const ipInputAtom = atom<TRequiredStringField>({
  key: "ipInputAtom",
  default: {
    value: ""
  }
})

export const portInputAtom = atom<TRequiredStringField>({
  key: "portInputAtom",
  default: {
    value: ""
  }
})

export const SQLInputAtom = atom<TRequiredStringField>({
  key: "SQLInputAtom",
  default: {
    error: undefined,
    value: ""
  }
})

export const resAtom = atom<TRes>({
  key: "resAtom",
  default: {
    data: undefined,
    error: undefined
  }
})

export const selectedMethodParamsSelector = selector<TMethodParam[]>({
  key: "selectedMethodParams",
  get: ({get}) => {
    const methods = get(methodsAtom)
    const selectedMethod = get(selectedMethodAtom)

    return methods.find(m => m.id === selectedMethod.id)?.params || []
  }
})

export const prepareSQLStringSelector = selector<string>({
  key: "prepareSQLStringSelector",
  get: ({get}) => {
    const selectedMethod = get(selectedMethodAtom)
    const methodParams = get(methodParamsFieldsAtom)
    const selectedDatamart = get(selectedDatamartAtom)

    if (!selectedDatamart || !selectedMethod) return ''

    const argsString = methodParams.map(p => `'${p.value}'`).join(',')
    return `select * from ${selectedDatamart}.${selectedMethod.name}(${argsString})`
  }
})

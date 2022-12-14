import {atom, selector} from "recoil";
import {TField, TMethodField, TMethodParamField, TRes} from "../types";
import {TDatamarts, TMethod, TMethodParam} from "../api/types";

export const methodParamsFieldsAtom = atom<TMethodParamField[]>({
  key: "methodParamsFieldsAtom",
  default: []
})

export const methodsAtom = atom<TMethod[]>({
  key: "methodsAtom",
  default: []
})

export const selectedMethodAtom = atom<TField<TMethodField | null>>({
  key: "selectedMethodAtom",
  default: {
    value: null
  }
})

export const datamartsAtom = atom<TDatamarts[]>({
  key: "datamartsAtom",
  default: []
})

export const selectedDatamartAtom = atom<TField<string | null>>({
  key: "selectedDatamartAtom",
  default: {
    value: null
  }
})

export const ipInputAtom = atom<TField<string>>({
  key: "ipInputAtom",
  default: {
    value: ""
  }
})

export const portInputAtom = atom<TField<string>>({
  key: "portInputAtom",
  default: {
    value: ""
  }
})

export const SQLInputAtom = atom<TField<string>>({
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

    return methods.find(m => m.id === selectedMethod.value?.id)?.params || []
  }
})

export const prepareSQLStringSelector = selector<string>({
  key: "prepareSQLStringSelector",
  get: ({get}) => {
    const selectedMethod = get(selectedMethodAtom)
    const methodParams = get(methodParamsFieldsAtom)
    const selectedDatamart = get(selectedDatamartAtom)

    if (!selectedDatamart.value || !selectedMethod.value) return ''

    const argsString = methodParams.map(p => `'${p.value}'`).join(',')
    return `select * from ${selectedDatamart.value}.${selectedMethod.value.name}(${argsString})`
  }
})

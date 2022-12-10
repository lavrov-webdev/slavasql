import useAxios from "axios-hooks";
import {TDatamarts, TMethod} from "./types";

export const useGetMethods = () => useAxios<TMethod[]>({
  url: 'getMethods'
})

export const useGetDatamarts = () => useAxios<TDatamarts[]>({
  url: "getDatamarts"
})

export const usePostSQL = () => useAxios({
  headers: {
    'Accept-Version': '1',
    'Content-Type': 'application/json'
  },
  method: "POST"
}, {manual: true})

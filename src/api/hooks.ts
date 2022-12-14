import useAxios from "axios-hooks";
import {TDatamarts, TMethod} from "./types";

export const useGetMethods = () => useAxios<TMethod[]>({
  url: 'getMethods'
})

export const useGetDatamarts = () => useAxios<TDatamarts[]>({
  url: "getDatamarts"
})

export const usePostSQL = () => useAxios({
  url: 'dummy',
  method: "POST",
  withCredentials: false,
}, {manual: true})

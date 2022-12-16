import useAxios from "axios-hooks";
import {TDatamarts} from "./types";

export const useGetDatamarts = () => useAxios<TDatamarts[]>({
  url: "getDatamarts"
})

export const usePostSQL = () => useAxios({
  url: 'dummy',
  method: "POST",
  withCredentials: false,
}, {manual: true})

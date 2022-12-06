import {usePostSQL} from "../api/hooks";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {ipInputAtom, portInputAtom, resAtom} from "../store/atoms";

type TUseSendRequest = (
  setLoading: (value: boolean) => void,
) => (sqlString: string) => void


export const useSendRequest: TUseSendRequest = (setLoading) => {
  const [_, sendRequest] = usePostSQL()
  const setResultState = useSetRecoilState(resAtom)
  const [portState, setPortState] = useRecoilState(portInputAtom)
  const [ipState, setIpState] = useRecoilState(ipInputAtom)

  return async (sqlString: string) => {
    let error = false
    if (!portState.value) {
      setPortState(p => ({...p, error: 'Введи порт'}))
      error = true
    }
    if (!ipState.value) {
      setIpState(p => ({...p, error: 'Введи IP'}))
      error = true
    }
    if (error) return
    try {
      setLoading(true)
      const res = await sendRequest({
        data: {
          sql: {sql: sqlString}
        },
        url: `http://${ipState.value}:${portState.value}`
      })
      setResultState({data: JSON.stringify(res.data), error: undefined})
      setLoading(false)
    } catch (e: any) {
      setResultState({data: undefined, error: e.message})
      setLoading(false)
    }
  }
}

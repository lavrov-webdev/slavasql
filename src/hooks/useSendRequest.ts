import { usePostSQL } from "../api/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ipInputAtom, portInputAtom, resAtom } from "../store/atoms";
import { useValidateAddressInputs } from "./useValidateAddressInputs";

type TUseSendRequest = (
  setLoading: (value: boolean) => void
) => (sqlString: string) => void;

export const useSendRequest: TUseSendRequest = (setLoading) => {
  const [_, sendRequest] = usePostSQL();
  const setResultState = useSetRecoilState(resAtom);
  const portState = useRecoilValue(portInputAtom);
  const ipState = useRecoilValue(ipInputAtom);
  const validateAddress = useValidateAddressInputs()

  return async (sqlString: string) => {
    let error = validateAddress()
    if (error) return;
    try {
      setLoading(true);
      const res = await sendRequest({
        data: {
          url: `http://${ipState.value}:${portState.value}`,
          headers: {
            "Accept-Version": "1",
            "Content-Type": "application/json",
          },
          body: {
            sql: { sql: sqlString },
          },
        },
      });
      if (res.data.error) {
        setResultState({ data: undefined, error: JSON.stringify(res.data) });
        setLoading(false);
      } else {
        setResultState({ data: JSON.stringify(res.data), error: undefined });
        setLoading(false);
      }
    } catch (e: any) {
      setResultState({ data: undefined, error: JSON.stringify(e.message) });
      setLoading(false);
    }
  };
};

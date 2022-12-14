import { usePostSQL } from "../api/hooks";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ipInputAtom, portInputAtom, resAtom } from "../store/atoms";

type TUseSendRequest = (
  setLoading: (value: boolean) => void
) => (sqlString: string) => void;

export const useSendRequest: TUseSendRequest = (setLoading) => {
  const [_, sendRequest] = usePostSQL();
  const setResultState = useSetRecoilState(resAtom);
  const [portState, setPortState] = useRecoilState(portInputAtom);
  const [ipState, setIpState] = useRecoilState(ipInputAtom);

  return async (sqlString: string) => {
    let error = false;
    if (!portState.value) {
      setPortState((p) => ({ ...p, error: "Введи порт" }));
      error = true;
    }
    if (!ipState.value) {
      setIpState((p) => ({ ...p, error: "Введи IP" }));
      error = true;
    }
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

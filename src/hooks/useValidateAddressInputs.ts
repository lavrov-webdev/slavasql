import { useRecoilState } from "recoil";
import { ipInputAtom, portInputAtom } from "../store/atoms";

export const useValidateAddressInputs = () => {
  const [portState, setPortState] = useRecoilState(portInputAtom);
  const [ipState, setIpState] = useRecoilState(ipInputAtom);
  const validate = () => {
    let error = false;
    if (!portState.value) {
      setPortState((p) => ({ ...p, error: "Введи порт" }));
      error = true;
    }
    if (!ipState.value) {
      setIpState((p) => ({ ...p, error: "Введи IP" }));
      error = true;
    }
    return error
  };
  return validate;
};

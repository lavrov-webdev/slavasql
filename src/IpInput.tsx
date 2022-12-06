import {FC} from "react";
import {TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {ipInputAtom} from "./store/atoms";

const IpInput: FC = () => {
  const [ipInputState, setIpInputState] = useRecoilState(ipInputAtom);
  return <TextField
    value={ipInputState.value}
    error={!!ipInputState.error}
    onChange={e => setIpInputState({value: e.target.value, error: undefined})}
    label='Введи IP'
  />
}

export default IpInput

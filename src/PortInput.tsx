import {FC} from "react";
import {TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {portInputAtom} from "./store/atoms";

const PortInput: FC = () => {
  const [portState, setPortState] = useRecoilState(portInputAtom);
  return <TextField
    error={!!portState.error}
    value={portState.value}
    onChange={e => setPortState({value: e.target.value, error: undefined})}
    label='Введи порт'
  />
}

export default PortInput

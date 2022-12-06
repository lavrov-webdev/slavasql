import {FC, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {SQLInputAtom} from "./store/atoms";
import {useSendRequest} from "./hooks";
import {Button} from "@mui/material";

const SendCustomButton: FC = () => {
  const [sqlStringState, setSqlStringState] = useRecoilState(SQLInputAtom)
  const [loading, setLoading] = useState(false);
  const sendReq = useSendRequest(setLoading)

  const clickHandler = async () => {
    if (!sqlStringState.value) {
      setSqlStringState({value: "", error: "Введи кастомный запрос"})
    } else {
      sendReq(sqlStringState.value)
    }
  }
  return <Button disabled={loading} variant="outlined" onClick={clickHandler}>Отправить свою строку</Button>
}

export default SendCustomButton

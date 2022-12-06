import {FC, useState} from "react";
import {Button} from "@mui/material";
import {useRecoilValue} from "recoil";
import {prepareSQLStringSelector} from "./store/atoms";
import {useSendRequest} from "./hooks";

const SendBuildedButton: FC = () => {
  const sqlString = useRecoilValue(prepareSQLStringSelector)
  const [loading, setLoading] = useState(false);
  const sendReq = useSendRequest(setLoading)

  const clickHandler = async () => {
    sendReq(sqlString)
  }
  return <Button disabled={loading} variant="contained" onClick={clickHandler}>Отправить конструктор</Button>
}

export default SendBuildedButton

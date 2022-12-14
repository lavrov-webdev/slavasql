import { FC, useState } from "react";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  prepareSQLStringSelector,
  selectedDatamartAtom,
  selectedMethodAtom,
} from "./store/atoms";
import { useSendRequest, useValidateAddressInputs } from "./hooks";

const SendBuildedButton: FC = () => {
  const sqlString = useRecoilValue(prepareSQLStringSelector);
  const [loading, setLoading] = useState(false);
  const sendReq = useSendRequest(setLoading);
  const [selectedMethod, setSelectedMethod] =
    useRecoilState(selectedMethodAtom);
  const [selectedDatamart, setSelectedDatamart] =
    useRecoilState(selectedDatamartAtom);
  const validateAddress = useValidateAddressInputs();

  const clickHandler = async () => {
    let error = validateAddress();
    if (!selectedMethod.value) {
      error = true;
      setSelectedMethod((p) => ({ ...p, error: "Ввыбери рег. запрос" }));
    }
    if (!selectedDatamart.value) {
      setSelectedDatamart((p) => ({ ...p, error: "Ввыбери витрину" }));
      error = true;
    }
    if (!error) sendReq(sqlString);
  };
  return (
    <Button disabled={loading} variant="contained" onClick={clickHandler}>
      Отправить конструктор
    </Button>
  );
};

export default SendBuildedButton;

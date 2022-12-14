import {FC} from "react";
import {useRecoilValue} from "recoil";
import {resAtom} from "./store/atoms";
import {Alert, AlertTitle} from "@mui/material";

const Result: FC = () => {
  const res = useRecoilValue(resAtom)

  if (!res.data && !res.error) return null

  return <div style={{marginTop: '2rem', width: '100%'}}>
    {res.data ? (
      <Alert severity="success">
        <AlertTitle>Успешно</AlertTitle>
        <pre style={{whiteSpace: 'break-spaces'}}>{JSON.stringify(JSON.parse(res.data), null, 1)}</pre>
      </Alert>
    ) : (
      <Alert sx={{width: '100%'}} severity="error">
        <AlertTitle>Ошибка</AlertTitle>
        {JSON.stringify(JSON.parse(res.error!), null, 1)}
      </Alert>
    )}
  </div>
}

export default Result

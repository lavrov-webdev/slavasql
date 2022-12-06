import {FC} from "react";
import {Box, TextField, Typography} from "@mui/material";
import {useRecoilState} from "recoil";
import {SQLInputAtom} from "./store/atoms";

const SQLInput: FC = () => {
  const [state, setState] = useRecoilState(SQLInputAtom);
  return <Box sx={{width: '100%', marginTop: '2rem'}}>
    <Typography sx={{marginBottom: '.5rem'}}>Или введи полный SQL запрос</Typography>
    <TextField
      fullWidth
      multiline
      label="SQL запрос"
      minRows={2}
      value={state.value}
      error={!!state.error}
      onChange={e => setState({error: undefined, value: e.target.value})}
    />
  </Box>
}

export default SQLInput

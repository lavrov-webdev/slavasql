import {FC, useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {methodParamsFieldsAtom, selectedMethodParamsSelector} from "./store/atoms";
import {Box, TextField} from "@mui/material";

const MethodParams: FC = () => {
  const [fields, setFields] = useRecoilState(methodParamsFieldsAtom)
  const selectedMethodParams = useRecoilValue(selectedMethodParamsSelector)

  const changeHandler = (id: number, value: string) => {
    setFields(prev => {
      const clone = structuredClone(prev)
      clone.find(p => p.id === id)!.value = value
      return clone
    })
  }

  useEffect(() => {
    setFields(selectedMethodParams.map(p => ({
        name: p.param,
        value: "",
        id: p.id
      }
    )))
  }, [selectedMethodParams])

  return <ul style={{listStyle: 'none', margin: 0, padding: 0, width: '100%'}}>
    {
      fields.map(field => <Box component="li" key={field.id} sx={{margin: '0 0 .5rem'}}>
          <TextField
            value={field.value}
            onChange={e => changeHandler(field.id, e.target.value)}
            label={field.name}
            variant="outlined"
            fullWidth
          />
        </Box>
      )}
  </ul>
}

export default MethodParams

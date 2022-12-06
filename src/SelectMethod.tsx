import {FC} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {methodsAtom, selectedMethodAtom} from "./store/atoms";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const SelectMethod: FC = () => {
  const [selectedMethod, setSelectedMethod] = useRecoilState(selectedMethodAtom);
  const methods = useRecoilValue(methodsAtom)

  const onSelect = (event: SelectChangeEvent) => {
    const methodToSelect = methods.find(m => m.method === event.target.value)
    if (!methodToSelect) return
    setSelectedMethod({id: methodToSelect.id, name: methodToSelect.method})
  }

  if (!selectedMethod || methods.length === 0) return null

  return <Box sx={{width: '100%'}}>
    <FormControl fullWidth>
      <InputLabel id="select-method">Выбери рег. запрос</InputLabel>
      <Select
        value={selectedMethod.name}
        onChange={onSelect}
        label="выбери рег. запрос"
        labelId="select-method"
      >
        {methods.map(m => <MenuItem key={m.id + m.method} value={m.method}>{m.method}</MenuItem>)}
      </Select>
    </FormControl>
  </Box>
}

export default SelectMethod

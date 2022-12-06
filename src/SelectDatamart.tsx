import {FC} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {datamartsAtom, selectedDatamartAtom} from "./store/atoms";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const SelectDatamart: FC = () => {
  const [selectedDatamart, setSelectedDatamart] = useRecoilState(selectedDatamartAtom);
  const datamarts = useRecoilValue(datamartsAtom)

  const onSelect = (event: SelectChangeEvent) => {
    setSelectedDatamart(event.target.value)
  }

  if (!selectedDatamart || datamarts.length === 0) return null

  return <Box sx={{width: '100%'}}>
    <FormControl fullWidth>
      <InputLabel id="select-datamart">Выбери витрину</InputLabel>
      <Select
        labelId="select-datamart"
        value={selectedDatamart}
        label="Выбери витрину"
        onChange={onSelect}
      >
        {datamarts.map(d => <MenuItem key={d.id + d.datamart} value={d.datamart}>{d.datamart}</MenuItem>)}
      </Select>
    </FormControl>
  </Box>
};

export default SelectDatamart

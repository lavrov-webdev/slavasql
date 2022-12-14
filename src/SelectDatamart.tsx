import { FC, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { datamartsAtom, selectedDatamartAtom } from "./store/atoms";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";

const SelectDatamart: FC = () => {
  const [selectedDatamart, setSelectedDatamart] =
    useRecoilState(selectedDatamartAtom);
  const datamarts = useRecoilValue(datamartsAtom);

  const options = useMemo(() => {
    return datamarts.map((d) => d.datamart);
  }, [datamarts]);

  const onSelect = (_: any, val: string | null) => {
    setSelectedDatamart({ error: undefined, value: val });
  };

  if (datamarts.length === 0) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedDatamart.value || null}
          onChange={onSelect}
          options={options}
          renderInput={(params) => (
            <TextField {...params} error={!!selectedDatamart.error} label="Выбери витрину" />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default SelectDatamart;

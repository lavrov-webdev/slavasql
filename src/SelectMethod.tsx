import { FC, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { methodsAtom, selectedMethodAtom } from "./store/atoms";
import { Autocomplete, Box, FormControl, TextField } from "@mui/material";

const SelectMethod: FC = () => {
  const [selectedMethod, setSelectedMethod] =
    useRecoilState(selectedMethodAtom);
  const methods = useRecoilValue(methodsAtom);

  const options = useMemo(() => methods.map((m) => m.method), [methods]);

  const onSelect = (_: any, val: string | null) => {
    const methodToSelect = methods.find((m) => m.method === val);
    if (!methodToSelect) {
      setSelectedMethod({ error: undefined, value: null });
      return;
    }
    setSelectedMethod({
      error: undefined,
      value: { id: methodToSelect.id, name: methodToSelect.method },
    });
  };

  if (methods.length === 0) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedMethod.value?.name ?? null}
          onChange={onSelect}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!selectedMethod.error}
              label="выбери рег. запрос"
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default SelectMethod;

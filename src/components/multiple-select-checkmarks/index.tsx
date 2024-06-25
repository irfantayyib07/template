// MultipleSelectCheckmarks.tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useField, useFormikContext } from "formik";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";

interface Record {
  name: string;
  price: string;
}

interface Props {
  name: string;
  label: string;
  records: Record[];
}

const MultipleSelectCheckmarks: React.FC<Props> = ({ name, label, records }) => {
 const { values, setFieldValue } = useFormikContext<{ [key: string]: Record[]; }>();
 const [ field, meta ] = useField(name)
 const selectedRecords = values[name] || [];

  const handleChange = (event: React.ChangeEvent<{}>, newValue: Record[]) => {
    setFieldValue(name, newValue);
  };

  return (
    <Autocomplete
      multiple
      id={name}
      options={records}
      disableCloseOnSelect
      getOptionLabel={option => `${option.name} (${option.price})`}
      value={selectedRecords}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          <span>{`${option.name} (${option.price})`}</span>
        </li>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" label={label} placeholder={`Select ${label}`} />
      )}
    />
  );
};

export default MultipleSelectCheckmarks;

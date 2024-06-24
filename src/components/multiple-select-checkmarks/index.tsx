import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useFormikContext } from "formik";

interface Record {
  name: string;
  price: string;
}

interface Props {
  name: string;
  label: string;
  records: Record[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectCheckmarks: React.FC<Props> = ({ name, label, records }) => {
  const { values, setFieldValue } = useFormikContext<{ [key: string]: Record[] }>();
  const selectedRecords = values[name] || [];

  if (values[name] === undefined) return;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    setFieldValue(name, value as Record[]);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          multiple
          value={selectedRecords}
          //@ts-ignore
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={selected =>
            (selected as Record[]).map(record => `${record.name} (${record.price})`).join(", ")
          }
          MenuProps={MenuProps}
        >
          {records.map(record => (
            //@ts-ignore
            <MenuItem key={record.name} value={record}>
              <Checkbox checked={selectedRecords.some(item => item.name === record.name)} />
              <ListItemText primary={`${record.name} (${record.price})`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;

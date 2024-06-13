// MultipleSelectCheckmarks.tsx
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Record {
  name: string;
  price: string;
}

interface Props {
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

export default function MultipleSelectCheckmarks({ records }: Props) {
  const [selectedRecords, setSelectedRecords] = React.useState<Record[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedRecords>) => {
    const {
      target: { value },
    } = event;
    setSelectedRecords(value as Record[]);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Select Records</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedRecords}
          onChange={handleChange}
          input={<OutlinedInput label="Select Records" />}
          renderValue={(selected) => (selected as Record[]).map((record) => `${record.name} (${record.price})`).join(', ')}
          MenuProps={MenuProps}
        >
          {records.map((record) => (
            <MenuItem key={record.name} value={record}>
              <Checkbox checked={selectedRecords.some(item => item.name === record.name)} />
              <ListItemText primary={`${record.name} (${record.price})`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

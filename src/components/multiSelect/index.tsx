import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const FixedTags = ({ options }) => {
  const fixedOptions = [options[0]];  // You can adjust this to whichever fixed option you prefer
  const [value, setValue] = React.useState([...fixedOptions]);

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.label}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label="Employee Name" placeholder="Select employees" />
      )}
    />
  );
};

export default FixedTags;

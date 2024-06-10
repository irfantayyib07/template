import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Option {
  label: string;
  color?: string;
}

interface MultiSelectProps {
  options: Option[];
  label: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, label }) => {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <Autocomplete
      multiple
      id="dynamic-label-autocomplete"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue as Option[]);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <React.Fragment key={index}>
            <Chip
              label={option.label}
              {...getTagProps({ index })}
            />
          </React.Fragment>
        ))
      }
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="Select employees" />
      )}
    />
  );
};

export default MultiSelect;

// components/SingleSelect.tsx
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useField, useFormikContext } from "formik";
import { FormHelperText } from "@mui/material";

interface SingleSelectProps {
  name: string;
  options: string[];
  label: string;
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

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight: personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

const SingleSelect: React.FC<SingleSelectProps> = ({ name, options, label }) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string>(name);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
        <InputLabel id="demo-single-chip-label">{label}</InputLabel>
        <Select
          label={field?.value}
          id="demo-single-chip"
          value={field?.value}
          onChange={handleChange}
          input={<OutlinedInput id="select-single-chip" label="Select the {label}" />}
          MenuProps={MenuProps}
        >
          {options.map(option => (
            <MenuItem key={option} value={option} style={getStyles(option, personName, theme)}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default SingleSelect;

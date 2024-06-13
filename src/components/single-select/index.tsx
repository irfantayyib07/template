// components/SingleSelect.tsx
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface SingleSelectProps {
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
    fontWeight:
      personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

const SingleSelect: React.FC<SingleSelectProps> = ({ options, label  }) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(value as string);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-single-chip-label" >{label}</InputLabel>
        <Select
          labelId="demo-single-chip-label"
          id="demo-single-chip"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-single-chip"  label="Select the {label}"  />}
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SingleSelect;

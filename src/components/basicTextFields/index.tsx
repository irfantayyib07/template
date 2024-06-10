import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const BasicTextFields: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField 
      {...props} 
    />
  );
}

export default BasicTextFields;
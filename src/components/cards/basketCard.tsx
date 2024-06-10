// DynamicBox.tsx
import React from 'react';
import { Box, Chip, Typography, IconButton, Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define the type for the props
interface DynamicBoxProps {
  title: string;
  price: number;
  tags: string[];
  onClose: () => void;
}

// The functional component
const DynamicBox: React.FC<DynamicBoxProps> = ({ title, price, tags, onClose }) => {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        Width: '100%',
        boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative', // Ensures the close icon is positioned correctly
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="label" sx={{ fontWeight: 'bold', mb: 3, display: 'block' }}>
        {title}
      </Typography>
      <Grid container xs={12}>
        <Grid xs={3}>
        <Box >
            <Typography variant="caption" color="textSecondary">
                Price:
            </Typography>
            <Stack>
                ${price.toFixed(2)}
            </Stack>
        </Box>
        </Grid>
        <Grid xs={9}>
            <Box>
                <Typography variant="caption" color="textSecondary">
                    Table:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mt: 1 }}>
                {tags.map((tag, index) => (
                    <Chip key={index} label={tag} sx={{height: '20px'}} />
                ))}
                </Box>
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DynamicBox;

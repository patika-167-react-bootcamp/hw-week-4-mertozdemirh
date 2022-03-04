import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelectStatus(props:any) {
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={`${props.name}Select`}
          value={status}
          label={`${props.name}`}
          onChange={handleChange}
        >
          {props.list?.map((item: any) => (
            <MenuItem value={item.id}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
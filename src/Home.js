import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack} from '@mui/material';
import './Host.css';

export default function Host() {
  return (
    <Stack direction="column" spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Button variant="contained" component={Link} to="/host">Anordna</Button>
      <Button variant="contained" component={Link} to="/join">Delta</Button>
    </Stack>
  );
}

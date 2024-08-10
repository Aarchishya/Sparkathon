import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../Assets/logo.png';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="Logo" style={{ height: '30px',marginLeft:'10px' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />  {/* This Box will take up the remaining space and push the buttons to the right */}
          <Button variant="contained" style={{ backgroundColor: '#1A4870',color: 'white',margin:'10px'}}>Login</Button>
          <Button variant="contained" style={{ backgroundColor: '#1A4870',color: 'white',margin:'10px'}}>Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

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
            <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Logo" style={{ height: '30px', marginLeft: '10px' }} />
            </Link>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={{ backgroundColor: '#1A4870', color: 'white', margin: '10px' }}>
              Login
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={{ backgroundColor: '#1A4870', color: 'white', margin: '10px' }}>
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';

export default function Navbar() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Retrieve logged user information from localStorage when the component mounts
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('loggedUser');
    setUser(null); // Clear the user state
    navigate('/'); // Redirect to home or login page
  };

  React.useEffect(() => {
    // Listen for changes in the localStorage
    const handleStorageChange = () => {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      setUser(loggedUser);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
          {user ? (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome, {user.fullName}
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: '#1A4870', color: 'white', margin: '10px' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#1A4870', color: 'white', margin: '10px' }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#1A4870', color: 'white', margin: '10px' }}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

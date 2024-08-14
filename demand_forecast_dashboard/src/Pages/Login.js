import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const roles = ['b6', 'b7', 'b8'];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    role: false,
  });

  const [formValid, setFormValid] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false); // State to track login success
  const [loginError, setLoginError] = useState(''); // State to track login errors
  const navigate = useNavigate(); // Initialize the navigate hook

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = (data) => {
    const errors = {
      email: validateEmail(data.email) ? '' : 'Enter a valid email address',
      password: data.password ? '' : 'Password is required',
      role: data.role ? '' : 'Select a role',
    };

    setFormErrors(errors);

    const isValid = Object.values(errors).every((error) => !error);
    setFormValid(isValid);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateForm(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (touched[name]) {
      validateForm({ ...formData, [name]: value });
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTouched({
//       email: true,
//       password: true,
//       role: true,
//     });
//     validateForm(formData);

//     if (formValid) {
//       // Retrieve user data from localStorage
//       const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

//       if (storedUser) {
//         if (
//           storedUser.email === formData.email &&
//           storedUser.password === formData.password &&
//           storedUser.role === formData.role
//         ) {
//           console.log('Login successful!');
//           setLoginSuccessful(true);
//           setLoginError('');

//           // Store the logged-in user information
//           localStorage.setItem('loggedUser', JSON.stringify(storedUser));

//           // Redirect to the dashboard after a short delay
//           setTimeout(() => {
//             navigate('/dashboard');
//           }, 1000);
//         } else {
//           console.log('Invalid credentials');
//           setLoginError('Invalid email, password, or role');
//         }
//       } else {
//         console.log('No user found with this email');
//         setLoginError('No user found with this email');
//       }
//     } else {
//       console.log('Form is not valid');
//       setLoginError('Please fill out all required fields correctly');
//     }
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      role: true,
    });
    validateForm(formData);
  
    if (formValid) {
      // Retrieve user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
  
      if (storedUser) {
        if (
          storedUser.email === formData.email &&
          storedUser.password === formData.password &&
          storedUser.role === formData.role
        ) {
          console.log('Login successful!');
          setLoginSuccessful(true);
          setLoginError('');
  
          // Store the logged-in user information
          localStorage.setItem('loggedUser', JSON.stringify(storedUser));
  
          // Redirect to the dashboard immediately
          navigate('/dashboard');
        } else {
          console.log('Invalid credentials');
          setLoginError('Invalid email, password, or role');
        }
      } else {
        console.log('No user found with this email');
        setLoginError('No user found with this email');
      }
    } else {
      console.log('Form is not valid');
      setLoginError('Please fill out all required fields correctly');
    }
  };
  

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Paper elevation={3} sx={{ padding: 2, width: '80%' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Login
            </Typography>
            {loginSuccessful && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Login successful! Redirecting to the dashboard...
              </Alert>
            )}
            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                required
                error={touched.email && Boolean(formErrors.email)}
                helperText={touched.email && formErrors.email}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                required
                type="password"
                error={touched.password && Boolean(formErrors.password)}
                helperText={touched.password && formErrors.password}
              />
              <TextField
                fullWidth
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                required
                error={touched.role && Boolean(formErrors.role)}
                helperText={touched.role && formErrors.role}
              >
                {roles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={!formValid}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Login;

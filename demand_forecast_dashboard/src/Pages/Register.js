import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Paper, Alert } from '@mui/material';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const roles = ['b6', 'b7', 'b8'];

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    passwordMatch: '',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    role: false,
  });

  const [formValid, setFormValid] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = (data) => {
    const errors = {
      fullName: data.fullName ? '' : 'Full name is required',
      email: validateEmail(data.email) ? '' : 'Enter a valid email address',
      password: data.password ? '' : 'Password is required',
      confirmPassword: data.confirmPassword ? '' : 'Confirm your password',
      role: data.role ? '' : 'Select a role',
      passwordMatch: data.password === data.confirmPassword ? '' : 'Passwords do not match',
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
//       fullName: true,
//       email: true,
//       password: true,
//       confirmPassword: true,
//       role: true,
//     });
//     validateForm(formData);
//     if (formValid) {
//       // Save user data to localStorage
//       localStorage.setItem('user', JSON.stringify(formData));
//       console.log('User registered:', formData);
//       setRegistrationSuccess(true); // Show success message

//       // Redirect to the login page after 2 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     }
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      role: true,
    });
    validateForm(formData);
    if (formValid) {
      // Save user data to localStorage, but don't log them in
      localStorage.setItem('registeredUser', JSON.stringify(formData));
      console.log('User registered:', formData);
      setRegistrationSuccess(true); // Show success message
  
      // Redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
              Register
            </Typography>
            {registrationSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                User successfully registered! Redirecting to login...
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                required
                error={touched.fullName && Boolean(formErrors.fullName)}
                helperText={touched.fullName && formErrors.fullName}
              />
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
                label="Create Password"
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
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                required
                type="password"
                error={(touched.confirmPassword || touched.password) && Boolean(formErrors.confirmPassword || formErrors.passwordMatch)}
                helperText={(touched.confirmPassword || touched.password) && (formErrors.confirmPassword || formErrors.passwordMatch)}
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
                Register
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Register;

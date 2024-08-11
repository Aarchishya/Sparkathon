import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Paper } from '@mui/material';
import Navbar from '../Components/Navbar';

const roles = ['b6', 'b7', 'b8'];

const LoginPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      role: true,
    });
    validateForm(formData);
    if (formValid) {
      // Handle form submission
      console.log('Form submitted:', formData);
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

export default LoginPage;

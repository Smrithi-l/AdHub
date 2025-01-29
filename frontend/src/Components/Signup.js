import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('User registered:', response.data);
      navigate('/dashboard'); // Redirect to the dashboard after successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      alert(error.response?.data?.message || 'Server error, please try again');
    }
  };

  return (
    <div className="signup-page">
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 3, borderRadius: 3 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;

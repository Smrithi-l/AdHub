import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the fields are empty
    if (!formData.email || !formData.password) {
      setError("Both email and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure content type is JSON
        },
      });

      // Save token to localStorage
      localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 3, borderRadius: 3 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Login to Your Account
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

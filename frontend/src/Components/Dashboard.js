import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import "./Dashboard.css";

const Dashboard = () => {
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    niche: "",
    image: "",
    priceRange: "",
    audience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Get user's token
      const response = await fetch("http://localhost:5000/api/ads/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        setAdData({
          title: "",
          description: "",
          niche: "",
          image: "",
          priceRange: "",
          audience: "",
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create ad.");
      }
    } catch (err) {
      console.error("Error submitting ad:", err);
      alert("An error occurred. Please try again.");
    }
  };

  
  return (
    <div className="dashboard">
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" gutterBottom>
              Welcome to AdHub Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Get started with managing your campaigns, publishers, and advertisers in one place.
            </Typography>
          </motion.div>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={4} justifyContent="center">
          {["Campaigns", "Publishers", "Advertisers"].map((type, index) => (
            <Grid item xs={12} sm={4} key={type}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper sx={{ padding: 3, textAlign: "center" }} elevation={3}>
                  <Typography variant="h4" gutterBottom>
                    {index * 4 + 4}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    Active {type}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    View {type}
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Ad Creation Form */}
        <Box sx={{ mt: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper sx={{ padding: 3, borderRadius: 3 }} elevation={6}>
              <Typography variant="h4" align="center" gutterBottom>
                Create an Ad
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Ad Title"
                      variant="outlined"
                      fullWidth
                      required
                      name="title"
                      value={adData.title}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Ad Description"
                      variant="outlined"
                      fullWidth
                      required
                      name="description"
                      multiline
                      rows={4}
                      value={adData.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Ad Niche"
                      variant="outlined"
                      fullWidth
                      required
                      name="niche"
                      value={adData.niche}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Ad Image URL"
                      variant="outlined"
                      fullWidth
                      required
                      name="image"
                      value={adData.image}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Price Range"
                      variant="outlined"
                      fullWidth
                      required
                      name="priceRange"
                      value={adData.priceRange}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Targeted Audience"
                      variant="outlined"
                      fullWidth
                      required
                      name="audience"
                      value={adData.audience}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      size="large"
                    >
                      Submit Ad
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;

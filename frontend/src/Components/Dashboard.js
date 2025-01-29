import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const [ads, setAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

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
      const token = localStorage.getItem("authToken");
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
        alert(data.message);
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

  const fetchAds = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ads");
      if (response.ok) {
        const data = await response.json();
        setAds(data.ads);
      } else {
        console.error("Failed to fetch ads");
      }
    } catch (err) {
      console.error("Error fetching ads:", err);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      fetchAds();
      setAdminDialogOpen(false);
    } else {
      alert("Incorrect password.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAds([]);
  };

  return (
    <div className="dashboard">
      <Container maxWidth="lg">
        {/* Navbar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h4">AdHub</Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setAdminDialogOpen(true)}
          >
            Admin Login
          </Button>
        </Box>

        {/* Admin Login Dialog */}
        <Dialog open={adminDialogOpen} onClose={() => setAdminDialogOpen(false)}>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogContent>
            <TextField
              type="password"
              label="Password"
              fullWidth
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAdminDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdminLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

        {isAdmin ? (
          <Box>
            {/* Admin Panel */}
            <Typography variant="h4" gutterBottom>
              Admin Panel
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAdminLogout}
              sx={{ mb: 3 }}
            >
              Logout
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Niche</TableCell>
                    <TableCell>Price Range</TableCell>
                    <TableCell>Audience</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ads.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>{ad.title}</TableCell>
                      <TableCell>{ad.description}</TableCell>
                      <TableCell>{ad.niche}</TableCell>
                      <TableCell>{ad.priceRange}</TableCell>
                      <TableCell>{ad.audience}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box>
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
                  Get started with managing your campaigns, publishers, and
                  advertisers in one place.
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
                    <Paper
                      sx={{
                        padding: 3,
                        textAlign: "center",
                        background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                      elevation={3}
                    >
                      <Typography variant="h4" gutterBottom>
                        {index * 4 + 4}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Active {type}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
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
                <Paper
                  sx={{
                    padding: 3,
                    borderRadius: 3,
                    background: "#fafafa",
                  }}
                  elevation={6}
                >
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
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;

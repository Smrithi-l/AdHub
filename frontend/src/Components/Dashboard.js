import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChatWidget from "./ChatWidget"; // Import the ChatWidget component
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [userId, setUserId] = useState(null); // Store user ID

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && storedUserId !== "null") {
      setUserId(storedUserId); // Set the userId only if it's valid
    } else {
      console.error("User ID is missing or invalid.");
    }
  }, []);
  // This will run only once when the component is mounted
  
  useEffect(() => {
    if (userId) {
      fetchAds(userId); // Fetch ads when userId is set
    }
  }, [userId]); // This will run only when the userId changes
   // This ensures fetchAds runs only when userId is set
  

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
        fetchAds(userId);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create ad.");
      }
    } catch (err) {
      console.error("Error submitting ad:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchAds = async (userId) => {
    try {
      // Ensure userId is available
      if (!userId) {
        console.error("User ID is missing or invalid.");
        alert("Invalid or missing user ID.");
        return;
      }
  
      // Make sure userId is sent as query parameter
      const response = await fetch(`http://localhost:5000/api/ads/ads?userId=${userId}`);
  
      if (response.ok) {
        const data = await response.json();
        setAds(data.ads);  // Set the ads only for the logged-in user
        console.log("Fetched ads:", data.ads);
      } else {
        console.error("Failed to fetch ads");
      }
    } catch (err) {
      console.error("Error fetching ads:", err);
    }
  };
  
  
  // Pie chart data for ads created
  const pieChartData = {
    labels: ["Ads Created", "Remaining Ads"],
    datasets: [
      {
        data: [ads.length, 10 - ads.length], // Assuming a max of 10 ads for this example
        backgroundColor: ["#4caf50", "#ff5722"],
        hoverBackgroundColor: ["#45a049", "#f44336"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Container maxWidth="lg">
        {/* Navbar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            AdHub
          </Typography>
        </Box>

        {/* Welcome Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
              Welcome to AdHub Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your campaigns, publishers, and advertisers efficiently.
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
                    background: "#3f51b5",
                    color: "#fff",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                  }}
                  elevation={3}
                >
                  <Typography variant="h4" gutterBottom>
                    {index * 4 + 4}
                  </Typography>
                  <Typography variant="h6">Active {type}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Ad Creation Section */}
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 600, width: "100%", padding: 4, borderRadius: "15px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                Create an Ad
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {["title", "description", "niche", "image", "priceRange", "audience"].map((field) => (
                    <Grid item xs={12} key={field}>
                      <TextField
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        variant="outlined"
                        fullWidth
                        required
                        name={field}
                        value={adData[field]}
                        onChange={handleChange}
                        multiline={field === "description"}
                        rows={field === "description" ? 4 : 1}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="secondary" fullWidth size="large">
                      Submit Ad
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>

        {/* User Ads List */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}>
            Your Created Ads
          </Typography>
          <Grid container spacing={3}>
            {ads.map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad._id}>
                <Paper sx={{ padding: 3, borderRadius: "12px", boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {ad.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {ad.description}
                  </Typography>
                  <Typography variant="caption" sx={{ display: "block", mt: 1, color: "gray" }}>
                    Niche: {ad.niche}
                  </Typography>
                  <Typography variant="caption" sx={{ display: "block", mt: 1, color: "gray" }}>
                    Price Range: {ad.priceRange}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Chat Widget */}
        <Box sx={{ mt: 6 }}>
          <ChatWidget />
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
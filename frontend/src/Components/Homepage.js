
import { Link } from "react-router-dom";
import { Container, Typography, Grid, TextField, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import "./Homepage.css";
import React, { useEffect } from "react";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top
  }, []);


  return (

    <div className="homepage">
      <header className="header">
        <div className="logo">AdHub</div>
        <nav className="nav">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="#features">Features</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">
            <button className="btn-signup">Sign Up</button>
          </Link>
        </nav>
      </header>

      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="hero-content">
          <h1>Connecting Advertisers with Publishers, Seamlessly</h1>
          <p>
            Empowering your advertising journey with real-time analytics,
            optimized campaigns, and trusted connections.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <img
          className="hero-image"
          src="https://via.placeholder.com/1200x600"
          alt="AdHub Hero"
        />
      </motion.section>

      <motion.section
        id="features"
        className="features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Analytics</h3>
            <p>Track campaign performance with powerful tools.</p>
          </div>
          <div className="feature-card">
            <h3>Optimized Campaigns</h3>
            <p>Maximize ROI with AI-driven optimization.</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Connections</h3>
            <p>Collaborate with reliable advertisers and publishers.</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            AdHub is a platform designed to connect advertisers with publishers
            seamlessly. Our mission is to provide an efficient way to run
            optimized ad campaigns, track performance in real-time, and build
            lasting, trusted partnerships across industries.
          </Typography>
        </Container>
      </motion.section>

      <motion.section
        id="contact"
        className="contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom align="center">
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Have questions or want to get in touch? We're here to help!
          </Typography>
          <form className="contact-form">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </motion.section>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 AdHub. All rights reserved.</p>
          <nav className="footer-nav">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material";

const AdminDashboard = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/ads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAds(response.data.ads);
      } catch (err) {
        setError("Failed to fetch ads. Please try again.");
      }
    };
    fetchAds();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>{ad._id}</TableCell>
                <TableCell>{ad.title}</TableCell>
                <TableCell>{ad.description}</TableCell>
                <TableCell>{new Date(ad.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default AdminDashboard;

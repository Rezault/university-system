import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SearchBar from "../components/SearchBar";

function AllDegrees() {
  const [degrees, setDegrees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree/")
      .then((response) => response.json())
      .then((data) => setDegrees(data));
  }, []);

  // Filter degrees based on the search term
  const filteredDegrees = degrees.filter((degree) => {
    const search = searchTerm.toLowerCase();
    return (
      degree.shortcode.toLowerCase().includes(search) ||
      degree.full_name.toLowerCase().includes(search)
    );
  });

  return (
    <>
      {/* Subtle Teal Gradient Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0093E9 10%, #80D0C7 100%)",
          py: 3,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Degrees
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Pick a degree to view details
        </Typography>
      </Box>

      {/* Floating Paper with Search Bar & Degrees List */}
      <Container maxWidth="md" sx={{ mt: -3, mb: 4 }}>
        <Paper sx={{ p: 2, boxShadow: 4, borderRadius: 2 }}>
          {/* Search Bar Inside the Paper */}
          <SearchBar
            label="Search Degrees"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sx={{ mb: 2 }}
          />

          {/* Degrees List */}
          <List>
            {filteredDegrees.map((elem, index) => (
              <Box key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={`/degree/${elem.shortcode}`}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={elem.shortcode}
                      secondary={elem.full_name}
                    />
                  </ListItemButton>
                </ListItem>
                {index < filteredDegrees.length - 1 && <Divider component="li" />}
              </Box>
            ))}

            {/* Fallback if no matches */}
            {filteredDegrees.length === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                No degrees found for "{searchTerm}"
              </Typography>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default AllDegrees;

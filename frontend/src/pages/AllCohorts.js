import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchBar from "../components/SearchBar";

function AllCohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort")
      .then((response) => response.json())
      .then((data) => setCohorts(data));
  }, []);

  // Filter cohorts based on the search term (matching ID, name, or year)
  const filteredCohorts = cohorts.filter((cohort) => {
    const search = searchTerm.toLowerCase();
    return (
      String(cohort.id).toLowerCase().includes(search) ||
      cohort.name.toLowerCase().includes(search) ||
      String(cohort.year).toLowerCase().includes(search)
    );
  });

  return (
    <>
      {/* Gradient Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FFB74D, #FF8A65)",
          py: 3,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Cohorts
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Browse all available cohorts
        </Typography>
      </Box>

      {/* Floating Paper with the Search Bar & Cohorts List */}
      <Container maxWidth="md" sx={{ mt: -2, mb: 4 }}>
        <Paper sx={{ p: 2, boxShadow: 4, borderRadius: 2 }}>
          <SearchBar
            label="Search Cohorts"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sx={{ mb: 2 }}
          />

          {/* Cohorts List */}
          <List>
            {filteredCohorts.map((elem, index) => (
              <div key={index}>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={`/cohort/${elem.id}`}>
                    <ListItemText
                      primary={`Cohort ID: ${elem.id}`}
                      secondary={`Name: ${elem.name} • Year ${elem.year}`}
                    />
                  </ListItemButton>
                </ListItem>
                {index < filteredCohorts.length - 1 && <Divider component="li" />}
              </div>
            ))}
            {filteredCohorts.length === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                No cohorts found for "{searchTerm}".
              </Typography>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default AllCohorts;

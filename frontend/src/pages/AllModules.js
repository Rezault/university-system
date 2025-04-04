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
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../components/SearchBar";

function AllModules() {
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/module")
      .then((response) => response.json())
      .then((data) => setModules(data));
  }, []);

  // Filter modules by searchTerm
  const filteredModules = modules.filter((mod) => {
    const search = searchTerm.toLowerCase();
    return (
      mod.code.toLowerCase().includes(search) ||
      mod.full_name.toLowerCase().includes(search)
    );
  });

  return (
    <>
      {/* Gradient Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #00b09b, #96c93d)",
          py: 3,
          textAlign: "center",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Modules
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Explore our course modules
          </Typography>
        </Container>
      </Box>

      {/* Floating Paper with the Modules List and Search Bar */}
      <Container maxWidth="md" sx={{ mt: -2, mb: 4 }}>
        <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
          {/* Search Bar */}
          <SearchBar
            label="Search Modules"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sx={{ mb: 2 }}
        />

          {/* Filtered List of Modules */}
          <List>
            {filteredModules.map((elem, index) => (
              <Box key={index}>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={`/module/${elem.code}`}>
                    <ListItemText primary={`${elem.code} - ${elem.full_name}`} />
                  </ListItemButton>
                </ListItem>
                {index < filteredModules.length - 1 && <Divider />}
              </Box>
            ))}

            {/* Show a friendly message if no results match the search */}
            {filteredModules.length === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                No modules found for "{searchTerm}".
              </Typography>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default AllModules;

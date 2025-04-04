import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

function Degree() {
  const { shortCode } = useParams();
  const [degree, setDegree] = useState({});
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    // Fetch degree details
    fetch(`http://127.0.0.1:8000/api/degree/${shortCode}`)
      .then((res) => res.json())
      .then((data) => setDegree(data));

    // Fetch cohorts associated with this degree
    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${shortCode}`)
      .then((res) => res.json())
      .then((data) => setCohorts(data));
  }, [shortCode]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Degree Details */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {degree.full_name || "Loading Degree..."}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Degree Shortcode: {degree.shortcode}
        </Typography>
      </Paper>

      {/* Cohorts List */}
      <Paper sx={{ p: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Cohorts
        </Typography>
        {cohorts.length ? (
          <List>
            {cohorts.map((elem, index) => (
              <Box key={index}>
                <ListItem button component={Link} to={`/cohort/${elem.id}`}>
                  <ListItemText primary={`${elem.id}`} />
                </ListItem>
                {index < cohorts.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No cohorts found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default Degree;

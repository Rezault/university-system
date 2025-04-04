import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CreateCohort() {
  const navigate = useNavigate();

  const [cohortName, setCohortName] = useState("");
  const [cohortId, setCohortId] = useState("");
  const [year, setYear] = useState(1);
  const [degree, setDegree] = useState("Select a degree");
  const [allDegrees, setAllDegrees] = useState([]);

  // Fetch all degrees on component mount.
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree")
      .then((response) => response.json())
      .then((data) => setAllDegrees(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cohortId.trim() === "") {
      return alert("Cohort ID cannot be empty!");
    }
    if (year < 1) {
      return alert("Year must be atleast 1!");
    } 
    if (year > 4) {
      return alert("Year cannot be greater than 4!");
    }
    if (degree === "" || degree === "Select a degree") {
      return alert("You must select a degree!");
    }

    const data = {
      id: cohortId,
      year: Number(year),
      degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
    };

    fetch("http://127.0.0.1:8000/api/cohort/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then(() => {
        navigate("/cohorts/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create Cohort
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Cohort ID"
            value={cohortId}
            onChange={(e) => setCohortId(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="degree-label">Degree</InputLabel>
            <Select
              labelId="degree-label"
              label="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              <MenuItem value="Select a degree">Select a degree</MenuItem>
              {allDegrees.map((elem, index) => (
                <MenuItem key={index} value={elem.shortcode}>
                  {elem.shortcode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateCohort;

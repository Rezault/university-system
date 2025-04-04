import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

function CreateDegree() {
  const navigate = useNavigate();

  const [degreeName, setDegreeName] = useState("");
  const [degreeShortcode, setDegreeShortcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (degreeName.trim() === "") {
      return alert("Degree name cannot be empty!");
    }
    if (degreeShortcode.trim() === "") {
      return alert("Degree shortcode cannot be empty!");
    }

    const data = {
      full_name: degreeName,
      shortcode: degreeShortcode,
    };

    fetch("http://127.0.0.1:8000/api/degree/", {
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
        navigate("/degrees/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create Degree
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
            label="Degree Name"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Degree Shortcode"
            value={degreeShortcode}
            onChange={(e) => setDegreeShortcode(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateDegree;

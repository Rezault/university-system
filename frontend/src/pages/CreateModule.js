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
  FormLabel,
} from "@mui/material";
import Checkbox from "../components/Checkbox";

function CreateModule() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [deliveredTo, setDeliveredTo] = useState([]);
  const [caSplit, setCaSplit] = useState(0);
  const [cohorts, setCohorts] = useState([]);

  // Fetch all cohorts from the API.
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort/")
      .then((response) => response.json())
      .then((data) => setCohorts(data));
  }, []);

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.trim() === "") {
      return alert("Module code cannot be empty!");
    }
    if (fullName.trim() === "") {
      return alert("Module name cannot be empty!");
    }
    if (deliveredTo.length === 0) {
      return alert("You must select at least one cohort!");
    }

    const data = {
      code: code,
      full_name: fullName,
      delivered_to: deliveredTo,
      ca_split: caSplit,
    };

    fetch("http://127.0.0.1:8000/api/module/", {
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
        navigate("/modules/");
      })
      .catch((err) => console.error(err));
  };

  // Handle checkbox changes.
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setDeliveredTo((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  // Render the list of cohorts as checkboxes.
  const showCohorts = () => {
    return cohorts.map((elem, index) => (
      <Box key={index} sx={{ mb: 1 }}>
        <Checkbox
          label={elem.id}
          value={`http://127.0.0.1:8000/api/cohort/${elem.id}/`}
          checked={deliveredTo.includes(
            `http://127.0.0.1:8000/api/cohort/${elem.id}/`
          )}
          onChange={handleCheckboxChange}
        />
      </Box>
    ));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create Module
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Module Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
          />
          <TextField
            label="Module Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
          <TextField
            label="CA Split"
            variant="outlined"
            type="number"
            value={caSplit}
            onChange={(e) => setCaSplit(e.target.value)}
            fullWidth
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Select Cohort(s) Delivered To
            </FormLabel>
            <Box sx={{ mt: 1 }}>{showCohorts()}</Box>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateModule;

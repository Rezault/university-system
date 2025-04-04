import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

function CreateStudent() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cohort, setCohort] = useState("Select a cohort");
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort/")
      .then((response) => response.json())
      .then((data) => setCohorts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentId.trim() === "") {
      return alert("Student ID cannot be empty!");
    }
    if (firstName.trim() === "" || lastName.trim() === "") {
      return alert("Student name cannot be empty!");
    }
    if (
      email.trim() === "" ||
      !(email.includes("@") && email.includes("."))
    ) {
      return alert("Enter a valid email!");
    }
    if (cohort === "" || cohort === "Select a cohort") {
      return alert("You must select a cohort!");
    }

    const data = {
      student_id: studentId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
    };

    fetch("http://127.0.0.1:8000/api/student/", {
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
        navigate(`/student/${studentId}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create Student
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
            label="Student ID"
            variant="outlined"
            fullWidth
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="cohort-label">Cohort</InputLabel>
            <Select
              labelId="cohort-label"
              label="Cohort"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            >
              <MenuItem value="Select a cohort">
                Select a cohort
              </MenuItem>
              {cohorts.map((elem, index) => (
                <MenuItem key={index} value={elem.id}>
                  {elem.id}
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

export default CreateStudent;

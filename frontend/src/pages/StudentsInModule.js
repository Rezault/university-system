import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import SearchBar from "../components/SearchBar";

function StudentsInModule() {
  const { shortCode } = useParams();
  const location = useLocation();
  const module = location.state?.module;

  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");

  // Fetch all cohorts this module was delivered to.
  useEffect(() => {
    if (!module || !module.delivered_to) return;
    module.delivered_to.forEach((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCohorts((prev) => {
            // Only add if not already present.
            if (prev.some((c) => c.id === data.id)) return prev;
            return [...prev, data];
          });
        });
    });
  }, [module]);

  // Fetch all students in each cohort.
  useEffect(() => {
    if (cohorts.length === 0) return;
    cohorts.forEach((cohort) => {
      fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort.id}`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((student) => {
            setStudents((prev) => {
              // Only add unique students.
              if (prev.some((s) => s.student_id === student.student_id)) return prev;
              return [...prev, student];
            });
          });
        });
    });
  }, [cohorts]);

  const filteredStudents = students.filter((student) => {
    const search = studentSearch.toLowerCase();
    return (
        student.first_name.toLowerCase().includes(search) || 
        student.last_name.toLowerCase().includes(search) ||
        student.student_id.toLowerCase().includes(search)
    );
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Students in {shortCode}
        </Typography>
        <br/>
        <SearchBar
            label="Search Students"
            searchTerm={studentSearch}
            setSearchTerm={setStudentSearch}
            sx={{ mb: 2 }}
        />
        <List>
          {filteredStudents.map((student, index) => (
            <Box key={index}>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={`/student/${student.student_id}`}>
                  <ListItemText
                    primary={`${student.first_name} ${student.last_name}`}
                    secondary={`ID: ${student.student_id}`}
                  />
                </ListItemButton>
              </ListItem>
              {index < students.length - 1 && <Divider component="li" />}
            </Box>
          ))}
          {students.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
              No students found.
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default StudentsInModule;

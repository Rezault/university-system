import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Divider,
} from "@mui/material";

import SearchBar from "../components/SearchBar";

function Cohort() {
  const { id } = useParams(); 
  const [cohort, setCohort] = useState({});
  const [modulesDelivered, setModulesDelivered] = useState([]);
  const [students, setStudents] = useState([]);
  const [moduleSearchTerm, setModuleSearchTerm] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");

  useEffect(() => {
    // Fetch cohort details
    fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
      .then((response) => response.json())
      .then((data) => setCohort(data));

    // Fetch modules delivered to this cohort
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${id}`)
      .then((response) => response.json())
      .then((data) => setModulesDelivered(data));

    // Fetch students in this cohort
    fetch(`http://127.0.0.1:8000/api/student/?cohort=${id}`)
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, [id]);

  const renderListItems = (items, type) =>
    items.map((elem, index) => (
      <Box key={index}>
        <ListItem
          button
          component={Link}
          to={
            type === "module"
              ? `/module/${elem.code}`
              : `/student/${elem.student_id}`
          }
        >
          <ListItemText
            primary={
              type === "module"
                ? `${elem.code} - ${elem.full_name}`
                : `${elem.first_name} ${elem.last_name} (${elem.student_id})`
            }
          />
        </ListItem>
        {index < items.length - 1 && <Divider />}
      </Box>
    ));

    const filteredModules = modulesDelivered.filter((module) => {
        const search = moduleSearchTerm.toLowerCase();
        return (
            module.code.toLowerCase().includes(search) ||
            module.full_name.toLowerCase().includes(search)
        );
    });

    const filteredStudents = students.filter((student) => {
        const search = studentSearchTerm.toLowerCase();
        return (
            student.first_name.toLowerCase().includes(search) ||
            student.last_name.toLowerCase().includes(search) || 
            student.student_id.toLowerCase().includes(search)
        );
    });

    return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Cohort Details */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Cohort Details
        </Typography>
        <Typography variant="body1">
          <strong>Cohort ID:</strong> {cohort.id || "Loading..."}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {cohort.name}
        </Typography>
        <Typography variant="body1">
          <strong>Year:</strong> {cohort.year}
        </Typography>
      </Paper>

      {/* Modules Delivered */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Modules Delivered
        </Typography>
        <br/>
        <SearchBar
            label="Search Modules"
            searchTerm={moduleSearchTerm}
            setSearchTerm={setModuleSearchTerm}
            sx= {{ mb: 2 }}
        />
        {modulesDelivered.length ? (
          <List>{renderListItems(filteredModules, "module")}</List>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No modules delivered.
          </Typography>
        )}
      </Paper>

      {/* Students */}
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
            Students in cohort
            </Typography>
            <br/>
            <SearchBar
                label="Search Students"
                searchTerm={studentSearchTerm}
                setSearchTerm={setStudentSearchTerm}
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

export default Cohort;

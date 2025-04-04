import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar
} from "@mui/material";
import SearchBar from "../components/SearchBar";

function Student() {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [modules, setModules] = useState([]);
  const [grades, setGrades] = useState({});
  const [moduleSearch, setModuleSearch] = useState("");

  // State for inline grade editing modal
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newCAGrade, setNewCAGrade] = useState("");
  const [newExamGrade, setNewExamGrade] = useState("");

  // State for success message
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch student details and grades
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${studentId}`)
      .then((response) => response.json())
      .then((data) => setStudent(data));

    fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        const gradeObj = {};
        data.forEach((grade) => {
          const segments = grade.module.split("/").filter(Boolean);
          const shortCode = segments[segments.length - 1];
          gradeObj[shortCode] = grade;
        });
        setGrades(gradeObj);
      });
  }, [studentId]);

  // Fetch modules using the student's cohort
  useEffect(() => {
    if (student.cohort) {
      fetch(student.cohort)
        .then((response) => response.json())
        .then((cohortData) =>
          fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortData.id}`)
        )
        .then((response) => response.json())
        .then((data) => setModules(data))
        .catch((err) => console.log(err));
    }
  }, [student]);

  const filteredModules = modules.filter((module) => {
    const searchTerm = moduleSearch.toLowerCase();
    return (
      module.code.toLowerCase().includes(searchTerm) ||
      module.full_name.toLowerCase().includes(searchTerm)
    );
  });

  // Open modal for editing a grade. Pre-fill with current values (if available).
  const openGradeModal = (module) => {
    setSelectedModule(module);
    const currentGrade = grades[module.code];
    setNewCAGrade(currentGrade && currentGrade.ca_mark !== undefined ? currentGrade.ca_mark : "");
    setNewExamGrade(currentGrade && currentGrade.exam_mark !== undefined ? currentGrade.exam_mark : "");
    setGradeModalOpen(true);
  };

  const closeGradeModal = () => {
    setGradeModalOpen(false);
    setSelectedModule(null);
    setNewCAGrade("");
    setNewExamGrade("");
  };

  const handleRequest = (url, method) => {
    const data = {
      module: `http://127.0.0.1:8000/api/module/${selectedModule.code}/`,
      ca_mark: parseInt(newCAGrade),
      exam_mark: parseInt(newExamGrade),
      cohort: student.cohort,
      student: `http://127.0.0.1:8000/api/student/${studentId}/`
    }

    fetch(url, {
      method: method,
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
      .then((updatedGrade) => {
        // Update local state with updated grade
        setGrades((prev) => ({
          ...prev,
          [selectedModule.code]: updatedGrade,
        }));
        setSuccessMessage(`Grade for ${selectedModule.code} updated successfully!`);
        setOpenSnackbar(true);
        closeGradeModal();
      })
      .catch((err) => console.error(err));
  }

  const handleGradeSubmit = () => {
    const data = {
      module: `http://127.0.0.1:8000/api/module/${selectedModule.code}/`,
      ca_mark: parseInt(newCAGrade),
      exam_mark: parseInt(newExamGrade),
      cohort: student.cohort,
      student: `http://127.0.0.1:8000/api/student/${studentId}/`
    }

    if (grades[selectedModule.code]) {
      // We already have a grade, send a PATCH request
      handleRequest(`http://127.0.0.1:8000/api/grade/${grades[selectedModule.code].id}/`, "PATCH");
    } else {
      // We don't have a grade, send a POST request to create a new one
      handleRequest(`http://127.0.0.1:8000/api/grade/`, "POST");
    }
  };

  const renderModules = () => {
    return filteredModules.map((elem) => {
      // Look up the grade using the module code
      const grade = grades[elem.code];

      const caDisplay = grade?.ca_mark !== undefined ? grade.ca_mark.toFixed(2) : "N/A";
      const examDisplay = grade?.exam_mark !== undefined ? grade.exam_mark.toFixed(2) : "N/A";
      const totalDisplay = grade?.total_grade !== undefined ? grade.total_grade.toFixed(2) : "N/A";
      return (
        <Box
          key={elem.code}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <ListItem disablePadding sx={{ flexGrow: 1 }}>
            <ListItemButton component={Link} to={`/module/${elem.code}`}>
              <ListItemText
                primary={`${elem.code} - ${elem.full_name}`}
                secondary={<>
                  <Typography variant="body2">CA: {caDisplay}</Typography>
                  <Typography variant="body2">Exam: {examDisplay}</Typography>
                  <Typography variant="body2">Total: {totalDisplay}</Typography>
                </>}
              />
            </ListItemButton>
          </ListItem>
          <Button
            variant="outlined"
            size="small"
            onClick={() => openGradeModal(elem)}
            sx={{ ml: 2 }}
          >
            Edit Grade
          </Button>
          <Divider sx={{ my: 1 }} />
        </Box>
      );
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {/* Student Details Card */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Student Details
        </Typography>
        <Typography variant="body1">
          <strong>Student ID:</strong> {studentId}
        </Typography>
        <Typography variant="body1">
          <strong>Full Name:</strong> {student.first_name} {student.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {student.email}
        </Typography>
      </Paper>

      {/* Modules and Grades Card */}
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Modules
        </Typography>

        <SearchBar
          label="Search Modules"
          searchTerm={moduleSearch}
          setSearchTerm={setModuleSearch}
          sx={{ mb: 2 }}
        />

        {modules.length > 0 ? (
          <List sx={{ p: 0 }}>{renderModules()}</List>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No modules found.
          </Typography>
        )}
      </Paper>

      {/* Inline Grade Editing Modal */}
      <Dialog open={gradeModalOpen} onClose={closeGradeModal}>
        <DialogTitle>Edit Grade for {selectedModule ? selectedModule.code : ""}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the CA Grade and Exam Grade for {selectedModule ? selectedModule.code : "this module"}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="CA Grade"
            type="number"
            fullWidth
            variant="outlined"
            value={newCAGrade}
            onChange={(e) => setNewCAGrade(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Exam Grade"
            type="number"
            fullWidth
            variant="outlined"
            value={newExamGrade}
            onChange={(e) => setNewExamGrade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeGradeModal}>Cancel</Button>
          <Button onClick={handleGradeSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
        </Dialog>

        {/* Snackbar for success message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={successMessage}
        />
    </Container>    
  );
}

export default Student;

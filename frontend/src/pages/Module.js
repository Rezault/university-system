import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Paper, Typography, Button, Box } from "@mui/material";

function Module() {
  const { shortCode } = useParams();
  const [moduleData, setModuleData] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/${shortCode}`)
      .then((res) => res.json())
      .then((data) => setModuleData(data));
  }, [shortCode]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {moduleData.code || "Loading..."}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {moduleData.full_name}
        </Typography>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            component={Link}
            to={`/students-in-module/${shortCode}`}
            state={{ module: moduleData }}
          >
            View Students in This Module
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Module;

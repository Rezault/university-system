import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
  CssBaseline
} from "@mui/material";

function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // full viewport height
      }}
    >
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #2196F3, #21CBF3)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography variant="h5" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", fontWeight: "bold" }}>
            🚀 Raz's University
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" component={Link} to="/degrees">
              🎓 Degrees
            </Button>
            <Button color="inherit" component={Link} to="/cohorts">
              🏫 Cohorts
            </Button>
            <Button color="inherit" component={Link} to="/modules">
              📚 Modules
            </Button>
            <Button color="inherit" component={Link} to="/create-degree">
              ✏️ Create Degree
            </Button>
            <Button color="inherit" component={Link} to="/create-cohort">
              📝 Create Cohort
            </Button>
            <Button color="inherit" component={Link} to="/create-module">
              🛠 Create Module
            </Button>
            <Button color="inherit" component={Link} to="/create-student">
              👨‍🎓 Create Student
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 6 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: "center",
          bgcolor: "grey.200",
          mt: "auto",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Raz's University
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;

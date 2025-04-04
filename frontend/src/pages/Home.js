import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #00BCD4, #009688)",
        py: 10,
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome to Raz's University! 🎓
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Manage degrees, cohorts, modules, and students with ease.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/degrees"
          sx={{
            bgcolor: "white",
            color: "primary.main",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}

export default Home;

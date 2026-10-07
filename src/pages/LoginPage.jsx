import { LockOutlined as LockIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    const result = login(username, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 12 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <LockIcon sx={{ fontSize: 32, color: "text.secondary", mb: 1 }} />

        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 0.5, letterSpacing: "-0.02em" }}>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your credentials or continue as a guest
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, textAlign: "left" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Enter any password (min 4 characters)"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.2 }}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="text"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Continue as Guest
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

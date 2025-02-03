import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import logo from "../assets/color.png";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true });
      // Since we're using cookies, no need to store token in localStorage
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleResetPassword = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    console.log("Reset password link sent to:", email);
    handleForgotPasswordClose();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#F3F3F6" }}>
      <Box sx={{ backgroundColor: "white", padding: 4, borderRadius: 2, boxShadow: 3, width: 400, textAlign: "center" }}>
        <img src={logo} alt="Table-Sprint" style={{ width: "150px", height: "40px", display: "block", margin: "auto" }} />
        <Typography variant="subtitle1" gutterBottom>Welcome to TablesSprint admin</Typography>

        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Log in</Button>

        <Typography variant="body2" sx={{ mt: 2, cursor: "pointer", color: "primary.main" }} onClick={handleForgotPassword}>
          Forgot Password?
        </Typography>

        <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose}>
          <DialogTitle>Forgot Password?</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Enter your email address and we'll send you a link to restore your password.
            </Typography>
            <TextField label="Email Address" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleForgotPasswordClose} color="secondary">
              Back to Log in
            </Button>
            <Button onClick={handleResetPassword} color="primary" variant="contained">
              Request Reset Link
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LoginPage;

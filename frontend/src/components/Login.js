import React, { useState } from 'react';
import { login } from '../api';
import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login({ username, password });
      alert(`Logged in successfully. Token: ${data.access_token}`);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;

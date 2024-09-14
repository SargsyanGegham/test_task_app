"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/thunks/auth";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { error, loading, token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(isAuthenticated()) {
      router.push('/dashboard')
    }
  }, [token])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }))
  };

  const disabled = useMemo(() => !username || !password || loading, [username, password, loading]);

  return (
    <Box>
      <Typography fontSize={52} color="primary" align="center" m={2}>Login</Typography>
      <form onSubmit={handleLogin}>
        <Box display="flex" gap={5} justifyContent="center" alignItems="flex-end" mt={25}>
          <Box>
            <InputLabel>Username</InputLabel>
            <TextField
              type="text"
              variant="outlined"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box>
            <InputLabel>Password</InputLabel>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          </Box>
            <Button 
              style={{ width: 200, height: 60 }}
              variant="contained" type="submit"
              disabled={disabled}
              >
              {loading ? 'loading...' : 'Login'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
      </form>
    </Box>
  );
}

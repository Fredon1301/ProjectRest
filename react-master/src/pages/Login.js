import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { blue, red } from '@mui/material/colors'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import LiquorIcon from '@mui/icons-material/Liquor'
import httpService from '../services/httpService'
import React, { useState } from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (lastLoginAttempt && Date.now() - lastLoginAttempt < 8000) {
          toast("Wait at least 8 seconds before trying again.");
          return;
        }
      
        setLastLoginAttempt(Date.now());
      
        const formData = new FormData(e.currentTarget);
        const data = {};
        for (const [key, value] of formData) {
          data[key] = value;
        }
      
        try {
          const response = await httpService.login(data);
          const result = await response.json();
          if (result["Access-Token"]) {
            localStorage.setItem("token", "Bearer " + result["Access-Token"]);
            navigate("/home");
          } else {
            toast(result.message);
          }
        } catch (err) {
          toast("Unknown error");
        }
      };

  const defaultTheme = createTheme({
    palette: {
        primary: {
            main: blue[800]
        }, 
        secondary: {
            main: red[300]
        }
    }
  })

  const [lastLoginAttempt, setLastLoginAttempt] = useState(null);

  return (
    <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" sx={{mt: 10}}>
                <Box flexDirection="column" display="flex" alignItems="center" justifyContent="center">
                    <Avatar sx={{bgcolor:"primary.main"}}>
                        <LiquorIcon />
                    </Avatar>
                    <Typography variant='h5'>
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} width="40%" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
                        <TextField required fullWidth margin="normal" name="email" type="email" label="Email"/>
                        <TextField required fullWidth margin="normal" name="password" type="password" label="Password"/>
                        <Button type="submit" fullWidth sx={{bgcolor: "primary.main", mt: 5}} variant='contained'> Send </Button>
                        <Grid sx={{mt: 2}} container>
                            <Grid item xs={8}>
                                <Link to="/register/user">Don't have an account? Create Account </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <ToastContainer/>
        </ThemeProvider>
    </>
  )
}

export default Login

import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { blue, red } from '@mui/material/colors';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import LiquorIcon from '@mui/icons-material/Liquor';
import { useNavigate, Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = {};
      for(const [key, value] of formData) {
          data[key] = value;
      }

      try {
          const response = await axios.post('http://localhost:3333/api/users', data); 
          if(response.data.success) {
              navigate('/');
              toast("Registro feito com sucesso!")
          } else {
              toast(response.data.message);

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
    });

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" sx={{ mt: 10 }}>
                    <Box flexDirection="column" display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <LiquorIcon />
                        </Avatar>
                        <Typography variant='h5'>
                            Register
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} width="40%" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
                            {}
                            <TextField required fullWidth margin="normal" name="name" type="text" label="Name" />
                            <TextField required fullWidth margin="normal" name="cpf" type="text" label="Cpf" inputProps={{ minLength: 11, maxLength: 11 }} />
                            <TextField required fullWidth margin="normal" name="email" type="email" label="Email"  />
                            <TextField required fullWidth margin="normal" name="password" type="password" label="Password" />
                            <Button type="submit" fullWidth sx={{ bgcolor: "primary.main", mt: 5 }} variant='contained'> Register </Button>
                            <Grid sx={{ mt: 2 }} container>
                                <Grid item xs={4}>
                                    {}
                                </Grid>
                                <Grid item xs={8}>
                                    <Link to="/">Already have an account? Sign in</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <ToastContainer/>
            </ThemeProvider>
        </>
    );
}

export default Register;

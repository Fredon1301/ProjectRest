import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { blue, red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const UpdateProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    try {
      let config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }
      const response = await axios.put('http://localhost:3333/api/product', data, config);
      if (response.data.success) {
        navigate('/home');
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
              <ChangeCircleIcon />
            </Avatar>
            <Typography variant='h5'>
              Update Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit} width="40%" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
              {}
              <TextField required fullWidth margin="normal" name="codProduct" type="text" label="Code Product" />
              <TextField required fullWidth margin="normal" name="name" type="text" label="New Name" />
              <TextField required fullWidth margin="normal" name="productType" type="text" label="New Product Type" />
              <TextField required fullWidth margin="normal" name="currentPrice" type="double" label="New Price" />
              <TextField required fullWidth margin="normal" name="expirationDate" type="text" label="New Expiration Date" />
              <TextField required fullWidth margin="normal" name="quantity" type="number" label="New Quantity" />
              <Button type="submit" fullWidth sx={{ bgcolor: "primary.main", mt: 5 }} variant='contained'> Update </Button>
              <Grid sx={{ mt: 2 }} container>
                <Grid item xs={4}>
                  {}
                </Grid>
                <Grid item xs={8}>
                  <Link to="/home">Return to home</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default UpdateProduct;
import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';
import { blue, red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PromoProduct = () => {
  const navigate = useNavigate();

  const [discountPercentage, setDiscountPercentage] = useState(0); // Estado para armazenar a porcentagem de desconto

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }


    const originalPrice = parseFloat(data.originalPrice);
    const promoPrice = parseFloat(data.currentPrice);

    if (isNaN(originalPrice) || isNaN(promoPrice)) {
      toast("Informe valores numéricos válidos para o preço original e o preço de promoção.");
      return;
    }


    const calculatedDiscountPercentage = ((originalPrice - promoPrice) / originalPrice) * 100;
    setDiscountPercentage(calculatedDiscountPercentage); 

    try {
      let config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }
      const response = await axios.put('http://localhost:3333/api/product', data, config);
      if (response.data.success) {
        navigate('/home');
        toast(`Registro feito com sucesso! Desconto: ${calculatedDiscountPercentage.toFixed(2)}%`);
      } else {
        toast(response.data.message);
      }
    } catch (err) {
      toast(" unknown error");
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
              <LocalOfferIcon />
            </Avatar>
            <Typography variant='h5'>
              Promotion Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit} width="40%" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
              <TextField required fullWidth margin="normal" name="codProduct" type="text" label="Code Product" />
              <TextField required fullWidth margin="normal" name="originalPrice" type="double" label="Original Price" />
              <TextField required fullWidth margin="normal" name="currentPrice" type="double" label="New Promotion Price" />
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

            {discountPercentage !== 0 && (
              <Typography variant='body2' color='text.secondary'>
                Porcentagem de Desconto: {discountPercentage.toFixed(2)}%
              </Typography>
            )}
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default PromoProduct;

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SuperMercado Real
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Home() {
  const [open, setOpen] = useState(false);
  const [codProduct, setcodProduct] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = async () => {
    try {
      const requestData = { codProduct };
      const response = await httpService.deleteProduct(requestData);
      if (response.status === 200) {
        toast(response);
        fetchProducts();
        handleClose();
      } else {
        toast('Erro ao excluir o produto');
      }
    } catch (error) {
      toast('Erro ao excluir o produto', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await httpService.getProducts();
      if (response.status === 200) {
        const productsData = await response.json();
        setProducts(productsData);
      } else {
        toast('Erro ao buscar produtos');
      }
    } catch (error) {
      toast.error('Erro ao buscar produtos', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateProduct = () => {
    navigate('/createProduct');
  };

  const handleUpdateProduct = () => {
    navigate('/UpdateProduct');
  };

  const handlePromoProduct = () => {
    navigate('/promoProduct');
  };
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write code product for confirm delete
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="codProduct"
            label="Code Product"
            type="text"
            fullWidth
            variant="standard"
            value={codProduct}
            onChange={(e) => setcodProduct(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteProduct}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Products
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Products
              </Typography>

              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button onClick={handleLogout} variant="outlined">
                  Logout
                </Button>
                <Button
                  onClick={handleCreateProduct}
                  variant="contained"
                >
                  Create Product
                </Button>
                <Button
                  onClick={handlePromoProduct}
                  variant="contained"
                >
                  Add Promotion
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.codProduct}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '56.25%',
                      }}
                      image="https://images.tcdn.com.br/img/img_prod/924009/fruta_do_conde_99_1_f15c90ccda37321a61342aed575de784.jpg"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography>
                        Product Type: {product.productType}
                      </Typography>
                      <Typography>
                        Price: {product.currentPrice}
                      </Typography>
                      <Typography>
                        Expiration Date: {product.expirationDate}
                      </Typography>
                      <Typography>
                        Product Code: {product.codProduct}
                      </Typography>
                      <Typography>
                        Quantity: {product.quantity}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={handleUpdateProduct}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setcodProduct(product.codProduct);
                          handleClickOpen();
                        }}
                        size="small"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Gerenciamento de produtos
          </Typography>
          <Copyright />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Home;
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Product from './pages/Product';
import UpdateProduct from './pages/UpdateProduct';
import PromoProduct from './pages/PromoProduct';


function App() {
  const defaultRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/register/user",
      element: <Register/>
    },
    {
      path: "/createProduct",
      element: <Product/>
    },
    {
      path: "/updateProduct",
      element: <UpdateProduct/>
    },
    {
      path: "/promoProduct",
      element: <PromoProduct/>
    },


  ])
  return (
    <div className="App">
      <RouterProvider router={defaultRouter}/>
    </div>
  );
}

export default App;

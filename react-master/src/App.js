import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Product from './pages/Product';

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
  ])
  return (
    <div className="App">
      <RouterProvider router={defaultRouter}/>
    </div>
  );
}

export default App;

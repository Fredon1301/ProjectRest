import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const defaultRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
      path: "/home",
      element: <Home/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={defaultRouter}/>
    </div>
  );
}

export default App;

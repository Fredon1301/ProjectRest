import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  const handleCreateProduct = () => {
    navigate("/createProduct")
  }
  return (
    <div>
      <h3>Home</h3>
      <Button onClick={handleLogout} variant="contained"> Logout </Button>
      <Button onClick={handleCreateProduct} variant="contained" sx={{ bgcolor: 'green', ml: 2 }}> Create Product </Button>
    </div>
  )
}

export default Home

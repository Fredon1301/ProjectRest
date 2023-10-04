import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <div>
      <h3>Home</h3>
      <Button onClick={handleLogout} variant="contained"> Logout </Button>
    </div>
  )
}

export default Home
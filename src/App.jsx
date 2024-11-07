import { Navigate, Route, Routes } from "react-router-dom";
import UserDetails from "./Components/UserDetails";
import Register from "./Components/RegisterPage";
import Login from "./Components/LoginPage"

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

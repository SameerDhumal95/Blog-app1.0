import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import Userdashboard from "./pages/user-routes/Userdashboard";
import Privateroute from "./component/Privateroute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile" element={<profileinfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

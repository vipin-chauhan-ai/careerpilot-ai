import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
 return (
 <>
 <Navbar />
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/about" element={<About />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="/register" element={<Register />} />
 <Route path="/login" element={<Login />} />
 <Route element={<ProtectedRoute />}>
 <Route path="/dashboard" element={<Dashboard />} />
 </Route>
 </Routes>
 </>
 );
}
export default App;

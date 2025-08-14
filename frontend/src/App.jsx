import "./index.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Ensure correct file name case
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPwd" element={<ForgetPassword />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

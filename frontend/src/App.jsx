import "./index.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Ensure correct file name case
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

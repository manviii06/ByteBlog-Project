import "./index.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Login from './pages/Login';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";

import ForgetPassword from './pages/ForgetPassword';


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/all-blogs/:id" element={<SingleBlog />} />

        <Route path="/ForgetPwd" element={<ForgetPassword />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;

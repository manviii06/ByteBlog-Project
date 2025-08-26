import "./index.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Login from './pages/Login';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ForgetPassword from './pages/ForgetPassword';
import ProfilePage from "./pages/ProfilePage";
import SubscribersPage from "./pages/admin/SubscribersPage";
import AdminContact from "./pages/admin/AdminContact";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
function App() {

  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, [location]);

  return (
    <>
      {userRole !== 'admin' && <Header />
}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/all-blogs/:id" element={<SingleBlog />} />
        <Route path="/ForgetPwd" element={<ForgetPassword />} />
        {userRole === 'admin' && (
         <Route element={<AdminLayout />} >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/subscribers" element={<SubscribersPage />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          <Route path="/admin/admin-users" element={<AdminUsers />} />
          <Route path="/admin/admin-users/:id" element={<AdminUserDetails />} />

         </Route>
        )}
        {userRole === 'user' && (
          <Route element={<UserLayout />} >
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/my-blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        )
        }
      </Routes>
      {console.log("userRole:", userRole)}
      {userRole !== 'admin' && <Footer />}
    </>
  );
}

export default App;


import "./index.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Header from "./components/Header";
import Footer from "./components/Footer";




function App() {
  return (
    <>
      <Header />
     
      <Routes>
        <Route path='/' element={<LandingPage />} />
       
           </Routes>
    
      <Footer/>
    </>
  );
}

export default App;

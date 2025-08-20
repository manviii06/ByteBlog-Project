import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow p-6 bg-gray-50">
        <Outlet /> 
      </main>
    </div>
  );
}

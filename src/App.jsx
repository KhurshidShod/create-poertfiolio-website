import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClientLayout from "./components/clientlayout";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/isAuthContext";
import AdminLayout from "./components/adminlayout";
import AdminExperiencesPage from "./pages/admin/Experiences";
import AdminUsersPage from "./pages/admin/Users";
import AdminEducationPage from "./pages/admin/Education";

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/" element={isAuth ? <AdminLayout /> : <Navigate to='/login' />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="experiences" element={<AdminExperiencesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="education" element={<AdminEducationPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

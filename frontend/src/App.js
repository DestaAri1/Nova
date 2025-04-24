import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import { Login } from "./pages/Auth/Login.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { RoleManagement } from "./pages/Dashboard/RoleManagement.tsx";
import { UserManagement } from "./pages/Dashboard/User.tsx";
import {PublicRoute, ProtectedRoute} from "./utils/AuthRoute.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Route yang bisa diakses siapa saja */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/role-management"
            element={<RoleManagement />}
          />
          <Route path="/dashboard/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

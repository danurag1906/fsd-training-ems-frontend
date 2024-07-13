import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewEmployee from "./components/NewEmployee";
import EditEmployee from "./components/EditEmployee";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import NormalUserProtectedRoutes from "./components/NormalUserProtectedRoutes";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
import SuperAdminProtectedRoutes from "./components/SuperAdminProtectedRoutes";

import NormalDashboard from "./pages/normaluser/NormalDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";

import NormalAllEmployees from "./pages/normaluser/NormalAllEmployees";
import AdminAllEmployees from "./pages/admin/AdminAllEmployees";
import AdminEditEmployee from "./pages/admin/AdminEditEmployee";
import SuperAdminAllEmployees from "./pages/superadmin/SuperAdminAllEmployees";
import SuperAdminEditEmployee from "./pages/superadmin/SuperAdminEditEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-employee" element={<NewEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Routes for normal user */}
          <Route element={<NormalUserProtectedRoutes />}>
            <Route path="/normal-dashboard" element={<NormalDashboard />} />
            <Route
              path="/normal-dashboard/all-employees"
              element={<NormalAllEmployees />}
            />
          </Route>

          {/* Routes for admin */}
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin-dashboard/all-employees"
              element={<AdminAllEmployees />}
            />
            <Route
              path="/admin-dashboard/edit-employee/:id"
              element={<AdminEditEmployee />}
            />
          </Route>

          {/* Routes for super admin */}
          <Route element={<SuperAdminProtectedRoutes />}>
            <Route
              path="/superadmin-dashboard"
              element={<SuperAdminDashboard />}
            />
            <Route
              path="/superadmin-dashboard/all-employees"
              element={<SuperAdminAllEmployees />}
            />
            <Route
              path="/superadmin-dashboard/edit-employee/:id"
              element={<SuperAdminEditEmployee />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

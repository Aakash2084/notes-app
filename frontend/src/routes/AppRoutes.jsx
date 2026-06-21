import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AddNote from "../pages/AddNote";
import EditNote from "../pages/EditNote";
import Login from "../pages/login";
import Signup from "../pages/Signup";

import { ProtectedRoute } from "../../index";

function AppRoutes() {

  return (

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ADD NOTE */}
      <Route
        path="/add-note"
        element={
          <ProtectedRoute>
            <AddNote />
          </ProtectedRoute>
        }
      />

      {/* EDIT NOTE */}
      <Route
        path="/edit-note/:id"
        element={
          <ProtectedRoute>
            <EditNote />
          </ProtectedRoute>
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* SIGNUP */}
      <Route
        path="/signup"
        element={<Signup />}
      />

    </Routes>

  );

}

export default AppRoutes;
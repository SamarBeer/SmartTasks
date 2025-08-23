import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import "./index.css";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

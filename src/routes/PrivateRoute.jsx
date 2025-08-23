// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{minHeight:"60vh",display:"grid",placeItems:"center",color:"#9aa3b2"}}>
        <div>Loading…</div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

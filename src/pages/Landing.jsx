import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="container page">
  <div className="card hero">
    <h1 className="hero-title">SmartTasks</h1>
    <p className="subtitle">Your simple, fast, and synced todo app.</p>
    <div className="hero-actions">
      <Link className="btn btn-primary" to="/login">Login</Link>
      <Link className="btn btn-ghost" to="/register">Register</Link>
    </div>
  </div>
</div>
  );
}

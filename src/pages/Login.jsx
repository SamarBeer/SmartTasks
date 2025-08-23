// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState:{ isSubmitting } } = useForm();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/app");                      // must match your route
    } catch (e) {
      console.error("Login error:", e);
      setErr(e.code || e.message);           // show the reason
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Login</h2>
      <input className="input" placeholder="Email" {...register("email",{required:true})} />
      <input className="input" type="password" placeholder="Password" {...register("password",{required:true})} />
      {err && <div className="error">{err}</div>}
      <button className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Login"}
      </button>
      <p className="subtitle">No account? <Link className="link" to="/register">Register</Link></p>
    </form>
  );
}

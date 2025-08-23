import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit, formState:{isSubmitting} } = useForm();
  const navigate = useNavigate();
  const onSubmit = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/app");
  };
  return (
    <div className="container page">
  <div className="card auth">
    <h2 className="title">Login</h2>
    <p className="hint">Welcome back — sign in to continue.</p>

    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input className="input" placeholder="Email" {...register("email",{required:true})}/>
      <input className="input" type="password" placeholder="Password" {...register("password",{required:true,minLength:6})}/>
      {err && <p className="error">{err}</p>}
      <button className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? "Please wait…" : "Login"}
      </button>
      <p className="subtitle">No account? <Link className="link" to="/register">Register</Link></p>
    </form>
  </div>
</div>

  );
}

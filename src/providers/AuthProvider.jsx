// src/providers/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Ctx = createContext({ user:null, loading:true, logout:async()=>{} });
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);           // <— MUST flip to false
      if (u) console.log("Auth → signed in as", u.email);
    }, (err) => {
      console.error("Auth listener error:", err);
      setLoading(false);           // <— even on error, clear loading
    });
    return () => unsub();
  }, []);

  const logout = () => signOut(auth);
  return <Ctx.Provider value={{ user, loading, logout }}>{children}</Ctx.Provider>;
}

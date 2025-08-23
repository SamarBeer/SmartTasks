import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { db, auth } from "../../firebase";
import {
  collection, addDoc, onSnapshot, query, orderBy,
  doc, updateDoc, deleteDoc, serverTimestamp
} from "firebase/firestore";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Live subscription
  useEffect(() => {
    if (!user) return;
    const ref = collection(db, "users", user.uid, "todos");
    const q = query(ref, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [user]);

  // Derive the filtered list (IMPORTANT: render this, not items)
  const filtered = useMemo(() => {
    switch (filter) {
      case "active":     return items.filter(i => i.completed === false);
      case "completed":  return items.filter(i => i.completed === true);
      default:           return items;
    }
  }, [items, filter]);

  const add = async (e) => {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;
    await addDoc(collection(db, "users", auth.currentUser.uid, "todos"), {
      title: v,
      completed: false,                 // ensure a BOOLEAN is stored
      createdAt: serverTimestamp(),
    });
    setTitle("");
  };

  const toggle = async (id, completed) =>
    updateDoc(doc(db, "users", auth.currentUser.uid, "todos", id), {
      completed: !Boolean(completed),    // coerce to boolean just in case
    });

  const remove = async (id) =>
    deleteDoc(doc(db, "users", auth.currentUser.uid, "todos", id));

  return (
    <div className="container page">
      <div className="toolbar">
        <h1 className="title" style={{ margin: 0 }}>Dashboard</h1>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <form className="form" onSubmit={add}>
        <div className="row">
          <input
            className="input"
            placeholder="New task…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>

      {/* Make buttons type="button" so they never submit any form */}
      <div className="filters mt-3" role="group" aria-label="filters">
        <button
          type="button"
          className={`filter ${filter === "all" ? "is-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`filter ${filter === "active" ? "is-active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          type="button"
          className={`filter ${filter === "completed" ? "is-active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Render the FILTERED array */}
      <ul className="list mt-3">
        {filtered.map((i) => (
          <li key={i.id} className="item">
            <label className="left">
              <input
                className="checkbox"
                type="checkbox"
                checked={!!i.completed}
                onChange={() => toggle(i.id, i.completed)}
              />
              <span className={`text ${i.completed ? "done" : ""}`}>{i.title}</span>
            </label>
            <button className="btn btn-danger" onClick={() => remove(i.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

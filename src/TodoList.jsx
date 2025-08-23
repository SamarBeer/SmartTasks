import { useState } from "react";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState(["Sample Task"]);
  const [newTodo, setNewTodo] = useState("");

  const updateTodoValue = (e) => setNewTodo(e.target.value);

  const addNewTask = () => {
    const value = newTodo.trim();
    if (!value) return;
    setTodos((prev) => [...prev, value]);
    setNewTodo("");
  };

  const deleteTodo = (idx) =>
    setTodos((prev) => prev.filter((_, i) => i !== idx));

  const onKeyDown = (e) => {
    if (e.key === "Enter") addNewTask();
  };

  return (
    <div className="todo-app">
      <p className="todo-title">Todo List</p>

      <div className="todo-row">
        <input
          className="todo-input"
          placeholder="Add a new task"
          value={newTodo}
          onChange={updateTodoValue}
          onKeyDown={onKeyDown}
        />
        <button className="btn-add" onClick={addNewTask} disabled={!newTodo.trim()}>
          Add Task
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((t, i) => (
          <li className="todo-item" key={i}>
            <div className="todo-left">
              <input
                className="todo-check"
                type="checkbox"
                onChange={() =>
                  setTodos((prev) =>
                    prev.map((x, j) => (j === i ? `✔ ${x}` : x))
                  )
                }
              />
              <span className="todo-text">{t}</span>
            </div>
            <button className="btn-delete" onClick={() => deleteTodo(i)}>
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

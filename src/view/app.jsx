import { useEffect, useMemo, useState } from "react";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import TaskList from "../components/TaskList";
import TaskCounter from "../components/TaskCounter";

const STORAGE_KEY = "tasks-v1";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return String(Date.now()) + "-" + String(Math.random()).slice(2);
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text, dueAt) {
  const newTask = {
    id: makeId(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    dueAt: dueAt, // יכול להיות null
  };

  setTasks((prev) => [newTask, ...prev]);
}


  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, newText) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const activeCount = tasks.filter((t) => !t.completed).length;
  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <div className="container">
      <h1>מנהל משימות</h1>

      <TaskForm onAddTask={addTask} />

      <FilterBar filter={filter} onChangeFilter={setFilter} />

      <TaskCounter activeCount={activeCount} />

      <div style={{ marginTop: 12 }}>
        <button onClick={clearCompleted} disabled={!hasCompleted}>
          ניקוי הושלמו
        </button>
      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

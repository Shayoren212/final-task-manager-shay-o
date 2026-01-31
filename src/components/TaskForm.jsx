import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [dueAt, setDueAt] = useState(""); // datetime-local value

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    // dueAt יכול להיות "" אם לא בחרו דדליין
    onAddTask(trimmed, dueAt ? new Date(dueAt).toISOString() : null);

    setText("");
    setDueAt("");
  }

  return (
    <form onSubmit={handleSubmit} className="row" style={{ flexWrap: "wrap" }}>
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="הוסיפי משימה..."
      />

      <input
        className="input"
        type="datetime-local"
        value={dueAt}
        onChange={(e) => setDueAt(e.target.value)}
        aria-label="דדליין למשימה"
        style={{ maxWidth: 220 }}
      />

      <button className="btn primary" type="submit">
        הוספה
      </button>
    </form>
  );
}

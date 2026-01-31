import { useState } from "react";

function formatDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString("he-IL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}


function PencilIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 6V4h8v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 6l1 16h10l1-16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function startEdit() {
    setDraft(task.text);
    setIsEditing(true);
  }

  function cancel() {
    setDraft(task.text);
    setIsEditing(false);
  }

  function save() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  return (
    <li className="task">
      <label className="taskLeft">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label="סמן משימה"
        />

        {!isEditing ? (
          <span className={task.completed ? "done" : ""}>{task.text}</span>
        ) : (
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="עריכת משימה"
          />
        )}
        <div style={{ fontSize: 12, color: "#5b4b78" }}>
        <div>נוצר: {formatDateTime(task.createdAt)}</div>
        {task.dueAt ? <div>דדליין: {formatDateTime(task.dueAt)}</div> : null}
        </div>

      </label>

      <div className="taskActions">
        {!isEditing ? (
          <button className="iconBtn primary" onClick={startEdit} aria-label="עריכה">
            <PencilIcon />
          </button>
        ) : (
          <>
            <button className="iconBtn primary" onClick={save} aria-label="שמירה">
              <CheckIcon />
            </button>
            <button className="iconBtn" onClick={cancel} aria-label="ביטול">
              <XIcon />
            </button>
          </>
        )}

        <button
          className="iconBtn danger"
          onClick={() => onDelete(task.id)}
          aria-label="מחיקה"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

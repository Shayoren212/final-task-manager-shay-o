const FILTERS = [
  { key: "all", label: "הכל" },
  { key: "active", label: "פעילות" },
  { key: "completed", label: "הושלמו" },
];

export default function FilterBar({ filter, onChangeFilter }) {
  return (
    <div className="filters">
      {FILTERS.map((f) => {
        const isActive = filter === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onChangeFilter(f.key)}
            className={`btn ${isActive ? "filterBtnActive" : ""}`}
            aria-pressed={isActive}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AdminStats({ items = [] }) {
  return (
    <div className="admin-cards" role="list" aria-label="Statistics">
      {items.map((it) => (
        <div key={it.key} className="admin-card admin-stat" role="listitem">
          <div className="label">{it.label}</div>
          <div className="value">{it.value}</div>
          {it.hint ? <div className="hint">{it.hint}</div> : null}
        </div>
      ))}
    </div>
  );
}


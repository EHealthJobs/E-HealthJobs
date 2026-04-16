import CheckIcon from "./CheckIcon";
import FieldRow from "./FieldRow";

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export default function SectionCard({ step, data, sectionEditing, onEdit, onSave, onChange, errors = {}, submitAttempted = false }) {
  const editing = sectionEditing === step.id;
  const errorCount = Object.keys(errors).length;

  return (
    <div style={{ backgroundColor: "#fff", borderWidth: 1, borderStyle: "solid", borderColor: "#e2e5ea", borderRadius: 8, marginBottom: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", backgroundColor: "#f8f9fb", borderBottom: "1px solid #e2e5ea" }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1a2332", display: "block" }}>{step.label}</span>
          {editing && submitAttempted && errorCount > 0 && (
            <span style={{ fontSize: 12, color: "#b91c1c", marginTop: 4, display: "block" }}>
              {errorCount} field{errorCount > 1 ? "s" : ""} need{errorCount === 1 ? "s" : ""} attention before saving
            </span>
          )}
        </div>
        {!editing
          ? <button onClick={() => onEdit(step.id)} style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "transparent", borderWidth: 1, borderStyle: "solid", borderColor: "#cdd4da", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: "#0176d3", fontFamily: "'DM Sans', sans-serif" }}>
              <PencilIcon /> Edit
            </button>
          : <button onClick={() => onSave(step.id)} style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "#0176d3", borderWidth: 0, borderStyle: "solid", borderColor: "transparent", borderRadius: 4, padding: "5px 14px", cursor: "pointer", fontSize: 12, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              <CheckIcon /> Save
            </button>
        }
      </div>
      <div style={{ padding: "4px 20px 8px" }}>
        {step.fields.map(f => (
          <FieldRow
            key={f.key}
            field={f}
            value={data[f.key]}
            isEditing={editing}
            onChange={onChange}
            error={errors[f.key]}
            touched={submitAttempted}
          />
        ))}
      </div>
    </div>
  );
}


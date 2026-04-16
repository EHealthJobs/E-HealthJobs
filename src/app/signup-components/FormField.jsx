const inputBase = {
  width: "100%", padding: "9px 12px",
  borderWidth: 1, borderStyle: "solid", borderColor: "#d1d5db", borderRadius: 6,
  fontSize: 13, color: "#1a2332",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none", boxSizing: "border-box",
  backgroundColor: "#fff", transition: "border .15s, box-shadow .15s",
};
const inputError = { borderColor: "#ef4444", backgroundColor: "#fff8f8" };

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

export default function FormField({ field, value, onChange, error, touched }) {
  const showError = touched && error;
  const style = { ...inputBase, ...(showError ? inputError : {}) };

  if (field.type === "select") {
    return (
      <select value={value} onChange={e => onChange(field.key, e.target.value)}
        style={{ ...style, appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32,
          color: value ? "#1a2332" : "#9ca3af",
        }}
      >
        <option value="">{field.placeholder}</option>
        {(field.options || []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  if (field.type === "file") {
    const fileName = value?.name || "";
    return (
      <label style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "11px 14px",
        borderWidth: 1.5, borderStyle: "dashed", borderColor: showError ? "#ef4444" : "#c7d2dc",
        borderRadius: 6, cursor: "pointer",
        backgroundColor: showError ? "#fff8f8" : "#f8fafc",
        transition: "border .15s", width: "100%", boxSizing: "border-box",
      }}>
        <UploadIcon />
        <span style={{ fontSize: 13, color: fileName ? "#1a2332" : "#6b7280" }}>
          {fileName || "Click to upload resume (PDF, DOC, DOCX)"}
        </span>
        <input type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }}
          onChange={e => onChange(field.key, e.target.files[0] || "")} />
      </label>
    );
  }

  if (field.type === "hidden") {
    return (<input type="hidden" name={field.key} value={value ?? field.value ?? ""} readOnly />);
  }

  return (
    <input type={field.type} value={value}
      onChange={e => onChange(field.key, e.target.value)}
      placeholder={field.placeholder}
      style={style}
    />
  );
}



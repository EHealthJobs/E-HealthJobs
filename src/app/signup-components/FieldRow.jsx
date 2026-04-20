import FormField from "./FormField";
import AlertIcon from "./AlertIcon";

export default function FieldRow({ field, value, isEditing, onChange, error, touched }) {
  const displayValue = field.type === "file" ? (value?.name || "") : (value || "");
  const empty = !displayValue;
  const showError = isEditing && touched && error;

  if (field.type === "hidden") {
    return isEditing
      ? <FormField field={field} value={value} onChange={onChange} error={error} touched={touched} />
      : null;
  }

  return (
    <div id={`view-field-${field.key}`} style={{ display: "grid", gridTemplateColumns: "260px 1fr", alignItems: "start", padding: "12px 0", borderBottom: "1px solid #f0f2f5", gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: showError ? "#b91c1c" : "#374151", paddingTop: isEditing ? 10 : 3, paddingRight: 12 }}>
        {field.label}
        {field.required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </span>
      {isEditing
        ? <div>
            <FormField field={field} value={value} onChange={onChange} error={error} touched={touched} />
            {showError && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, color: "#ef4444", fontSize: 12 }}>
                <AlertIcon />
                <span>{error}</span>
              </div>
            )}
          </div>
        : <span style={{ fontSize: 13, color: empty ? "#adb5bd" : "#1a2332", fontStyle: empty ? "italic" : "normal", paddingTop: 3 }}>
            {empty ? "-" : displayValue}
          </span>
      }
    </div>
  );
}

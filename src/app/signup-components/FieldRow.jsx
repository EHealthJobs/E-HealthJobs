import FormField from "./FormField";
import AlertIcon from "./AlertIcon";

export default function FieldRow({ field, value, isEditing, onChange, error, touched, formData = {} }) {
  const displayValue = field.type === "file" ? (value?.name || value?.fileName || value?.pathOnClient || "") : (value || "");
  const empty = !displayValue;
  const showError = isEditing && touched && error;

  if (field.type === "hidden") {
    return isEditing
      ? <FormField field={field} value={value} onChange={onChange} error={error} touched={touched} />
      : null;
  }

  return (
    <div id={`view-field-${field.key}`} style={{ minWidth: 0, gridColumn: (field.type === "file" || field.fullWidth) ? "1 / -1" : undefined }}>
      <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: showError ? "#b91c1c" : "#374151", marginBottom: 6 }}>
        {field.label}
        {field.required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </span>
      {isEditing
        ? <div>
            <FormField field={field} value={value} onChange={onChange} error={error} touched={touched} formData={formData} />
            {showError && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, color: "#ef4444", fontSize: 12 }}>
                <AlertIcon />
                <span>{error}</span>
              </div>
            )}
          </div>
        : <span style={{ display: "block", minHeight: 36, borderWidth: 1, borderStyle: "solid", borderColor: "#eef1f4", borderRadius: 6, backgroundColor: "#fafbfc", padding: "9px 12px", fontSize: 13, color: empty ? "#adb5bd" : "#1a2332", fontStyle: empty ? "italic" : "normal", overflowWrap: "anywhere" }}>
            {empty ? "-" : displayValue}
          </span>
      }
    </div>
  );
}

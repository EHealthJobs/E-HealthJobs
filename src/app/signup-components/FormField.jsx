import { useEffect, useState } from "react";

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

const fallbackDocumentTypeOptions = {
  Resume: ["Resume"],
  License: ["RN License", "LPN License", "CNA License", "Other License"],
  Certification: ["BLS", "ACLS", "PALS", "Other Certification"],
  Identification: ["Passport", "Driver License", "State ID"],
  Other: ["Other"],
};

const fallbackDocumentStatusOptions = ["Requested", "Received", "Approved", "Rejected"];

const getOptionValue = (option) => {
  if (typeof option === "string") return option;
  if (!option || typeof option !== "object") return "";

  return option.value ?? option.Value ?? option.label ?? option.Label ?? option.name ?? option.Name ?? "";
};

const getOptionLabel = (option) => {
  if (typeof option === "string") return option;
  if (!option || typeof option !== "object") return "";

  return option.label ?? option.Label ?? option.value ?? option.Value ?? option.name ?? option.Name ?? "";
};

const normalizeOptions = (options) => {
  if (!Array.isArray(options)) return [];

  const seen = new Set();
  return options.reduce((acc, option) => {
    const value = String(getOptionValue(option)).trim();
    const label = String(getOptionLabel(option)).trim();

    if (!value || seen.has(value)) return acc;

    seen.add(value);
    acc.push({ value, label: label || value });
    return acc;
  }, []);
};

const normalizeDocumentTypeMap = (value) => {
  if (!value || Array.isArray(value) || typeof value !== "object") return {};

  return Object.entries(value).reduce((acc, [category, options]) => {
    const normalized = normalizeOptions(options);
    if (normalized.length > 0) acc[category] = normalized;
    return acc;
  }, {});
};

const modalLabel = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "#5f6673",
  marginBottom: 5,
};

const modalInput = {
  width: "100%",
  minHeight: 36,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#a7adb5",
  borderRadius: 4,
  padding: "7px 10px",
  boxSizing: "border-box",
  color: "#1a2332",
  fontSize: 13,
  fontFamily: "'DM Sans', sans-serif",
  backgroundColor: "#fff",
};

const requiredMark = <span style={{ color: "#ef4444", marginRight: 4 }}>*</span>;

function SourceSelectField({ field, value, onChange, style }) {
  const [options, setOptions] = useState(() => normalizeOptions(field.options || []));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSourceOptions = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/getPicklistValues", { cache: "no-store" });
        const result = await response.json();

        if (!isMounted) return;
        if (!response.ok || result?.success === false) return;

        const sourceOptions = normalizeOptions(result?.data?.source);
        if (sourceOptions.length > 0) setOptions(sourceOptions);
      } catch (err) {
        console.error("Source picklist load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSourceOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <select
      value={value}
      onChange={e => onChange(field.key, e.target.value)}
      style={{
        ...style,
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: 32,
        color: value ? "#1a2332" : "#9ca3af",
      }}
    >
      <option value="">{isLoading ? "Loading source..." : field.placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

function FileUploadField({ field, value, onChange, showError, formData }) {
  const fileName = value?.name || "";
  const [isOpen, setIsOpen] = useState(false);
  const [draftFile, setDraftFile] = useState(value || "");
  const [draft, setDraft] = useState({
    category: formData[field.categoryKey] || "",
    type: formData[field.typeKey] || "",
    status: formData[field.statusKey] || "Requested",
    expirationDate: formData[field.expirationKey] || "",
    notes: formData[field.notesKey] || "",
    isRequired: Boolean(formData[field.requiredKey]),
  });
  const [modalErrors, setModalErrors] = useState({});
  const [picklists, setPicklists] = useState({
    categories: normalizeOptions(Object.keys(fallbackDocumentTypeOptions)),
    typeMap: fallbackDocumentTypeOptions,
    statuses: normalizeOptions(fallbackDocumentStatusOptions),
  });
  const [isLoadingPicklists, setIsLoadingPicklists] = useState(false);
  const [picklistError, setPicklistError] = useState("");
  const categoryOptions = picklists.categories.length > 0
    ? picklists.categories
    : normalizeOptions(Object.keys(fallbackDocumentTypeOptions));
  const selectedCategory = categoryOptions.find(option => option.value === draft.category);
  const rawTypeOptions = picklists.typeMap[draft.category] || picklists.typeMap[selectedCategory?.label] || [];
  const typeOptions = normalizeOptions(rawTypeOptions);
  const statusOptions = picklists.statuses.length > 0
    ? picklists.statuses
    : normalizeOptions(fallbackDocumentStatusOptions);

  useEffect(() => {
    setDraftFile(value || "");
  }, [value]);

  useEffect(() => {
    setDraft({
      category: formData[field.categoryKey] || "",
      type: formData[field.typeKey] || "",
      status: formData[field.statusKey] || "Requested",
      expirationDate: formData[field.expirationKey] || "",
      notes: formData[field.notesKey] || "",
      isRequired: Boolean(formData[field.requiredKey]),
    });
  }, [
    formData[field.categoryKey],
    formData[field.typeKey],
    formData[field.statusKey],
    formData[field.expirationKey],
    formData[field.notesKey],
    formData[field.requiredKey],
    field.categoryKey,
    field.typeKey,
    field.statusKey,
    field.expirationKey,
    field.notesKey,
    field.requiredKey,
  ]);

  useEffect(() => {
    let isMounted = true;

    const loadPicklists = async () => {
      setIsLoadingPicklists(true);
      setPicklistError("");

      try {
        const response = await fetch("/api/getPicklistValues", { cache: "no-store" });
        const result = await response.json();

        if (!isMounted) return;

        if (!response.ok || result?.success === false) {
          setPicklistError(result?.message || "Unable to load Salesforce picklist values.");
          return;
        }

        const picklistData = result?.data || {};
        const typeMap = normalizeDocumentTypeMap(picklistData.documentTypesByCategory);
        const categories = normalizeOptions(picklistData.documentCategory);
        const statuses = normalizeOptions(picklistData.documentStatus);

        setPicklists(prev => ({
          categories: categories.length > 0 ? categories : prev.categories,
          typeMap: Object.keys(typeMap).length > 0 ? typeMap : prev.typeMap,
          statuses: statuses.length > 0 ? statuses : prev.statuses,
        }));
      } catch (err) {
        console.error("Picklist load error:", err);
        if (isMounted) setPicklistError("Unable to load Salesforce picklist values.");
      } finally {
        if (isMounted) setIsLoadingPicklists(false);
      }
    };

    loadPicklists();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateDraft = (key, nextValue) => {
    setDraft(prev => ({
      ...prev,
      [key]: nextValue,
      ...(key === "category" ? { type: "" } : {}),
    }));
    setModalErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const closeModal = () => {
    setModalErrors({});
    setDraftFile(value || "");
    setDraft({
      category: formData[field.categoryKey] || "",
      type: formData[field.typeKey] || "",
      status: formData[field.statusKey] || "Requested",
      expirationDate: formData[field.expirationKey] || "",
      notes: formData[field.notesKey] || "",
      isRequired: Boolean(formData[field.requiredKey]),
    });
    setIsOpen(false);
  };

  const saveDocument = () => {
    const nextErrors = {};
    if (!draftFile?.name) nextErrors.file = "Select File is required";
    if (!draft.category) nextErrors.category = "Document Category is required";
    if (!draft.type) nextErrors.type = "Document Type is required";

    if (Object.keys(nextErrors).length > 0) {
      setModalErrors(nextErrors);
      return;
    }

    onChange(field.key, draftFile);
    if (field.categoryKey) onChange(field.categoryKey, draft.category);
    if (field.typeKey) onChange(field.typeKey, draft.type);
    if (field.statusKey) onChange(field.statusKey, draft.status);
    if (field.expirationKey) onChange(field.expirationKey, draft.expirationDate);
    if (field.notesKey) onChange(field.notesKey, draft.notes);
    if (field.requiredKey) onChange(field.requiredKey, draft.isRequired);
    setIsOpen(false);
  };

  return (
    <>
      <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "11px 14px",
            borderWidth: 1.5, borderStyle: "dashed", borderColor: showError ? "#ef4444" : "#c7d2dc",
            borderRadius: 6, cursor: "pointer",
            backgroundColor: showError ? "#fff8f8" : "#f8fafc",
            transition: "border .15s", width: "100%", boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif", textAlign: "left",
          }}
      >
        <UploadIcon />
        <span style={{ fontSize: 13, color: fileName ? "#1a2332" : "#6b7280" }}>
          {fileName || "Click to upload resume (PDF, DOC, DOCX)"}
        </span>
      </button>

        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "rgba(15, 23, 42, .45)", padding: 16,
            }}
          >
            <style>{`
              @media (max-width: 640px) {
                .document-upload-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
            <div style={{
              width: "min(620px, 100%)", maxHeight: "88vh", overflowY: "auto",
              backgroundColor: "#fff", borderRadius: 8,
              boxShadow: "0 20px 45px rgba(15, 23, 42, .24)",
              padding: "18px 18px 16px",
            }}>
              <div className="document-upload-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px" }}>
                <div>
                  <label style={modalLabel}>{requiredMark}Select File</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => {
                      setDraftFile(e.target.files[0] || "");
                      setModalErrors(prev => {
                        const next = { ...prev };
                        delete next.file;
                        return next;
                      });
                    }}
                    style={{ maxWidth: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
                  />
                  {modalErrors.file && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 5 }}>{modalErrors.file}</div>}
                </div>

                <div>
                  <label style={modalLabel}>{requiredMark}Document Category</label>
                  <select
                    value={draft.category}
                    onChange={e => updateDraft("category", e.target.value)}
                    style={{ ...modalInput, color: draft.category ? "#1a2332" : "#6b7280" }}
                  >
                    <option value="">{isLoadingPicklists ? "Loading categories..." : "-- Select Category --"}</option>
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {modalErrors.category && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 5 }}>{modalErrors.category}</div>}
                  {picklistError && <div style={{ color: "#b45309", fontSize: 12, marginTop: 5 }}>{picklistError}</div>}
                </div>

                <div>
                  <label style={modalLabel}>{requiredMark}Document Type</label>
                  <select
                    value={draft.type}
                    onChange={e => updateDraft("type", e.target.value)}
                    disabled={isLoadingPicklists || typeOptions.length === 0}
                    style={{
                      ...modalInput,
                      backgroundColor: !isLoadingPicklists && typeOptions.length > 0 ? "#fff" : "#f3f4f6",
                      color: draft.type ? "#1a2332" : "#6b7280",
                    }}
                  >
                    <option value="">{isLoadingPicklists ? "Loading types..." : "-- Select Type --"}</option>
                    {typeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {modalErrors.type && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 5 }}>{modalErrors.type}</div>}
                </div>

                <div>
                  <label style={modalLabel}>Document Status</label>
                  <select
                    value={draft.status}
                    onChange={e => updateDraft("status", e.target.value)}
                    style={modalInput}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={modalLabel}>Expiration Date</label>
                  <input
                    type="date"
                    value={draft.expirationDate}
                    onChange={e => updateDraft("expirationDate", e.target.value)}
                    style={modalInput}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={modalLabel}>Notes</label>
                  <textarea
                    value={draft.notes}
                    onChange={e => updateDraft("notes", e.target.value)}
                    placeholder="Additional info..."
                    rows={3}
                    style={{ ...modalInput, resize: "vertical" }}
                  />
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5f6673" }}>
                  <input
                    type="checkbox"
                    checked={draft.isRequired}
                    onChange={e => updateDraft("isRequired", e.target.checked)}
                    style={{ width: 16, height: 16 }}
                  />
                  Is Required
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    minWidth: 82, padding: "8px 16px", borderRadius: 5,
                    borderWidth: 1, borderStyle: "solid", borderColor: "#a7adb5",
                    backgroundColor: "#fff", color: "#0176d3", fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveDocument}
                  style={{
                    minWidth: 136, padding: "8px 16px", borderRadius: 5,
                    borderWidth: 0, backgroundColor: "#0176d3", color: "#fff",
                    fontSize: 13, fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  }}
                >
                  Save Document
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default function FormField({ field, value, onChange, error, touched, formData = {} }) {
  const showError = touched && error;
  const style = { ...inputBase, ...(showError ? inputError : {}) };

  if (field.type === "select") {
    if (field.key === "Source") {
      return (
        <SourceSelectField
          field={field}
          value={value}
          onChange={onChange}
          style={style}
        />
      );
    }

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
    return (
      <FileUploadField
        field={field}
        value={value}
        onChange={onChange}
        showError={showError}
        formData={formData}
      />
    );
  }

  if (field.type === "hidden") {
    return (<input type="hidden" name={field.key} value={String(value ?? field.value ?? "")} readOnly />);
  }

  return (
    <input type={field.type} value={value}
      onChange={e => onChange(field.key, e.target.value)}
      placeholder={field.placeholder}
      style={style}
    />
  );
}


import { useEffect, useRef, useState } from "react";
import COUNTRIES from "./countries";

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

function CountrySelectField({ field, value, onChange, style }) {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const blurTimeoutRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => () => window.clearTimeout(blurTimeoutRef.current), []);

  const filteredCountries = query.trim()
    ? COUNTRIES.filter(country => country.toLowerCase().includes(query.trim().toLowerCase()))
    : COUNTRIES;

  const commitSelection = (country) => {
    onChange(field.key, country);
    setQuery(country);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      if (query !== value && !COUNTRIES.includes(query)) {
        onChange(field.key, "");
        setQuery("");
      }
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(prev => Math.min(prev + 1, filteredCountries.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (isOpen && highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
        e.preventDefault();
        commitSelection(filteredCountries[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        autoComplete="off"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={field.placeholder}
        style={style}
      />
      {isOpen && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 30,
          maxHeight: 210, overflowY: "auto",
          backgroundColor: "#fff", borderWidth: 1, borderStyle: "solid", borderColor: "#d1d5db",
          borderRadius: 6, boxShadow: "0 8px 20px rgba(15, 23, 42, .14)",
        }}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <div
                key={country}
                onMouseDown={e => e.preventDefault()}
                onClick={() => commitSelection(country)}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  padding: "8px 12px", fontSize: 13, cursor: "pointer",
                  backgroundColor: index === highlightedIndex ? "#eaf2fb" : "#fff",
                  color: "#1a2332",
                }}
              >
                {country}
              </div>
            ))
          ) : (
            <div style={{ padding: "8px 12px", fontSize: 13, color: "#9ca3af" }}>No matching country</div>
          )}
        </div>
      )}
    </div>
  );
}

function FileUploadField({ field, value, onChange, showError }) {
  const fileName = value?.name || value?.fileName || value?.pathOnClient || "";
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onChange(field.key, file);
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
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

  if (field.type === "country") {
    return (
      <CountrySelectField
        field={field}
        value={value}
        onChange={onChange}
        style={style}
      />
    );
  }

  if (field.type === "file") {
    return (
      <FileUploadField
        field={field}
        value={value}
        onChange={onChange}
        showError={showError}
      />
    );
  }

  if (field.type === "hidden") {
    return (<input type="hidden" name={field.key} value={String(value ?? field.value ?? "")} readOnly />);
  }

  return (
    <input type={field.type} value={value}
      onChange={e => {
        const nextValue = field.maxLength ? e.target.value.slice(0, field.maxLength) : e.target.value;
        onChange(field.key, nextValue);
      }}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
      style={style}
    />
  );
}

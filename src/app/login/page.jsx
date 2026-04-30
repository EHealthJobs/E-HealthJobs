"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlertIcon from "../signup-components/AlertIcon";
import CheckIcon from "../signup-components/CheckIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginFields = [
  {
    key: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const initialData = {
  email: "",
  password: "",
  remember: false,
};

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
    setServerMessage("");
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateForm = () => {
    const nextErrors = {};

    loginFields.forEach(field => {
      const value = data[field.key];
      if (field.required && (!value || value.toString().trim() === "")) {
        nextErrors[field.key] = `${field.label} is required`;
      } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors[field.key] = "Please enter a valid email address";
      }
    });

    return nextErrors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitAttempted(true);
    setServerMessage("");

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerMessage(result.message || "Unable to log in. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push("/signup?mode=view");
    } catch (err) {
      console.error("Login error:", err);
      setServerMessage("Unable to log in right now. Please try again.");
      setIsSubmitting(false);
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div style={pageStyle}>
      <Navbar />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .login-input:focus {
          border-color: #0176d3 !important;
          box-shadow: 0 0 0 3px #d0e8fb !important;
        }

        .login-input-error:focus {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 3px #fee2e2 !important;
        }

        @media (max-width: 640px) {
          .login-page-shell {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .login-form-card {
            padding: 22px 18px 24px !important;
          }

          .login-support-row {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>

      <main className="login-page-shell" style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px", marginTop: 80 }}>
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 700, color: "#1a2332" }}>
            Login to your account
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
            Continue your healthcare career journey
          </p>
        </div>

        {submitAttempted && errorCount > 0 && (
          <div style={alertStyle}>
            <AlertIcon />
            <span>Please fill in all required fields before continuing. <strong>{errorCount} field{errorCount > 1 ? "s" : ""}</strong> need{errorCount === 1 ? "s" : ""} attention.</span>
          </div>
        )}

        {serverMessage && (
          <div style={alertStyle}>
            <AlertIcon />
            <span>{serverMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={cardShellStyle}>
          {/* <div style={cardHeaderStyle}>
            <span style={stepBadgeStyle}>1</span>
            <span style={cardHeaderTextStyle}>Account Login</span>
          </div> */}

          <div className="login-form-card" style={{ backgroundColor: "#fff", padding: "24px 28px 28px", borderRadius: "0 0 8px 8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, maxWidth: 520, margin: "0 auto" }}>
              {loginFields.map(field => {
                const hasError = submitAttempted && errors[field.key];
                return (
                  <div key={field.key} id={`field-${field.key}`}>
                    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: hasError ? "#b91c1c" : "#374151", marginBottom: 6 }}>
                      {field.label}
                      {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                    </label>

                    <input
                      className={`login-input${hasError ? " login-input-error" : ""}`}
                      type={field.type}
                      value={data[field.key]}
                      onChange={event => handleChange(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      style={{ ...inputStyle, ...(hasError ? inputErrorStyle : {}) }}
                    />

                    {hasError && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, color: "#ef4444", fontSize: 12 }}>
                        <AlertIcon />
                        <span>{errors[field.key]}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="login-support-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: 13, fontWeight: 500 }}>
                  {/* <input
                    type="checkbox"
                    checked={data.remember}
                    onChange={event => handleChange("remember", event.target.checked)}
                    style={{ width: 15, height: 15, accentColor: "#0176d3" }}
                  />
                  Remember me */}
                </label>

                <a href="/#contact" style={{ color: "#0176d3", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...buttonStyle,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.65 : 1,
                }}
              >
                <CheckIcon />
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p style={{ margin: 0, textAlign: "center", color: "#6b7280", fontSize: 13 }}>
                New to eHealthJOBS?{" "}
                <a href="/signup" style={{ color: "#0176d3", fontWeight: 700, textDecoration: "none" }}>
                  Create your account
                </a>
              </p>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

const pageStyle = {
  fontFamily: "'DM Sans', sans-serif",
  minHeight: "100vh",
  backgroundColor: "#f3f5f8",
};

const alertStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  backgroundColor: "#fef2f2",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#fca5a5",
  borderRadius: 8,
  padding: "12px 16px",
  marginBottom: 16,
  color: "#b91c1c",
  fontSize: 13,
  fontFamily: "'DM Sans', sans-serif",
};

const cardShellStyle = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#e2e5ea",
  borderRadius: 8,
  overflow: "visible",
  marginBottom: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,.06)",
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  backgroundColor: "#fff",
  borderBottom: "3px solid #0176d3",
  borderRadius: "8px 8px 0 0",
  padding: "18px 32px",
};

const stepBadgeStyle = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 11,
  fontWeight: 700,
  backgroundColor: "#e8f0fe",
  color: "#0176d3",
  boxShadow: "0 0 0 3px #d0e8fb",
};

const cardHeaderTextStyle = {
  fontSize: 13,
  fontWeight: 700,
  color: "#0176d3",
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#d1d5db",
  borderRadius: 6,
  fontSize: 13,
  color: "#1a2332",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  transition: "border .15s, box-shadow .15s",
};

const inputErrorStyle = {
  borderColor: "#ef4444",
  backgroundColor: "#fff8f8",
};

const buttonStyle = {
  width: "100%",
  justifyContent: "center",
  padding: "10px 30px",
  borderRadius: 6,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: "transparent",
  backgroundColor: "#0176d3",
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

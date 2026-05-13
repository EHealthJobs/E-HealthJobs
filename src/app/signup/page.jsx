"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionCard from "../signup-components/SectionCard";
import StepBar from "../signup-components/StepBar";
import FormField from "../signup-components/FormField";
import STEPS from "../signup-components/STEPS.js";
import AlertIcon from "../signup-components/AlertIcon";
import CheckIcon from "../signup-components/CheckIcon";
import axiosInstance from "../../lib/axiosInstance.js";
import { toast } from "sonner";

const emptyData = () => Object.fromEntries(STEPS.flatMap(s => s.fields.map(f => [f.key, f.value ?? ""])));

const dataWithFieldDefaults = (formData) => ({
  ...emptyData(),
  ...formData,
  ...Object.fromEntries(
    STEPS.flatMap(s => s.fields)
      .filter(f => f.type === "hidden" && (formData[f.key] === "" || formData[f.key] == null))
      .map(f => [f.key, f.value ?? ""])
  ),
});

const CONTACT_FIELD_ALIASES = {
  City: ["MailingCity", "City__c"],
  State: ["MailingState", "MailingStateCode", "State__c"],
  MailingCountryText: ["MailingCountry", "MailingCountryCode", "MailingCountryText__c"],
  TimeZone: ["Time_Zone__c"],
  Source: ["Source__c", "LeadSource"],
  WhatsAppNumber: ["WhatsApp_Number__c", "Whatsapp_Number__c"],
  What_units_are_you_open_to: ["What_units_are_you_open_to__c"],
  What_shift_s_are_you_open_to: ["What_shift_s_are_you_open_to__c"],
  Location_s_Desired: ["Location_s_Desired__c"],
  Any_preferences_on_part_of_the_country: ["Any_preferences_on_part_of_the_country__c"],
  Any_family_or_friends_in_the_US: ["Any_family_or_friends_in_the_US__c"],
  Are_you_open_to_city_and_rural_areas: ["Are_you_open_to_city_and_rural_areas__c"],
  Max_Commuting_Distance_Time: ["Max_Commuting_Distance_Time__c"],
  Employment_Status: ["Employment_Status__c"],
  Employment_Type: ["Employment_Type__c"],
  Country_of_origin: ["Country_of_origin__c"],
  CountryOfResidence: ["Country_of_residence__c", "CountryOfResidence__c"],
  Country_of_Citizenship_1: ["Country_of_Citizenship_1__c"],
  Country_of_Citizenship: ["Country_of_Citizenship__c"],
  Applying_for_another_citizenship_1: ["Applying_for_another_citizenship_1__c"],
  Moving_with_anyone_Pets: ["Moving_with_anyone_Pets__c"],
  Spouse_Employment_Need: ["Spouse_Employment_Need__c", "spouse_job"],
};

const unwrapContact = (payload) => {
  if (Array.isArray(payload)) return payload[0] || {};
  return payload?.contact || payload?.data || payload?.record || payload || {};
};

const getContactValue = (contact, key) => {
  const possibleKeys = [key, `${key}__c`, ...(CONTACT_FIELD_ALIASES[key] || [])];
  const matchedKey = possibleKeys.find(item => contact[item] !== undefined && contact[item] !== null);
  return matchedKey ? contact[matchedKey] : "";
};

const dataFromContact = (contactPayload) => {
  const contact = unwrapContact(contactPayload);
  const nextData = dataWithFieldDefaults({});

  STEPS.flatMap(section => section.fields).forEach(field => {
    if (field.type === "password" || field.type === "file") return;

    const value = getContactValue(contact, field.key);
    if (value !== "") nextData[field.key] = value;
  });

  return nextData;
};

const viewFieldsForSection = (section) => ({
  ...section,
  fields: section.fields.filter(field => field.type !== "password" && field.type !== "file" && field.type !== "hidden"),
});

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "view" ? "view" : "signup";
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [data, setData] = useState(() => emptyData());
  const [sectionEditing, setSectionEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [viewSubmitAttempted, setViewSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [contactError, setContactError] = useState("");
  const [savingSection, setSavingSection] = useState(null);

  const step = STEPS[currentStep];

  useEffect(() => {
    if (mode !== "view") return;

    let isMounted = true;

    const loadContactDetails = async () => {
      setIsLoadingContact(true);
      setContactError("");

      try {
        const response = await fetch("/api/contactDetails", { cache: "no-store" });
        const result = await response.json();

        if (!isMounted) return;

        if (!response.ok || !result.success) {
          setContactError(result.message || "Unable to load contact details.");
          return;
        }

        setData(dataFromContact(result.contact));
      } catch (err) {
        console.error("Contact details load error:", err);
        if (isMounted) setContactError("Unable to load contact details.");
      } finally {
        if (isMounted) setIsLoadingContact(false);
      }
    };

    loadContactDetails();

    return () => {
      isMounted = false;
    };
  }, [mode]);

  const isValueEmpty = (field, val) => {
    if (field.type === "file") return !val || !val.name;
    return !val || val.toString().trim() === "";
  };

  const validateStep = (stepConfig, formData) => {
    const nextErrors = {};

    stepConfig.fields.forEach(field => {
      if (!field.required) return;
      if (isValueEmpty(field, formData[field.key])) {
        nextErrors[field.key] = `${field.label} is required`;
      } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.key])) {
        nextErrors[field.key] = "Please enter a valid email address";
      } else if (field.key === "Password" && formData[field.key].length < 8) {
        nextErrors[field.key] = "Password must be at least 8 characters";
      } else if (field.type === "tel" && !/^[\d\s\+\-\(\)]{7,}$/.test(formData[field.key])) {
        nextErrors[field.key] = "Please enter a valid phone number";
      }
    });

    if (
      stepConfig.fields.some(field => field.key === "ConfirmPassword") &&
      formData.Password &&
      formData.ConfirmPassword &&
      formData.Password !== formData.ConfirmPassword
    ) {
      nextErrors.ConfirmPassword = "Passwords do not match";
    }

    return nextErrors;
  };

  const handleChange = (key, val) => {
    setData(prev => ({ ...prev, [key]: val }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleNext = async () => {
    setSubmitAttempted(true);
      const nextData = dataWithFieldDefaults(data);
    setData(nextData);
    console.log("Validating step:", step.id, nextData);
    const stepErrors = validateStep(step, nextData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstKey = Object.keys(stepErrors)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setSubmitAttempted(false);
    setCompleted(prev => prev.includes(step.id) ? prev : [...prev, step.id]);
    if(currentStep < STEPS.length - 1) setCurrentStep(index => index + 1);
    else {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        const response = await axiosInstance.post(
          "/api/contactForm",
          { ...nextData, submissionType: "signup" },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Form submit response:', response);
  
        if (response.data.success || response.data.result?.success) {
            // toast.success('Form submitted successfully!');
            toast.success("Thank you! Please log in to continue.");
            setTimeout(() => {
                router.push('/login');
            }, 700);
        } else {
          toast.error(response.data.message || 'Form submission failed.');
          setIsSubmitting(false);
        }
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'An error occurred. Try again.';
        console.warn('Form submit error:', message);
        toast.error(message);
        if(message.includes("Email already exists")) {
          setTimeout(() => {
            router.push('/login');
          }, 700);
        } else {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setSubmitAttempted(false);
    setCurrentStep(index => index - 1);
  };

  const handleEditSection = (sectionId) => {
    setSectionEditing(sectionId);
    setViewSubmitAttempted(false);
    setErrors({});
  };

  const handleSaveSection = async (sectionId) => {
    const section = STEPS.find(item => item.id === sectionId);
    if (!section) return;

    setViewSubmitAttempted(true);
    const nextData = dataWithFieldDefaults(data);
    setData(nextData);
    const sectionErrors = validateStep(viewFieldsForSection(section), nextData);
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      const firstKey = Object.keys(sectionErrors)[0];
      document.getElementById(`view-field-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSavingSection(sectionId);

    try {
      const response = await fetch("/api/contactDetails", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextData),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Unable to save contact details.");
        return;
      }

      toast.success("Profile updated successfully.");
      setErrors({});
      setViewSubmitAttempted(false);
      setSectionEditing(null);
    } catch (err) {
      console.error("Contact save error:", err);
      toast.error("Unable to save contact details.");
    } finally {
      setSavingSection(null);
    }
  };

  const errorCount = Object.keys(errors).length;

  if (mode === "view") {
    return (
      <div style={pageStyle}>
        <Navbar />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          input:focus, select:focus { border-color: #0176d3 !important; box-shadow: 0 0 0 3px #d0e8fb !important; }
          input[style*="ef4444"]:focus, select[style*="ef4444"]:focus { border-color: #ef4444 !important; box-shadow: 0 0 0 3px #fee2e2 !important; }
        `}</style>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px", marginTop: 80 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a2332" }}>Profile Overview</h2>
          </div>

          {isLoadingContact && (
            <div style={{ backgroundColor: "#fff", borderWidth: 1, borderStyle: "solid", borderColor: "#e2e5ea", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#374151", fontSize: 13 }}>
              Loading contact details...
            </div>
          )}

          {contactError && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              backgroundColor: "#fef2f2", borderWidth: 1, borderStyle: "solid", borderColor: "#fca5a5",
              borderRadius: 8, padding: "12px 16px", marginBottom: 16,
              color: "#b91c1c", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
            }}>
              <AlertIcon />
              <span>{contactError}</span>
            </div>
          )}

          {sectionEditing && viewSubmitAttempted && errorCount > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              backgroundColor: "#fef2f2", borderWidth: 1, borderStyle: "solid", borderColor: "#fca5a5",
              borderRadius: 8, padding: "12px 16px", marginBottom: 16,
              color: "#b91c1c", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
            }}>
              <AlertIcon />
              <span>Please fix the required fields in this section before saving. <strong>{errorCount} field{errorCount > 1 ? "s" : ""}</strong> need{errorCount === 1 ? "s" : ""} attention.</span>
            </div>
          )}

          {STEPS.map(section => (
            <SectionCard
              key={section.id}
              step={section}
              data={data}
              sectionEditing={sectionEditing}
              onEdit={handleEditSection}
              onSave={handleSaveSection}
              onChange={handleChange}
              errors={sectionEditing === section.id ? errors : {}}
              submitAttempted={sectionEditing === section.id && viewSubmitAttempted}
              isSaving={savingSection === section.id}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        input:focus, select:focus { border-color: #0176d3 !important; box-shadow: 0 0 0 3px #d0e8fb !important; }
        input[style*="ef4444"]:focus, select[style*="ef4444"]:focus { border-color: #ef4444 !important; box-shadow: 0 0 0 3px #fee2e2 !important; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px", marginTop: 80 }}>
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 700, color: "#1a2332" }}>
            Create your account
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
            Step {currentStep + 1} of {STEPS.length} - {step.label}
          </p>
        </div>

        {submitAttempted && errorCount > 0 && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            backgroundColor: "#fef2f2", borderWidth: 1, borderStyle: "solid", borderColor: "#fca5a5",
            borderRadius: 8, padding: "12px 16px", marginBottom: 16,
            color: "#b91c1c", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
          }}>
            <AlertIcon />
            <span>Please fill in all required fields before continuing. <strong>{errorCount} field{errorCount > 1 ? "s" : ""}</strong> need{errorCount === 1 ? "s" : ""} attention.</span>
          </div>
        )}

        <div style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#e2e5ea", borderRadius: 8, overflow: "visible", marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
          <StepBar steps={STEPS} current={currentStep} completed={completed} isReturning={false} onStepClick={() => {}} />

          <div style={{ backgroundColor: "#fff", padding: "24px 28px 28px", borderRadius: "0 0 8px 8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 28px" }}>
              {step.fields.map(field => {
                const hasError = submitAttempted && errors[field.key];
                if (field.type === "hidden") {
                  return (
                    <FormField
                      key={field.key}
                      field={field}
                      value={data[field.key]}
                      onChange={handleChange}
                      error={errors[field.key]}
                      touched={submitAttempted}
                      formData={data}
                    />
                  );
                }

                return (
                  <div
                    key={field.key}
                    id={`field-${field.key}`}
                    style={{ gridColumn: (field.type === "file" || field.type === "textarea" || field.fullWidth) ? "1 / -1" : undefined }}
                  >
                    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: hasError ? "#b91c1c" : "#374151", marginBottom: 6 }}>
                      {field.label}
                      {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                    </label>

                    <FormField field={field} value={data[field.key]} onChange={handleChange} error={errors[field.key]} touched={submitAttempted} formData={data} />

                    {hasError && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, color: "#ef4444", fontSize: 12 }}>
                        <AlertIcon />
                        <span>{errors[field.key]}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            style={{
              padding: "10px 24px", borderRadius: 6,
              borderWidth: 1, borderStyle: "solid", borderColor: "#cdd4da", backgroundColor: "#fff",
              color: "#374151", fontSize: 13, fontWeight: 600,
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
              opacity: currentStep === 0 ? 0.45 : 1,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            style={{
              padding: "10px 30px", borderRadius: 6,
              borderWidth: 0, borderStyle: "solid", borderColor: "transparent", backgroundColor: "#0176d3",
              color: "#fff", fontSize: 13, fontWeight: 600,
              cursor: isSubmitting ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif",
              opacity: isSubmitting ? 0.65 : 1,
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {currentStep === STEPS.length - 1 ? <><CheckIcon /> {isSubmitting ? "Submitting..." : "Finish"}</> : "Next"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const pageStyle = {
  fontFamily: "'DM Sans', sans-serif",
  minHeight: "100vh",
  backgroundColor: "#f3f5f8",
};

export default function SignUp() {
  return (
    <Suspense fallback={null}>
      <SignUpContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Link from "next/link";
import axiosInstance from "../lib/axiosInstance";
import { useRouter } from "next/navigation";


const initialFormData = {
  FirstName: "",
  LastName: "",
  companyName: "",
  Email: "",
  phone: "",
  agreeReceivingAppointmentReminder: false,
  privacyPolicy: false,
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    privacyPolicy: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const nextErrors = {
      firstName: formData.FirstName.trim() ? "" : "First name is required.",
      lastName: formData.LastName.trim() ? "" : "Last name is required.",
      companyName: formData.companyName.trim() ? "" : "Company name is required.",
      email: formData.Email.trim() ? "" : "Email is required.",
      phone: formData.phone.trim() ? "" : "Phone is required.",
      privacyPolicy: formData.privacyPolicy
        ? ""
        : "You must agree to the Privacy Policy and Terms of Service.",
    };

    setErrors(nextErrors);

    return Object.values(nextErrors).every((value) => !value);
  };

  const clearFieldError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // toast.success("Thank you! We'll contact you soon.");
    setFormData(initialFormData);
    
    setErrors({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phone: "",
      privacyPolicy: "",
    });

    try {
      const response = await axiosInstance.post(
        "/api/contactForm",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Form submit response:', response);

      if (response.data.success || response.data.result?.success) {
          // toast.success('Form submitted successfully!');
          toast.success("Thank you! We'll contact you soon.");
          setTimeout(() => {
              router.push('/');
          }, 100);
      } else {
        toast.error(response.data.message || 'Form submission failed.');
        setIsSubmitting(false);
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const message = error.response?.data?.message || error.message || 'An error occurred. Try again.';
      console.warn('Form submit error:', message);
      toast.error(message);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl md:text-4xl text-primary">
                Free, 30 Minute Consultation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                *For hospital executives only*
              </p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.FirstName}
                      onChange={(e) => {
                        setFormData({ ...formData, FirstName: e.target.value });
                        clearFieldError("firstName");
                      }}
                      aria-invalid={Boolean(errors.firstName)}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.LastName}
                      onChange={(e) => {
                        setFormData({ ...formData, LastName: e.target.value });
                        clearFieldError("lastName");
                      }}
                      aria-invalid={Boolean(errors.lastName)}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      clearFieldError("companyName");
                    }}
                    aria-invalid={Boolean(errors.companyName)}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-destructive">{errors.companyName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.Email}
                    onChange={(e) => {
                      setFormData({ ...formData, Email: e.target.value });
                      clearFieldError("email");
                    }}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      clearFieldError("phone");
                    }}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTexts"
                    checked={formData.agreeReceivingAppointmentReminder}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeReceivingAppointmentReminder: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="agreeToTexts"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I agree to receiving appointment reminders by text. E-Health Jobs will not share 
                    your phone number with other parties. Message frequency will vary. Msg & data rates 
                    may apply. Reply HELP for help or STOP to cancel.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToprivacyandterms"
                    checked={formData.privacyPolicy}
                    onCheckedChange={(checked) => {
                      const isChecked = checked as boolean;
                      setFormData({ ...formData, privacyPolicy: isChecked });
                      if (isChecked) {
                        clearFieldError("privacyPolicy");
                      }
                    }}
                  />
                  <label
                    htmlFor="agreeToprivacyandterms"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      Terms of Service
                    </Link>.
                  </label>
                </div>
                {errors.privacyPolicy && (
                  <p className="text-sm text-destructive">{errors.privacyPolicy}</p>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

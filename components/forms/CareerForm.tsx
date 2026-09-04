"use client";

import { useState, type FormEvent } from "react";
import { experienceOptions, roleGroups } from "@/lib/jobs";
import { fileToBase64, isValidEmail, isValidPhone, submitForm, MAX_CV_BYTES, type CareerPayload } from "@/lib/submit";
import { CtaButton } from "../ui/CtaButton";
import { useModals } from "../modals/ModalProvider";
import { ConsentField, FileField, FormError, FormSuccess, SelectField, TextAreaField, TextField } from "./Fields";

type Errors = Partial<Record<"name" | "phone" | "email" | "role" | "experience" | "consent" | "cv", string>>;

const ACCEPT = ".pdf,.doc,.docx";

export function CareerForm({ defaultRole = "" }: { defaultRole?: string }) {
  const { openLegal } = useModals();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [failure, setFailure] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    if (!isValidPhone(phone)) next.phone = "Enter a valid contact number.";
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (!role) next.role = "Pick the role you are applying for.";
    if (!experience) next.experience = "Select your years of experience.";
    if (cv && cv.size > MAX_CV_BYTES) next.cv = "That file is over 5 MB — please attach a smaller CV.";
    if (!consent) next.consent = "Please accept the Privacy Policy to continue.";
    return next;
  }

  function reset() {
    setName("");
    setPhone("");
    setEmail("");
    setRole(defaultRole);
    setExperience("");
    setMessage("");
    setCv(null);
    setConsent(false);
    setErrors({});
    setFailure(null);
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure(null);

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");

    const payload: CareerPayload = {
      form: "career",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      role,
      experience,
      message: message.trim() || undefined,
      consent,
      source: "Career page",
    };

    if (cv) {
      try {
        payload.cv = {
          filename: cv.name,
          mimeType: cv.type || "application/octet-stream",
          data: await fileToBase64(cv),
        };
      } catch {
        setStatus("idle");
        setFailure("We could not read that file. Try attaching it again, or send it to us by email.");
        return;
      }
    }

    const result = await submitForm(payload);
    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      setFailure(result.error);
    }
  }

  if (status === "sent") {
    return (
      <FormSuccess
        title="Application received."
        body="Thank you for your interest in joining Laxmi Developers. If your profile matches an open role, our team will be in touch."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Name"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <TextField
          label="Contact No"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 00000 00000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
      </div>

      <TextField
        label="Email"
        required
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Job Role"
          required
          groups={roleGroups}
          placeholder="Select a role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={errors.role}
        />
        <SelectField
          label="Years of Experience"
          required
          options={experienceOptions}
          placeholder="Select experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          error={errors.experience}
        />
      </div>

      <FileField
        label="Upload CV"
        accept={ACCEPT}
        file={cv}
        onFile={setCv}
        error={errors.cv}
        hint="PDF or Word document, up to 5 MB. Optional — you can also email it to us."
      />

      <TextAreaField
        label="Anything else?"
        rows={3}
        placeholder="A short note about your experience (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <ConsentField checked={consent} onChange={setConsent} error={errors.consent}>
        I agree to the{" "}
        <button type="button" onClick={() => openLegal("privacy")} className="font-semibold text-forest-700 link-underline">
          Privacy Policy
        </button>{" "}
        and consent to Laxmi Developers storing my details for recruitment purposes.
      </ConsentField>

      {failure && <FormError message={failure} />}

      <div className="pt-1">
        <CtaButton type="submit" variant="primary" size="lg" disabled={status === "sending"} icon={status === "sending" ? null : "arrowRight"}>
          {status === "sending" ? "Submitting…" : "Submit Application"}
        </CtaButton>
      </div>
    </form>
  );
}

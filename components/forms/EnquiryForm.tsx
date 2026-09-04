"use client";

import { useState, type FormEvent } from "react";
import { projectOptions } from "@/lib/projects";
import { isValidEmail, isValidPhone, submitForm, type EnquiryPayload } from "@/lib/submit";
import { CtaButton } from "../ui/CtaButton";
import { useModals } from "../modals/ModalProvider";
import { ConsentField, FormError, FormSuccess, SelectField, TextAreaField, TextField } from "./Fields";

const BEST_TIME = ["Morning", "Afternoon", "Evening"];

interface EnquiryFormProps {
  /** Pre-selects the project dropdown. */
  defaultProject?: string;
  /** Recorded against the lead so the team can see which CTA produced it. */
  source: string;
  /** Hides the message box for the compact in-modal layout. */
  compact?: boolean;
  submitLabel?: string;
}

type Errors = Partial<Record<"name" | "phone" | "email" | "project" | "consent", string>>;

export function EnquiryForm({ defaultProject = "", source, compact = false, submitLabel = "Submit Enquiry" }: EnquiryFormProps) {
  const { openLegal } = useModals();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(defaultProject);
  const [bestTime, setBestTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [failure, setFailure] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    if (!isValidPhone(phone)) next.phone = "Enter a valid contact number.";
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (!project) next.project = "Choose the project you are interested in.";
    if (!consent) next.consent = "Please accept the Privacy Policy and Terms to continue.";
    return next;
  }

  function reset() {
    setName("");
    setPhone("");
    setEmail("");
    setProject(defaultProject);
    setBestTime("");
    setMessage("");
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
    const payload: EnquiryPayload = {
      form: "enquiry",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      project,
      bestTime: bestTime || undefined,
      message: message.trim() || undefined,
      consent,
      source,
    };

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
        title="Thank you — we have your details."
        body="Our team will call you back shortly to answer your questions and arrange a site visit."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full Name"
          required
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <TextField
          label="Contact No"
          required
          name="phone"
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
        label="Email Address"
        required
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Select a Project"
          required
          name="project"
          options={projectOptions}
          placeholder="Choose a project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          error={errors.project}
        />
        <SelectField
          label="Best Time to Connect"
          name="bestTime"
          options={BEST_TIME}
          placeholder="Any time"
          value={bestTime}
          onChange={(e) => setBestTime(e.target.value)}
        />
      </div>

      {!compact && (
        <TextAreaField
          label="Message"
          name="message"
          rows={3}
          placeholder="Anything you would like us to know before we call?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      )}

      <ConsentField checked={consent} onChange={setConsent} error={errors.consent}>
        By checking this box, you agree to our{" "}
        <button type="button" onClick={() => openLegal("privacy")} className="font-semibold text-forest-700 link-underline">
          Privacy Policy
        </button>{" "}
        and{" "}
        <button type="button" onClick={() => openLegal("terms")} className="font-semibold text-forest-700 link-underline">
          Terms &amp; Conditions
        </button>
        , and consent to be contacted with relevant updates.
      </ConsentField>

      {failure && <FormError message={failure} />}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <CtaButton type="submit" variant="gold" size="lg" disabled={status === "sending"} icon={status === "sending" ? null : "arrowRight"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </CtaButton>
        <p className="text-[0.72rem] tracking-wide text-slate-muted uppercase">100% Secure · No Spam · Expert Callback</p>
      </div>
    </form>
  );
}

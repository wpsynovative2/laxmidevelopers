/**
 * Posts form submissions to the Google Apps Script web app, which appends a row
 * to the Google Sheet and emails a notification. See scripts/apps-script/Code.gs.
 *
 * The request deliberately uses `text/plain` rather than `application/json`.
 * Apps Script web apps do not answer CORS preflight (OPTIONS) requests, so the
 * body has to qualify as a CORS "simple request" — `text/plain` is one of the
 * three content types that skips preflight. The script parses the raw body as
 * JSON on the other side.
 */

export const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";

export interface EnquiryPayload {
  form: "enquiry";
  name: string;
  phone: string;
  email: string;
  project: string;
  bestTime?: string;
  message?: string;
  consent: boolean;
  /** Where on the site the enquiry came from — useful for attribution in the sheet. */
  source: string;
}

export interface CareerPayload {
  form: "career";
  name: string;
  phone: string;
  email: string;
  role: string;
  experience: string;
  message?: string;
  consent: boolean;
  source: string;
  /** Base64 (no data-URL prefix) CV, saved to Drive by the Apps Script. */
  cv?: { filename: string; mimeType: string; data: string };
}

export type FormPayload = EnquiryPayload | CareerPayload;

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Files above this size are rejected client-side — Apps Script payloads are capped. */
export const MAX_CV_BYTES = 5 * 1024 * 1024;

export async function submitForm(payload: FormPayload): Promise<SubmitResult> {
  if (!FORMS_ENDPOINT) {
    return {
      ok: false,
      error: "The form endpoint is not configured yet. Please call or email us and we will respond right away.",
    };
  }

  try {
    const res = await fetch(FORMS_ENDPOINT, {
      method: "POST",
      // text/plain keeps this a simple request, so the browser skips preflight.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString(), pageUrl: window.location.href }),
      redirect: "follow",
    });

    if (!res.ok) return { ok: false, error: `We could not send that (error ${res.status}). Please try again.` };

    const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (body && body.ok === false) return { ok: false, error: body.error ?? "Something went wrong. Please try again." };

    return { ok: true };
  } catch {
    return { ok: false, error: "We could not reach the server. Check your connection and try again." };
  }
}

/** Reads a File into the base64 string the Apps Script expects. */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      // Strip the "data:<mime>;base64," prefix.
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

/** Minimal, forgiving validators — Indian mobile numbers and a sane email shape. */
export const isValidPhone = (v: string) => /^[+\d][\d\s-]{8,15}$/.test(v.trim());
export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

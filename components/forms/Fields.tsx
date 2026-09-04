"use client";

import { useId, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Icon } from "../ui/Icon";

const control =
  "w-full rounded-xl border bg-white/80 px-4 py-3 text-[0.92rem] text-ink-900 placeholder:text-slate-muted/70 " +
  "transition-[border-color,box-shadow,background-color] duration-200 " +
  "focus:border-forest-600 focus:bg-white focus:ring-4 focus:ring-forest-600/10 focus:outline-none";

const ok = "border-cream-300";
const bad = "border-red-400/70 bg-red-50/60";

interface FieldShellProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}

function FieldShell({ label, required, error, hint, children }: FieldShellProps) {
  const id = useId();
  const msgId = error || hint ? `${id}-msg` : undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.78rem] font-semibold tracking-wide text-ink-700">
        {label}
        {required && <span className="ml-0.5 text-gold-600">*</span>}
      </label>
      {children(id, msgId)}
      {(error || hint) && (
        <p id={msgId} className={`mt-1.5 text-xs ${error ? "text-red-600" : "text-slate-muted"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = { label: string; error?: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, error, hint, required, className = "", ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} hint={hint}>
      {(id, describedBy) => (
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${control} ${error ? bad : ok} ${className}`}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type SelectFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  options?: readonly string[];
  placeholder?: string;
  /** Grouped options — takes precedence over `options`. */
  groups?: { group: string; roles: readonly string[] }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  label,
  error,
  hint,
  options = [],
  groups,
  placeholder = "Select an option",
  required,
  className = "",
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} hint={hint}>
      {(id, describedBy) => (
        <div className="relative">
          <select
            id={id}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={`${control} ${error ? bad : ok} appearance-none pr-11 ${className}`}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {groups
              ? groups.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </optgroup>
                ))
              : options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
          </select>
          <Icon name="chevronDown" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-muted" />
        </div>
      )}
    </FieldShell>
  );
}

type TextAreaFieldProps = { label: string; error?: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, error, hint, required, className = "", rows = 4, ...rest }: TextAreaFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} hint={hint}>
      {(id, describedBy) => (
        <textarea
          id={id}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${control} ${error ? bad : ok} resize-y ${className}`}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

interface ConsentFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}

export function ConsentField({ checked, onChange, error, children }: ConsentFieldProps) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-cream-300 accent-forest-700"
        />
        <label htmlFor={id} className="text-[0.8rem] leading-relaxed text-slate-muted">
          {children}
        </label>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface FileFieldProps {
  label: string;
  error?: string;
  hint?: string;
  file: File | null;
  onFile: (file: File | null) => void;
  accept?: string;
}

export function FileField({ label, error, hint, file, onFile, accept }: FileFieldProps) {
  const id = useId();
  return (
    <div>
      <span className="mb-1.5 block text-[0.78rem] font-semibold tracking-wide text-ink-700">{label}</span>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 transition-colors duration-200 hover:border-forest-600 hover:bg-white ${
          error ? "border-red-400/70 bg-red-50/60" : "border-cream-300 bg-white/80"
        }`}
      >
        <Icon name="download" className="size-5 shrink-0 rotate-180 text-forest-700" />
        <span className="min-w-0 flex-1 truncate text-[0.88rem] text-ink-900">{file ? file.name : "Choose a file"}</span>
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onFile(null);
            }}
            className="shrink-0 rounded-full p-1 text-slate-muted transition-colors hover:bg-cream-200 hover:text-ink-900"
            aria-label="Remove file"
          >
            <Icon name="close" className="size-4" />
          </button>
        )}
        <input id={id} type="file" accept={accept} className="sr-only" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
      </label>
      {(error || hint) && <p className={`mt-1.5 text-xs ${error ? "text-red-600" : "text-slate-muted"}`}>{error ?? hint}</p>}
    </div>
  );
}

/** Shown in place of a form once a submission lands. */
export function FormSuccess({ title, body, onReset }: { title: string; body: string; onReset?: () => void }) {
  return (
    <div className="rounded-2xl border border-forest-600/25 bg-forest-700/5 px-6 py-10 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest-700 text-cream-50">
        <Icon name="check" className="size-7" />
      </span>
      <h3 className="mt-5 font-display text-xl text-ink-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-relaxed text-slate-muted">{body}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-5 text-[0.82rem] font-semibold text-forest-700 link-underline">
          Send another
        </button>
      )}
    </div>
  );
}

/** Inline error banner for submission failures. */
export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[0.85rem] text-red-700">
      {message}
    </p>
  );
}

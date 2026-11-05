"use client";

import { useState, type FormEvent } from "react";

export default function DemoForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector<HTMLInputElement>(
      'input[type="email"]',
    );
    if (!input?.checkValidity()) {
      input?.reportValidity();
      return;
    }
    setDone(true);
  };

  return (
    <>
      <form
        id="trial-form"
        className={
          done
            ? "hidden mt-6 flex-col sm:flex-row gap-2.5 max-w-md"
            : "mt-5 flex flex-col sm:flex-row gap-2.5 max-w-md"
        }
        noValidate
        onSubmit={onSubmit}
      >
        <input
          type="email"
          required
          placeholder="you@company.com"
          className="field flex-1"
          aria-label="Work email"
        />
        <button type="submit" className="btn btn-primary">
          Start free trial
        </button>
      </form>
      <p
        id="trial-done"
        className={
          done
            ? "mt-6 text-[.9375rem] font-medium"
            : "hidden mt-6 text-[.9375rem] font-medium"
        }
      >
        Thanks — our team will follow up.
      </p>
      <p
        className={
          done ? "mt-1 text-[.8125rem] text-muted" : "hidden mt-1 text-[.8125rem] text-muted"
        }
      >
        Preview site — this form simulates sign-up; nothing is sent or stored.
      </p>
    </>
  );
}

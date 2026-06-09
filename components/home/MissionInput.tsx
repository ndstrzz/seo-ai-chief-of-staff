"use client";

import { FormEvent, useState } from "react";

export default function MissionInput() {
  const [operation, setOperation] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!operation.trim()) {
      return;
    }

    alert(`SEO received operation:\n\n${operation}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl rounded-[2rem] border border-seo-stone bg-seo-cream/70 p-3 shadow-[0_24px_90px_rgba(48,67,45,0.14)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={operation}
          onChange={(event) => setOperation(event.target.value)}
          className="min-h-14 w-full bg-transparent px-5 text-sm text-seo-ink outline-none placeholder:text-seo-muted"
          placeholder="Give SEO an operation... e.g. Organise an LPA seminar for 250 pax under $10,000"
        />

        <button
          type="submit"
          className="rounded-full bg-seo-forest px-7 py-4 text-sm font-medium text-seo-cream transition hover:scale-[1.02] hover:bg-seo-moss"
        >
          Start
        </button>
      </div>
    </form>
  );
}
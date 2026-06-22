/**
 * Experience Form Component
 */

"use client";

import { useState } from "react";

interface ExperienceFormData {
  company: string;
  position: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string;
  technologies: string;
}

interface ExperienceFormProps {
  initialData?: Partial<ExperienceFormData>;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export function ExperienceForm({
  initialData,
  action,
  submitLabel,
}: ExperienceFormProps) {
  const [loading, setLoading] = useState(false);

  const defaults: ExperienceFormData = {
    company: "",
    position: "",
    location: "",
    type: "Full-time",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: "",
    technologies: "",
    ...initialData,
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await action(formData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company" name="company" defaultValue={defaults.company} required />
        <Field label="Position" name="position" defaultValue={defaults.position} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Location" name="location" defaultValue={defaults.location} required />
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1.5">Type</label>
          <select
            name="type"
            defaultValue={defaults.type}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
          >
            <option value="Full-time" className="bg-neutral-900">Full-time</option>
            <option value="Part-time" className="bg-neutral-900">Part-time</option>
            <option value="Internship" className="bg-neutral-900">Internship</option>
            <option value="Freelance" className="bg-neutral-900">Freelance</option>
            <option value="Contract" className="bg-neutral-900">Contract</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer w-full">
            <input type="checkbox" name="current" defaultChecked={defaults.current} className="rounded border-white/20" />
            <span className="text-sm text-white/60">Currently working here</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Start Date" name="startDate" defaultValue={defaults.startDate} required placeholder="2024-01" />
        <Field label="End Date" name="endDate" defaultValue={defaults.endDate} placeholder="2024-12 (leave empty if current)" />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Description <span className="text-white/30 font-normal">(Markdown)</span>
        </label>
        <textarea
          name="description"
          defaultValue={defaults.description}
          rows={6}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Achievements <span className="text-white/30 font-normal">(one per line)</span>
        </label>
        <textarea
          name="achievements"
          defaultValue={defaults.achievements}
          rows={4}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
          placeholder="Achieved X by doing Y..."
        />
      </div>

      <Field label="Technologies" name="technologies" defaultValue={defaults.technologies} placeholder="React, Next.js, TypeScript" />

      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all placeholder-white/25"
      />
    </div>
  );
}

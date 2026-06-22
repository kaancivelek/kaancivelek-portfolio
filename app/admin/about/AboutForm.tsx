/**
 * About Form Component
 */

"use client";

import { useState } from "react";

interface AboutFormProps {
  initialData?: {
    name: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    social: string;
    skills: string;
  };
  action: (formData: FormData) => Promise<void>;
}

export function AboutForm({ initialData, action }: AboutFormProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Pretty-print JSON for editing
  const socialPretty = initialData?.social
    ? JSON.stringify(JSON.parse(initialData.social), null, 2)
    : '{\n  "github": "",\n  "linkedin": "",\n  "twitter": ""\n}';

  const skillsPretty = initialData?.skills
    ? JSON.stringify(JSON.parse(initialData.skills), null, 2)
    : '{\n  "Frontend": [],\n  "Backend": []\n}';

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setSaved(false);
    try {
      await action(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" defaultValue={initialData?.name} required />
        <Field label="Title" name="title" defaultValue={initialData?.title} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email" name="email" type="email" defaultValue={initialData?.email} required />
        <Field label="Location" name="location" defaultValue={initialData?.location} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Bio <span className="text-white/30 font-normal">(Markdown)</span>
        </label>
        <textarea
          name="bio"
          defaultValue={initialData?.bio}
          rows={8}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Social Links <span className="text-white/30 font-normal">(JSON)</span>
        </label>
        <textarea
          name="social"
          defaultValue={socialPretty}
          rows={5}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Skills <span className="text-white/30 font-normal">(JSON)</span>
        </label>
        <textarea
          name="skills"
          defaultValue={skillsPretty}
          rows={12}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
        {saved && (
          <span className="text-sm text-emerald-400">✓ Saved successfully</span>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all placeholder-white/25"
      />
    </div>
  );
}

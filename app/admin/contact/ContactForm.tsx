/**
 * Contact Form Component
 */

"use client";

import { useState } from "react";

interface ContactFormProps {
  initialData?: {
    email: string;
    availability: string;
    timezone: string;
    preferredContact: string;
    responseTime: string;
    callToAction: string;
    socialLinks: string;
  };
  action: (formData: FormData) => Promise<void>;
}

export function ContactForm({ initialData, action }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const socialLinksPretty = initialData?.socialLinks
    ? JSON.stringify(JSON.parse(initialData.socialLinks), null, 2)
    : '[\n  { "platform": "GitHub", "url": "", "username": "" }\n]';

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
        <Field label="Email" name="email" type="email" defaultValue={initialData?.email} required />
        <Field label="Preferred Contact" name="preferredContact" defaultValue={initialData?.preferredContact} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Timezone" name="timezone" defaultValue={initialData?.timezone} />
        <Field label="Response Time" name="responseTime" defaultValue={initialData?.responseTime} />
      </div>

      <Field label="Availability" name="availability" defaultValue={initialData?.availability} />

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Call to Action <span className="text-white/30 font-normal">(Markdown)</span>
        </label>
        <textarea
          name="callToAction"
          defaultValue={initialData?.callToAction}
          rows={8}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Social Links <span className="text-white/30 font-normal">(JSON)</span>
        </label>
        <textarea
          name="socialLinks"
          defaultValue={socialLinksPretty}
          rows={8}
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

/**
 * Project Form Component
 * Shared form for creating and editing projects.
 */

"use client";

import { useState } from "react";

interface ProjectFormData {
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  tags: string;
  featured: boolean;
  year: number;
  status: string;
  linksLive: string;
  linksGithub: string;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export function ProjectForm({
  initialData,
  action,
  submitLabel,
}: ProjectFormProps) {
  const [loading, setLoading] = useState(false);

  const defaults: ProjectFormData = {
    slug: "",
    title: "",
    description: "",
    detailedDescription: "",
    image: "",
    tags: "",
    featured: false,
    year: new Date().getFullYear(),
    status: "completed",
    linksLive: "",
    linksGithub: "",
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
      {/* Title & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Title" name="title" defaultValue={defaults.title} required />
        <FormField label="Slug" name="slug" defaultValue={defaults.slug} required placeholder="my-project-slug" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={defaults.description}
          required
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-none placeholder-white/25"
          placeholder="Brief project description..."
        />
      </div>

      {/* Detailed Description (Markdown) */}
      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Detailed Description{" "}
          <span className="text-white/30 font-normal">(Markdown)</span>
        </label>
        <textarea
          name="detailedDescription"
          defaultValue={defaults.detailedDescription}
          rows={10}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-y placeholder-white/25"
          placeholder="# Project Details&#10;&#10;Write markdown here..."
        />
      </div>

      {/* Year, Status, Featured */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField label="Year" name="year" type="number" defaultValue={String(defaults.year)} required />
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1.5">
            Status
          </label>
          <select
            name="status"
            defaultValue={defaults.status}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
          >
            <option value="active" className="bg-neutral-900">Active</option>
            <option value="completed" className="bg-neutral-900">Completed</option>
            <option value="wip" className="bg-neutral-900">Work in Progress</option>
            <option value="archived" className="bg-neutral-900">Archived</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer w-full">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={defaults.featured}
              className="rounded border-white/20"
            />
            <span className="text-sm text-white/60">Featured</span>
          </label>
        </div>
      </div>

      {/* Tags & Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Tags" name="tags" defaultValue={defaults.tags} placeholder="React, Next.js, TypeScript" />
        <FormField label="Image Path" name="image" defaultValue={defaults.image} placeholder="/projects/my-project.jpg" />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Live URL" name="linksLive" defaultValue={defaults.linksLive} placeholder="https://..." />
        <FormField label="GitHub URL" name="linksGithub" defaultValue={defaults.linksGithub} placeholder="https://github.com/..." />
      </div>

      {/* Submit */}
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

function FormField({
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
      <label className="block text-sm font-medium text-white/60 mb-1.5">
        {label}
      </label>
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

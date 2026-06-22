/**
 * Delete Project Button
 * Client component for delete confirmation.
 */

"use client";

import { deleteProject } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;

    setLoading(true);
    await deleteProject(id);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1.5 rounded-md bg-red-500/5 text-red-400/60 text-xs hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}

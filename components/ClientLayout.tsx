"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { DataProvider } from "@/contexts/DataContext";

export function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadAllData() {
      try {
        // Tüm data'yı paralel yükle
        const [aboutRes, projectsRes, experienceRes, contactRes] = await Promise.all([
          fetch("/api/data/about"),
          fetch("/api/data/projects"),
          fetch("/api/data/experience"),
          fetch("/api/data/contact"),
        ]);
        // Validate all responses
        if (!aboutRes.ok || !projectsRes.ok || !experienceRes.ok || !contactRes.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const [about, projectsData, experience, contact] = await Promise.all([
          aboutRes.json(),
          projectsRes.json(),
          experienceRes.json(),
          contactRes.json(),
        ]);

        setData({
          about: about || {},
          aboutBioHtml: about?.bioHtml || "",
          projects: projectsData?.projects || [],
          projectDetails: projectsData?.projectDetails || {},
          experiences: experience?.experiences || [],
          contact: contact || {},
          contactCtaHtml: contact?.ctaHtml || "",
        });

        // Minimum loading time için kısa bir delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Failed to load data:", error);
        // Set empty data to prevent infinite loading
        setData({
          about: {} as any,
          aboutBioHtml: "",
          projects: [],
          projectDetails: {},
          experiences: [],
          contact: {} as any,
          contactCtaHtml: "",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadAllData();
  }, []);

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  return <DataProvider data={data}>{children}</DataProvider>;
}

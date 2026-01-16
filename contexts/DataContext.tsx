"use client";

import { createContext, useContext, type ReactNode } from "react";

interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  skills: {
    primary: string[];
    secondary: string[];
  };
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  featured: boolean;
  year: number;
  status: string;
  links?: {
    live?: string;
    github?: string;
  };
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ContactData {
  contact: {
    email: string;
    phone: string;
    availability: string;
    timezone: string;
    preferredContact: string;
    responseTime: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    username: string;
  }>;
  callToAction: string;
}

interface DataContextType {
  about: AboutData;
  aboutBioHtml: string;
  projects: Project[];
  projectDetails: Record<string, string>; // slug -> HTML content
  experiences: Experience[];
  contact: ContactData;
  contactCtaHtml: string;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({
  children,
  data,
}: Readonly<{
  children: ReactNode;
  data: DataContextType;
}>) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}

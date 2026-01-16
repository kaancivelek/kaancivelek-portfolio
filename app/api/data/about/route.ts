import { NextResponse } from "next/server";
import { getJsonData, getMarkdownContent } from "@/lib/content";

export async function GET() {
  try {
    const aboutData = await getJsonData<Record<string, unknown>>("about.json");
    const bioContent = await getMarkdownContent("about-bio.md");

    return NextResponse.json({
      ...aboutData,
      bioHtml: bioContent.content,
    });
  } catch (error) {
    console.error("Failed to load about data:", error);
    return NextResponse.json({ error: "Failed to load about data" }, { status: 500 });
  }
}

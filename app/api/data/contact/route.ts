import { NextResponse } from "next/server";
import { getJsonData, getMarkdownContent } from "@/lib/content";

export async function GET() {
  try {
    const contactData = await getJsonData<Record<string, unknown>>("contact.json");
    const ctaContent = await getMarkdownContent("contact-cta.md");

    return NextResponse.json({
      ...contactData,
      ctaHtml: ctaContent.content,
    });
  } catch (error) {
    console.error("Failed to load contact data:", error);
    return NextResponse.json({ error: "Failed to load contact data" }, { status: 500 });
  }
}

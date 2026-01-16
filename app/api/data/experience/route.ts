import { NextResponse } from "next/server";
import { getJsonData } from "@/lib/content";

export async function GET() {
  try {
    const experienceData = await getJsonData("experience.json");
    return NextResponse.json(experienceData);
  } catch (error) {
    console.error("Failed to load experience data:", error);
    return NextResponse.json({ error: "Failed to load experience data" }, { status: 500 });
  }
}

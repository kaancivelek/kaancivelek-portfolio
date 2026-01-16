"use cache";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const dataDirectory = path.join(process.cwd(), "data");

/**
 * JSON dosyasını okur
 */
export async function getJsonData<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

/**
 * Markdown dosyasını okur ve HTML'e çevirir
 */
export async function getMarkdownContent(filename: string) {
  const filePath = path.join(dataDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);
  
  // Markdown'ı HTML'e çevir
  const htmlContent = await marked.parse(content);
  
  return {
    frontmatter: data,
    content: htmlContent,
  };
}

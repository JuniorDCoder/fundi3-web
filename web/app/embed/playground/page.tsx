import { CodePlayground } from "@/components/learn/CodePlayground";
import type { CodeLanguage } from "@/lib/courses/types";

interface EmbedPlaygroundPageProps {
  searchParams: { lang?: string; starter?: string; title?: string };
}

function decodeStarter(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return Buffer.from(decodeURIComponent(value), "base64").toString("utf-8");
  } catch {
    return null;
  }
}

export default function EmbedPlaygroundPage({ searchParams }: EmbedPlaygroundPageProps) {
  const codeLanguage: CodeLanguage = searchParams.lang === "typescript" ? "typescript" : "javascript";
  const codeStarter = decodeStarter(searchParams.starter);
  const title = searchParams.title ? decodeURIComponent(searchParams.title) : "Code playground";

  return (
    <div className="min-h-screen w-full p-2" style={{ backgroundColor: "#0A0F0E" }}>
      <CodePlayground codeLanguage={codeLanguage} codeStarter={codeStarter} title={title} />
    </div>
  );
}

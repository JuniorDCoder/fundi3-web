import { RemixWorkspaceProvider } from "@/components/learn/RemixWorkspace";

export default function CourseLearnLayout({ children }: { children: React.ReactNode }) {
  return <RemixWorkspaceProvider>{children}</RemixWorkspaceProvider>;
}

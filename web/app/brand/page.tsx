import { BrandShowcase } from "@/components/brand/BrandShowcase";

export const metadata = {
  title: "Fundi3 Brand Guide",
  description: "Internal design system reference — not linked in nav.",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return <BrandShowcase />;
}

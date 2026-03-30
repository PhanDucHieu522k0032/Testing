import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM App",
  description: "FastAPI + Next.js CRM starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

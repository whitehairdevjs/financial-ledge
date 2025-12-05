"use client";

import { QueryProvider } from "@/providers/QueryProvider";
import Navigation from "@/components/Navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Navigation />
      <main>{children}</main>
    </QueryProvider>
  );
}


"use client";

import { QueryProvider } from "@/providers/QueryProvider";
import Navigation from "@/components/Navigation";
import AuthGuard from "@/components/AuthGuard";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthGuard>
        <Navigation />
        <main>{children}</main>
      </AuthGuard>
    </QueryProvider>
  );
}


import "./globals.css";
import type React from "react";
import { Suspense } from "react";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Openlibrary Library - Academic Resource Platform",
  description:
    "A comprehensive PDF library platform for Nigerian campus students and lecturers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistMono.variable} ${GeistSans.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <main className="">{children}</main>
            </AuthProvider>

            <Toaster />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}

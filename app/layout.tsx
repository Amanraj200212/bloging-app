import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConvexClientProvider } from "../components/web/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "WebApp",
  description: "Created by Aman Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
    >
      <body className="h-full antialiased">
        
        {/* themeprovide for dark and light mode support */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem  disableTransitionOnChange>
          <main className="max-w-8xl mx-auto w-full px-4 md:px-6 lg:px-8">
            
              {/* convex provider to provide convex client to the app(DOC) */}
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>

            {/* toaster for showing toast notifications */}
          <Toaster closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

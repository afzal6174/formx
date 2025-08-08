import { SiteHeader } from "@/components/header";
import MainNav from "@/components/nav";
import SidebarProviderClient from "@/components/nav/sidebar-provider-client";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarInset } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata = {
  title: "FormX",
  description:
    "FormX is a form builder that allows you to create forms using reusable components.",
};

export default async function RootLayout({ children }) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full [--header-height:calc(--spacing(14))]">
            <SidebarProviderClient className="flex flex-col">
              <SiteHeader />
              <div className="flex flex-1">
                <nav aria-label="Main Navigation">
                  <MainNav />
                </nav>
                {/* <SidebarTrigger className="-ml-1" /> */}
                <SidebarInset>{children}</SidebarInset>
              </div>
            </SidebarProviderClient>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

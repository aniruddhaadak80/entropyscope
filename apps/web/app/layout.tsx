import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "EntropyScope — Simulate the future of work",
  description:
    "A forecasting sandbox with agent-swarm workforce timelines, prediction-market calibration, and time-machine scenario forks. Zero API keys.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-indigo-950 text-star-white selection:bg-plasma-cyan/30">
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}

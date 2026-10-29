import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <nav className="border-b border-indigo-900 bg-indigo-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="slab-text text-xl font-bold tracking-tight text-plasma-cyan">
              ENTROPYSCOPE
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-muted-foreground hover:text-plasma-cyan transition">
                Simulate
              </Link>
              <Link
                href="/features"
                className="text-muted-foreground hover:text-plasma-cyan transition"
              >
                Features
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-plasma-cyan transition"
              >
                About
              </Link>
              <a
                href="/dashboard"
                className="px-4 py-2 rounded-lg border border-plasma-cyan/30 text-plasma-cyan hover:bg-plasma-cyan/10 transition"
              >
                Open Sandbox
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}

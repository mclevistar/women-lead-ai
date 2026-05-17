"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, EXTERNAL_LINKS } from "@/lib/constants";

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#602D37] border-b border-[#4a2129]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="text-2xl tracking-wider text-[#EFE2D3]"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          Women Lead AI
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                pathname === link.href
                  ? "text-[#EFE2D3]"
                  : "text-[#EFE2D3]/70 hover:text-[#EFE2D3]"
              }`}
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={EXTERNAL_LINKS.skool}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#EFE2D3] text-[#602D37] text-xs font-bold uppercase tracking-wider border-2 border-[#EFE2D3] hover:bg-transparent hover:text-[#EFE2D3] transition-all duration-200"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            Join Us
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-[#EFE2D3]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-[#602D37] border-t border-[#4a2129]">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-semibold uppercase tracking-wider py-1 transition-colors ${
                  pathname === link.href
                    ? "text-[#EFE2D3]"
                    : "text-[#EFE2D3]/70 hover:text-[#EFE2D3]"
                }`}
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={EXTERNAL_LINKS.skool}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center px-5 py-3 bg-[#EFE2D3] text-[#602D37] text-sm font-bold uppercase tracking-wider border-2 border-[#EFE2D3] hover:bg-transparent hover:text-[#EFE2D3] transition-all duration-200"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              Join Us
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

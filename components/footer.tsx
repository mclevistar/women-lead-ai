import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-5">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/podcast" className="text-sm text-muted-foreground hover:text-primary transition-colors">Podcast</Link></li>
              <li><Link href="/youtube" className="text-sm text-muted-foreground hover:text-primary transition-colors">YouTube</Link></li>
              <li><Link href="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><a href={EXTERNAL_LINKS.gumroad} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Resources</a></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-5">Business</h4>
            <ul className="space-y-3">
              <li><Link href="/b2b" className="text-sm text-muted-foreground hover:text-primary transition-colors">B2B Services</Link></li>
              <li><Link href="/b2b" className="text-sm text-muted-foreground hover:text-primary transition-colors">Advisory</Link></li>
              <li><Link href="/b2b" className="text-sm text-muted-foreground hover:text-primary transition-colors">Speaking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-5">Connect</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><a href={EXTERNAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href={EXTERNAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
              <li><a href={EXTERNAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">TikTok</a></li>
              <li><a href={EXTERNAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-sm font-semibold text-foreground">Women Lead AI</p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Women Lead AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

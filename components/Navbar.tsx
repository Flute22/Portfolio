import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '../constants';
import { ThemeToggle } from './ThemeToggle';

/** Every observed section; ids that are not in NAV_LINKS simply clear the highlight. */
const OBSERVED_IDS = ['top', 'about', 'skills', 'projects', 'experience', 'case-studies', 'contact'];
const NAV_IDS = new Set(NAV_LINKS.map((l) => l.id));

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Border appears once the page has scrolled; last section wins at the very bottom.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActiveId('contact');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: a thin band around 40% of the viewport decides the active section.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(NAV_IDS.has(entry.target.id) ? entry.target.id : null);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    OBSERVED_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu and hands focus back to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const linkClass = (id: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      activeId === id ? 'bg-tint text-accent' : 'text-body hover:bg-ink/5 hover:text-ink'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-page transition-colors duration-200 ${
        scrolled || menuOpen ? 'border-line' : 'border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg text-[17px] font-semibold tracking-tight text-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          {SITE_NAME}
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeId === link.id ? 'location' : undefined}
                className={`block ${linkClass(link.id)}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-line bg-page md:hidden">
        <ul className="mx-auto flex max-w-page flex-col gap-1 px-4 py-3 sm:px-6 lg:px-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeId === link.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-base ${linkClass(link.id)}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

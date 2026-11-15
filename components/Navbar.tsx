import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '../constants';
import { ThemeToggle } from './ThemeToggle';

/** The section whose top has passed this line (px from viewport top) counts as current. */
const ACTIVE_LINE = 160;

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Highlight the current section; at the very bottom of the page it is always Contact.
  useEffect(() => {
    const onScroll = () => {
      let current = '';
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < ACTIVE_LINE) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  // Close the mobile menu if the viewport grows to the desktop navbar (1000px).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1000px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-nav backdrop-blur-[14px] backdrop-saturate-[1.4]">
      <nav aria-label="Primary" className="container-page flex h-[68px] items-center justify-between gap-4">
        <a
          href="#top"
          className="whitespace-nowrap text-[18px] font-semibold leading-none tracking-[-0.01em] text-ink no-underline"
        >
          {SITE_NAME}
        </a>

        {/* Desktop: pill of links, centred between the logo and the buttons */}
          <ul className="m-0 hidden list-none items-center gap-0.5 rounded-full border border-line bg-surface p-1 text-[14px] min-[1000px]:flex">
            {NAV_LINKS.map((link) => {
              const current = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={current ? 'true' : undefined}
                    className={`block rounded-full px-3.5 py-2 no-underline transition-colors ${
                      current ? 'bg-ink font-semibold text-page' : 'font-normal text-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile: menu button */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink min-[1000px]:hidden"
          >
            {menuOpen ? <X className="h-[18px] w-[18px]" aria-hidden="true" /> : <Menu className="h-[18px] w-[18px]" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="min-[1000px]:hidden">
        {menuOpen && (
          <ul className="container-page m-0 flex list-none flex-col gap-1 border-t border-line pb-5 pt-3">
            {NAV_LINKS.map((link) => {
              const current = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={current ? 'true' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3.5 text-[18px] no-underline ${
                      current ? 'bg-ink font-semibold text-page' : 'font-normal text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
};

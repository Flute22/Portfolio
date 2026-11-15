import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '../constants';
import { ThemeToggle } from './ThemeToggle';

/** The section whose top has passed this line (px from viewport top) counts as current. */
const ACTIVE_LINE = 160;

interface Indicator {
  left: number;
  width: number;
}

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [indicator, setIndicator] = useState<Indicator | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Current section + page scroll progress. Runs once per frame at most.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '';
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < ACTIVE_LINE) current = id;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const atBottom = max > 0 && window.scrollY >= max - 4;
      if (atBottom) current = 'contact';
      setActiveId(current);
      if (progressRef.current) {
        const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Slide the highlight under the active link.
  const measure = useCallback(() => {
    const el = activeId ? linkRefs.current[activeId] : null;
    setIndicator(el && el.offsetWidth > 0 ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [activeId]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    void document.fonts?.ready.then(measure); // text width changes once the web font arrives
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

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
    <header className="sticky top-0 z-50 animate-fade-down border-b border-line bg-nav backdrop-blur-[14px] backdrop-saturate-[1.4]">
      {/* Reading progress */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-accent"
      />

      <nav aria-label="Primary" className="container-page flex h-[68px] items-center justify-between gap-4">
        <a
          href="#top"
          className="whitespace-nowrap text-[18px] font-semibold leading-none tracking-[-0.01em] text-ink no-underline"
        >
          {SITE_NAME}
        </a>

        {/* Desktop: pill of links, centred between the logo and the buttons */}
        <ul className="relative m-0 hidden list-none items-center gap-0.5 rounded-full border border-line bg-surface p-1 text-[14px] min-[1000px]:flex">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 top-1 rounded-full bg-ink transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            style={{
              left: indicator?.left ?? 0,
              width: indicator?.width ?? 0,
              opacity: indicator ? 1 : 0,
            }}
          />
          {NAV_LINKS.map((link) => {
            const current = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[link.id] = el;
                  }}
                  href={`#${link.id}`}
                  aria-current={current ? 'true' : undefined}
                  className={`relative z-10 block rounded-full px-3.5 py-2 font-medium no-underline transition-colors duration-300 ${
                    current ? 'text-page' : 'text-muted hover:text-ink'
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

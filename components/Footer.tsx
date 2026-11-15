import React from 'react';
import { SITE_NAME } from '../constants';

export const Footer: React.FC = () => (
  <footer className="container-page pb-9 pt-[clamp(48px,6vw,72px)]">
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-muted">
      <span>
        © {new Date().getFullYear()} {SITE_NAME}. Built with precision and data.
      </span>
      <a
        href="#top"
        className="flex min-h-11 items-center font-mono text-[13px] font-medium text-muted no-underline transition-colors hover:text-ink"
      >
        Back to top <span aria-hidden="true">&nbsp;↑</span>
      </a>
    </div>
  </footer>
);

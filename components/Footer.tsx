import React from 'react';
import { SITE_NAME } from '../constants';

export const Footer: React.FC = () => (
  <footer className="border-t border-line">
    <div className="mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-3 px-4 py-8 sm:px-6 lg:px-12">
      <p className="text-sm text-muted">
        © {new Date().getFullYear()} {SITE_NAME}. Built with precision and data.
      </p>
      <a href="#top" className="rounded-sm font-mono text-sm text-muted transition-colors hover:text-accent">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </div>
  </footer>
);

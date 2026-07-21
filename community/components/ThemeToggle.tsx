'use client';

import { useTheme } from '@/components/ThemeProvider';
import { THEME_LABELS, type ThemeId } from '@/lib/theme';
import Link from 'next/link';
import { useRef, useState } from 'react';

const THEME_IDS: ThemeId[] = ['orbital-dark', 'light-orbit'];

export function ThemeToggle() {
  const { settings, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = settings?.theme ?? 'orbital-dark';
  const label = current === 'custom' ? 'Custom' : THEME_LABELS[current as keyof typeof THEME_LABELS];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-app bg-card px-3 py-2 text-sm text-app hover:bg-card-hover"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="w-4 h-4 rounded-full bg-primary" aria-hidden />
        <span>{label}</span>
        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-app bg-card py-1 shadow-lg"
            role="menu"
          >
            <div className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-wider">Theme</div>
            {THEME_IDS.map((id) => (
              <button
                key={id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${current === id ? 'bg-card-hover text-primary' : 'text-app hover:bg-card-hover'}`}
              >
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      id === 'orbital-dark' ? '#4F8CFF' : '#2563EB',
                  }}
                />
                {THEME_LABELS[id as keyof typeof THEME_LABELS]}
              </button>
            ))}
            <div className="my-1 border-t border-app" />
            <Link
              href="/settings/theme"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted hover:bg-card-hover hover:text-app"
              role="menuitem"
            >
              Customize theme →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

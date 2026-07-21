'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, Rocket, X } from 'lucide-react';

const links = [
  { href: '#explore', label: 'Explore' },
  { href: '#communities', label: 'Communities' },
  { href: '#missions', label: 'Missions' },
  { href: '#learning', label: 'Learning' },
  { href: '#jobs', label: 'Jobs' },
  { href: '#about', label: 'About' },
];

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition ${scrolled ? 'border-b border-app bg-[#071024]/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-app">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
            <Rocket className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-heading text-lg font-semibold">Orbital Community</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-muted">Mission network</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-app">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link href="/sign-in" className="hidden text-sm font-medium text-muted transition hover:text-app md:block">
            Sign In
          </Link>
          <Link href="/sign-up" className="hidden rounded-full px-5 py-2.5 text-sm font-semibold button-primary md:block">
            Join Community
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-app bg-card text-app lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-app bg-[#071024]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-muted">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-app" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between rounded-2xl border border-app bg-card px-3 py-2">
              <span className="text-sm text-app">Theme</span>
              <ThemeToggle />
            </div>
            <Link href="/sign-in" className="rounded-xl px-3 py-2 text-app transition hover:bg-white/5" onClick={() => setOpen(false)}>
              Sign In
            </Link>
            <Link href="/sign-up" className="rounded-xl px-3 py-3 text-center font-semibold button-primary" onClick={() => setOpen(false)}>
              Join Community
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

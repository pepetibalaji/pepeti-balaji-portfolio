import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Command, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { motion } from 'motion/react';
import { profile } from '../data';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'lab', label: 'Lab' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({
  dark,
  onTheme,
  onCommand,
}: {
  dark: boolean;
  onTheme: () => void;
  onCommand: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-18% 0px -52% 0px' },
    );
    for (const link of links) {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target as Element).closest('.site-header')) setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      window.removeEventListener('resize', resize);
    };
  }, [open]);
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-2xl">
      <div className="shell flex h-20 items-center justify-between gap-3 lg:h-24">
        <a
          href="#"
          aria-label="Pepeti Balaji home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-accent font-display text-[29px] leading-none font-extrabold tracking-[-.08em] text-accent-ink transition-transform group-hover:-rotate-6">
            b.
          </span>
          <span className="text-sm font-semibold tracking-tight sm:block md:hidden lg:block">
            Pepeti Balaji
            <span className="mt-0.5 block font-mono text-[9px] font-normal tracking-[.12em] text-muted">
              ENGINEERING PORTFOLIO
            </span>
          </span>
        </a>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={
            (open ? 'flex' : 'hidden') +
            ' absolute top-full right-0 left-0 flex-col gap-1 border-b border-line bg-canvas px-5 py-5 md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 lg:gap-2'
          }
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={'#' + link.id}
              onClick={() => setOpen(false)}
              aria-current={active === link.id ? 'location' : undefined}
              className={
                'relative rounded-full px-4 py-3 text-[13px] transition-colors hover:text-fg md:px-3 md:py-2 ' +
                (active === link.id ? 'text-fg' : 'text-muted')
              }
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-highlight"
                  className="absolute inset-0 -z-10 rounded-full bg-panel"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              {link.label}
              {link.id === 'lab' && (
                <span className="ml-1.5 inline-block size-1 rounded-full bg-accent align-middle" />
              )}
            </a>
          ))}
          <a
            href={profile.resume}
            download
            className="mt-2 flex items-center justify-between border-t border-line px-4 pt-5 text-sm md:hidden"
          >
            Download resume
            <ArrowDown size={16} />
          </a>
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onCommand}
            aria-label="Open command menu"
            className="hidden h-9 items-center gap-2 rounded-lg border border-line px-2.5 text-muted transition-colors hover:text-accent sm:flex"
          >
            <Search size={14} />
            <span className="hidden items-center font-mono text-[10px] lg:flex">
              <Command size={10} /> K
            </span>
          </button>
          <button
            onClick={onTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-panel hover:text-fg"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="#contact"
            className="ml-2 hidden items-center gap-5 rounded-full border border-line px-5 py-2.5 text-xs font-semibold transition-colors hover:border-accent hover:text-accent xl:flex"
          >
            Let's talk
            <ArrowUpRight size={15} />
          </a>
          <button
            ref={toggle}
            aria-controls="main-navigation"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-full hover:bg-panel md:hidden"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Download,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MoveUpRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { profile, type Project } from './data';
import Navigation from './components/Navigation';
import HeroScene from './components/HeroScene';
import { ProjectDialog, Projects } from './components/Projects';
import Expertise from './components/Expertise';
import QualityLab from './components/QualityLab';
import About from './components/About';
import CommandMenu from './components/CommandMenu';
import { CountUp, PrimaryLink, Reveal, SectionHeading } from './components/ui';

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('balaji-v2-theme') !== 'light';
    } catch {
      return true;
    }
  });
  const [project, setProject] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 35, restDelta: 0.001 });
  const reduce = useReducedMotion();
  const closeProject = useCallback(() => setProject(null), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#090c0d' : '#f3f5ee');
    try {
      localStorage.setItem('balaji-v2-theme', dark ? 'dark' : 'light');
    } catch {
      /* Optional preference storage. */
    }
  }, [dark]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!project) setCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
      clearTimeout(copyTimer.current);
    };
  }, [project]);
  useEffect(() => {
    const target = window.location.hash.slice(1);
    if (target)
      requestAnimationFrame(() =>
        document.getElementById(target)?.scrollIntoView({ behavior: 'instant' }),
      );
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState('idle'), 3500);
  }

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 left-4 z-[100] -translate-y-24 rounded-lg bg-accent px-5 py-3 text-sm text-accent-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <Navigation
        dark={dark}
        onTheme={() => setDark(!dark)}
        onCommand={() => setCommandOpen(true)}
      />
      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="hero-halo relative overflow-hidden border-b border-line/60"
        >
          <div className="shell relative grid items-center gap-12 pt-12 pb-9 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pt-16 xl:gap-20">
            <div className="relative z-10">
              <Reveal>
                <div className="mb-8 flex w-fit flex-wrap items-center gap-3 rounded-full border border-line bg-surface/70 px-3.5 py-2.5 font-mono text-[9px] tracking-[.12em] text-muted">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full rounded-full bg-accent opacity-30" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  SDET AT ORACLE<span className="text-line">/</span>BENGALURU, IN
                </div>
                <p className="mb-4 flex items-center gap-2 text-sm text-muted">
                  <span className="text-accent">↳</span> Hey, I'm{' '}
                  <span className="font-semibold text-fg">Pepeti Balaji.</span>
                </p>
                <h1
                  id="hero-title"
                  className="text-[clamp(3.05rem,6vw,5.4rem)] leading-[1.05] font-semibold tracking-[-.065em]"
                >
                  Built to work.
                  <br />
                  <span className="relative whitespace-nowrap text-accent">
                    Tested to last.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 520 14"
                      className="absolute -bottom-3 left-0 w-full overflow-visible"
                      fill="none"
                    >
                      <motion.path
                        d="M2 9C148 2 356 1 517 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </svg>
                  </span>
                </h1>
                <p className="mt-9 max-w-[410px] text-[15px] leading-8 text-muted">
                  I engineer resilient backend systems and the automation that puts them to the
                  test. From the first request to the last edge case.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-7">
                  <PrimaryLink href="#work">Explore my work</PrimaryLink>
                  <a
                    href={profile.resume}
                    download
                    className="group flex items-center gap-3 rounded-full py-4 text-[12px] font-medium text-muted transition-colors hover:text-fg"
                  >
                    Download résumé
                    <Download
                      size={16}
                      className="transition-transform group-hover:translate-y-0.5"
                    />
                  </a>
                </div>
                <div className="mt-10 flex items-center gap-4 border-t border-line/70 pt-6">
                  <span className="eyebrow mr-1 text-muted">FIND ME ON</span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Pepeti Balaji on GitHub"
                    className="rounded-full p-2 text-muted transition-colors hover:bg-panel hover:text-accent"
                  >
                    <Github size={19} />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Pepeti Balaji on LinkedIn"
                    className="rounded-full p-2 text-muted transition-colors hover:bg-panel hover:text-accent"
                  >
                    <Linkedin size={19} />
                  </a>
                  <a
                    href={'mailto:' + profile.email}
                    aria-label="Email Pepeti Balaji"
                    className="rounded-full p-2 text-muted transition-colors hover:bg-panel hover:text-accent"
                  >
                    <Mail size={19} />
                  </a>
                  <span className="ml-auto hidden font-mono text-[9px] text-muted sm:block">
                    CODE. QUESTION. REPEAT.
                  </span>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="mx-auto w-full max-w-[570px] min-w-0">
              <HeroScene />
            </Reveal>
            <div className="col-span-full mt-0 flex items-center justify-between border-t border-line/60 pt-7 font-mono text-[9px] tracking-wider text-muted">
              <a href="#work" className="flex items-center gap-2.5 hover:text-accent">
                <ArrowDown size={13} />
                SCROLL TO EXPLORE
              </a>
              <span className="hidden sm:block">THOUGHTFUL ENGINEERING, FROM END TO END.</span>
              <span className="text-accent">PORTFOLIO / 2026</span>
            </div>
          </div>
        </section>

        <section
          aria-label="Engineering impact"
          className="shell grid grid-cols-2 gap-x-5 gap-y-8 border-b border-line py-10 lg:grid-cols-4 lg:gap-0 lg:py-12"
        >
          <Reveal className="lg:border-r lg:border-line lg:pr-8">
            <div className="eyebrow mb-5 flex items-center gap-2 text-muted">
              <ShieldCheck size={13} />
              QUALITY AT SCALE
            </div>
            <p className="font-display text-5xl font-medium tracking-[-.06em]">
              <CountUp value={500} suffix="+" />
            </p>
            <p className="mt-3 text-[11px] leading-5 text-muted">
              Automated UI & learning workflows
            </p>
          </Reveal>
          <Reveal delay={0.08} className="border-l border-line pl-5 lg:border-l-0 lg:px-8">
            <div className="eyebrow mb-5 flex items-center gap-2 text-muted">
              <Terminal size={13} />
              SMARTER DELIVERY
            </div>
            <p className="font-display text-5xl font-medium tracking-[-.06em]">
              <CountUp value={45} suffix="%" />
            </p>
            <p className="mt-3 text-[11px] leading-5 text-muted">
              Higher automation throughput with AI
            </p>
          </Reveal>
          <Reveal delay={0.16} className="lg:border-l lg:border-line lg:px-8">
            <div className="eyebrow mb-5 flex items-center gap-2 text-muted">
              <Code2 size={13} />
              CURRENT CHAPTER
            </div>
            <p className="font-display text-[35px] leading-[48px] font-medium tracking-[-.04em]">
              Oracle<span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-[11px] leading-5 text-muted">
              QA Engineer · November 2024 — Present
            </p>
          </Reveal>
          <Reveal delay={0.24} className="border-l border-line pl-5 lg:pl-8">
            <div className="eyebrow mb-5 flex items-center gap-2 text-muted">
              <GitBranch size={13} />
              BEYOND THE DAY JOB
            </div>
            <p className="font-display text-5xl font-medium tracking-[-.06em]">
              02<span className="text-accent">↗</span>
            </p>
            <p className="mt-3 text-[11px] leading-5 text-muted">
              Personal projects. Open source code.
            </p>
          </Reveal>
        </section>

        <Projects onSelect={setProject} />
        <Expertise />
        <section id="lab" className="shell py-20 lg:py-28">
          <SectionHeading
            number="03"
            label="A little proof of work"
            title="Don't just read about it."
            accent="Put it to the test."
          >
            <p>
              Explore boundary validation and idempotency with sample checkout events. Pick a
              scenario. See what the checks catch.
            </p>
          </SectionHeading>
          <Reveal>
            <QualityLab />
          </Reveal>
          <div className="mt-6 flex items-start gap-3 text-[11px] leading-6 text-muted">
            <ShieldCheck size={15} className="mt-1 text-accent" />
            <p>
              The best tests explain the behavior. An invalid request should be rejected; a
              duplicate event should never create a second order.
            </p>
          </div>
        </section>
        <div className="border-y border-line bg-panel/25">
          <div className="shell flex flex-wrap items-center justify-between gap-8 py-9">
            <p className="max-w-xl font-display text-2xl leading-normal font-medium tracking-[-.03em]">
              “Building the system makes me a better tester.
              <br className="hidden sm:block" /> Testing it makes me a better{' '}
              <span className="text-accent">engineer.</span>”
            </p>
            <span className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-4xl text-accent">✳</span> MY APPROACH, ALWAYS.
            </span>
          </div>
        </div>
        <About />

        <section id="contact" className="relative overflow-hidden border-y border-line bg-surface">
          <div className="pointer-events-none absolute -right-40 -bottom-64 size-[700px] rounded-full bg-accent/5 blur-[100px]" />
          <div className="shell relative grid gap-12 py-20 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20 lg:py-24">
            <Reveal>
              <div className="eyebrow mb-7 flex items-center gap-3 text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                NEXT UP / A CONVERSATION
              </div>
              <h2 className="text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[1.07] font-semibold tracking-[-.06em]">
                Your next hard
                <br />
                problem.<span className="text-accent"> Let's talk.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-muted">
                A role, a collaboration, or a system worth building.
                <br className="hidden sm:block" /> Good work starts with a conversation.
              </p>
              <div className="mt-8 flex items-center gap-3 sm:gap-5">
                <a
                  href={'mailto:' + profile.email}
                  className="group flex min-w-0 items-center gap-3 border-b border-line pb-3 font-display text-[clamp(.9rem,3.8vw,1.35rem)] font-medium tracking-tight transition-colors hover:border-accent hover:text-accent"
                >
                  {profile.email}
                  <MoveUpRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
                <button
                  onClick={copyEmail}
                  aria-label={copyState === 'copied' ? 'Email copied' : 'Copy email address'}
                  className="mb-3 grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted hover:border-accent hover:text-accent"
                >
                  {copyState === 'copied' ? <Check size={17} /> : <Copy size={16} />}
                </button>
              </div>
              <p role="status" className="mt-1 min-h-5 text-[11px] text-accent">
                {copyState === 'copied'
                  ? 'Email address copied.'
                  : copyState === 'failed'
                    ? 'Please select and copy the email address above.'
                    : ''}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-canvas/40 px-6 py-2">
                {[
                  {
                    icon: Linkedin,
                    text: 'Connect on LinkedIn',
                    href: profile.linkedin,
                    external: true,
                  },
                  { icon: Github, text: 'Explore my GitHub', href: profile.github, external: true },
                  {
                    icon: Download,
                    text: 'Download my resume',
                    href: profile.resume,
                    download: true,
                  },
                  { icon: Mail, text: 'Drop me a message', href: 'mailto:' + profile.email },
                ].map(({ icon: Icon, text, href, external, download }) => (
                  <a
                    key={text}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    download={download || undefined}
                    className="group flex items-center gap-4 border-b border-line py-5 text-[13px] text-muted transition-colors last:border-b-0 hover:text-accent"
                  >
                    <Icon size={18} />
                    <span className="flex-1">{text}</span>
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between font-mono text-[9px] text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  BENGALURU, INDIA
                </span>
                <span>ALWAYS CURIOUS.</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="shell flex flex-wrap items-center justify-between gap-5 py-8">
        <a href="#" aria-label="Back to top" className="flex items-center gap-3">
          <span className="font-display text-3xl font-bold tracking-[-.08em] text-accent">pb.</span>
          <span className="text-[11px] text-muted">
            Built with intent.
            <br />
            Tested with care.
          </span>
        </a>
        <p className="order-3 w-full font-mono text-[9px] text-muted sm:order-none sm:w-auto">
          © {new Date().getFullYear()} PEPETI BALAJI
        </p>
        <button
          onClick={() => setCommandOpen(true)}
          className="flex items-center gap-3 font-mono text-[9px] text-muted hover:text-accent"
        >
          TAKE A SHORTCUT<span className="rounded border border-line px-2 py-1">⌘ / CTRL K</span>
        </button>
      </footer>
      <ProjectDialog project={project} onClose={closeProject} />
      <CommandMenu open={commandOpen} onClose={closeCommand} onProject={setProject} />
    </MotionConfig>
  );
}

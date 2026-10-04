import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  GitBranch,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { skillGroups } from '../data';
import { Reveal, SectionHeading } from './ui';

const icons = [ShieldCheck, Server, GitBranch, Sparkles];
const approaches = [
  ['Follow the user journey.', 'Challenge the boundaries.', 'Trace failures to the source.'],
  ['Define clear contracts.', 'Make state changes deliberate.', 'Design for the unhappy path.'],
  ['Automate the quality gates.', 'Make signals actionable.', 'Keep every release repeatable.'],
  ['Accelerate the first draft.', 'Review the assumptions.', 'Own the final result.'],
];

export default function Expertise() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const Icon = icons[active];
  return (
    <section id="expertise" className="border-y border-line/60 bg-surface/40">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          number="02"
          label="Tools with intention"
          title="One mindset."
          accent="A full-stack toolkit."
        >
          <p>
            I go beyond the interface to understand the services, data, and decisions underneath it.
          </p>
        </SectionHeading>
        <div className="grid gap-7 lg:grid-cols-[.8fr_1.6fr]">
          <Reveal>
            <div
              role="tablist"
              aria-label="Expertise areas"
              aria-orientation="vertical"
              className="space-y-2"
            >
              {skillGroups.map((group, index) => {
                const TabIcon = icons[index];
                return (
                  <button
                    key={group.title}
                    id={'skill-tab-' + index}
                    ref={(el) => {
                      refs.current[index] = el;
                    }}
                    role="tab"
                    aria-controls="skill-panel"
                    aria-selected={active === index}
                    tabIndex={active === index ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => {
                      let next = index;
                      if (event.key === 'ArrowDown') next = (index + 1) % 4;
                      else if (event.key === 'ArrowUp') next = (index + 3) % 4;
                      else if (event.key === 'Home') next = 0;
                      else if (event.key === 'End') next = 3;
                      else return;
                      event.preventDefault();
                      setActive(next);
                      refs.current[next]?.focus();
                    }}
                    className={
                      'group relative flex w-full items-center gap-4 rounded-xl border px-5 py-5 text-left transition-colors ' +
                      (active === index
                        ? 'border-accent/40 bg-accent-soft text-fg'
                        : 'border-transparent text-muted hover:bg-panel/50 hover:text-fg')
                    }
                  >
                    <span
                      className={
                        'grid size-10 place-items-center rounded-lg border ' +
                        (active === index
                          ? 'border-accent/30 bg-accent/10 text-accent'
                          : 'border-line bg-panel/40')
                      }
                    >
                      <TabIcon size={19} />
                    </span>
                    <span className="flex-1 text-[13px] font-medium">{group.title}</span>
                    <ChevronRight
                      size={16}
                      className={active === index ? 'text-accent' : 'opacity-40'}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-8 hidden items-start gap-3 rounded-xl border border-dashed border-line p-5 text-[11px] leading-6 text-muted lg:flex">
              <Code2 size={18} className="mt-1 text-accent" />
              <p>Tools change. The curiosity to understand a system stays.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              role="tabpanel"
              id="skill-panel"
              aria-labelledby={'skill-tab-' + active}
              tabIndex={0}
              className="h-full min-h-[425px] overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                  transition={{ duration: reduce ? 0 : 0.16 }}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Icon size={27} />
                    </span>
                    <span className="eyebrow text-muted">FOCUS / 0{active + 1}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-.04em] sm:text-3xl">
                    {skillGroups[active].title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-7 text-muted">
                    {skillGroups[active].description}
                  </p>
                  <div className="mt-6 grid gap-3 border-y border-line py-6 sm:grid-cols-3">
                    {approaches[active].map((step, index) => (
                      <div key={step}>
                        <span className="font-mono text-[9px] text-accent">0{index + 1}</span>
                        <p className="mt-2 text-xs leading-6 text-muted">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skillGroups[active].skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-2 rounded-lg border border-line bg-panel/40 px-3 py-2 font-mono text-[10px] text-fg"
                      >
                        <span className="size-1 rounded-full bg-accent/70" />
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between font-mono text-[9px] text-muted">
                    <span>LEARN → BUILD → QUESTION → IMPROVE</span>
                    <ArrowUpRight size={14} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

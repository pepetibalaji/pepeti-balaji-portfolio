import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Database,
  GitBranch,
  Github,
  Layers3,
  LockKeyhole,
  Network,
  Terminal,
  Workflow,
  X,
} from 'lucide-react';
import { profile, projects, type Project } from '../data';
import { Reveal, SectionHeading } from './ui';

function CommercePreview() {
  return (
    <div
      aria-hidden="true"
      className="project-grid relative h-[320px] overflow-hidden bg-[#101812] p-5 sm:h-[365px] sm:p-7"
    >
      <div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b6f378]/8 blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-[#344633] pb-4 font-mono text-[9px] text-[#9aac93]">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#c6f36b]" /> commerce / system.map
        </span>
        <Network size={15} />
      </div>
      <div className="relative mx-auto mt-5 max-w-[440px]">
        <div className="mx-auto flex w-44 items-center justify-between rounded-lg border border-[#587047] bg-[#293820] px-4 py-3 text-[11px] text-[#e4f7d3]">
          <Layers3 size={16} />
          <span>API GATEWAY</span>
          <span className="size-1 rounded-full bg-[#c6f36b]" />
        </div>
        <svg viewBox="0 0 440 45" className="h-10 w-full" fill="none">
          <path d="M220 0V18H68V45M220 18V45M220 18H372V45" stroke="#657955" />
          <path
            d="M220 0V18H68V45M220 18V45M220 18H372V45"
            className="flow-line"
            stroke="#c6f36b"
          />
        </svg>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: BookOpen, name: 'CATALOG', sub: 'Product service' },
            { icon: GitBranch, name: 'ORDERS', sub: 'Order service' },
            { icon: Database, name: 'INVENTORY', sub: 'Stock & reserves' },
          ].map(({ icon: Icon, name, sub }) => (
            <div
              key={name}
              className="rounded-lg border border-[#394b33] bg-[#151f16] px-1 py-4 text-center shadow-xl"
            >
              <Icon size={20} className="mx-auto mb-2.5 text-[#c6f36b]" />
              <div className="font-mono text-[8px] tracking-wider text-[#e2e9dd] sm:text-[10px]">
                {name}
              </div>
              <div className="mt-1 text-[7px] text-[#a8b39e] sm:text-[9px]">{sub}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 440 33" className="h-7 w-full" fill="none">
          <path d="M68 0V16H372V0M220 0V33" stroke="#657955" />
          <path d="M68 0V16H372V0M220 0V33" className="flow-line" stroke="#c6f36b" />
        </svg>
        <div className="flex items-center justify-between rounded-lg border border-[#617d40] bg-[#c6f36b]/10 px-4 py-3 text-[10px] text-[#d8edb9]">
          <Workflow size={17} />
          <span className="font-mono">KAFKA EVENT STREAM</span>
          <span className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <i
                key={i}
                className="h-2 w-1 rounded-full bg-[#c6f36b]"
                style={{ opacity: 1 - i * 0.18 }}
              />
            ))}
          </span>
        </div>
      </div>
      <div className="absolute right-7 bottom-4 left-7 hidden justify-between font-mono text-[8px] tracking-wider text-[#a5b09c] sm:flex">
        <span>REST AT THE EDGE</span>
        <span>EVENTS AT THE CORE ↗</span>
      </div>
    </div>
  );
}

function LibraryPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[320px] overflow-hidden bg-[#181522] px-5 pt-6 sm:h-[365px] sm:px-7"
    >
      <div className="absolute -top-20 -right-20 size-72 rounded-full bg-[#9682df]/10 blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-[#40344f] pb-4 font-mono text-[9px] text-[#b4a4c8]">
        <span className="flex items-center gap-2">
          <Terminal size={13} /> library / lending.service
        </span>
        <span>ILLUSTRATIVE FLOW</span>
      </div>
      <div className="relative mx-auto mt-4 max-w-[390px] -rotate-3 rounded-xl border border-[#5b4970] bg-[#221c2d] shadow-[0_24px_50px_#0005]">
        <div className="flex items-center gap-1.5 border-b border-[#40344f] px-5 py-3">
          <i className="size-1.5 rounded-full bg-[#b08bc2]" />
          <i className="size-1.5 rounded-full bg-[#776183]" />
          <i className="size-1.5 rounded-full bg-[#55465c]" />
          <span className="ml-auto font-mono text-[8px] text-[#bfb2cd]">
            LendingController.java
          </span>
        </div>
        <div className="space-y-2 px-5 py-4 font-mono text-[10px] leading-relaxed sm:text-xs">
          <p>
            <span className="text-[#c8a8f0]">@PostMapping</span>
            <span className="text-[#e9e0f3]">("/loans")</span>
          </p>
          <p className="text-[#c7b6d9]">
            <span className="text-[#b9d496]">Loan</span> borrow(Book book) {'{'}
          </p>
          <p className="pl-4 text-[#e4d8ee]">verifyAccess(member);</p>
          <p className="pl-4 text-[#e4d8ee]">validateState(book);</p>
          <p className="pl-4 text-[#e4d8ee]">
            <span className="text-[#c8a8f0]">return</span> lending.create(book);
          </p>
          <p className="text-[#c7b6d9]">{'}'}</p>
        </div>
      </div>
      <div className="relative mx-auto -mt-1 flex w-[90%] rotate-2 items-center justify-between rounded-lg border border-[#746085] bg-[#392e47] px-4 py-3 text-[#e5d9f0] shadow-2xl">
        <span className="flex items-center gap-2 font-mono text-[9px]">
          <LockKeyhole size={14} className="text-[#d6b4ff]" /> JWT AUTHORIZATION
        </span>
        <Check size={15} className="text-[#d3e9af]" />
      </div>
    </div>
  );
}

export function Projects({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <section id="work" className="shell py-20 lg:py-28">
      <SectionHeading
        number="01"
        label="Selected engineering"
        title="Less talk."
        accent="More shipped code."
      >
        <p>
          Real projects. Real engineering decisions.
          <br />A look at what I build and how I think.
        </p>
      </SectionHeading>
      <div className="grid gap-6 lg:grid-cols-[1.12fr_1fr]">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.12}>
            <motion.article
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group h-full overflow-hidden rounded-[20px] border border-line bg-surface"
            >
              <button
                onClick={() => onSelect(project)}
                aria-label={'Read about ' + project.title}
                className="relative block w-full text-left focus-visible:-outline-offset-4"
              >
                {project.kind === 'commerce' ? <CommercePreview /> : <LibraryPreview />}
                <span className="absolute right-5 bottom-5 grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:border-[#c6f36b] group-hover:bg-[#c6f36b] group-hover:text-[#18230c]">
                  <ArrowUpRight size={20} />
                </span>
              </button>
              <div className="p-6 sm:p-8">
                <div className="eyebrow mb-4 flex items-center justify-between text-muted">
                  <span>{index === 0 ? 'FLAGSHIP BUILD' : 'BACKEND ENGINEERING'}</span>
                  <span className="text-accent">/{project.number}</span>
                </div>
                <h3 className="text-[23px] leading-tight font-semibold tracking-[-.04em] sm:text-[26px]">
                  <button className="text-left" onClick={() => onSelect(project)}>
                    {project.title}
                  </button>
                </h3>
                <p className="mt-4 text-[13px] leading-7 text-muted">{project.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line bg-panel/30 px-2.5 py-1.5 font-mono text-[9px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                  <button
                    onClick={() => onSelect(project)}
                    className="flex items-center gap-3 text-xs font-medium transition-colors hover:text-accent"
                  >
                    Explore the build
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={'View ' + project.title + ' on GitHub'}
                    className="flex items-center gap-2 rounded-lg p-2 text-muted hover:text-accent"
                  >
                    <Github size={18} />
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
      <a
        href={profile.github + '?tab=repositories'}
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-8 flex w-fit items-center gap-3 text-xs text-muted transition-colors hover:text-accent"
      >
        <Github size={15} /> The rest of the story is in the commits.
        <ArrowUpRight size={14} />
      </a>
    </section>
  );
}

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const current = dialog.current;
    current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      current?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [project]);
  return (
    <dialog
      ref={dialog}
      aria-labelledby="project-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="project-dialog fixed inset-0 m-auto w-[calc(100%-28px)] max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-0 shadow-2xl scrollbar-thin"
    >
      {project && (
        <div className="relative p-6 sm:p-10">
          <button
            onClick={onClose}
            autoFocus
            aria-label="Close project details"
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full text-muted hover:bg-panel hover:text-fg"
          >
            <X size={20} />
          </button>
          <div className="eyebrow pr-10 text-accent">
            PROJECT {project.number} / ENGINEERING NOTES
          </div>
          <h2
            id="project-title"
            className="mt-6 text-3xl leading-tight font-semibold tracking-[-.04em] sm:text-4xl"
          >
            {project.title}
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-line px-2.5 py-1.5 font-mono text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-8 text-base font-semibold">What makes it dependable</h3>
          <ul className="mt-5 space-y-4">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-[13px] leading-7 text-muted">
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-accent" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex items-start gap-3 rounded-xl border border-line bg-panel p-5">
            <Workflow size={19} className="mt-1 text-accent" />
            <p className="font-mono text-[11px] leading-6 text-muted">{project.architecture}</p>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-4 rounded-full bg-accent px-6 py-3.5 text-xs font-bold text-accent-ink"
          >
            <Github size={17} />
            Explore the source
            <ArrowUpRight size={17} />
          </a>
          <p className="mt-4 text-[10px] text-muted">
            Personal project. Implementation details and source code on GitHub.
          </p>
        </div>
      )}
    </dialog>
  );
}

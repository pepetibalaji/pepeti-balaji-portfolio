import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  GitBranch,
  Github,
  Network,
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
          <span className="size-1.5 rounded-full bg-[#c6f36b]" /> pepekart / checkout.flow
        </span>
        <Network size={15} />
      </div>
      <svg
        viewBox="0 0 440 250"
        className="relative mx-auto mt-2 h-[235px] w-full max-w-[480px] sm:h-[270px]"
        fill="none"
      >
        <defs>
          <marker
            id="commerce-arrow"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0L6 3L0 6" fill="#a7c58a" />
          </marker>
        </defs>
        <g stroke="#6f8858" strokeWidth="1.2" markerEnd="url(#commerce-arrow)">
          <path d="M172 43H268" />
          <path d="M84 72V116" markerStart="url(#commerce-arrow)" />
          <path d="M84 150V194" markerStart="url(#commerce-arrow)" />
          <path d="M355 150V194" />
        </g>
        <path d="M84 72V116M84 150V194M355 150V194" className="flow-line" stroke="#c6f36b" />
        <g fontFamily="monospace" textAnchor="middle">
          <rect x="4" y="14" width="168" height="58" rx="9" fill="#24331d" stroke="#6a884b" />
          <text x="88" y="40" fill="#e4f7d3" fontSize="12">
            ORDER SERVICE
          </text>
          <text x="88" y="58" fill="#a9be99" fontSize="9">
            Idempotent checkout
          </text>
          <text x="220" y="32" fill="#c6f36b" fontSize="10">
            gRPC
          </text>
          <rect x="268" y="14" width="168" height="58" rx="9" fill="#151f16" stroke="#485d3e" />
          <text x="352" y="40" fill="#e4f7d3" fontSize="12">
            INVENTORY
          </text>
          <text x="352" y="58" fill="#a9be99" fontSize="9">
            Reserve / release
          </text>
          <text x="220" y="98" fill="#a9be99" fontSize="9">
            order-created / payment outcomes
          </text>
          <rect
            x="4"
            y="116"
            width="432"
            height="34"
            rx="7"
            fill="#c6f36b"
            fillOpacity=".09"
            stroke="#617d40"
          />
          <text x="220" y="137" fill="#d8edb9" fontSize="11" letterSpacing="2">
            KAFKA EVENT BUS
          </text>
          <text x="225" y="177" fill="#a9be99" fontSize="9">
            Asynchronous delivery
          </text>
          <rect x="4" y="194" width="168" height="52" rx="9" fill="#151f16" stroke="#485d3e" />
          <text x="88" y="217" fill="#e4f7d3" fontSize="11">
            PAYMENT SERVICE
          </text>
          <text x="88" y="234" fill="#a9be99" fontSize="9">
            Checkout / refunds
          </text>
          <rect x="268" y="194" width="168" height="52" rx="9" fill="#151f16" stroke="#485d3e" />
          <text x="352" y="217" fill="#e4f7d3" fontSize="11">
            NOTIFICATIONS
          </text>
          <text x="352" y="234" fill="#a9be99" fontSize="9">
            Persist / retry / send
          </text>
        </g>
      </svg>
    </div>
  );
}

function LibraryPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[320px] overflow-hidden bg-[#181522] px-5 pt-5 sm:h-[365px] sm:px-7 sm:pt-7"
    >
      <div className="absolute -top-20 -right-20 size-72 rounded-full bg-[#9682df]/10 blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-[#40344f] pb-4 font-mono text-[9px] text-[#b4a4c8]">
        <span className="flex items-center gap-2">
          <BookOpen size={13} /> library / borrow.flow
        </span>
        <GitBranch size={15} />
      </div>
      <div className="relative mx-auto mt-5 max-w-[390px] -rotate-2 rounded-xl border border-[#5b4970] bg-[#221c2d] shadow-[0_24px_50px_#0005]">
        <div className="flex items-center gap-3 border-b border-[#40344f] px-4 py-3 font-mono text-[10px]">
          <span className="rounded bg-[#cfb2f3]/15 px-2 py-1 text-[#d7b8fb]">POST</span>
          <span className="text-[#eee3f8]">/borrow</span>
          <span className="ml-auto text-[8px] text-[#bfb2cd]">REST API</span>
        </div>
        <div className="space-y-3 px-4 py-4">
          {[
            ['01', 'Look up member', 'Auth via gateway · OpenFeign'],
            ['02', 'Check & decrement stock', 'Books via gateway · OpenFeign'],
            ['03', 'Save the loan', 'Borrow service · MySQL'],
          ].map(([step, name, detail]) => (
            <div key={step} className="flex items-center gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-md border border-[#564568] font-mono text-[9px] text-[#d7b8fb]">
                {step}
              </span>
              <div>
                <p className="text-[11px] text-[#ede3f5]">{name}</p>
                <p className="mt-0.5 font-mono text-[8px] text-[#bfb2cd]">{detail}</p>
              </div>
              <Check size={13} className="ml-auto text-[#c5d6a8]" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto -mt-1 flex w-[90%] rotate-2 items-center justify-between rounded-lg border border-[#746085] bg-[#392e47] px-4 py-3 text-[#e5d9f0] shadow-2xl">
        <span className="font-mono text-[9px]">BORROWED</span>
        <span className="font-mono text-[9px] text-[#d6b4ff]">DUE IN 14 DAYS</span>
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
                <span className="absolute right-5 bottom-5 hidden size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:border-[#c6f36b] group-hover:bg-[#c6f36b] group-hover:text-[#18230c] sm:grid">
                  <ArrowUpRight size={20} />
                </span>
              </button>
              <div className="p-6 sm:p-8">
                <div className="eyebrow mb-4 flex items-center justify-between text-muted">
                  <span>{project.category}</span>
                  <span className="text-accent">/{project.number}</span>
                </div>
                <h3 className="text-[23px] leading-tight font-semibold tracking-[-.04em] sm:text-[26px]">
                  <button className="text-left text-fg" onClick={() => onSelect(project)}>
                    {project.title}
                  </button>
                </h3>
                <p className="mt-4 text-[13px] leading-7 text-muted">{project.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {project.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2.5 text-xs leading-5 text-fg"
                    >
                      <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                      {capability}
                    </li>
                  ))}
                </ul>
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
                    className="flex items-center gap-3 text-xs font-medium text-fg transition-colors hover:text-accent"
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
          <h3 className="mt-8 text-base font-semibold">Inside the implementation</h3>
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
          <div className="mt-7 border-t border-line pt-6">
            <h3 className="eyebrow mb-3 text-muted">Explore the implementation</h3>
            <div className="grid gap-2">
              {project.sourceLinks.map((source) => (
                <a
                  key={source.path}
                  href={project.github + '/blob/' + project.revision + '/' + source.path}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line px-4 py-3 text-xs text-fg transition-colors hover:bg-panel hover:text-accent"
                >
                  <Code2 size={16} className="shrink-0 text-accent" />
                  <span className="min-w-0 flex-1">{source.label}</span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </a>
              ))}
            </div>
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

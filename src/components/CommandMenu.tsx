import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CornerDownLeft, Search, X } from 'lucide-react';
import { profile, projects, type Project } from '../data';

type CommandItem = { name: string; detail: string; href?: string; project?: Project };

export default function CommandMenu({
  open,
  onClose,
  onProject,
}: {
  open: boolean;
  onClose: () => void;
  onProject: (project: Project) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const items: CommandItem[] = useMemo(
    () => [
      { name: 'Selected work', detail: 'Jump to projects', href: '#work' },
      { name: 'Expertise', detail: 'Explore the toolkit', href: '#expertise' },
      { name: 'Quality lab', detail: 'Try the interactive test playground', href: '#lab' },
      { name: 'About & experience', detail: 'The story behind the code', href: '#about' },
      ...projects.map((project) => ({
        name: project.title,
        detail: 'Open project details',
        project,
      })),
      { name: 'Contact Balaji', detail: profile.email, href: '#contact' },
      { name: 'Download resume', detail: 'PDF document', href: profile.resume },
    ],
    [],
  );
  const results = items.filter((item) =>
    (item.name + ' ' + item.detail).toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    setQuery('');
    setSelected(0);
    dialog.current?.showModal();
    input.current?.focus();
    document.body.style.overflow = 'hidden';
    const current = dialog.current;
    return () => {
      current?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
  useEffect(() => {
    if (open)
      document
        .getElementById('command-item-' + selected)
        ?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [open, selected, query]);

  function choose(item: CommandItem) {
    onClose();
    if (item.project) {
      requestAnimationFrame(() => onProject(item.project!));
      return;
    }
    if (item.href?.startsWith('#')) {
      window.location.hash = item.href;
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = item.href!;
    anchor.download = '';
    anchor.click();
  }
  return (
    <dialog
      ref={dialog}
      aria-labelledby="command-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-x-0 top-[15dvh] m-auto w-[calc(100%-32px)] max-w-xl overflow-hidden rounded-2xl border border-line bg-surface p-0 shadow-2xl"
    >
      <div className="border-b border-line p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="command-title" className="eyebrow text-muted">
            GO ANYWHERE
          </h2>
          <button
            onClick={onClose}
            aria-label="Close command menu"
            className="grid size-8 place-items-center rounded-lg hover:bg-panel"
          >
            <X size={17} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Search size={20} className="text-accent" />
          <input
            ref={input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelected((value) => (results.length ? (value + 1) % results.length : 0));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelected((value) =>
                  results.length ? (value - 1 + results.length) % results.length : 0,
                );
              } else if (event.key === 'Enter' && results[selected]) {
                event.preventDefault();
                choose(results[selected]);
              }
            }}
            placeholder="Search projects, sections, and links…"
            aria-label="Search portfolio"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-results"
            aria-autocomplete="list"
            aria-activedescendant={results[selected] ? 'command-item-' + selected : undefined}
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-fg outline-none! placeholder:text-muted"
          />
        </div>
      </div>
      <div
        id="command-results"
        role="listbox"
        aria-label="Search results"
        className="max-h-[50dvh] overflow-y-auto p-2 scrollbar-thin"
      >
        {results.length ? (
          results.map((item, index) => (
            <div
              key={item.name}
              id={'command-item-' + index}
              role="option"
              aria-selected={index === selected}
              onMouseMove={() => setSelected(index)}
              onClick={() => choose(item)}
              className={
                'flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-3 ' +
                (index === selected ? 'bg-panel' : '')
              }
            >
              <div>
                <div className={'text-sm ' + (index === selected ? 'text-accent' : 'text-fg')}>
                  {item.name}
                </div>
                <div className="mt-1 text-xs text-muted">{item.detail}</div>
              </div>
              <ArrowUpRight size={16} className="text-muted" />
            </div>
          ))
        ) : (
          <p className="px-4 py-8 text-sm text-muted">
            No results. Try “projects”, “lab”, or “resume”.
          </p>
        )}
      </div>
      <div className="flex justify-between border-t border-line px-5 py-3 font-mono text-[10px] text-muted">
        <span>↑ ↓ to navigate</span>
        <span className="flex items-center gap-1.5">
          <CornerDownLeft size={12} /> to open · esc to close
        </span>
      </div>
    </dialog>
  );
}

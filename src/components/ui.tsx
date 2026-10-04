import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  accent,
  children,
}: {
  number: string;
  label: string;
  title: string;
  accent: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
      <div>
        <div className="eyebrow mb-5 flex items-center gap-4 text-muted">
          <span className="text-accent">{number} /</span>
          {label}
        </div>
        <h2 className="text-[clamp(2.1rem,4.3vw,3.5rem)] leading-[1.12] font-semibold tracking-[-.055em]">
          {title}
          <br />
          <span className="text-muted">{accent}</span>
        </h2>
      </div>
      {children && <div className="max-w-sm text-sm leading-7 text-muted">{children}</div>}
    </Reveal>
  );
}

export function PrimaryLink({
  children,
  href,
  download = false,
  className = '',
}: {
  children: ReactNode;
  href: string;
  download?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      className={
        'group inline-flex items-center justify-center gap-8 rounded-full bg-accent px-7 py-4 text-[13px] font-bold text-accent-ink transition-transform hover:-translate-y-1 ' +
        className
      }
    >
      {children}
      <ArrowUpRight
        size={18}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const display = useTransform(count, (v) => Math.round(v).toString());
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const animation = animate(count, value, { duration: 1.3, ease: 'easeOut' });
    return () => animation.stop();
  }, [inView, value, count, reduce]);
  return (
    <span ref={ref}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span aria-hidden="true" className="text-accent">
        {suffix}
      </span>
    </span>
  );
}

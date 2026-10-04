import { ArrowUpRight, BadgeCheck, GraduationCap, MapPin } from 'lucide-react';
import { certifications, education, experience, profile } from '../data';
import { Reveal, SectionHeading } from './ui';

export default function About() {
  return (
    <section id="about" className="shell py-20 lg:py-28">
      <SectionHeading
        number="04"
        label="The human in the loop"
        title="A builder's curiosity."
        accent="A tester's instinct."
      />
      <div className="grid gap-7 lg:grid-cols-[.9fr_1.3fr]">
        <Reveal>
          <div className="relative flex h-56 items-center overflow-hidden rounded-2xl border border-line bg-panel/40 p-8">
            <div className="dot-grid absolute inset-0 opacity-70" />
            <span
              aria-hidden="true"
              className="relative -mt-5 font-display text-[140px] leading-none font-extrabold tracking-[-.09em] text-accent"
            >
              pb.
            </span>
            <div className="relative ml-auto self-end text-right font-mono text-[9px] leading-5 tracking-wider text-muted">
              ALWAYS CURIOUS.
              <br />
              NEVER DONE.<span className="mt-5 block text-4xl text-accent">✳</span>
            </div>
            <span className="absolute top-5 right-5 size-2 rounded-full bg-accent" />
          </div>
          <h3 className="mt-7 text-2xl font-semibold tracking-[-.04em]">
            I care about what happens next.
          </h3>
          <p className="mt-4 text-[13px] leading-7 text-muted">
            The next click. The next request. The next unexpected failure. That's where I focus my
            work as a Software Development Engineer in Test.
          </p>
          <p className="mt-4 text-[13px] leading-7 text-muted">
            At Oracle, I build automation and investigate the behavior behind complex learning
            workflows. In my own projects, I explore Java, distributed systems, and the engineering
            that makes failure recoverable.
          </p>
          <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
            <span className="flex items-center gap-2 text-xs text-muted">
              <MapPin size={14} />
              {profile.location}
            </span>
            <a
              href={profile.resume}
              download
              className="flex items-center gap-2 text-xs font-medium text-accent"
            >
              My resume
              <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="eyebrow mb-7 flex items-center justify-between text-muted">
              <span>THE JOURNEY SO FAR</span>
              <span className="size-1.5 rounded-full bg-accent" />
            </div>
            {experience.map((job) => (
              <article key={job.company}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-display text-[25px] font-medium tracking-[.12em] text-fg">
                    ORACLE
                  </span>
                  <span className="rounded-full border border-line bg-panel/40 px-3 py-1.5 font-mono text-[9px] text-muted">
                    {job.period}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold leading-6">{job.title}</h3>
                <p className="mt-3 text-xs leading-7 text-muted">{job.summary}</p>
                <ul className="mt-5 space-y-3">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-xs leading-6 text-muted">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            <div className="mt-7 space-y-5 border-t border-line pt-7">
              {education.map((item) => (
                <article key={item.qualification} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-panel/30 text-muted">
                    <GraduationCap size={18} />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold">{item.qualification}</h3>
                    <p className="mt-1.5 text-[11px] leading-5 text-muted">{item.institution}</p>
                    <p className="mt-1 font-mono text-[9px] text-muted">{item.period}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent-soft p-4">
              <BadgeCheck size={24} className="text-accent" />
              <div>
                <div className="font-mono text-[8px] tracking-wider text-muted">
                  {certifications[0].issuer.toUpperCase()} CERTIFIED / {certifications[0].year}
                </div>
                <h3 className="mt-1 text-[11px] font-medium leading-5">
                  {certifications[0].title}
                </h3>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

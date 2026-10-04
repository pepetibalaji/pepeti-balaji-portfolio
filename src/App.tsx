import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Database,
  Download,
  GitBranch,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
  X,
} from 'lucide-react';
import { certifications, education, experience, profile, projects, skillGroups } from './data';

const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

function EngineeringVisual() {
  return (
    <div
      className="engineering-visual"
      role="img"
      aria-label="My engineering approach: build, verify, and deliver with confidence"
    >
      <div className="visual-topline">
        <span>
          <span className="status-dot" /> THE ENGINEERING MINDSET
        </span>
        <span>01—03</span>
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="system-node node-build">
        <div className="node-icon">
          <Braces size={22} />
        </div>
        <div>
          <small>01 / BUILD</small>
          <strong>Make it work.</strong>
        </div>
        <Code2 className="node-trailing" size={20} />
      </div>
      <div className="connector connector-one">
        <span />
      </div>
      <div className="system-node node-test">
        <div className="node-icon">
          <ShieldCheck size={23} />
        </div>
        <div>
          <small>02 / VERIFY</small>
          <strong>Make it reliable.</strong>
        </div>
        <CheckCircle2 className="node-trailing" size={20} />
      </div>
      <div className="connector connector-two">
        <span />
      </div>
      <div className="system-node node-ship">
        <div className="node-icon">
          <GitBranch size={22} />
        </div>
        <div>
          <small>03 / DELIVER</small>
          <strong>Ship with confidence.</strong>
        </div>
        <ArrowUpRight className="node-trailing" size={21} />
      </div>
      <div className="visual-bottomline">
        <span>Good code. Better confidence.</span>
        <span className="visual-asterisk">✳</span>
      </div>
      <div className="visual-caption">
        <span className="caption-dot" /> A developer's curiosity. A tester's instinct.
      </div>
    </div>
  );
}

function ProjectIllustration({ kind }: { kind: 'commerce' | 'library' }) {
  if (kind === 'commerce')
    return (
      <div className="project-art commerce-art" aria-hidden="true">
        <div className="art-caption">
          <span>EVENT-DRIVEN ARCHITECTURE</span>
          <Workflow size={16} />
        </div>
        <div className="commerce-flow">
          <div className="gateway-node">
            <Layers size={18} />
            <span>API Gateway</span>
            <span className="tiny-dot" />
          </div>
          <div className="flow-stem" />
          <div className="service-row">
            <span>
              <BookOpen size={17} />
              Catalog
            </span>
            <span>
              <CheckCheck size={17} />
              Orders
            </span>
            <span>
              <Database size={17} />
              Inventory
            </span>
          </div>
          <div className="event-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="event-bus">
            <Activity size={17} />
            <span>Kafka event stream</span>
            <span>→ → →</span>
          </div>
          <div className="flow-stem" />
          <div className="store-row">
            <span>PostgreSQL</span>
            <span>Redis</span>
            <span>MongoDB</span>
          </div>
        </div>
        <div className="art-footer">
          <span>JAVA 21 / SPRING BOOT</span>
          <span>REST + gRPC</span>
        </div>
      </div>
    );
  return (
    <div className="project-art library-art" aria-hidden="true">
      <div className="art-caption">
        <span>A SYSTEM FOR EVERY STORY</span>
        <BookOpen size={16} />
      </div>
      <div className="library-scene">
        <div className="book book-one">
          <span>DESIGN</span>
          <i>01</i>
        </div>
        <div className="book book-two">
          <span>SYSTEMS</span>
          <i>02</i>
        </div>
        <div className="book book-three">
          <span>BUILD</span>
          <i>03</i>
        </div>
        <div className="book book-four">
          <span>TEST</span>
          <i>04</i>
        </div>
        <div className="book-shadow" />
        <div className="library-ticket">
          <span>
            <ShieldCheck size={14} /> ACCESS VERIFIED
          </span>
          <div>
            <span>Catalog → Lending</span>
            <Check size={16} />
          </div>
          <small>JWT · Spring Boot · PostgreSQL</small>
        </div>
      </div>
      <div className="art-footer">
        <span>MODULAR MICROSERVICES</span>
        <span>Designed for clarity</span>
      </div>
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: (typeof projects)[number] | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [project]);
  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-inner">
          <button
            className="icon-button dialog-close"
            onClick={onClose}
            aria-label="Close project details"
            autoFocus
          >
            <X size={22} />
          </button>
          <span className="eyebrow">PROJECT {project.number} / ENGINEERING NOTES</span>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-summary">{project.summary}</p>
          <div className="tags">
            {project.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h3>The engineering behind it</h3>
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <CheckCircle2 size={19} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {project.architecture && (
            <div className="architecture-note">
              <Workflow size={21} />
              <p>{project.architecture}</p>
            </div>
          )}
          <a className="button button-dark" href={project.github} target="_blank" rel="noreferrer">
            <Github size={17} /> Explore the source <ArrowUpRight size={17} />
          </a>
          <p className="project-note">
            Personal project · Code and implementation details on GitHub.
          </p>
        </div>
      )}
    </dialog>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [activeSkill, setActiveSkill] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('balaji-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const menuButton = useRef<HTMLButtonElement>(null);
  const skillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const skillIcons = [ShieldCheck, Server, Workflow, Sparkles];
  const SkillIcon = skillIcons[activeSkill];
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', darkMode ? '#19211c' : '#f7f6f2');
    try {
      localStorage.setItem('balaji-theme', darkMode ? 'dark' : 'light');
    } catch {
      /* Theme works without storage. */
    }
  }, [darkMode]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -55% 0px' },
    );
    navigation.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      clearTimeout(copyTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.site-header')) setMenuOpen(false);
    };
    const closeOnWide = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', closeOutside);
    window.addEventListener('resize', closeOnWide);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', closeOutside);
      window.removeEventListener('resize', closeOnWide);
    };
  }, [menuOpen]);
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
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#" className="brand" aria-label="Pepeti Balaji home">
            <span className="brand-mark">
              pb<span>.</span>
            </span>
            <span className="brand-name">
              Pepeti Balaji<span>SDET & BACKEND ENGINEER</span>
            </span>
          </a>
          <nav
            id="main-navigation"
            className={menuOpen ? 'navigation is-open' : 'navigation'}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={'#' + item.id}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="mobile-resume" href={profile.resume} download>
              Download resume <Download size={16} />
            </a>
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a className="nav-resume" href={profile.resume} download>
              Resume <ArrowDown size={16} />
            </a>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="main-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="status-dot" /> SDET AT ORACLE{' '}
              <span className="eyebrow-divider">/</span> BUILDER AT HEART
            </div>
            <h1 id="hero-title">
              Engineering
              <br />
              <em>quality,</em>
              <br />
              end to end<span className="accent">.</span>
            </h1>
            <p className="hero-description">
              I'm Balaji. I build dependable backend systems and the automation that keeps them that
              way.
            </p>
            <div className="hero-buttons">
              <a className="button button-dark" href="#work">
                Explore my work <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#contact">
                Let's talk <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={14} /> Bengaluru, India
              </span>
              <span className="hero-meta-separator" />
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Pepeti Balaji on GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Pepeti Balaji on LinkedIn"
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>
          <EngineeringVisual />
          <a href="#work" className="scroll-cue">
            <ArrowDown size={14} /> A little further, a lot more detail
          </a>
        </section>
        <div className="stats-strip">
          <div className="container stats-inner">
            <div className="stats-intro">
              <span className="eyebrow">QUALITY IN PRACTICE</span>
              <p>
                Small details.
                <br />
                Meaningful impact.
              </p>
            </div>
            <div className="stat">
              <strong>
                500<span>+</span>
              </strong>
              <span>Automated UI & learning workflows</span>
            </div>
            <div className="stat">
              <strong>
                45<span>%</span>
              </strong>
              <span>Higher automation throughput with AI</span>
            </div>
            <div className="stat stat-current">
              <span className="oracle-word">ORACLE</span>
              <span>QA Engineer · Since November 2024</span>
            </div>
          </div>
        </div>
        <section id="work" className="section container work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span>01</span> / SELECTED WORK
              </span>
              <h2 id="work-title">
                Built with purpose.
                <br />
                <span className="muted-heading">Tested with intent.</span>
              </h2>
            </div>
            <p>
              A closer look at the systems I build,
              <br className="desktop-break" /> and the decisions that make them dependable.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <button
                  className="project-preview"
                  onClick={() => setSelectedProject(project)}
                  aria-label={'Read about ' + project.title}
                >
                  <ProjectIllustration kind={project.kind} />
                  <span className="project-preview-link">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
                <div className="project-body">
                  <div className="project-category">
                    <span>{project.category}</span>
                    <span>/{project.number}</span>
                  </div>
                  <h3>
                    <button onClick={() => setSelectedProject(project)}>{project.title}</button>
                  </h3>
                  <p>{project.summary}</p>
                  <div className="tags">
                    {project.stack.slice(0, 5).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <button className="text-link" onClick={() => setSelectedProject(project)}>
                      Behind the build <ArrowRight size={17} />
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={'View ' + project.title + ' on GitHub'}
                    >
                      <Github size={19} />
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a
            className="all-projects-link"
            href={profile.github + '?tab=repositories'}
            target="_blank"
            rel="noreferrer"
          >
            More experiments, more commits.{' '}
            <strong>
              Find me on GitHub <ArrowUpRight size={16} />
            </strong>
          </a>
        </section>
        <section id="expertise" className="expertise-section" aria-labelledby="expertise-title">
          <div className="section container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  <span>02</span> / MY TOOLKIT
                </span>
                <h2 id="expertise-title">
                  The right tools.
                  <br />
                  <span className="muted-heading">The whole picture.</span>
                </h2>
              </div>
              <p>
                From a browser interaction to a distributed
                <br className="desktop-break" /> system, I care about what happens underneath.
              </p>
            </div>
            <div className="expertise-layout">
              <div
                className="skill-tabs"
                role="tablist"
                aria-label="Expertise areas"
                aria-orientation="vertical"
              >
                {skillGroups.map((group, index) => {
                  const Icon = skillIcons[index];
                  return (
                    <button
                      key={group.title}
                      ref={(element) => {
                        skillRefs.current[index] = element;
                      }}
                      role="tab"
                      id={'skill-tab-' + index}
                      aria-controls="skill-panel"
                      aria-selected={activeSkill === index}
                      tabIndex={activeSkill === index ? 0 : -1}
                      className={activeSkill === index ? 'skill-tab active' : 'skill-tab'}
                      onClick={() => setActiveSkill(index)}
                      onKeyDown={(event) => {
                        let next = index;
                        if (event.key === 'ArrowDown') next = (index + 1) % skillGroups.length;
                        else if (event.key === 'ArrowUp')
                          next = (index - 1 + skillGroups.length) % skillGroups.length;
                        else if (event.key === 'Home') next = 0;
                        else if (event.key === 'End') next = skillGroups.length - 1;
                        else return;
                        event.preventDefault();
                        setActiveSkill(next);
                        skillRefs.current[next]?.focus();
                      }}
                    >
                      <Icon size={20} />
                      <span>{group.title}</span>
                      <ChevronRight size={17} />
                    </button>
                  );
                })}
              </div>
              <div
                className="skill-panel"
                role="tabpanel"
                id="skill-panel"
                aria-labelledby={'skill-tab-' + activeSkill}
                tabIndex={0}
              >
                <div className="skill-panel-heading">
                  <div className="skill-panel-icon">
                    <SkillIcon size={29} />
                  </div>
                  <span>0{activeSkill + 1} / 04</span>
                </div>
                <h3>{skillGroups[activeSkill].title}</h3>
                <p>{skillGroups[activeSkill].description}</p>
                <div className="skill-tags">
                  {skillGroups[activeSkill].skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                <div className="skill-panel-footer">
                  <span className="tiny-dot" /> Applied in projects. Sharpened in practice.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span>03</span> / THE PERSON BEHIND THE CODE
              </span>
              <h2 id="about-title">
                Curious by nature.
                <br />
                <span className="muted-heading">Thorough by design.</span>
              </h2>
            </div>
          </div>
          <div className="about-layout">
            <div className="about-story">
              <div className="about-monogram" aria-hidden="true">
                <span>pb.</span>
                <span className="monogram-caption">
                  ALWAYS BUILDING.
                  <br />
                  ALWAYS LEARNING.
                </span>
                <span className="monogram-asterisk">✳</span>
              </div>
              <h3>A builder with a quality mindset.</h3>
              <p>
                I work at the intersection of software development and quality engineering. At
                Oracle, I turn complex workflows into repeatable checks, investigate failures, and
                help teams ship with confidence.
              </p>
              <p>
                Outside that work, I go deeper into Java, microservices, and event-driven
                architecture. Building the system makes me a better tester. Testing it makes me a
                better engineer.
              </p>
              <a className="text-link" href={profile.resume} download>
                The full story, in my resume <Download size={17} />
              </a>
            </div>
            <div className="journey">
              <div className="journey-label">
                <span className="eyebrow">WHERE I'VE BEEN</span>
                <span>EXPERIENCE & EDUCATION</span>
              </div>
              {experience.map((job) => (
                <article className="experience-item" key={job.company}>
                  <div className="timeline-dot" />
                  <div className="experience-topline">
                    <span className="company-name">{job.company}</span>
                    <span className="date-label">{job.period}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <p>{job.summary}</p>
                  <ul>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <div className="education-list">
                {education.map((item) => (
                  <article className="education-item" key={item.qualification}>
                    <GraduationCap size={21} />
                    <div>
                      <h3>{item.qualification}</h3>
                      <p>{item.institution}</p>
                      <span className="date-label">{item.period}</span>
                    </div>
                  </article>
                ))}
              </div>
              <div className="certification">
                <ShieldCheck size={24} />
                <div>
                  <span className="eyebrow">
                    {certifications[0].issuer.toUpperCase()} CERTIFIED / {certifications[0].year}
                  </span>
                  <h3>{certifications[0].title}</h3>
                </div>
                <CheckCircle2 size={19} />
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <div className="contact-copy">
              <span className="eyebrow">
                <span className="status-dot" /> GOOD WORK STARTS WITH A CONVERSATION
              </span>
              <h2 id="contact-title">
                Let's build something
                <br />
                <em>dependable.</em>
                <ArrowUpRight className="contact-arrow" />
              </h2>
              <p>
                Have a role, a project, or an interesting engineering problem?
                <br className="desktop-break" /> I'd love to hear about it.
              </p>
              <div className="contact-email-row">
                <a href={'mailto:' + profile.email} className="email-link">
                  {profile.email}
                  <ArrowUpRight size={23} />
                </a>
                <button
                  className="copy-button"
                  onClick={copyEmail}
                  aria-label={copyState === 'copied' ? 'Email copied' : 'Copy email address'}
                >
                  {copyState === 'copied' ? <Check size={19} /> : <Copy size={18} />}
                </button>
              </div>
              <div className="copy-feedback" role="status">
                {copyState === 'copied'
                  ? 'Email address copied.'
                  : copyState === 'failed'
                    ? 'Please select and copy the email address above.'
                    : ''}
              </div>
            </div>
            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={20} />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={20} />
                <span>Explore my GitHub</span>
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.resume} download>
                <Download size={20} />
                <span>Download my resume</span>
                <ArrowDown size={18} />
              </a>
              <a href={'mailto:' + profile.email}>
                <Mail size={20} />
                <span>Drop me a message</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a href="#" className="brand-mark" aria-label="Back to top">
          pb<span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} Pepeti Balaji <span>·</span> Built with care. Tested with
          intent.
        </p>
        <a className="back-to-top" href="#">
          Back to top <ArrowUpRight size={15} />
        </a>
      </footer>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

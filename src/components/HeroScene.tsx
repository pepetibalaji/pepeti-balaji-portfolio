import { useId, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

const modes = [
  {
    name: 'Build',
    number: '01',
    label: 'Clear contracts. Dependable services.',
    description:
      'Java, Spring Boot, and event-driven systems. Designed to make the next change easier.',
    detail: 'SERVICES / CONTRACTS',
  },
  {
    name: 'Verify',
    number: '02',
    label: 'Confidence, built into the workflow.',
    description:
      'Browser journeys, API behavior, and failure paths. Useful checks that travel with the code.',
    detail: 'BEHAVIOR / RESILIENCE',
  },
  {
    name: 'Observe',
    number: '03',
    label: 'Understand what happens underneath.',
    description:
      'Logs, metrics, and traces connect a user experience to the services that make it work.',
    detail: 'SIGNALS / FEEDBACK',
  },
] as const;

const lime = '#c6f36b';

function ModeIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      {index === 0 ? (
        <>
          <path d="m6 5-4 5 4 5m8-10 4 5-4 5m-3-12-2 14" />
        </>
      ) : index === 1 ? (
        <>
          <path d="m10 2 6 2.5v5c0 4-6 8-6 8s-6-4-6-8v-5L10 2Z" />
          <path d="m6.7 9.5 2.1 2.1 4.5-4.5" />
        </>
      ) : (
        <>
          <path d="M1.5 10h4l2.5-6 4 12 2.5-6h4" />
          <circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

export default function HeroScene() {
  const instance = useId().replace(/:/g, '');
  const id = (name: string) => instance + '-' + name;
  const [activeMode, setActiveMode] = useState(1);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useTransform(pointerY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(pointerX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 24 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 24 });
  const mode = modes[activeMode];
  const stroke = (index: number) => (activeMode === index ? lime : '#697871');

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      aria-labelledby={id('heading')}
      className="relative min-w-0 overflow-hidden rounded-[1.5rem] border border-line bg-surface sm:rounded-[2rem]"
    >
      <div className="relative overflow-hidden bg-[#111719]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 53% 50%, rgba(198,243,107,.085), transparent 63%), linear-gradient(150deg, rgba(255,255,255,.025), transparent 45%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
          <h2
            id={id('heading')}
            className="flex items-center gap-2.5 font-mono text-[9px] font-medium tracking-[.15em] text-[#b7c1b9] sm:text-[10px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c6f36b] shadow-[0_0_10px_#c6f36b66]" />
            INTERACTIVE SYSTEM MODEL
          </h2>
          <span aria-hidden="true" className="font-mono text-[9px] tracking-wider text-[#8d9b94]">
            PB—01
          </span>
        </div>
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          className="relative -mb-2 w-full touch-pan-y px-1 sm:px-3"
          style={{ perspective: 900 }}
        >
          <motion.div
            style={{
              rotateX: reduceMotion ? 0 : rotateX,
              rotateY: reduceMotion ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <svg
              viewBox="0 0 560 452"
              className="block h-auto w-full overflow-visible"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient
                  id={id('plane')}
                  x1="128"
                  y1="125"
                  x2="398"
                  y2="366"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#303b3d" />
                  <stop offset=".55" stopColor="#20272b" />
                  <stop offset="1" stopColor="#14181c" />
                </linearGradient>
                <linearGradient
                  id={id('glass')}
                  x1="187"
                  y1="117"
                  x2="352"
                  y2="275"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#34423c" stopOpacity=".9" />
                  <stop offset="1" stopColor="#171e20" stopOpacity=".95" />
                </linearGradient>
                <linearGradient
                  id={id('core')}
                  x1="248"
                  y1="128"
                  x2="302"
                  y2="209"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#edffd1" />
                  <stop offset=".4" stopColor="#c6f36b" />
                  <stop offset="1" stopColor="#718f39" />
                </linearGradient>
                <linearGradient
                  id={id('edge')}
                  x1="219"
                  y1="174"
                  x2="341"
                  y2="219"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#759c36" />
                  <stop offset=".5" stopColor="#405824" />
                  <stop offset="1" stopColor="#a9d65b" />
                </linearGradient>
                <radialGradient id={id('halo')}>
                  <stop stopColor={lime} stopOpacity=".22" />
                  <stop offset="1" stopColor={lime} stopOpacity="0" />
                </radialGradient>
                <filter id={id('glow')} x="-90%" y="-90%" width="280%" height="280%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id={id('shadow')} x="-40%" y="-50%" width="180%" height="240%">
                  <feGaussianBlur stdDeviation="15" />
                </filter>
                <pattern
                  id={id('grid')}
                  width="42"
                  height="42"
                  patternUnits="userSpaceOnUse"
                  patternTransform="matrix(1 .53 -1 .53 280 20)"
                >
                  <path d="M42 0H0V42" stroke="#b3c5b5" strokeOpacity=".11" strokeWidth=".7" />
                </pattern>
                <clipPath id={id('top-clip')}>
                  <path d="m280 100 143 76-143 76-143-76Z" />
                </clipPath>
                <clipPath id={id('middle-clip')}>
                  <path d="m280 157 170 90-170 90-170-90Z" />
                </clipPath>
                <clipPath id={id('base-clip')}>
                  <path d="m280 210 197 104-197 104L83 314Z" />
                </clipPath>
              </defs>

              {/* Quiet registration marks give the model a technical drawing frame. */}
              <g stroke="#748079" strokeOpacity=".36" strokeWidth=".8">
                <path d="M40 74V62h12m456 0h12v12M40 387v12h12m456 0h12v-12" />
                <path d="M280 35v8m-4-4h8M280 431v8m-4-4h8" />
              </g>
              <ellipse
                cx="281"
                cy="398"
                rx="157"
                ry="24"
                fill="#030607"
                opacity=".7"
                filter={'url(#' + id('shadow') + ')'}
              />
              <ellipse cx="280" cy="258" rx="224" ry="176" fill={'url(#' + id('halo') + ')'} />

              {/* Observation plane: the foundation, with a restrained circuit pattern. */}
              <motion.g
                animate={{ y: activeMode === 2 ? -3 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
              >
                <path
                  d="M83 314v15l197 105v-16Z"
                  fill="#101619"
                  stroke="#39443e"
                  strokeWidth=".7"
                />
                <path
                  d="m280 418 197-104v15L280 434Z"
                  fill="#1c2525"
                  stroke="#455448"
                  strokeWidth=".7"
                />
                <path
                  d="m280 210 197 104-197 104L83 314Z"
                  fill={'url(#' + id('plane') + ')'}
                  stroke={stroke(2)}
                  strokeWidth={activeMode === 2 ? 1.3 : 0.8}
                />
                <g clipPath={'url(#' + id('base-clip') + ')'}>
                  <path d="M65 195h430v250H65Z" fill={'url(#' + id('grid') + ')'} />
                  <path
                    d="m133 320 72 38 61-32m-98-41 57 30 49-26m146 38-55 29-41-22m82-63-56 30-46-24"
                    stroke="#8fa57c"
                    strokeOpacity=".35"
                    strokeWidth="1"
                  />
                  <circle cx="205" cy="358" r="3" fill={activeMode === 2 ? lime : '#7a8b77'} />
                  <circle cx="365" cy="356" r="3" fill={activeMode === 2 ? lime : '#7a8b77'} />
                </g>
                <path
                  d="m280 418 197-104"
                  stroke={stroke(2)}
                  strokeOpacity=".75"
                  strokeWidth="1.4"
                />
                <path
                  d="m107 327 29 15m7 4 10 5"
                  stroke="#a7bb90"
                  strokeWidth="2"
                  strokeOpacity=".65"
                />
                <text
                  x="330"
                  y="385"
                  transform="rotate(-28 330 385)"
                  fill={activeMode === 2 ? lime : '#a9b5ad'}
                  fontFamily="monospace"
                  fontSize="8"
                  letterSpacing="2"
                >
                  03 / OBSERVE
                </text>
              </motion.g>

              {/* Structural uprights expose the space between the layers. */}
              <g stroke="#b3c6a2" strokeWidth="1" strokeDasharray="3 5" strokeOpacity=".42">
                <path d="M137 176v101m286-101v101M280 252v157" />
              </g>
              <g stroke="#91ac70" strokeWidth="1">
                <path d="M174 264v43m212-43v43" />
                <ellipse cx="174" cy="307" rx="5" ry="2.8" fill="#203026" />
                <ellipse cx="386" cy="307" rx="5" ry="2.8" fill="#203026" />
              </g>

              {/* Verification plane sits between code and its operating signals. */}
              <motion.g
                animate={{ y: activeMode === 1 ? -4 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
              >
                <path
                  d="M110 247v16l170 91v-17Z"
                  fill="#172021"
                  stroke="#435347"
                  strokeWidth=".7"
                />
                <path
                  d="m280 337 170-90v16l-170 91Z"
                  fill="#202b28"
                  stroke="#506146"
                  strokeWidth=".7"
                />
                <path
                  d="m280 157 170 90-170 90-170-90Z"
                  fill={'url(#' + id('glass') + ')'}
                  stroke={stroke(1)}
                  strokeWidth={activeMode === 1 ? 1.4 : 0.8}
                />
                <g clipPath={'url(#' + id('middle-clip') + ')'}>
                  <path d="M95 145h370v225H95Z" fill={'url(#' + id('grid') + ')'} />
                  <path d="m161 250 119 63 118-63" stroke={stroke(1)} strokeOpacity=".5" />
                  <path d="m193 250 87 46 86-46" stroke={stroke(1)} strokeOpacity=".28" />
                </g>
                <path d="m280 337 170-90" stroke={stroke(1)} strokeWidth="1.5" />
                <g fill={activeMode === 1 ? lime : '#758877'}>
                  <circle cx="141" cy="269" r="2" />
                  <circle cx="151" cy="274" r="2" />
                  <circle cx="161" cy="279" r="2" />
                </g>
                <text
                  x="329"
                  y="308"
                  transform="rotate(-28 329 308)"
                  fill={activeMode === 1 ? lime : '#a9b5ad'}
                  fontFamily="monospace"
                  fontSize="8"
                  letterSpacing="2"
                >
                  02 / VERIFY
                </text>
              </motion.g>

              {/* Build plane and the central quality core. */}
              <motion.g
                animate={{ y: activeMode === 0 ? -4 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
              >
                <path
                  d="M137 176v17l143 77v-18Z"
                  fill="#1a2322"
                  stroke="#53614d"
                  strokeWidth=".7"
                />
                <path
                  d="m280 252 143-76v17l-143 77Z"
                  fill="#29352a"
                  stroke="#66774f"
                  strokeWidth=".7"
                />
                <path
                  d="m280 100 143 76-143 76-143-76Z"
                  fill={'url(#' + id('glass') + ')'}
                  stroke={stroke(0)}
                  strokeWidth={activeMode === 0 ? 1.4 : 0.8}
                />
                <g clipPath={'url(#' + id('top-clip') + ')'}>
                  <path d="M120 83h320v200H120Z" fill={'url(#' + id('grid') + ')'} />
                  <g stroke="#acc388" strokeOpacity=".6" strokeWidth=".9">
                    <path d="m166 176 36 19 28-15m-28 15v10m192-29-36 19-29-15m29 15v10M247 127l33 17 33-17" />
                    <path d="m201 155 30 16m129-16-30 16m-81 58 31-16 31 16" />
                  </g>
                  <g fill="#9ab974">
                    <circle cx="166" cy="176" r="2.4" />
                    <circle cx="394" cy="176" r="2.4" />
                    <circle cx="247" cy="127" r="2" />
                    <circle cx="313" cy="127" r="2" />
                  </g>
                </g>
                <text
                  x="320"
                  y="232"
                  transform="rotate(-28 320 232)"
                  fill={activeMode === 0 ? lime : '#b6c4af'}
                  fontFamily="monospace"
                  fontSize="7.5"
                  letterSpacing="1.8"
                >
                  01 / BUILD
                </text>
                <path d="m280 252 143-76" stroke={stroke(0)} strokeWidth="1.4" />
                <motion.path
                  d="m280 134 72 38-72 38-72-38Z"
                  fill={lime}
                  opacity=".2"
                  filter={'url(#' + id('glow') + ')'}
                  animate={reduceMotion ? undefined : { opacity: [0.14, 0.3, 0.14] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <path
                  d="m219 170 61 33 61-33v22l-61 33-61-33Z"
                  fill={'url(#' + id('edge') + ')'}
                  stroke="#a7d766"
                  strokeWidth=".8"
                />
                <path
                  d="m280 137 61 33-61 33-61-33Z"
                  fill={'url(#' + id('core') + ')'}
                  stroke="#ecffd6"
                  strokeOpacity=".85"
                />
                <path
                  d="m280 147 43 23-43 23-43-23Z"
                  fill="#18251a"
                  stroke="#eeffd5"
                  strokeWidth=".8"
                />
                <path
                  d="m263 169 12 8 24-17"
                  stroke={lime}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M280 204v21" stroke="#d1f392" strokeOpacity=".55" />
                <path
                  d="m228 183 36 20m32 0 35-20"
                  stroke="#dbffa6"
                  strokeOpacity=".45"
                  strokeWidth="1.5"
                  strokeDasharray="2 4"
                />
              </motion.g>

              {/* Context nodes stay subtle; these are concepts, not live system metrics. */}
              <g stroke="#7a8c74" strokeWidth=".8" strokeOpacity=".42">
                <path
                  d="M94 104h34l40 49M456 113h-34l-25 37M91 355h32l24-24M468 349h-27l-26-18"
                  strokeDasharray="3 4"
                />
              </g>
              <g transform="translate(65 77)">
                <rect
                  width="57"
                  height="42"
                  rx="9"
                  fill="#192123"
                  stroke={activeMode === 0 ? '#93b74f' : '#3b4942'}
                />
                <path
                  d="m23 12-6 8 6 8m11-16 6 8-6 8m-4-18-3 20"
                  stroke={activeMode === 0 ? lime : '#a6b99b'}
                  strokeWidth="1.5"
                />
                <text
                  x="28.5"
                  y="56"
                  fill="#9caaa1"
                  fontFamily="monospace"
                  fontSize="8"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  SERVICES
                </text>
              </g>
              <g transform="translate(440 82)">
                <rect width="48" height="42" rx="9" fill="#192123" stroke="#3b4942" />
                <path d="M14 15h20M14 21h14m-14 6h20" stroke="#a6b99b" strokeWidth="1.4" />
                <circle cx="32" cy="21" r="2" fill={lime} />
                <text
                  x="24"
                  y="56"
                  fill="#9caaa1"
                  fontFamily="monospace"
                  fontSize="8"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  EVENTS
                </text>
              </g>
              <g transform="translate(51 331)">
                <rect
                  width="52"
                  height="42"
                  rx="9"
                  fill="#192123"
                  stroke={activeMode === 1 ? '#93b74f' : '#3b4942'}
                />
                <path
                  d="m26 9 10 4v7c0 6-10 13-10 13S16 26 16 20v-7Z"
                  stroke={activeMode === 1 ? lime : '#a6b99b'}
                  strokeWidth="1.2"
                />
                <path
                  d="m21 20 4 4 7-8"
                  stroke={activeMode === 1 ? lime : '#a6b99b'}
                  strokeWidth="1.5"
                />
                <text
                  x="26"
                  y="56"
                  fill="#9caaa1"
                  fontFamily="monospace"
                  fontSize="8"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  CHECKS
                </text>
              </g>
              <g transform="translate(449 329)">
                <rect
                  width="52"
                  height="42"
                  rx="9"
                  fill="#192123"
                  stroke={activeMode === 2 ? '#93b74f' : '#3b4942'}
                />
                <path
                  d="M10 22h7l5-10 7 18 5-8h8"
                  stroke={activeMode === 2 ? lime : '#a6b99b'}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <text
                  x="26"
                  y="56"
                  fill="#9caaa1"
                  fontFamily="monospace"
                  fontSize="8"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  SIGNALS
                </text>
              </g>
            </svg>
          </motion.div>
        </div>
        <div
          aria-hidden="true"
          className="relative flex items-center justify-between gap-3 border-t border-white/5 px-5 py-3 font-mono text-[9px] tracking-[.12em] sm:px-7"
        >
          <span className="text-[#a6b39f]">{mode.detail}</span>
          <span className="text-[#9aab8a]">{mode.number} / 03</span>
        </div>
      </div>
      <div className="border-t border-line p-4 sm:p-5">
        <div
          role="group"
          aria-label="Explore my engineering approach"
          className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-black/5 p-1"
        >
          {modes.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={activeMode === index}
              aria-controls={id('description')}
              onClick={() => setActiveMode(index)}
              className={
                'flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-lg px-1.5 py-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-2 sm:text-sm ' +
                (activeMode === index
                  ? 'bg-accent text-accent-ink shadow-sm'
                  : 'text-muted hover:bg-white/5 hover:text-fg')
              }
            >
              <ModeIcon index={index} />
              {item.name}
            </button>
          ))}
        </div>
        <div
          id={id('description')}
          aria-live="polite"
          aria-atomic="true"
          className="min-h-[112px] px-1 pb-1 pt-5 sm:min-h-[105px]"
        >
          <h3 className="text-sm font-medium leading-relaxed text-fg">{mode.label}</h3>
          <p className="mt-1.5 max-w-[44ch] text-xs leading-relaxed text-muted sm:text-[13px]">
            {mode.description}
          </p>
        </div>
      </div>
    </section>
  );
}

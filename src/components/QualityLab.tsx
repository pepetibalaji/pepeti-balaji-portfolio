import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type ScenarioId = 'valid' | 'invalid' | 'duplicate';
type RunPhase = 'ready' | 'running' | 'complete';
type ValidationError = 'MISSING_EVENT_ID' | 'MISSING_SKU' | 'INVALID_QUANTITY' | 'INVALID_PRICE';

type CheckoutEvent = Readonly<{
  eventId: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
}>;

type EventReceipt = {
  eventId: string;
  outcome: 'accepted' | 'rejected' | 'duplicate';
  errors: ValidationError[];
};

type CheckoutResult = {
  receipts: EventReceipt[];
  acceptedEventIds: string[];
  orders: { eventId: string; totalCents: number }[];
};

type AssertionResult = {
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
};

const sampleEvent: CheckoutEvent = {
  eventId: 'evt_checkout_01',
  sku: 'BOOK-SYSTEMS-01',
  quantity: 2,
  unitPriceCents: 12900,
};

const scenarios: {
  id: ScenarioId;
  label: string;
  note: string;
  events: readonly CheckoutEvent[];
}[] = [
  {
    id: 'valid',
    label: 'Valid request',
    note: 'A valid event should create exactly one local order record.',
    events: [sampleEvent],
  },
  {
    id: 'invalid',
    label: 'Invalid quantity',
    note: 'Quantity must be an integer from 1 to 99. Rejection is the expected result.',
    events: [{ ...sampleEvent, quantity: 0 }],
  },
  {
    id: 'duplicate',
    label: 'Duplicate event',
    note: 'The same event arrives twice. Only its first delivery should create a record.',
    events: [sampleEvent, { ...sampleEvent }],
  },
];

// Pure functions: the fixtures are never mutated, and each run gets a fresh ledger.
export function validateCheckoutEvent(event: CheckoutEvent): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!event.eventId.trim()) errors.push('MISSING_EVENT_ID');
  if (!event.sku.trim()) errors.push('MISSING_SKU');
  if (!Number.isInteger(event.quantity) || event.quantity < 1 || event.quantity > 99) {
    errors.push('INVALID_QUANTITY');
  }
  if (!Number.isSafeInteger(event.unitPriceCents) || event.unitPriceCents < 1) {
    errors.push('INVALID_PRICE');
  }
  return errors;
}

export function processCheckoutEvents(events: readonly CheckoutEvent[]): CheckoutResult {
  const acceptedEventIds = new Set<string>();
  const orders: CheckoutResult['orders'] = [];
  const receipts: EventReceipt[] = events.map((event) => {
    const errors = validateCheckoutEvent(event);
    if (errors.length > 0) return { eventId: event.eventId, outcome: 'rejected', errors };
    if (acceptedEventIds.has(event.eventId)) {
      return { eventId: event.eventId, outcome: 'duplicate', errors: [] };
    }
    acceptedEventIds.add(event.eventId);
    orders.push({ eventId: event.eventId, totalCents: event.quantity * event.unitPriceCents });
    return { eventId: event.eventId, outcome: 'accepted', errors: [] };
  });
  return { receipts, acceptedEventIds: [...acceptedEventIds], orders };
}

function assertEqual(
  name: string,
  actual: string | number | boolean,
  expected: string | number | boolean,
): AssertionResult {
  return { name, passed: actual === expected, expected: String(expected), actual: String(actual) };
}

export function runScenarioAssertions(scenarioId: ScenarioId): AssertionResult[] {
  const scenario = scenarios.find((item) => item.id === scenarioId)!;
  const result = processCheckoutEvents(scenario.events);
  const first = result.receipts[0];
  const totalCents = result.orders.reduce((total, order) => total + order.totalCents, 0);

  if (scenarioId === 'invalid') {
    return [
      assertEqual('Reject an out-of-range quantity', first.outcome, 'rejected'),
      assertEqual(
        'Return the quantity validation error',
        first.errors.includes('INVALID_QUANTITY'),
        true,
      ),
      assertEqual('Leave the order ledger unchanged', result.orders.length, 0),
      assertEqual('Keep rejected IDs out of the dedup set', result.acceptedEventIds.length, 0),
    ];
  }

  if (scenarioId === 'duplicate') {
    return [
      assertEqual('Accept the first delivery', first.outcome, 'accepted'),
      assertEqual('Identify the repeated event ID', result.receipts[1].outcome, 'duplicate'),
      assertEqual('Create exactly one order record', result.orders.length, 1),
      assertEqual('Record the total only once, in cents', totalCents, 25800),
    ];
  }

  return [
    assertEqual('Accept the valid event', first.outcome, 'accepted'),
    assertEqual('Return no validation errors', first.errors.length, 0),
    assertEqual('Create exactly one order record', result.orders.length, 1),
    assertEqual('Calculate quantity × unit price, in cents', totalCents, 25800),
  ];
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QualityLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('valid');
  const [phase, setPhase] = useState<RunPhase>('ready');
  const [results, setResults] = useState<AssertionResult[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const runGeneration = useRef(0);
  const reducedMotion = useReducedMotion();
  const terminalHeadingId = useId();
  const scenario = scenarios.find((item) => item.id === scenarioId)!;
  const passedCount = results.filter((result) => result.passed).length;
  const allPassed = phase === 'complete' && passedCount === 4;

  useEffect(
    () => () => {
      runGeneration.current += 1;
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  function clearPendingRun() {
    runGeneration.current += 1;
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function selectScenario(nextScenario: ScenarioId) {
    clearPendingRun();
    setScenarioId(nextScenario);
    setResults([]);
    setPhase('ready');
  }

  function runChecks() {
    if (phase === 'running') return;
    clearPendingRun();
    setResults([]);
    setPhase('running');
    const generation = runGeneration.current;
    // These assertions run against real in-browser validation and deduplication.
    // The timers only pace their presentation; they do not simulate network work.
    const nextResults = runScenarioAssertions(scenarioId);
    if (reducedMotion) {
      setResults(nextResults);
      setPhase('complete');
      return;
    }
    nextResults.forEach((result, index) => {
      timers.current.push(
        setTimeout(
          () => {
            if (generation !== runGeneration.current) return;
            setResults((current) => [...current, result]);
            if (index === nextResults.length - 1) {
              setPhase('complete');
              timers.current = [];
            }
          },
          180 * (index + 1),
        ),
      );
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-col gap-5 border-b border-line px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" /> LOCAL DEMO /
            SAMPLE DATA
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Explore boundary validation and idempotency with sample checkout events.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sample event scenario">
          {scenarios.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={scenarioId === item.id}
              onClick={() => selectScenario(item.id)}
              className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${scenarioId === item.id ? 'border-accent/40 bg-accent/10 text-accent' : 'border-line bg-panel text-muted hover:border-accent/40 hover:text-fg'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-w-0 border-b border-line p-5 sm:p-7 lg:border-r lg:border-b-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted">01 / INPUT</span>
            <span className="rounded border border-line px-2 py-1 font-mono text-[10px] text-muted">
              {scenario.events.length} {scenario.events.length === 1 ? 'event' : 'events'}
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#293229] bg-[#0b0e0b]">
            <div className="flex items-center gap-2 border-b border-[#293229] px-4 py-3">
              <span className="font-mono text-[10px] text-[#b6ca6b]" aria-hidden="true">
                {'{ }'}
              </span>
              <span className="font-mono text-[11px] text-[#adb9a7]">checkout.event.json</span>
            </div>
            <pre
              className="max-h-80 overflow-auto p-4 font-mono text-[11px] leading-6 text-[#d4ddc9] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#c6ed70] sm:text-xs"
              tabIndex={0}
              role="region"
              aria-label="Sample checkout event JSON"
            >
              <code>{JSON.stringify(scenario.events, null, 2)}</code>
            </pre>
          </div>
          <p className="mt-4 min-h-10 text-xs leading-relaxed text-muted">{scenario.note}</p>
          <button
            type="button"
            onClick={runChecks}
            disabled={phase === 'running'}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-accent px-5 py-3 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
          >
            {phase === 'running' ? (
              <svg
                className="animate-spin motion-reduce:animate-none"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <path
                  d="M12 3a9 9 0 0 1 9 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 4.5a1 1 0 0 1 1.5-.86l12 7.5a1 1 0 0 1 0 1.72l-12 7.5A1 1 0 0 1 7 19.5v-15Z" />
              </svg>
            )}
            {phase === 'running' ? 'Running checks…' : 'Run checks'}
            <span
              className="ml-3 border-l border-current/25 pl-3 font-mono text-[10px] font-normal"
              aria-hidden="true"
            >
              04
            </span>
          </button>
        </div>

        <div className="flex min-w-0 flex-col bg-[#0b0e0b] p-5 text-[#eef2e7] sm:p-7">
          <div className="flex items-center justify-between gap-3 border-b border-[#293229] pb-4">
            <h3
              id={terminalHeadingId}
              className="flex items-center gap-3 font-mono text-xs font-medium"
            >
              <span className="text-[#b6ca6b]" aria-hidden="true">
                ›_
              </span>{' '}
              assertion-runner
            </h3>
            <span className="font-mono text-[10px] tracking-wider text-[#adb9a7]">
              BROWSER / LOCAL
            </span>
          </div>
          <div className="mt-5 flex items-center gap-2 font-mono text-[11px] text-[#adb9a7]">
            <span className="text-[#c6ed70]" aria-hidden="true">
              $
            </span>
            <span>check checkout --scenario={scenarioId}</span>
          </div>

          <div
            className="min-h-65 grow py-5"
            role="log"
            aria-labelledby={terminalHeadingId}
            aria-live="polite"
            aria-relevant="additions text"
          >
            {phase === 'ready' ? (
              <div className="flex min-h-55 flex-col items-center justify-center rounded-xl border border-dashed border-[#344030] px-5 text-center">
                <div
                  className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-[#344030] font-mono text-lg text-[#b6ca6b]"
                  aria-hidden="true"
                >
                  ✓
                </div>
                <p className="text-sm text-[#d4ddc9]">Good systems start with good questions.</p>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#adb9a7]">
                  Choose a scenario, then run four assertions against the sample event.
                </p>
              </div>
            ) : (
              <ol className="space-y-4">
                {results.map((result, index) => (
                  <motion.li
                    key={`${scenarioId}-${result.name}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                    className="flex items-start gap-3"
                    data-testid="lab-check"
                    data-result={result.passed ? 'pass' : 'fail'}
                  >
                    <span
                      className="mt-0.5 font-mono text-[10px] text-[#adb9a7]"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`mt-0.5 flex shrink-0 items-center gap-1 font-mono text-[10px] font-medium ${result.passed ? 'text-[#c6ed70]' : 'text-[#f6a49b]'}`}
                    >
                      {result.passed ? <CheckIcon /> : <span aria-hidden="true">×</span>}
                      {result.passed ? 'PASS' : 'FAIL'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs leading-relaxed text-[#eef2e7]">{result.name}</p>
                      <p className="mt-1 break-words font-mono text-[10px] leading-relaxed text-[#adb9a7]">
                        expected: {result.expected}{' '}
                        <span className="px-1" aria-hidden="true">
                          ·
                        </span>{' '}
                        received: {result.actual}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            )}
            {phase === 'complete' && (
              <motion.p
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-6 rounded-lg border px-4 py-3 font-mono text-xs ${allPassed ? 'border-[#c6ed70]/20 bg-[#c6ed70]/5 text-[#c6ed70]' : 'border-[#f6a49b]/30 bg-[#f6a49b]/5 text-[#f6a49b]'}`}
                data-testid="lab-summary"
              >
                {passedCount}/4 assertions passed
                {allPassed
                  ? '. Expected behavior verified.'
                  : '. A behavior differs from its expectation.'}
              </motion.p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#293229] pt-4 font-mono text-[10px] leading-relaxed text-[#adb9a7]">
            <span>Pure functions. Fresh in-memory ledger.</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b6ca6b]" aria-hidden="true" /> No
              network requests
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

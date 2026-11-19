import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FlaskConical,
  Layers,
  Scale,
  Sparkles,
} from 'lucide-react';
import { FAULT_LINES } from '../../data/faultLines';
import { AppTab, FaultLineId } from '../../types/epistemia';

interface OverviewViewProps {
  onNavigateTab: (tab: AppTab) => void;
  onOpenFaultLine: (id: FaultLineId) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateTab,
  onOpenFaultLine,
}) => {
  return (
    <div className="mx-auto max-w-[1200px] space-y-12 px-4 py-8 sm:px-6 sm:py-10">
      {/* Editorial Hero */}
      <section className="rounded-xl border border-[#E6E1D6] bg-white p-6 shadow-[0_1px_3px_rgba(28,27,24,0.04)] sm:p-10">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1 text-xs font-medium text-[#57534E]">
            <span className="h-2 w-2 rounded-full bg-[#C2410C]" />
            <span>Operationalizing Quattrociocchi, Capraro &amp; Perc</span>
            <a
              href="https://arxiv.org/html/2512.19466v1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono-tech text-[#0F6B6B] underline decoration-[#0F6B6B]/40 underline-offset-2 hover:decoration-[#0F6B6B]"
            >
              arXiv:2512.19466 <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <h1 className="font-serif-display text-3xl font-medium leading-[1.15] tracking-tight text-[#1C1B18] sm:text-5xl">
            Designing Against <span className="italic text-[#C2410C]">Epistemia</span>
          </h1>

          <p className="text-base leading-relaxed text-[#57534E] sm:text-lg">
            <strong className="font-semibold text-[#1C1B18]">Epistemia</strong> occurs when
            linguistic plausibility substitutes for epistemic evaluation—producing the{' '}
            <em>subjective feeling of knowing without the labor of critical judgment</em>. A
            reader can receive a fluent, factually accurate AI summary and still lose the
            capacity to tell when a conclusion should change.
          </p>

          <p className="text-sm leading-relaxed text-[#57534E]">
            This workbench pairs a runnable{' '}
            <strong className="font-medium text-[#1C1B18]">
              2×2 AI-assisted paper appraisal experiment
            </strong>{' '}
            with an interactive{' '}
            <strong className="font-medium text-[#1C1B18]">
              7-fault-line UX design laboratory
            </strong>
            , translating each theoretical fault line into testable interface interventions.
          </p>
        </div>

        {/* Dual Primary CTAs */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="group flex flex-col justify-between rounded-lg border border-[#0F6B6B]/25 bg-[#E8F4F4]/45 p-5 transition-all hover:border-[#0F6B6B]/50 hover:bg-[#E8F4F4]/70">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded bg-[#0F6B6B] px-2 py-0.5 font-mono-tech text-[11px] font-medium text-white">
                  <FlaskConical className="h-3.5 w-3.5" />
                  PILOT EXPERIMENT
                </span>
                <span className="font-mono-tech text-xs text-[#0F6B6B]">2×2 Factorial</span>
              </div>
              <h2 className="font-serif-display text-xl font-medium text-[#1C1B18]">
                Run AI-Assisted Paper Appraisal Pilot
              </h2>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Compare a <strong className="text-[#1C1B18]">Conventional Summary</strong> against
                an <strong className="text-[#1C1B18]">Epistemic-Scaffolded Summary</strong>{' '}
                (decisive passage link + load-bearing assumption) under matched{' '}
                <strong className="text-[#1C1B18]">Decisive</strong> vs.{' '}
                <strong className="text-[#1C1B18]">Non-Decisive</strong> errata.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => onNavigateTab('experiment')}
                className="inline-flex items-center gap-2 rounded-md bg-[#0F6B6B] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0B5353]"
              >
                Launch Pilot Study
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-5 transition-all hover:border-[#B45309]/40 hover:bg-[#FEF3C7]/25">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded bg-[#1C1B18] px-2 py-0.5 font-mono-tech text-[11px] font-medium text-white">
                  <Layers className="h-3.5 w-3.5" />
                  DESIGN PATTERNS
                </span>
                <span className="font-mono-tech text-xs text-[#57534E]">7 Live Prototypes</span>
              </div>
              <h2 className="font-serif-display text-xl font-medium text-[#1C1B18]">
                Explore the 7 Fault Lines UX Lab
              </h2>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Test live before/after interface solutions for{' '}
                <strong className="text-[#1C1B18]">
                  Grounding, Parsing, Experience, Motivation, Causality, Metacognition, and Value
                </strong>{' '}
                using each fault line’s exact counterfactual perturbation test.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => onNavigateTab('solutions')}
                className="inline-flex items-center gap-2 rounded-md border border-[#1C1B18] bg-white px-4 py-2 text-sm font-medium text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-white"
              >
                Open UX Solutions Lab
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Thesis: Appropriate Revision */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#0F6B6B]">
              Spanning Experimental Test
            </p>
            <h2 className="font-serif-display text-2xl font-medium text-[#1C1B18]">
              Why Model Accuracy Alone Misses Epistemia
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#8A8478]">
            Both summary conditions state the exact same initial finding and access the exact same
            source paper. Only the epistemic scaffolding varies.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#E6E1D6] bg-white p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#FEE2E2] text-[#B91C1C]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#1C1B18]">
              1. Decisive Sensitivity (Resist Epistemic Inertia)
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
              When a post-publication correction directly falsifies the load-bearing assumption,
              readers must weaken or revise the initial conclusion rather than clinging to fluent
              initial plausibility.
            </p>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-white p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#EEF2FF] text-[#3730A3]">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#1C1B18]">
              2. Non-Decisive Specificity (Avoid Blanket Skepticism)
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
              When an equally prominent erratum corrects an irrelevant detail (e.g., typo, tenure
              rounding, software version), justified trust must hold—proving the UX does not merely
              make readers cynically doubt everything.
            </p>
          </div>

          <div className="rounded-lg border border-[#E6E1D6] bg-white p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#FEF3C7] text-[#B45309]">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#1C1B18]">
              3. Cognitive Effort &amp; Verification Telemetry
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
              Measuring initial reading time, revision latency, and decisive-passage clicks tells us
              the exact effort cost of better judgment—and whether epistemic links guide attention
              efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 7 Fault Lines Matrix */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#B45309]">
              Taxonomy &amp; Interventions
            </p>
            <h2 className="font-serif-display text-2xl font-medium text-[#1C1B18]">
              The Seven Epistemological Fault Lines
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E]">
            <Sparkles className="h-3.5 w-3.5 text-[#0F6B6B]" />
            Click any fault line row to test its live UX prototype
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#E6E1D6] bg-white shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6E1D6] bg-[#F3EFE7]/70 text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  <th className="px-4 py-3 w-44">Fault Line</th>
                  <th className="px-4 py-3">Proposed Intervention &amp; UX Pattern</th>
                  <th className="px-4 py-3">How to Tell Whether It Works</th>
                  <th className="px-4 py-3 w-36 text-right">Prototype</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E1D6]">
                {FAULT_LINES.map((fl) => (
                  <tr
                    key={fl.id}
                    onClick={() => onOpenFaultLine(fl.id)}
                    className="group cursor-pointer transition-colors hover:bg-[#FAF8F4]"
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#E6E1D6] bg-[#FAF8F4] font-mono-tech text-xs font-semibold text-[#1C1B18] group-hover:border-[#0F6B6B] group-hover:text-[#0F6B6B]">
                          {fl.number}
                        </span>
                        <div>
                          <div className="font-semibold text-[#1C1B18] group-hover:text-[#0F6B6B]">
                            {fl.title}
                          </div>
                          <div className="mt-0.5 text-[11px] leading-snug text-[#8A8478]">
                            {fl.humanVsAiMismatch}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="mb-1 inline-block rounded bg-[#E8F4F4] px-2 py-0.5 text-[11px] font-medium text-[#0F6B6B]">
                        {fl.uxPatternName}
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#57534E]">
                        {fl.proposedIntervention}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <p className="text-[13px] leading-relaxed text-[#57534E]">
                        {fl.evaluationCriterion}
                      </p>
                      <span className="mt-1.5 inline-block font-mono-tech text-[11px] text-[#8A8478]">
                        Ref: {fl.citationLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top text-right">
                      <span className="inline-flex items-center gap-1 rounded-md border border-[#E6E1D6] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1C1B18] transition-colors group-hover:border-[#0F6B6B] group-hover:bg-[#0F6B6B] group-hover:text-white">
                        Open Lab
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

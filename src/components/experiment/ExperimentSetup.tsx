import React, { useState } from 'react';
import {
  ArrowRight,
  EyeOff,
  FileText,
  FlaskConical,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { PAPER_STIMULI } from '../../data/papers';
import { CorrectionType, SummaryCondition } from '../../types/epistemia';

interface ExperimentSetupProps {
  onStartBlinded: (protocol: 'mixed_2trial' | 'single_trial') => void;
  onStartDemo: (config: {
    paperId: string;
    summaryCondition: SummaryCondition;
    correctionType: CorrectionType;
    recordToDashboard: boolean;
  }) => void;
}

export const ExperimentSetup: React.FC<ExperimentSetupProps> = ({
  onStartBlinded,
  onStartDemo,
}) => {
  const [setupMode, setSetupMode] = useState<'participant' | 'demo'>('participant');
  const [protocol, setProtocol] = useState<'mixed_2trial' | 'single_trial'>('mixed_2trial');

  const [demoPaperId, setDemoPaperId] = useState<string>(PAPER_STIMULI[0].id);
  const [demoCondition, setDemoCondition] = useState<SummaryCondition>('epistemic');
  const [demoCorrection, setDemoCorrection] = useState<CorrectionType>('decisive');
  const [recordDemo, setRecordDemo] = useState<boolean>(true);

  return (
    <div className="mx-auto max-w-[980px] space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#0F6B6B]">
          Spanning Experiment · AI-Assisted Paper Appraisal
        </p>
        <h1 className="font-serif-display text-3xl font-medium text-[#1C1B18]">
          Appropriate Revision Study
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#57534E]">
          Evaluate research findings with an AI-generated research brief alongside the source
          manuscript, then reassess your judgment when a formal post-publication notice arrives.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="inline-flex rounded-lg border border-[#E6E1D6] bg-[#F3EFE7]/80 p-1">
        <button
          type="button"
          onClick={() => setSetupMode('participant')}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
            setupMode === 'participant'
              ? 'bg-white text-[#1C1B18] shadow-sm'
              : 'text-[#57534E] hover:text-[#1C1B18]'
          }`}
        >
          <EyeOff className="h-4 w-4 text-[#0F6B6B]" />
          Blinded Participant Study
        </button>
        <button
          type="button"
          onClick={() => setSetupMode('demo')}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
            setupMode === 'demo'
              ? 'bg-white text-[#1C1B18] shadow-sm'
              : 'text-[#57534E] hover:text-[#1C1B18]'
          }`}
        >
          <Sliders className="h-4 w-4 text-[#B45309]" />
          Researcher / Demo Condition Switcher
        </button>
      </div>

      {setupMode === 'participant' ? (
        <div className="rounded-xl border border-[#E6E1D6] bg-white p-6 shadow-[0_1px_3px_rgba(28,27,24,0.04)] sm:p-8">
          <div className="space-y-6">
            {/* Neutral Briefing */}
            <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-[#1C1B18]">
                <FileText className="h-4 w-4 text-[#0F6B6B]" />
                Participant Procedure
              </h2>
              <ol className="mt-2.5 space-y-1.5 text-sm text-[#57534E]">
                <li>
                  <span className="font-mono-tech text-xs font-semibold text-[#1C1B18]">01.</span>{' '}
                  Read an AI research summary alongside the structured empirical manuscript.
                </li>
                <li>
                  <span className="font-mono-tech text-xs font-semibold text-[#1C1B18]">02.</span>{' '}
                  Rate how strongly the evidence supports the paper’s central claim (Stage 1).
                </li>
                <li>
                  <span className="font-mono-tech text-xs font-semibold text-[#1C1B18]">03.</span>{' '}
                  Inspect a published post-publication notice, revise or retain your appraisal, and
                  briefly explain your reasoning (Stage 2).
                </li>
              </ol>
              <p className="mt-3 text-xs text-[#8A8478]">
                Note: Your assigned summary format and erratum sequence remain blinded until the
                session debrief at the end. Reading times and citation clicks are recorded locally.
              </p>
            </div>

            {/* Protocol Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Select Session Protocol
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setProtocol('mixed_2trial')}
                  className={`rounded-lg border p-4 text-left transition-all ${
                    protocol === 'mixed_2trial'
                      ? 'border-[#0F6B6B] bg-[#E8F4F4]/45 ring-1 ring-[#0F6B6B]'
                      : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1C1B18]">
                      2-Trial Mixed Pilot
                    </span>
                    <span className="rounded bg-[#0F6B6B] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-white">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
                    Appraise 2 distinct papers (~6–8 min) under a randomized summary format, pairing
                    one substantive and one minor correction in random order to assess both
                    sensitivity and specificity.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setProtocol('single_trial')}
                  className={`rounded-lg border p-4 text-left transition-all ${
                    protocol === 'single_trial'
                      ? 'border-[#0F6B6B] bg-[#E8F4F4]/45 ring-1 ring-[#0F6B6B]'
                      : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1C1B18]">
                      1-Trial Quick Pilot
                    </span>
                    <span className="rounded border border-[#E6E1D6] bg-[#FAF8F4] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-[#57534E]">
                      ~3–4 MIN
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
                    Complete a single randomized paper appraisal and revision cycle before viewing
                    the full experimental debrief.
                  </p>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E6E1D6] pt-5">
              <div className="text-xs text-[#8A8478]">
                Stimuli pool: 3 controlled empirical manuscripts across Chronobiology, Learning
                Analytics, and Urban Policy.
              </div>
              <button
                type="button"
                onClick={() => onStartBlinded(protocol)}
                className="inline-flex items-center gap-2 rounded-md bg-[#0F6B6B] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0B5353]"
              >
                <FlaskConical className="h-4 w-4" />
                Begin Blinded Session
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#E6E1D6] bg-white p-6 shadow-[0_1px_3px_rgba(28,27,24,0.04)] sm:p-8">
          <div className="space-y-6">
            <div className="rounded-lg border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs leading-relaxed text-[#92400E]">
              <strong>Demo / Inspection Mode:</strong> Manually select any cell of the 2×2
              factorial design. Demo trials are tagged <code className="font-mono-tech">demo</code>{' '}
              so they stay distinct from blinded <code className="font-mono-tech">participant</code>{' '}
              records in the Researcher Dashboard.
            </div>

            {/* Paper Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                1. Stimulus Manuscript
              </label>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {PAPER_STIMULI.map((paper) => (
                  <button
                    key={paper.id}
                    type="button"
                    onClick={() => setDemoPaperId(paper.id)}
                    className={`rounded-lg border p-3.5 text-left transition-all ${
                      demoPaperId === paper.id
                        ? 'border-[#0F6B6B] bg-[#E8F4F4]/40 ring-1 ring-[#0F6B6B]'
                        : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                    }`}
                  >
                    <div className="font-mono-tech text-[10px] font-medium uppercase text-[#0F6B6B]">
                      {paper.domain}
                    </div>
                    <div className="mt-1 text-xs font-semibold leading-snug text-[#1C1B18]">
                      {paper.title}
                    </div>
                    <div className="mt-1.5 text-[11px] text-[#8A8478]">
                      Decisive cue: {paper.decisiveSectionId}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2x2 Condition Controls */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  2. AI Summary Interface
                </label>
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoCondition('conventional')}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      demoCondition === 'conventional'
                        ? 'border-[#C2410C] bg-[#FFF7ED] ring-1 ring-[#C2410C]'
                        : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1C1B18]">
                      Conventional Fluent Summary
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#57534E]">
                      Polished narrative takeaways with no section anchors or load-bearing
                      assumptions.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoCondition('epistemic')}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      demoCondition === 'epistemic'
                        ? 'border-[#0F6B6B] bg-[#E8F4F4]/50 ring-1 ring-[#0F6B6B]'
                        : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1C1B18]">
                      Epistemic-Scaffolded Summary
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#57534E]">
                      Identical conclusion + jump-to-passage evidence link + explicit falsifiable
                      assumption.
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  3. Post-Publication Correction Type
                </label>
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoCorrection('decisive')}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      demoCorrection === 'decisive'
                        ? 'border-[#B91C1C] bg-[#FEF2F2] ring-1 ring-[#B91C1C]'
                        : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1C1B18]">
                      Decisive Correction (Undermines Conclusion)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#57534E]">
                      Directly breaks the load-bearing assumption; reader should weaken/revise.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoCorrection('non_decisive')}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      demoCorrection === 'non_decisive'
                        ? 'border-[#3730A3] bg-[#EEF2FF] ring-1 ring-[#3730A3]'
                        : 'border-[#E6E1D6] bg-white hover:border-[#C8C0B0]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#1C1B18]">
                      Non-Decisive Correction (Leaves Conclusion Intact)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#57534E]">
                      Equally prominent erratum on irrelevant metadata; reader should retain claim.
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E6E1D6] pt-5">
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-[#57534E]">
                <input
                  type="checkbox"
                  checked={recordDemo}
                  onChange={(e) => setRecordDemo(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D6D0C4] accent-[#0F6B6B]"
                />
                Save demo run to local storage (tagged as <code className="font-mono-tech">demo</code>)
              </label>

              <button
                type="button"
                onClick={() =>
                  onStartDemo({
                    paperId: demoPaperId,
                    summaryCondition: demoCondition,
                    correctionType: demoCorrection,
                    recordToDashboard: recordDemo,
                  })
                }
                className="inline-flex items-center gap-2 rounded-md bg-[#1C1B18] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#33302B]"
              >
                <Sparkles className="h-4 w-4 text-[#E8F4F4]" />
                Launch Configured Cell
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

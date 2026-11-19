import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Columns2,
  Eye,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { getPaperById } from '../../data/papers';
import {
  formatClassificationLabel,
  formatDurationSeconds,
} from '../../lib/scoring';
import { TrialRecord } from '../../types/epistemia';
import { SummaryPanel } from './SummaryPanel';

interface SessionDebriefProps {
  trials: TrialRecord[];
  onRunAnother: () => void;
  onOpenDashboard: () => void;
}

export const SessionDebrief: React.FC<SessionDebriefProps> = ({
  trials,
  onRunAnother,
  onOpenDashboard,
}) => {
  const [comparePaperId, setComparePaperId] = useState<string | null>(null);

  if (trials.length === 0) return null;

  const assignedCondition = trials[0].summaryCondition;
  const appropriateCount = trials.filter((t) => t.appropriate).length;
  const comparePaper = comparePaperId ? getPaperById(comparePaperId) : null;

  return (
    <div className="mx-auto max-w-[1040px] space-y-6 px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-6 shadow-[0_1px_3px_rgba(28,27,24,0.04)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded bg-[#E8F4F4] px-2.5 py-0.5 font-mono-tech text-xs font-medium text-[#0F6B6B]">
              Session Complete · Experimental Debrief
            </span>
            <h1 className="font-serif-display text-3xl font-medium text-[#1C1B18]">
              Unblinding &amp; Epistemic Calibration Report
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[#57534E]">
              You were assigned to the{' '}
              <strong className="font-semibold text-[#1C1B18]">
                {assignedCondition === 'epistemic'
                  ? 'Epistemic-Scaffolded Summary'
                  : 'Conventional Fluent Summary'}
              </strong>{' '}
              condition and scored{' '}
              <strong className="font-mono-tech text-[#0F6B6B]">
                {appropriateCount}/{trials.length}
              </strong>{' '}
              on Appropriate Revision.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0F6B6B] px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-[#0B5353] sm:text-sm"
            >
              <BarChart3 className="h-4 w-4" />
              View Researcher Dashboard
            </button>
            <button
              type="button"
              onClick={onRunAnother}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E1D6] bg-white px-4 py-2 text-xs font-medium text-[#1C1B18] hover:bg-[#FAF8F4] sm:text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Run Another Session
            </button>
          </div>
        </div>
      </div>

      {/* Trial-by-Trial Unblinding Cards */}
      <div className="space-y-4">
        {trials.map((trial, index) => {
          const paper = getPaperById(trial.paperId);
          const correction = paper.corrections[trial.correctionType];
          const isDecisive = trial.correctionType === 'decisive';
          const totalMs = trial.initialReadingTimeMs + trial.revisionReadingTimeMs;
          const isCompareOpen = comparePaperId === trial.paperId;

          return (
            <div
              key={trial.id}
              className="rounded-xl border border-[#E6E1D6] bg-white p-6 shadow-[0_1px_3px_rgba(28,27,24,0.04)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E6E1D6] pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-tech text-xs font-semibold text-[#8A8478]">
                      TRIAL {index + 1} OF {trial.totalTrials}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono-tech text-[11px] font-semibold ${
                        isDecisive
                          ? 'bg-[#FEE2E2] text-[#B91C1C]'
                          : 'bg-[#EEF2FF] text-[#3730A3]'
                      }`}
                    >
                      {isDecisive
                        ? 'True Erratum: DECISIVE'
                        : 'True Erratum: NON-DECISIVE'}
                    </span>
                    <span className="rounded border border-[#E6E1D6] bg-[#FAF8F4] px-2 py-0.5 font-mono-tech text-[11px] text-[#57534E]">
                      {trial.mode === 'demo' ? 'demo' : 'participant'}
                    </span>
                  </div>
                  <h2 className="mt-1.5 font-serif-display text-xl font-medium text-[#1C1B18]">
                    {paper.title}
                  </h2>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    trial.appropriate
                      ? 'bg-[#E8F4F4] text-[#0F6B6B]'
                      : 'bg-[#FEF2F2] text-[#B91C1C]'
                  }`}
                >
                  {trial.appropriate ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {formatClassificationLabel(trial.classification)}
                </div>
              </div>

              {/* Telemetry & Ratings Grid */}
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
                  <div className="text-[11px] text-[#8A8478]">Endorsement Shift</div>
                  <div className="mt-1 flex items-baseline gap-1.5 font-mono-tech text-lg font-semibold text-[#1C1B18]">
                    <span>{trial.preEndorsement}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#8A8478]" />
                    <span>{trial.postEndorsement}</span>
                    <span className="text-xs font-normal text-[#57534E]">
                      ({trial.deltaEndorsement >= 0 ? `+${trial.deltaEndorsement}` : trial.deltaEndorsement})
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
                  <div className="text-[11px] text-[#8A8478]">Decision &amp; Confidence</div>
                  <div className="mt-1 font-mono-tech text-sm font-semibold capitalize text-[#1C1B18]">
                    {trial.categoricalChoice}
                  </div>
                  <div className="text-[11px] text-[#57534E]">
                    Confidence: {trial.preConfidence}% → {trial.postConfidence}%
                  </div>
                </div>

                <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
                  <div className="flex items-center gap-1 text-[11px] text-[#8A8478]">
                    <Clock className="h-3 w-3" />
                    Reading Effort
                  </div>
                  <div className="mt-1 font-mono-tech text-lg font-semibold text-[#1C1B18]">
                    {formatDurationSeconds(totalMs)}
                  </div>
                  <div className="text-[11px] text-[#57534E]">
                    Init {formatDurationSeconds(trial.initialReadingTimeMs)} · Rev{' '}
                    {formatDurationSeconds(trial.revisionReadingTimeMs)}
                  </div>
                </div>

                <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
                  <div className="flex items-center gap-1 text-[11px] text-[#8A8478]">
                    <Eye className="h-3 w-3" />
                    Evidence Inspection
                  </div>
                  <div className="mt-1 font-mono-tech text-sm font-semibold text-[#1C1B18]">
                    {trial.decisivePassageInspected
                      ? `Inspected ${paper.decisiveSectionId}`
                      : `Missed ${paper.decisiveSectionId}`}
                  </div>
                  <div className="text-[11px] text-[#57534E]">
                    Anchor clicks: {trial.passageLinkClicks} · Post-erratum check:{' '}
                    {trial.reinspectedAfterCorrection ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Scientific Explanation & User Rationale */}
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                    Your Written Rationale
                  </div>
                  <p className="mt-1.5 text-sm italic text-[#1C1B18]">“{trial.rationale}”</p>
                </div>

                <div
                  className={`rounded-lg border p-3.5 ${
                    isDecisive
                      ? 'border-[#FEE2E2] bg-[#FEF2F2]/60'
                      : 'border-[#EEF2FF] bg-[#EEF2FF]/60'
                  }`}
                >
                  <div
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isDecisive ? 'text-[#B91C1C]' : 'text-[#3730A3]'
                    }`}
                  >
                    Ground Truth Debrief
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1C1B18]">
                    {correction.explanationForDebrief}
                  </p>
                </div>
              </div>

              {/* Compare Other Summary Condition Drawer */}
              <div className="mt-4 border-t border-[#E6E1D6] pt-4">
                <button
                  type="button"
                  onClick={() => setComparePaperId(isCompareOpen ? null : trial.paperId)}
                  className="inline-flex items-center gap-2 rounded-md border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-1.5 text-xs font-medium text-[#1C1B18] transition-colors hover:border-[#0F6B6B] hover:bg-white"
                >
                  <Columns2 className="h-3.5 w-3.5 text-[#0F6B6B]" />
                  {isCompareOpen
                    ? 'Hide Side-by-Side Condition Comparison'
                    : 'Compare the Other Summary Condition Side-by-Side'}
                </button>

                {isCompareOpen && comparePaper && (
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <SummaryPanel
                      paper={comparePaper}
                      condition="conventional"
                      decisivePassageInspected={false}
                      onClickDecisiveAnchor={() => {}}
                      showConditionLabel
                    />
                    <SummaryPanel
                      paper={comparePaper}
                      condition="epistemic"
                      decisivePassageInspected={true}
                      onClickDecisiveAnchor={() => {}}
                      showConditionLabel
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

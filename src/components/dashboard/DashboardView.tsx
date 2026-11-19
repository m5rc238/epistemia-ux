import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  Download,
  FlaskConical,
  Trash2,
  XCircle,
} from 'lucide-react';
import { SIMULATED_REFERENCE_PILOT } from '../../data/referencePilotData';
import {
  computeCellMetrics,
  computeConditionMetrics,
  formatClassificationLabel,
  formatDurationSeconds,
  formatPercent,
} from '../../lib/scoring';
import { downloadTextFile, trialsToCsv } from '../../lib/storage';
import { TrialRecord } from '../../types/epistemia';
import { MetricsCharts } from './MetricsCharts';

interface DashboardViewProps {
  localTrials: TrialRecord[];
  onClearLocalTrials: () => void;
  onLaunchExperiment: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  localTrials,
  onClearLocalTrials,
  onLaunchExperiment,
}) => {
  const [includeDemo, setIncludeDemo] = useState<boolean>(true);
  const [includeSimulated, setIncludeSimulated] = useState<boolean>(
    () => localTrials.length === 0,
  );
  const [confirmClear, setConfirmClear] = useState<boolean>(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const filteredLocal = useMemo(
    () => localTrials.filter((t) => includeDemo || t.mode === 'participant'),
    [localTrials, includeDemo],
  );

  const activeTrials = useMemo(() => {
    return includeSimulated
      ? [...filteredLocal, ...SIMULATED_REFERENCE_PILOT]
      : filteredLocal;
  }, [filteredLocal, includeSimulated]);

  const convMetrics = useMemo(
    () => computeConditionMetrics(activeTrials, 'conventional'),
    [activeTrials],
  );
  const epistMetrics = useMemo(
    () => computeConditionMetrics(activeTrials, 'epistemic'),
    [activeTrials],
  );

  const cells = useMemo(
    () => [
      computeCellMetrics(activeTrials, 'conventional', 'decisive'),
      computeCellMetrics(activeTrials, 'conventional', 'non_decisive'),
      computeCellMetrics(activeTrials, 'epistemic', 'decisive'),
      computeCellMetrics(activeTrials, 'epistemic', 'non_decisive'),
    ],
    [activeTrials],
  );

  const participantCount = localTrials.filter((t) => t.mode === 'participant').length;
  const demoCount = localTrials.filter((t) => t.mode === 'demo').length;

  const handleExportCsv = () => {
    const csv = trialsToCsv(activeTrials);
    downloadTextFile(
      `epistemia-trials-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
      'text/csv;charset=utf-8;',
    );
  };

  const handleExportJson = () => {
    downloadTextFile(
      `epistemia-trials-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(activeTrials, null, 2),
      'application/json;charset=utf-8;',
    );
  };

  return (
    <div className="mx-auto max-w-[1320px] space-y-6 px-4 py-7 sm:px-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#0F6B6B]">
            Telemetry &amp; 2×2 Analysis
          </p>
          <h1 className="font-serif-display text-3xl font-medium text-[#1C1B18]">
            Researcher Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#57534E]">
            Local storage holds{' '}
            <strong className="font-mono-tech text-[#1C1B18]">{participantCount}</strong>{' '}
            {participantCount === 1 ? 'participant trial' : 'participant trials'} and{' '}
            <strong className="font-mono-tech text-[#1C1B18]">{demoCount}</strong>{' '}
            {demoCount === 1 ? 'demo trial' : 'demo trials'}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={activeTrials.length === 0}
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E1D6] bg-white px-3 py-2 text-xs font-medium text-[#1C1B18] transition-colors hover:border-[#0F6B6B] disabled:opacity-45"
          >
            <Download className="h-3.5 w-3.5 text-[#0F6B6B]" />
            Export CSV
          </button>
          <button
            type="button"
            disabled={activeTrials.length === 0}
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E1D6] bg-white px-3 py-2 text-xs font-medium text-[#1C1B18] transition-colors hover:border-[#0F6B6B] disabled:opacity-45"
          >
            <Download className="h-3.5 w-3.5 text-[#57534E]" />
            Export JSON
          </button>

          {localTrials.length > 0 && !confirmClear && (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#FEE2E2] bg-white px-3 py-2 text-xs font-medium text-[#B91C1C] hover:bg-[#FEF2F2]"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Local
            </button>
          )}
          {confirmClear && (
            <div className="flex items-center gap-1.5 rounded-md border border-[#FEE2E2] bg-[#FEF2F2] px-2.5 py-1.5 text-xs">
              <span className="font-medium text-[#B91C1C]">Delete local trials?</span>
              <button
                type="button"
                onClick={() => {
                  onClearLocalTrials();
                  setConfirmClear(false);
                }}
                className="rounded bg-[#B91C1C] px-2 py-0.5 font-medium text-white"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="rounded border border-[#E6E1D6] bg-white px-2 py-0.5 text-[#57534E]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scope Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E6E1D6] bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 font-mono-tech font-semibold uppercase text-[#57534E]">
            <Database className="h-3.5 w-3.5 text-[#0F6B6B]" />
            Dataset Scope ({activeTrials.length}{' '}
            {activeTrials.length === 1 ? 'trial' : 'trials'} active):
          </span>

          <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B18]">
            <input
              type="checkbox"
              checked={includeDemo}
              onChange={(e) => setIncludeDemo(e.target.checked)}
              className="h-4 w-4 rounded accent-[#0F6B6B]"
            />
            Include Demo Runs ({demoCount})
          </label>

          <label className="inline-flex cursor-pointer items-center gap-2 text-[#1C1B18]">
            <input
              type="checkbox"
              checked={includeSimulated}
              onChange={(e) => setIncludeSimulated(e.target.checked)}
              className="h-4 w-4 rounded accent-[#B45309]"
            />
            <span>Include Simulated Reference Cohort (n = 24)</span>
            <span className="rounded border border-[#FEF3C7] bg-[#FFFBEB] px-1.5 py-0.5 font-mono-tech text-[10px] font-medium text-[#92400E]">
              ILLUSTRATIVE SIMULATED
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={onLaunchExperiment}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#0F6B6B] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0B5353]"
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Run New Trial
        </button>
      </div>

      {/* 4 KPI Comparison Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#E6E1D6] bg-white p-4">
          <div className="text-xs font-medium text-[#8A8478]">Overall Appropriate Revision</div>
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <div className="font-mono-tech text-2xl font-semibold text-[#0F6B6B]">
                {formatPercent(epistMetrics.appropriateRate)}
              </div>
              <div className="text-[11px] text-[#57534E]">Epistemic-Scaffolded</div>
            </div>
            <div className="text-right">
              <div className="font-mono-tech text-lg font-semibold text-[#C2410C]">
                {formatPercent(convMetrics.appropriateRate)}
              </div>
              <div className="text-[11px] text-[#8A8478]">Conventional</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E6E1D6] bg-white p-4">
          <div className="text-xs font-medium text-[#8A8478]">
            Decisive Sensitivity (Revises Broken Claims)
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <div className="font-mono-tech text-2xl font-semibold text-[#0F6B6B]">
                {formatPercent(epistMetrics.decisiveSensitivity)}
              </div>
              <div className="text-[11px] text-[#57534E]">Epistemic-Scaffolded</div>
            </div>
            <div className="text-right">
              <div className="font-mono-tech text-lg font-semibold text-[#C2410C]">
                {formatPercent(convMetrics.decisiveSensitivity)}
              </div>
              <div className="text-[11px] text-[#8A8478]">Conventional</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E6E1D6] bg-white p-4">
          <div className="text-xs font-medium text-[#8A8478]">
            Non-Decisive Specificity (No Blanket Skepticism)
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <div className="font-mono-tech text-2xl font-semibold text-[#0F6B6B]">
                {formatPercent(epistMetrics.nonDecisiveSpecificity)}
              </div>
              <div className="text-[11px] text-[#57534E]">Epistemic-Scaffolded</div>
            </div>
            <div className="text-right">
              <div className="font-mono-tech text-lg font-semibold text-[#C2410C]">
                {formatPercent(convMetrics.nonDecisiveSpecificity)}
              </div>
              <div className="text-[11px] text-[#8A8478]">Conventional</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E6E1D6] bg-white p-4">
          <div className="text-xs font-medium text-[#8A8478]">
            Median Effort &amp; Discrimination (J)
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <div className="font-mono-tech text-2xl font-semibold text-[#1C1B18]">
                {formatDurationSeconds(epistMetrics.medianTotalTimeMs)}
              </div>
              <div className="text-[11px] text-[#0F6B6B]">
                Epist. J ={' '}
                {epistMetrics.discriminationIndex !== null
                  ? epistMetrics.discriminationIndex.toFixed(2)
                  : '—'}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono-tech text-lg font-semibold text-[#57534E]">
                {formatDurationSeconds(convMetrics.medianTotalTimeMs)}
              </div>
              <div className="text-[11px] text-[#C2410C]">
                Conv. J ={' '}
                {convMetrics.discriminationIndex !== null
                  ? convMetrics.discriminationIndex.toFixed(2)
                  : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom SVG Charts */}
      <MetricsCharts
        conventional={convMetrics}
        epistemic={epistMetrics}
        trials={activeTrials}
      />

      {/* 2x2 Cell Matrix */}
      <div className="overflow-hidden rounded-xl border border-[#E6E1D6] bg-white shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
        <div className="border-b border-[#E6E1D6] bg-[#F3EFE7]/65 px-5 py-3">
          <h2 className="font-serif-display text-lg font-medium text-[#1C1B18]">
            2×2 Factorial Cell Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E1D6] bg-[#FAF8F4] font-mono-tech text-[11px] uppercase text-[#57534E]">
                <th className="px-4 py-3">Summary Condition</th>
                <th className="px-4 py-3">Correction Type</th>
                <th className="px-4 py-3">n</th>
                <th className="px-4 py-3">Appropriate %</th>
                <th className="px-4 py-3">Mean Pre → Post</th>
                <th className="px-4 py-3">Mean Δ</th>
                <th className="px-4 py-3">Median Time</th>
                <th className="px-4 py-3">Decisive Inspected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1D6]">
              {cells.map((c) => (
                <tr key={`${c.summaryCondition}-${c.correctionType}`} className="hover:bg-[#FAF8F4]">
                  <td className="px-4 py-3 font-medium text-[#1C1B18]">
                    {c.summaryCondition === 'epistemic'
                      ? 'Epistemic-Scaffolded'
                      : 'Conventional'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 font-mono-tech text-[11px] font-medium ${
                        c.correctionType === 'decisive'
                          ? 'bg-[#FEE2E2] text-[#B91C1C]'
                          : 'bg-[#EEF2FF] text-[#3730A3]'
                      }`}
                    >
                      {c.correctionType === 'decisive' ? 'Decisive' : 'Non-Decisive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-tech">{c.count}</td>
                  <td className="px-4 py-3 font-mono-tech font-semibold text-[#1C1B18]">
                    {formatPercent(c.appropriateRate)}
                  </td>
                  <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                    {c.meanPreEndorsement !== null && c.meanPostEndorsement !== null
                      ? `${c.meanPreEndorsement.toFixed(1)} → ${c.meanPostEndorsement.toFixed(1)}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                    {c.meanDeltaEndorsement !== null
                      ? `${c.meanDeltaEndorsement >= 0 ? '+' : ''}${c.meanDeltaEndorsement.toFixed(2)}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                    {formatDurationSeconds(c.medianTotalTimeMs)}
                  </td>
                  <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                    {formatPercent(c.passageInspectionRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trial-by-Trial Audit Table */}
      <div className="overflow-hidden rounded-xl border border-[#E6E1D6] bg-white shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E1D6] bg-[#F3EFE7]/65 px-5 py-3">
          <h2 className="font-serif-display text-lg font-medium text-[#1C1B18]">
            Trial-by-Trial Audit &amp; Rationales
          </h2>
          <span className="text-xs text-[#8A8478]">Click any row to inspect written rationale</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6E1D6] bg-[#FAF8F4] font-mono-tech text-[11px] uppercase text-[#57534E]">
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Paper</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Correction</th>
                <th className="px-4 py-3">Pre → Post</th>
                <th className="px-4 py-3">Outcome</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1D6]">
              {activeTrials.map((trial) => {
                const expanded = expandedRowId === trial.id;
                const totalMs = trial.initialReadingTimeMs + trial.revisionReadingTimeMs;
                return (
                  <React.Fragment key={trial.id}>
                    <tr
                      onClick={() => setExpandedRowId(expanded ? null : trial.id)}
                      className="cursor-pointer transition-colors hover:bg-[#FAF8F4]"
                    >
                      <td className="px-4 py-3">
                        {trial.isSimulated ? (
                          <span className="rounded border border-[#FEF3C7] bg-[#FFFBEB] px-1.5 py-0.5 font-mono-tech text-[10px] text-[#92400E]">
                            simulated
                          </span>
                        ) : (
                          <span className="rounded border border-[#E6E1D6] bg-[#E8F4F4] px-1.5 py-0.5 font-mono-tech text-[10px] text-[#0F6B6B]">
                            {trial.mode}
                          </span>
                        )}
                      </td>
                      <td className="max-w-[210px] truncate px-4 py-3 font-medium text-[#1C1B18]">
                        {trial.paperId}
                      </td>
                      <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                        {trial.summaryCondition}
                      </td>
                      <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                        {trial.correctionType}
                      </td>
                      <td className="px-4 py-3 font-mono-tech text-[#1C1B18]">
                        {trial.preEndorsement} → {trial.postEndorsement} ({trial.categoricalChoice})
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            trial.appropriate
                              ? 'bg-[#E8F4F4] text-[#0F6B6B]'
                              : 'bg-[#FEF2F2] text-[#B91C1C]'
                          }`}
                        >
                          {trial.appropriate ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {formatClassificationLabel(trial.classification)}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono-tech text-[#57534E]">
                        {formatDurationSeconds(totalMs)}
                      </td>
                      <td className="px-4 py-3 text-right text-[#8A8478]">
                        {expanded ? (
                          <ChevronUp className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        )}
                      </td>
                    </tr>
                    {expanded && (
                      <tr className="bg-[#FAF8F4]">
                        <td colSpan={8} className="px-6 py-3.5 text-xs">
                          <div className="flex flex-wrap justify-between gap-2 text-[#57534E]">
                            <span>
                              <strong className="text-[#1C1B18]">Rationale:</strong> “
                              {trial.rationale}”
                            </span>
                            <span className="font-mono-tech text-[11px]">
                              Anchor clicks: {trial.passageLinkClicks} · Decisive inspected:{' '}
                              {trial.decisivePassageInspected ? 'Yes' : 'No'} · Re-checked:{' '}
                              {trial.reinspectedAfterCorrection ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {activeTrials.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-[#8A8478]">
                    No recorded trials match the active filters. Run a pilot session or toggle on
                    the simulated reference cohort above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

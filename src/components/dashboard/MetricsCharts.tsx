import React from 'react';
import { ConditionMetrics, TrialRecord } from '../../types/epistemia';

interface MetricsChartsProps {
  conventional: ConditionMetrics;
  epistemic: ConditionMetrics;
  trials: TrialRecord[];
}

export const MetricsCharts: React.FC<MetricsChartsProps> = ({
  conventional,
  epistemic,
  trials,
}) => {
  const barMetrics = [
    {
      label: 'Appropriate Revision',
      conv: conventional.appropriateRate ?? 0,
      epist: epistemic.appropriateRate ?? 0,
    },
    {
      label: 'Decisive Sensitivity',
      conv: conventional.decisiveSensitivity ?? 0,
      epist: epistemic.decisiveSensitivity ?? 0,
    },
    {
      label: 'Non-Decisive Specificity',
      conv: conventional.nonDecisiveSpecificity ?? 0,
      epist: epistemic.nonDecisiveSpecificity ?? 0,
    },
    {
      label: 'Passage Inspection',
      conv: conventional.passageInspectionRate ?? 0,
      epist: epistemic.passageInspectionRate ?? 0,
    },
  ];

  // Scatter / Strip plot calculations
  const maxTimeSec = Math.max(
    90,
    ...trials.map((t) => Math.ceil((t.initialReadingTimeMs + t.revisionReadingTimeMs) / 1000)),
  );
  const roundedMaxSec = Math.ceil(maxTimeSec / 15) * 15;

  const plotLeft = 92;
  const plotRight = 465;
  const plotWidth = plotRight - plotLeft;

  const scaleX = (sec: number) => plotLeft + (Math.min(sec, roundedMaxSec) / roundedMaxSec) * plotWidth;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Chart 1: Grouped Metric Comparison */}
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-serif-display text-lg font-medium text-[#1C1B18]">
              Condition Calibration Profile
            </h3>
            <p className="text-xs text-[#8A8478]">
              Sensitivity, Specificity &amp; Evidence Inspection (% of trials)
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-[#57534E]">
              <span className="h-2.5 w-2.5 rounded-xs bg-[#C2410C]" />
              Conventional (n={conventional.count})
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#0F6B6B] font-medium">
              <span className="h-2.5 w-2.5 rounded-xs bg-[#0F6B6B]" />
              Epistemic (n={epistemic.count})
            </span>
          </div>
        </div>

        <svg viewBox="0 0 480 220" className="mt-4 w-full" role="img" aria-label="Condition metrics bar chart">
          {/* Vertical gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const x = 155 + tick * 280;
            return (
              <g key={tick}>
                <line x1={x} y1={16} x2={x} y2={190} stroke="#E6E1D6" strokeDasharray="2 2" />
                <text x={x} y={208} textAnchor="middle" fontSize="10" fill="#8A8478">
                  {Math.round(tick * 100)}%
                </text>
              </g>
            );
          })}

          {barMetrics.map((m, idx) => {
            const yBase = 24 + idx * 43;
            const convW = Math.max(0, m.conv * 280);
            const epistW = Math.max(0, m.epist * 280);

            return (
              <g key={m.label}>
                <text x="6" y={yBase + 16} fontSize="11" fontWeight="500" fill="#1C1B18">
                  {m.label}
                </text>

                {/* Conventional bar */}
                <rect x="155" y={yBase} width={convW} height="12" rx="2" fill="#C2410C" opacity="0.88" />
                <text x={159 + convW} y={yBase + 10} fontSize="10" fill="#C2410C" fontWeight="600">
                  {conventional.count > 0 ? `${Math.round(m.conv * 100)}%` : '—'}
                </text>

                {/* Epistemic bar */}
                <rect x="155" y={yBase + 15} width={epistW} height="12" rx="2" fill="#0F6B6B" />
                <text x={159 + epistW} y={yBase + 25} fontSize="10" fill="#0F6B6B" fontWeight="600">
                  {epistemic.count > 0 ? `${Math.round(m.epist * 100)}%` : '—'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart 2: Effort-Judgment Frontier (Reading Time vs Outcome) */}
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-serif-display text-lg font-medium text-[#1C1B18]">
              Effort–Judgment Frontier
            </h3>
            <p className="text-xs text-[#8A8478]">
              Total reading + revision time (seconds) by epistemic outcome
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-[#57534E]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#C2410C]" />
              Conventional
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#0F6B6B] font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0F6B6B]" />
              Epistemic
            </span>
          </div>
        </div>

        <svg viewBox="0 0 485 220" className="mt-4 w-full" role="img" aria-label="Effort judgment scatter plot">
          {/* Horizontal Swimlane bands */}
          {[
            { label: 'Appropriate', y: 48, bg: '#F4FBFB' },
            { label: 'Epist. Inertia', y: 102, bg: '#FFF9F6' },
            { label: 'Skeptic / Abst.', y: 156, bg: '#FAF8F4' },
          ].map((lane) => (
            <g key={lane.label}>
              <rect x={plotLeft} y={lane.y - 22} width={plotWidth} height={44} rx="4" fill={lane.bg} />
              <text x="6" y={lane.y + 4} fontSize="10.5" fontWeight="500" fill="#1C1B18">
                {lane.label}
              </text>
            </g>
          ))}

          {/* X-axis ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const sec = Math.round(frac * roundedMaxSec);
            const x = scaleX(sec);
            return (
              <g key={sec}>
                <line x1={x} y1={22} x2={x} y2={184} stroke="#E6E1D6" strokeDasharray="2 2" />
                <text x={x} y={204} textAnchor="middle" fontSize="10" fill="#8A8478">
                  {sec}s
                </text>
              </g>
            );
          })}

          {/* Trial points with deterministic vertical jitter */}
          {trials.map((t, i) => {
            const totalSec = (t.initialReadingTimeMs + t.revisionReadingTimeMs) / 1000;
            const x = scaleX(totalSec);
            const baseLaneY = t.appropriate
              ? 48
              : t.classification === 'epistemic_inertia'
                ? 102
                : 156;
            const condOffset = t.summaryCondition === 'epistemic' ? -7 : 7;
            const microJitter = ((i % 5) - 2) * 2.2;
            const cy = baseLaneY + condOffset + microJitter;
            const fill = t.summaryCondition === 'epistemic' ? '#0F6B6B' : '#C2410C';

            return (
              <circle
                key={t.id}
                cx={x}
                cy={cy}
                r={t.isSimulated ? 4.2 : 5.5}
                fill={fill}
                fillOpacity={t.isSimulated ? 0.7 : 0.95}
                stroke="#FFFFFF"
                strokeWidth={t.isSimulated ? 1 : 1.5}
              >
                <title>
                  {`${t.summaryCondition} × ${t.correctionType} | ${Math.round(totalSec)}s | ${t.classification}${t.isSimulated ? ' (simulated)' : ''}`}
                </title>
              </circle>
            );
          })}

          {trials.length === 0 && (
            <text x={275} y={108} textAnchor="middle" fontSize="11" fill="#8A8478">
              No trials in selected scope yet.
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};

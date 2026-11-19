import React, { useState } from 'react';
import { Activity, CheckCircle2, Search, ShieldOff } from 'lucide-react';
import { FaultLineSpec } from '../../../types/epistemia';
import { FaultLineShell, ScoreCheckItem } from '../FaultLineShell';

type TaskRegime = 'in_dist' | 'shifted';

export const MetacognitionDemo: React.FC<{ spec: FaultLineSpec }> = ({ spec }) => {
  const [regime, setRegime] = useState<TaskRegime>('shifted');
  const [evidenceRetrieved, setEvidenceRetrieved] = useState<boolean>(false);

  const controls = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setRegime('in_dist');
            setEvidenceRetrieved(false);
          }}
          className={`rounded-lg border px-3 py-2 text-left transition-all ${
            regime === 'in_dist'
              ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
              : 'border-[#E6E1D6] bg-white/75 hover:bg-white'
          }`}
        >
          <div className="text-xs font-semibold text-[#1C1B18]">
            1. In-Distribution Task (Adult Dosing)
          </div>
          <div className="text-[11px] text-[#57534E]">
            Calibrated on 2,000 held-out formulary records
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setRegime('shifted');
            setEvidenceRetrieved(false);
          }}
          className={`rounded-lg border px-3 py-2 text-left transition-all ${
            regime === 'shifted'
              ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
              : 'border-[#E6E1D6] bg-white/75 hover:bg-white'
          }`}
        >
          <div className="text-xs font-semibold text-[#1C1B18]">
            2. Unfamiliar Task Shift (Pediatric CYP2D6 *4)
          </div>
          <div className="text-[11px] text-[#57534E]">
            Out-of-distribution edge case where token confidence degrades
          </div>
        </button>
      </div>

      {regime === 'shifted' && (
        <button
          type="button"
          onClick={() => setEvidenceRetrieved((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
            evidenceRetrieved
              ? 'border border-[#0F6B6B] bg-[#E8F4F4] text-[#0F6B6B]'
              : 'bg-[#0F6B6B] text-white hover:bg-[#0B5353]'
          }`}
        >
          <Search className="h-3.5 w-3.5" />
          {evidenceRetrieved
            ? 'Reset Evidence Lookup'
            : 'Execute Seek-Evidence Lookup (CPIC Table)'}
        </button>
      )}
    </div>
  );

  // Error rates at matched 70% coverage
  const convErrorAt70 = regime === 'in_dist' ? 14 : 31;
  const epistErrorAt70 = regime === 'in_dist' ? 5 : 8;

  const conventionalContent = (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#C2410C]">Forced Single-Mode Output (Always Answers)</span>
          <span className="font-mono-tech text-[11px] text-[#57534E]">
            Token Confidence: {regime === 'in_dist' ? '92%' : '89% (Miscalibrated!)'}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#1C1B18]">
          {regime === 'in_dist'
            ? '“Standard adult maintenance dose is 40 mg daily.”'
            : '“Administer standard weight-adjusted 20 mg daily regardless of CYP2D6 *4 status.” (HALLUCINATED — unsafe for poor metabolizers)'}
        </p>
      </div>

      <div className="rounded-md border border-[#E6E1D6] bg-white p-3 text-xs text-[#57534E]">
        No <code className="font-mono-tech">Seek Evidence</code> or{' '}
        <code className="font-mono-tech">Abstain</code> route exists; under task shift, token
        probability stays deceptively high (89%).
      </div>
    </div>
  );

  const epistemicContent = (
    <div className="space-y-3">
      {/* Tri-modal Router Display */}
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            {
              id: 'answer',
              label: 'ANSWER',
              active: regime === 'in_dist' || evidenceRetrieved,
              icon: <CheckCircle2 className="h-3.5 w-3.5" />,
            },
            {
              id: 'seek',
              label: 'SEEK EVIDENCE',
              active: regime === 'shifted' && !evidenceRetrieved,
              icon: <Search className="h-3.5 w-3.5" />,
            },
            {
              id: 'abstain',
              label: 'ABSTAIN',
              active: false,
              icon: <ShieldOff className="h-3.5 w-3.5" />,
            },
          ] as const
        ).map((mode) => (
          <div
            key={mode.id}
            className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 font-mono-tech text-[11px] font-semibold ${
              mode.active
                ? mode.id === 'seek'
                  ? 'border-[#B45309] bg-[#FEF3C7] text-[#B45309]'
                  : 'border-[#0F6B6B] bg-[#E8F4F4] text-[#0F6B6B]'
                : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#8A8478] opacity-60'
            }`}
          >
            {mode.icon}
            {mode.label}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#0F6B6B]/30 bg-white p-3.5 text-sm leading-relaxed text-[#1C1B18]">
        {regime === 'in_dist' && (
          <>
            <span className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
              Calibrated Answer (Held-Out Error 5%)
            </span>
            <p className="mt-1">Standard adult maintenance dose is 40 mg daily (Formulary §4.2).</p>
          </>
        )}
        {regime === 'shifted' && !evidenceRetrieved && (
          <>
            <span className="font-mono-tech text-[10px] font-semibold uppercase text-[#B45309]">
              Task Shift Detected → Routed to SEEK EVIDENCE
            </span>
            <p className="mt-1 text-xs leading-relaxed">
              Pediatric CYP2D6 *4 lies outside calibrated adult training distribution (domain shift
              score elevated). Instead of guessing or needlessly refusing permanently, query the{' '}
              <strong>CPIC Pharmacogenomics Guideline</strong> to resolve.
            </p>
          </>
        )}
        {regime === 'shifted' && evidenceRetrieved && (
          <>
            <span className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
              Resolved via Evidence Retrieval (CPIC-2026)
            </span>
            <p className="mt-1 text-xs leading-relaxed">
              <strong>Contraindicated / Reduce 50%:</strong> CYP2D6 *4/*4 poor metabolizers require
              alternative therapy or 50% dose reduction with TDM monitoring.
            </p>
          </>
        )}
      </div>

      {/* Matched-Coverage Error Reduction SVG */}
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-[#57534E]">
          <span className="inline-flex items-center gap-1">
            <Activity className="h-3.5 w-3.5 text-[#0F6B6B]" />
            Error Rate at Matched Coverage (70% Answered)
          </span>
          <span className="font-mono-tech text-[#0F6B6B]">
            {regime === 'shifted' && evidenceRetrieved
              ? 'Seek Evidence lifted safe coverage 60% → 85%'
              : `-${convErrorAt70 - epistErrorAt70} pp error`}
          </span>
        </div>
        <svg viewBox="0 0 320 62" className="h-14 w-full">
          {/* Conventional bar */}
          <text x="0" y="17" fontSize="10" fill="#57534E">
            Uncalibrated ({convErrorAt70}% err)
          </text>
          <rect x="135" y="7" width={convErrorAt70 * 4.2} height="13" rx="2" fill="#C2410C" />

          {/* Epistemic calibrated bar */}
          <text x="0" y="45" fontSize="10" fill="#0F6B6B" fontWeight="600">
            Calibrated Router ({epistErrorAt70}% err)
          </text>
          <rect x="135" y="35" width={epistErrorAt70 * 4.2} height="13" rx="2" fill="#0F6B6B" />
        </svg>
      </div>
    </div>
  );

  const checks: ScoreCheckItem[] = [
    {
      label: 'Lower Error at Matched Coverage (Prevents Gaming via Blanket Abstention)',
      conventionalPass: false,
      conventionalNote: `FAILS — ${convErrorAt70}% error at 70% answered fraction`,
      epistemicPass: true,
      epistemicNote: `PASS — drops error to ${epistErrorAt70}% at matched 70% coverage`,
    },
    {
      label: 'Evidence-Seeking Rescues Abstentions Under Task Shift',
      conventionalPass: false,
      conventionalNote: 'FAILS — forced confidence emits unsafe dosing guess',
      epistemicPass: true,
      epistemicNote:
        regime === 'shifted' && evidenceRetrieved
          ? 'PASS — Seek Evidence resolved edge case safely'
          : 'PASS — flags task shift and offers targeted retrieval',
    },
  ];

  return (
    <FaultLineShell
      spec={spec}
      controls={controls}
      conventionalContent={conventionalContent}
      epistemicContent={epistemicContent}
      checks={checks}
    />
  );
};

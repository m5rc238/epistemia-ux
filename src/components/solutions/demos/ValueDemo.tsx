import React, { useState } from 'react';
import { CheckCircle2, Gavel, MailCheck, Scale, UserCheck } from 'lucide-react';
import { FaultLineSpec } from '../../../types/epistemia';
import { FaultLineShell, ScoreCheckItem } from '../FaultLineShell';

type ChallengeStage = 'initial' | 'submitted' | 'reviewed' | 'notified';

export const ValueDemo: React.FC<{ spec: FaultLineSpec }> = ({ spec }) => {
  const [equityWeight, setEquityWeight] = useState<number>(40);
  const [challengeStage, setChallengeStage] = useState<ChallengeStage>('initial');

  // Threshold: if equity weight >= 55%, hardship exception reverses rigid income cutoff
  const automatedDecision =
    equityWeight >= 55 ? 'APPROVED (Hardship Weighting)' : 'DENIED (Strict Income Cutoff)';
  const finalStatus =
    challengeStage === 'notified'
      ? 'REVERSED → APPROVED (Exception Granted & Applicant Notified)'
      : automatedDecision;

  const controls = (
    <div className="space-y-4">
      {/* Value-Weighting Slider */}
      <div className="rounded-lg border border-[#E6E1D6] bg-white p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="value-weight-slider" className="text-xs font-semibold text-[#1C1B18]">
            Competing Value Weighting: Fiscal Strictness vs. Medical-Hardship Equity
          </label>
          <span className="font-mono-tech text-xs font-semibold text-[#0F6B6B]">
            Equity Weight: {equityWeight}% (Flip Threshold: 55%)
          </span>
        </div>
        <input
          id="value-weight-slider"
          type="range"
          min={0}
          max={100}
          step={5}
          value={equityWeight}
          onChange={(e) => setEquityWeight(Number(e.target.value))}
          className="mt-2 w-full accent-[#0F6B6B]"
        />
        <div className="flex justify-between text-[11px] text-[#8A8478]">
          <span>0% (Pure Fiscal Strictness)</span>
          <span>55% Decision Boundary</span>
          <span>100% (Max Vulnerability Equity)</span>
        </div>
      </div>

      {/* End-to-End Challenge Stepper */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-[#57534E]">Run Valid Challenge End-to-End:</span>
        <button
          type="button"
          onClick={() => setChallengeStage('submitted')}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
            challengeStage === 'submitted'
              ? 'border-[#0F6B6B] bg-[#0F6B6B] text-white'
              : 'border-[#E6E1D6] bg-white text-[#1C1B18] hover:border-[#0F6B6B]'
          }`}
        >
          1. Applicant Files Challenge
        </button>
        <button
          type="button"
          disabled={challengeStage === 'initial'}
          onClick={() => setChallengeStage('reviewed')}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-45 ${
            challengeStage === 'reviewed'
              ? 'border-[#0F6B6B] bg-[#0F6B6B] text-white'
              : 'border-[#E6E1D6] bg-white text-[#1C1B18] hover:border-[#0F6B6B]'
          }`}
        >
          2. Named Reviewer Audits Rule &amp; Evidence
        </button>
        <button
          type="button"
          disabled={challengeStage !== 'reviewed' && challengeStage !== 'notified'}
          onClick={() => setChallengeStage('notified')}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-45 ${
            challengeStage === 'notified'
              ? 'border-[#0F6B6B] bg-[#0F6B6B] text-white'
              : 'border-[#E6E1D6] bg-white text-[#1C1B18] hover:border-[#0F6B6B]'
          }`}
        >
          3. Reverse &amp; Notify Affected Person
        </button>
        {challengeStage !== 'initial' && (
          <button
            type="button"
            onClick={() => setChallengeStage('initial')}
            className="text-xs text-[#8A8478] underline hover:text-[#1C1B18]"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );

  const conventionalContent = (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-4">
        <div className="font-mono-tech text-[11px] font-semibold uppercase text-[#C2410C]">
          Opaque Automated Determination
        </div>
        <div className="mt-1.5 text-sm font-semibold text-[#1C1B18]">
          Emergency Housing Grant: DENIED (Score 0.43 &lt; 0.50)
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#57534E]">
          “Based on our holistic model evaluation, your application does not meet current
          eligibility criteria. Thank you for applying.”
        </p>
      </div>

      <ul className="space-y-1.5 rounded-lg border border-[#E6E1D6] bg-white p-3 text-xs text-[#57534E]">
        <li>• No governing policy rule or chooser named</li>
        <li>• Value trade-offs buried inside opaque score weights</li>
        <li>• No route to submit hospital invoice evidence or reach a human decision-maker</li>
      </ul>
    </div>
  );

  const epistemicContent = (
    <div className="space-y-3">
      {/* Explicit Governing Standard Charter */}
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3 text-xs">
        <div className="flex items-center gap-1.5 font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
          <Scale className="h-3.5 w-3.5" />
          Governing Standard Charter
        </div>
        <div className="mt-1.5 grid gap-1.5 sm:grid-cols-3">
          <div>
            <span className="text-[#8A8478]">Standard:</span>{' '}
            <strong className="text-[#1C1B18]">POL-2026-4B</strong>
          </div>
          <div>
            <span className="text-[#8A8478]">Chosen By:</span>{' '}
            <strong className="text-[#1C1B18]">Municipal Housing Board</strong>
          </div>
          <div>
            <span className="text-[#8A8478]">Exception Power:</span>{' '}
            <strong className="text-[#1C1B18]">Dr. N. Alverez (Ombuds)</strong>
          </div>
        </div>
      </div>

      {/* Decision Banner */}
      <div
        className={`rounded-lg border p-3 text-xs ${
          challengeStage === 'notified' || equityWeight >= 55
            ? 'border-[#0F6B6B]/40 bg-[#E8F4F4]/55 text-[#0F6B6B]'
            : 'border-[#B45309]/40 bg-[#FEF3C7]/45 text-[#92400E]'
        }`}
      >
        <div className="font-mono-tech text-[10px] font-semibold uppercase">Current Status</div>
        <div className="mt-0.5 text-sm font-semibold">{finalStatus}</div>
        <div className="mt-1 text-[#57534E]">
          Rule cited: Gross income \$42 above \$2,100 cap; medical-hardship offset disabled below
          55% equity weight.
        </div>
      </div>

      {/* Challenge Audit Trail */}
      {challengeStage !== 'initial' && (
        <div className="space-y-2 rounded-lg border border-[#0F6B6B]/30 bg-white p-3 text-xs">
          <div className="flex items-start gap-2">
            <Gavel className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F6B6B]" />
            <div>
              <strong>Challenge #CH-902 Filed:</strong> Applicant attached Oncology Billing
              Deduction (\$340/mo) reducing net disposable income below threshold.
            </div>
          </div>

          {(challengeStage === 'reviewed' || challengeStage === 'notified') && (
            <div className="flex items-start gap-2 border-t border-[#E6E1D6] pt-2">
              <UserCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F6B6B]" />
              <div>
                <strong>Reviewer Audit (Dr. N. Alverez):</strong> Verified Rule POL-2026-4B §3(c)
                medical deduction &amp; authenticated clinic receipt. Decision reversed.
              </div>
            </div>
          )}

          {challengeStage === 'notified' && (
            <div className="flex items-start gap-2 border-t border-[#E6E1D6] pt-2 text-[#0F6B6B]">
              <MailCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <div>
                <strong>Correction Delivered:</strong> Disbursement queue updated &amp; signed
                reversal notice sent to applicant portal + SMS.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const checks: ScoreCheckItem[] = [
    {
      label: 'Standard & Value-Weight Transparency (Rule + Chooser + Trade-off)',
      conventionalPass: false,
      conventionalNote: 'FAILS — opaque 0.43 score hides rule & policy owner',
      epistemicPass: true,
      epistemicNote: 'PASS — names POL-2026-4B, Housing Board, and 55% flip point',
    },
    {
      label: 'End-to-End Challenge Verification (Identify → Reverse → Notify)',
      conventionalPass: false,
      conventionalNote: 'FAILS — dead-end rejection with no appeal authority',
      epistemicPass: challengeStage === 'notified',
      epistemicNote:
        challengeStage === 'notified'
          ? 'PASS — all 3 end-to-end challenge gates verified'
          : 'Run Steps 1 → 2 → 3 above to complete reversal & delivery',
    },
  ];

  // Ensure CheckCircle2 isn't unused if not referenced in JSX
  void CheckCircle2;

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

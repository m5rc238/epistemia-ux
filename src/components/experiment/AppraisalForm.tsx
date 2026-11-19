import React, { useState } from 'react';
import { ArrowRight, Check, FileWarning, Lock } from 'lucide-react';
import {
  CategoricalDecision,
  CorrectionNotice,
} from '../../types/epistemia';

interface AppraisalFormProps {
  centralClaim: string;
  stage: 'initial' | 'revision';
  correctionNotice?: CorrectionNotice;
  initialEndorsement?: number;
  initialConfidence?: number;
  onSubmitInitial: (endorsement: number, confidence: number) => void;
  onSubmitRevision: (data: {
    postEndorsement: number;
    postConfidence: number;
    categoricalChoice: CategoricalDecision;
    rationale: string;
  }) => void;
}

const SCALE_POINTS = [1, 2, 3, 4, 5, 6, 7];

export const AppraisalForm: React.FC<AppraisalFormProps> = ({
  centralClaim,
  stage,
  correctionNotice,
  initialEndorsement = 5,
  initialConfidence = 75,
  onSubmitInitial,
  onSubmitRevision,
}) => {
  const [preScore, setPreScore] = useState<number>(5);
  const [preConf, setPreConf] = useState<number>(75);

  const [postScore, setPostScore] = useState<number>(initialEndorsement);
  const [postConf, setPostConf] = useState<number>(initialConfidence);
  const [categoricalChoice, setCategoricalChoice] = useState<CategoricalDecision | null>(null);
  const [rationale, setRationale] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (stage === 'initial') {
    return (
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
        <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-3">
          <span className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#0F6B6B]">
            Stage 1 · Initial Appraisal
          </span>
          <span className="text-xs text-[#8A8478]">Rate before erratum check</span>
        </div>

        <div className="mt-3 rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8478]">
            Central Claim Under Evaluation
          </div>
          <p className="mt-1 text-sm font-medium leading-snug text-[#1C1B18]">{centralClaim}</p>
        </div>

        {/* 1-7 Likert Scale */}
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-semibold text-[#1C1B18]">
            How strongly does the reported evidence support this conclusion?
          </label>
          <div className="grid grid-cols-7 gap-1.5">
            {SCALE_POINTS.map((val) => {
              const selected = preScore === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPreScore(val)}
                  className={`flex h-10 flex-col items-center justify-center rounded-md border font-mono-tech text-sm font-semibold transition-all ${
                    selected
                      ? 'border-[#0F6B6B] bg-[#0F6B6B] text-white shadow-xs'
                      : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#57534E] hover:border-[#0F6B6B]/50 hover:text-[#1C1B18]'
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-[#8A8478]">
            <span>1 = Strongly unsupported</span>
            <span>4 = Uncertain</span>
            <span>7 = Strongly supported</span>
          </div>
        </div>

        {/* 0-100% Confidence */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="pre-confidence" className="font-semibold text-[#1C1B18]">
              Confidence in your rating
            </label>
            <span className="font-mono-tech font-semibold text-[#0F6B6B]">{preConf}%</span>
          </div>
          <input
            id="pre-confidence"
            type="range"
            min={0}
            max={100}
            step={5}
            value={preConf}
            onChange={(e) => setPreConf(Number(e.target.value))}
            className="w-full accent-[#0F6B6B]"
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setPostScore(preScore);
              setPostConf(preConf);
              onSubmitInitial(preScore, preConf);
            }}
            className="inline-flex items-center gap-2 rounded-md bg-[#1C1B18] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#33302B]"
          >
            <Lock className="h-3.5 w-3.5" />
            Lock Initial Judgment
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Stage 2: Post-Correction Revision
  const handleStage2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoricalChoice) {
      setValidationError('Please select whether to Revise/Weaken, Retain, or abstain as Uncertain.');
      return;
    }
    if (rationale.trim().length < 12) {
      setValidationError('Please write a brief explanation (at least 12 characters) for your judgment.');
      return;
    }
    setValidationError(null);
    onSubmitRevision({
      postEndorsement: postScore,
      postConfidence: postConf,
      categoricalChoice,
      rationale: rationale.trim(),
    });
  };

  return (
    <form
      onSubmit={handleStage2Submit}
      className="space-y-4 rounded-xl border border-[#E6E1D6] bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]"
    >
      {/* Prominent Official Correction Notice — Identical neutral/formal styling across both types */}
      {correctionNotice && (
        <div className="rounded-lg border-2 border-[#D97706]/50 bg-[#FFFBEB] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold uppercase tracking-wide text-[#92400E]">
              <FileWarning className="h-4 w-4 text-[#B45309]" />
              {correctionNotice.title}
            </span>
            <span className="font-mono-tech text-[10px] text-[#92400E]">
              {correctionNotice.noticeId} · {correctionNotice.publishedDate} · Ref{' '}
              {correctionNotice.targetSectionId}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#1C1B18]">{correctionNotice.body}</p>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-2.5">
        <span className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#B45309]">
          Stage 2 · Reassess Judgment
        </span>
        <span className="font-mono-tech text-xs text-[#57534E]">
          Initial rating locked: <strong>{initialEndorsement}/7</strong> ({initialConfidence}%)
        </span>
      </div>

      {/* Revised 1-7 Scale */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#1C1B18]">
          Revised endorsement of the central claim after reading this notice:
        </label>
        <div className="grid grid-cols-7 gap-1.5">
          {SCALE_POINTS.map((val) => {
            const selected = postScore === val;
            const wasInitial = initialEndorsement === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setPostScore(val)}
                className={`relative flex h-11 flex-col items-center justify-center rounded-md border font-mono-tech text-sm font-semibold transition-all ${
                  selected
                    ? 'border-[#0F6B6B] bg-[#0F6B6B] text-white shadow-xs'
                    : 'border-[#E6E1D6] bg-[#FAF8F4] text-[#57534E] hover:border-[#0F6B6B]/50 hover:text-[#1C1B18]'
                }`}
              >
                <span>{val}</span>
                {wasInitial && (
                  <span
                    className={`text-[9px] font-normal leading-none ${
                      selected ? 'text-[#E8F4F4]' : 'text-[#8A8478]'
                    }`}
                  >
                    prior
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[11px] text-[#8A8478]">
          <span>1 = Strongly unsupported</span>
          <span>4 = Uncertain</span>
          <span>7 = Strongly supported</span>
        </div>
      </div>

      {/* Categorical Revision Decision */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#1C1B18]">
          Your decision regarding the paper’s central conclusion:
        </label>
        <div className="grid gap-2 sm:grid-cols-3">
          {(
            [
              {
                id: 'revise',
                label: 'Revise / Weaken',
                sub: 'Notice undermines key evidence',
              },
              {
                id: 'retain',
                label: 'Retain Conclusion',
                sub: 'Core evidence remains intact',
              },
              {
                id: 'uncertain',
                label: 'Uncertain / Abstain',
                sub: 'Insufficient info to tell',
              },
            ] as const
          ).map((opt) => {
            const active = categoricalChoice === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setCategoricalChoice(opt.id);
                  setValidationError(null);
                }}
                className={`rounded-lg border p-3 text-left transition-all ${
                  active
                    ? 'border-[#0F6B6B] bg-[#E8F4F4]/60 ring-1 ring-[#0F6B6B]'
                    : 'border-[#E6E1D6] bg-[#FAF8F4] hover:border-[#C8C0B0]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#1C1B18]">
                  <span>{opt.label}</span>
                  {active && <Check className="h-3.5 w-3.5 text-[#0F6B6B]" />}
                </div>
                <div className="mt-0.5 text-[11px] text-[#57534E]">{opt.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Revised Confidence */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="post-confidence" className="font-semibold text-[#1C1B18]">
            Revised confidence
          </label>
          <span className="font-mono-tech font-semibold text-[#0F6B6B]">{postConf}%</span>
        </div>
        <input
          id="post-confidence"
          type="range"
          min={0}
          max={100}
          step={5}
          value={postConf}
          onChange={(e) => setPostConf(Number(e.target.value))}
          className="w-full accent-[#0F6B6B]"
        />
      </div>

      {/* Required Rationale */}
      <div className="space-y-1.5">
        <label htmlFor="revision-rationale" className="block text-xs font-semibold text-[#1C1B18]">
          Explain why the correction did or did not change the central conclusion:
        </label>
        <textarea
          id="revision-rationale"
          rows={3}
          value={rationale}
          onChange={(e) => {
            setRationale(e.target.value);
            if (validationError) setValidationError(null);
          }}
          placeholder="Cite the specific method detail, assumption, or passage that guided your decision..."
          className="w-full rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] px-3 py-2 text-sm text-[#1C1B18] placeholder:text-[#8A8478] focus:border-[#0F6B6B] focus:bg-white focus:outline-none"
        />
      </div>

      {validationError && (
        <div className="rounded-md border border-[#FEE2E2] bg-[#FEF2F2] px-3 py-2 text-xs font-medium text-[#B91C1C]">
          {validationError}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-[#0F6B6B] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0B5353]"
        >
          Submit Revised Judgment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

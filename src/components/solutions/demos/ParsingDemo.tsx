import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { FaultLineSpec } from '../../../types/epistemia';
import { FaultLineShell, ScoreCheckItem } from '../FaultLineShell';

type ParsingCaseId = 'active' | 'passive' | 'reversed' | 'ambiguous';

interface ParsingCase {
  id: ParsingCaseId;
  text: string;
  tag: string;
  truePayer: string;
  trueRecipient: string;
  ambiguousNote?: string;
}

const PARSING_CASES: ParsingCase[] = [
  {
    id: 'active',
    text: 'Ana paid Ben.',
    tag: 'Base Active Clause',
    truePayer: 'Ana',
    trueRecipient: 'Ben',
  },
  {
    id: 'passive',
    text: 'Ben was paid by Ana.',
    tag: 'Meaning-Preserving Paraphrase',
    truePayer: 'Ana',
    trueRecipient: 'Ben',
  },
  {
    id: 'reversed',
    text: 'Ben paid Ana.',
    tag: 'Minimal Meaning-Reversing Edit',
    truePayer: 'Ben',
    trueRecipient: 'Ana',
  },
  {
    id: 'ambiguous',
    text: 'Cancel the invoice Ana sent Ben before Friday.',
    tag: 'Structural Scope Ambiguity',
    truePayer: 'Ana (sender)',
    trueRecipient: 'Ben (recipient)',
    ambiguousNote:
      'Does "before Friday" filter which invoice to cancel, or set the cancellation deadline?',
  },
];

export const ParsingDemo: React.FC<{ spec: FaultLineSpec }> = ({ spec }) => {
  const [selectedId, setSelectedId] = useState<ParsingCaseId>('active');
  const [resolvedAmbiguity, setResolvedAmbiguity] = useState<'filter' | 'deadline' | null>(null);

  const activeCase = PARSING_CASES.find((c) => c.id === selectedId) ?? PARSING_CASES[0];

  // A brittle surface-order heuristic always guesses first noun = payer
  const convPayer =
    activeCase.id === 'active'
      ? 'Ana'
      : activeCase.id === 'passive'
        ? 'Ben (WRONG — misled by subject position)'
        : activeCase.id === 'reversed'
          ? 'Ben'
          : 'Proceeds immediately without checking deadline vs. invoice filter';

  const controls = (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PARSING_CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setSelectedId(c.id);
              setResolvedAmbiguity(null);
            }}
            className={`rounded-lg border p-2.5 text-left transition-all ${
              selectedId === c.id
                ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
                : 'border-[#E6E1D6] bg-white/75 hover:bg-white'
            }`}
          >
            <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
              {c.tag}
            </div>
            <div className="mt-1 text-xs font-medium text-[#1C1B18]">“{c.text}”</div>
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[#57534E]">
        Note why both paraphrase and reversal tests are mandatory: a system that always answers
        “Ana paid” passes the paraphrase triad (1/1) while failing the minimal edit (“Ben paid Ana”).
      </p>
    </div>
  );

  const conventionalContent = (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
        <div className="text-[11px] font-semibold uppercase text-[#8A8478]">Input String</div>
        <div className="mt-1 font-mono-tech text-sm font-medium text-[#1C1B18]">
          “{activeCase.text}”
        </div>
      </div>

      <div className="rounded-lg border border-[#E6E1D6] bg-white p-3.5 text-sm">
        <div className="text-xs font-semibold text-[#57534E]">Heuristic / Unchecked Output</div>
        <p className="mt-1.5 text-sm text-[#1C1B18]">
          {activeCase.id === 'ambiguous'
            ? 'Action queued: Cancelling the most recent invoice between Ana and Ben immediately (guessed interpretation without asking).'
            : `Inferred Payer: ${convPayer}`}
        </p>
      </div>

      <div className="rounded-md border border-[#FEE2E2] bg-[#FEF2F2]/70 p-2.5 text-xs text-[#991B1B]">
        {activeCase.id === 'passive' &&
          'Surface-order prior conflates grammatical subject ("Ben") with agent ("Payer").'}
        {activeCase.id === 'active' &&
          'Matches by coincidence because grammatical subject aligns with agent.'}
        {activeCase.id === 'reversed' &&
          'A constant-output heuristic ("always Ana") fails this minimal edit completely; surface-order fails passive voice instead.'}
        {activeCase.id === 'ambiguous' &&
          'Executes irreversible action despite two distinct valid syntactic parses.'}
      </div>
    </div>
  );

  const epistemicContent = (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
        <div className="text-[11px] font-semibold uppercase text-[#8A8478]">
          Semantic Role Parse
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          <span className="rounded border border-[#0F6B6B]/30 bg-[#E8F4F4] px-2.5 py-1 font-semibold text-[#0F6B6B]">
            PAYER: {activeCase.truePayer}
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-[#8A8478]" />
          <span className="rounded border border-[#E6E1D6] bg-white px-2.5 py-1 font-semibold text-[#1C1B18]">
            RECIPIENT: {activeCase.trueRecipient}
          </span>
        </div>
      </div>

      {activeCase.id !== 'ambiguous' ? (
        <div className="rounded-lg border border-[#0F6B6B]/30 bg-[#E8F4F4]/45 p-3.5 text-xs leading-relaxed text-[#1C1B18]">
          <div className="flex items-center gap-1.5 font-semibold text-[#0F6B6B]">
            <CheckCircle2 className="h-4 w-4" />
            Unambiguous Role Binding
          </div>
          <p className="mt-1">
            {activeCase.id === 'passive'
              ? 'Recognizes passive voice ("was paid by"): role binding stays invariant to "Ana → Ben".'
              : activeCase.id === 'reversed'
                ? 'Detects swapped argument edit: reverses role binding to "Ben → Ana".'
                : 'Single unambiguous reading: Ana transferred funds to Ben.'}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-[#B45309]/40 bg-[#FEF3C7]/45 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#B45309]">
            <HelpCircle className="h-4 w-4" />
            Targeted Disambiguation (1 Question Before Action)
          </div>
          <p className="mt-1 text-[#1C1B18]">{activeCase.ambiguousNote}</p>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setResolvedAmbiguity('filter')}
              className={`rounded border px-2.5 py-2 text-left transition-all ${
                resolvedAmbiguity === 'filter'
                  ? 'border-[#0F6B6B] bg-[#E8F4F4] font-semibold text-[#0F6B6B]'
                  : 'border-[#E6E1D6] bg-white text-[#1C1B18] hover:border-[#0F6B6B]'
              }`}
            >
              A) Filter invoice dated before Friday
            </button>
            <button
              type="button"
              onClick={() => setResolvedAmbiguity('deadline')}
              className={`rounded border px-2.5 py-2 text-left transition-all ${
                resolvedAmbiguity === 'deadline'
                  ? 'border-[#0F6B6B] bg-[#E8F4F4] font-semibold text-[#0F6B6B]'
                  : 'border-[#E6E1D6] bg-white text-[#1C1B18] hover:border-[#0F6B6B]'
              }`}
            >
              B) Schedule cancellation before Friday
            </button>
          </div>
          {resolvedAmbiguity && (
            <div className="mt-2 rounded bg-white px-2.5 py-1.5 font-mono-tech text-[11px] text-[#0F6B6B]">
              Confirmed:{' '}
              {resolvedAmbiguity === 'filter'
                ? 'Target = invoice sent prior to Friday; execute cancellation now.'
                : 'Target = latest invoice; schedule deadline <= Friday 17:00.'}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const checks: ScoreCheckItem[] = [
    {
      label: 'Paraphrase Invariance (“Ana paid Ben” == “Ben was paid by Ana”)',
      conventionalPass: false,
      conventionalNote: 'FAILS — surface-order baseline flips payer on passive voice',
      epistemicPass: true,
      epistemicNote: 'PASS — both yield Payer = Ana',
    },
    {
      label: 'Minimal-Edit Sensitivity (“Ben paid Ana” reverses payer) & Ambiguity Pause',
      conventionalPass: false,
      conventionalNote: 'FAILS — constant bias misses reversal; acts without disambiguating',
      epistemicPass: true,
      epistemicNote: 'PASS — reverses on swap & asks 1 targeted question on ambiguity',
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

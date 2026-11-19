import React from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Link2,
  ShieldCheck,
} from 'lucide-react';
import { PaperStimulus, SummaryCondition } from '../../types/epistemia';

interface SummaryPanelProps {
  paper: PaperStimulus;
  condition: SummaryCondition;
  decisivePassageInspected: boolean;
  onClickDecisiveAnchor: () => void;
  showConditionLabel?: boolean;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  paper,
  condition,
  decisivePassageInspected,
  onClickDecisiveAnchor,
  showConditionLabel = false,
}) => {
  if (condition === 'conventional') {
    const conv = paper.conventionalSummary;
    return (
      <div className="rounded-xl border border-[#E6E1D6] bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E1D6] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F3EFE7] text-[#57534E]">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs font-semibold text-[#1C1B18]">AI Research Summary</div>
              <div className="text-[11px] text-[#8A8478]">Generated from full manuscript text</div>
            </div>
          </div>
          {showConditionLabel && (
            <span className="rounded border border-[#C2410C]/30 bg-[#FFF7ED] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-[#C2410C]">
              Conventional Condition
            </span>
          )}
        </div>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#302E2A]">
          <p className="font-medium text-[#1C1B18]">{conv.lead}</p>
          {conv.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
            Key Takeaways
          </div>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#302E2A]">
            {conv.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#57534E]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Epistemic-Scaffolded Summary
  const ep = paper.epistemicSummary;
  return (
    <div className="rounded-xl border border-[#0F6B6B]/30 bg-white p-5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E1D6] pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E8F4F4] text-[#0F6B6B]">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <div className="text-xs font-semibold text-[#1C1B18]">AI Research Brief</div>
            <div className="text-[11px] text-[#8A8478]">
              Generated prior to any post-publication errata
            </div>
          </div>
        </div>
        {showConditionLabel && (
          <span className="rounded border border-[#0F6B6B]/30 bg-[#E8F4F4] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-[#0F6B6B]">
            Epistemic-Scaffolded Condition
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#302E2A]">
        <p className="font-medium text-[#1C1B18]">{ep.lead}</p>
        {ep.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Decisive Passage Anchor */}
      <div className="mt-4 rounded-lg border border-[#0F6B6B]/30 bg-[#E8F4F4]/55 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold uppercase tracking-wide text-[#0F6B6B]">
            <Link2 className="h-3.5 w-3.5" />
            Decisive Evidence Anchor ({paper.decisiveSectionId})
          </span>
          {decisivePassageInspected && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#0F6B6B] shadow-xs">
              <CheckCircle2 className="h-3 w-3" />
              Inspected
            </span>
          )}
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#302E2A]">{ep.decisiveAnchorNote}</p>
        <blockquote className="mt-2 border-l-2 border-[#0F6B6B] pl-2.5 text-xs italic leading-relaxed text-[#57534E]">
          “{paper.decisiveQuote}”
        </blockquote>
        <button
          type="button"
          onClick={onClickDecisiveAnchor}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#0F6B6B] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0B5353]"
        >
          {ep.decisiveAnchorLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Load-Bearing Assumption Card */}
      <div className="mt-3 rounded-lg border border-[#B45309]/30 bg-[#FEF3C7]/45 p-3.5">
        <div className="flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold uppercase tracking-wide text-[#B45309]">
          <AlertTriangle className="h-3.5 w-3.5" />
          Load-Bearing Assumption
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[#1C1B18]">
          <strong className="font-semibold">This conclusion depends on:</strong>{' '}
          {paper.loadBearingAssumption}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-[#57534E]">
          <strong className="font-semibold text-[#92400E]">Reconsider if:</strong>{' '}
          {paper.falsificationCondition}
        </p>
      </div>
    </div>
  );
};

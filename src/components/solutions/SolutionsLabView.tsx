import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FAULT_LINES } from '../../data/faultLines';
import { FaultLineId } from '../../types/epistemia';
import { CausalityDemo } from './demos/CausalityDemo';
import { ExperienceDemo } from './demos/ExperienceDemo';
import { GroundingDemo } from './demos/GroundingDemo';
import { MetacognitionDemo } from './demos/MetacognitionDemo';
import { MotivationDemo } from './demos/MotivationDemo';
import { ParsingDemo } from './demos/ParsingDemo';
import { ValueDemo } from './demos/ValueDemo';

interface SolutionsLabViewProps {
  activeFaultLine: FaultLineId;
  onSelectFaultLine: (id: FaultLineId) => void;
}

export const SolutionsLabView: React.FC<SolutionsLabViewProps> = ({
  activeFaultLine,
  onSelectFaultLine,
}) => {
  const [visitedIds, setVisitedIds] = useState<Set<FaultLineId>>(
    () => new Set([activeFaultLine]),
  );

  const handleSelect = (id: FaultLineId) => {
    onSelectFaultLine(id);
    setVisitedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const activeSpec =
    FAULT_LINES.find((f) => f.id === activeFaultLine) ?? FAULT_LINES[0];

  const renderDemo = () => {
    switch (activeSpec.id) {
      case 'grounding':
        return <GroundingDemo spec={activeSpec} />;
      case 'parsing':
        return <ParsingDemo spec={activeSpec} />;
      case 'experience':
        return <ExperienceDemo spec={activeSpec} />;
      case 'motivation':
        return <MotivationDemo spec={activeSpec} />;
      case 'causality':
        return <CausalityDemo spec={activeSpec} />;
      case 'metacognition':
        return <MetacognitionDemo spec={activeSpec} />;
      case 'value':
        return <ValueDemo spec={activeSpec} />;
    }
  };

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono-tech text-xs font-medium uppercase tracking-wider text-[#0F6B6B]">
            Interactive Pattern Library · 7 Epistemological Fault Lines
          </p>
          <h1 className="font-serif-display text-3xl font-medium text-[#1C1B18]">
            Epistemic UX Solutions Lab
          </h1>
        </div>
        <div className="rounded-full border border-[#E6E1D6] bg-white px-3 py-1 font-mono-tech text-xs text-[#57534E]">
          Explored {visitedIds.size} / 7 fault lines
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Numbered Rail */}
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-1.5 rounded-xl border border-[#E6E1D6] bg-white p-2.5 shadow-[0_1px_3px_rgba(28,27,24,0.04)]">
            <div className="px-2 py-1.5 font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#8A8478]">
              Select Fault Line
            </div>
            {FAULT_LINES.map((fl) => {
              const active = fl.id === activeSpec.id;
              const visited = visitedIds.has(fl.id);
              return (
                <button
                  key={fl.id}
                  type="button"
                  onClick={() => handleSelect(fl.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition-all ${
                    active
                      ? 'bg-[#E8F4F4] text-[#0F6B6B] ring-1 ring-[#0F6B6B]/30'
                      : 'text-[#57534E] hover:bg-[#FAF8F4] hover:text-[#1C1B18]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono-tech text-xs font-semibold ${
                        active
                          ? 'bg-[#0F6B6B] text-white'
                          : 'border border-[#E6E1D6] bg-[#FAF8F4] text-[#57534E]'
                      }`}
                    >
                      {fl.number}
                    </span>
                    <div>
                      <div className="text-xs font-semibold">{fl.title}</div>
                      <div className="line-clamp-1 text-[10px] text-[#8A8478]">
                        {fl.uxPatternName}
                      </div>
                    </div>
                  </div>
                  {visited && (
                    <CheckCircle2
                      className={`h-3.5 w-3.5 shrink-0 ${
                        active ? 'text-[#0F6B6B]' : 'text-[#8A8478]/60'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Active Prototype Workspace */}
        <main className="lg:col-span-9">{renderDemo()}</main>
      </div>
    </div>
  );
};

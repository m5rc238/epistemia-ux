import React, { useState } from 'react';
import { BarChart3, BookOpen, FlaskConical, Layers, ShieldAlert, X } from 'lucide-react';
import { AppTab } from '../../types/epistemia';

interface TopNavProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  recordedTrialCount: number;
  isBlindedTrialActive: boolean;
  blindedProgressLabel?: string;
  onExitBlindedTrial: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  recordedTrialCount,
  isBlindedTrialActive,
  blindedProgressLabel,
  onExitBlindedTrial,
}) => {
  const [confirmExit, setConfirmExit] = useState(false);

  if (isBlindedTrialActive) {
    return (
      <header className="sticky top-0 z-40 border-b border-[#E6E1D6] bg-[#FAF8F4]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#E6E1D6] bg-white text-[#0F6B6B]">
              <FlaskConical className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#8A8478]">
                Paper Appraisal Study · Active Session
              </p>
              <p className="font-mono-tech text-xs font-medium text-[#1C1B18]">
                {blindedProgressLabel ?? 'Appraisal in Progress'}
              </p>
            </div>
          </div>

          {!confirmExit ? (
            <button
              type="button"
              onClick={() => setConfirmExit(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E6E1D6] bg-white px-3 py-1.5 text-xs font-medium text-[#57534E] transition-colors hover:border-[#D0C8B8] hover:text-[#1C1B18]"
            >
              <X className="h-3.5 w-3.5" />
              Exit Trial
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-md border border-[#FEE2E2] bg-[#FEF2F2] px-3 py-1.5">
              <span className="text-xs font-medium text-[#B91C1C]">Abandon current trial?</span>
              <button
                type="button"
                onClick={() => {
                  setConfirmExit(false);
                  onExitBlindedTrial();
                }}
                className="rounded bg-[#B91C1C] px-2 py-0.5 text-xs font-medium text-white hover:bg-[#991B1B]"
              >
                Confirm Exit
              </button>
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="rounded border border-[#E6E1D6] bg-white px-2 py-0.5 text-xs font-medium text-[#57534E] hover:text-[#1C1B18]"
              >
                Resume
              </button>
            </div>
          )}
        </div>
      </header>
    );
  }

  const navItems: { id: AppTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 'experiment',
      label: 'Paper Appraisal Pilot',
      icon: <FlaskConical className="h-4 w-4" />,
    },
    {
      id: 'solutions',
      label: '7 Fault Lines UX Lab',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 'dashboard',
      label: 'Researcher Dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      badge: recordedTrialCount,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E1D6] bg-[#FAF8F4]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onSelectTab('overview')}
          className="group flex items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E6E1D6] bg-white text-[#0F6B6B] shadow-[0_1px_2px_rgba(28,27,24,0.05)] transition-colors group-hover:border-[#0F6B6B]/40">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-lg font-semibold tracking-tight text-[#1C1B18]">
                Epistemia UX
              </span>
              <span className="hidden rounded border border-[#E6E1D6] bg-[#F3EFE7] px-1.5 py-0.5 font-mono-tech text-[10px] font-medium text-[#57534E] sm:inline-block">
                arXiv:2512.19466
              </span>
            </div>
            <p className="text-[11px] text-[#8A8478]">
              Epistemic Appraisal Instrument &amp; 7-Fault-Line Design Lab
            </p>
          </div>
        </button>

        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E6E1D6] bg-[#F3EFE7]/75 p-1"
        >
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:text-[13px] ${
                  active
                    ? 'bg-white text-[#1C1B18] shadow-[0_1px_2px_rgba(28,27,24,0.08)]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#1C1B18]'
                }`}
              >
                <span className={active ? 'text-[#0F6B6B]' : 'text-[#8A8478]'}>{item.icon}</span>
                <span>{item.label}</span>
                {typeof item.badge === 'number' && (
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.2 font-mono-tech text-[10px] ${
                      active
                        ? 'bg-[#E8F4F4] text-[#0F6B6B]'
                        : 'bg-[#E6E1D6] text-[#57534E]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

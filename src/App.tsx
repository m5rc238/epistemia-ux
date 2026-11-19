import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FAULT_LINES } from './data/faultLines';
import {
  clearStoredTrials,
  loadStoredTrials,
  saveStoredTrials,
} from './lib/storage';
import { AppTab, FaultLineId, TrialRecord } from './types/epistemia';
import { DashboardView } from './components/dashboard/DashboardView';
import { ExperimentRunner } from './components/experiment/ExperimentRunner';
import { TopNav } from './components/layout/TopNav';
import { OverviewView } from './components/overview/OverviewView';
import { SolutionsLabView } from './components/solutions/SolutionsLabView';

function parseHashLocation(): { tab: AppTab; faultLine: FaultLineId } {
  if (typeof window === 'undefined') {
    return { tab: 'overview', faultLine: 'grounding' };
  }
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('solutions')) {
    const [, maybeId] = hash.split('/');
    const valid = FAULT_LINES.find((f) => f.id === maybeId)?.id ?? 'grounding';
    return { tab: 'solutions', faultLine: valid };
  }
  if (hash === 'experiment') return { tab: 'experiment', faultLine: 'grounding' };
  if (hash === 'dashboard') return { tab: 'dashboard', faultLine: 'grounding' };
  return { tab: 'overview', faultLine: 'grounding' };
}

export const App: React.FC = () => {
  const initial = parseHashLocation();
  const [activeTab, setActiveTab] = useState<AppTab>(initial.tab);
  const [activeFaultLine, setActiveFaultLine] = useState<FaultLineId>(initial.faultLine);
  const [localTrials, setLocalTrials] = useState<TrialRecord[]>(() => loadStoredTrials());

  const [isBlindedActive, setIsBlindedActive] = useState<boolean>(false);
  const [blindedProgressLabel, setBlindedProgressLabel] = useState<string | undefined>(undefined);
  const exitTrialRef = useRef<(() => void) | null>(null);

  const syncHash = useCallback((tab: AppTab, faultLine: FaultLineId) => {
    const nextHash = tab === 'solutions' ? `#solutions/${faultLine}` : `#${tab}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      if (isBlindedActive) return;
      const parsed = parseHashLocation();
      setActiveTab(parsed.tab);
      setActiveFaultLine(parsed.faultLine);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [isBlindedActive]);

  const handleSelectTab = (tab: AppTab) => {
    setActiveTab(tab);
    syncHash(tab, activeFaultLine);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFaultLine = (id: FaultLineId) => {
    setActiveFaultLine(id);
    setActiveTab('solutions');
    syncHash('solutions', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveTrial = useCallback((trial: TrialRecord) => {
    setLocalTrials((prev) => {
      const updated = [trial, ...prev];
      saveStoredTrials(updated);
      return updated;
    });
  }, []);

  const handleClearLocalTrials = useCallback(() => {
    clearStoredTrials();
    setLocalTrials([]);
  }, []);

  const handleBlindedStateChange = useCallback(
    (active: boolean, progressLabel?: string) => {
      setIsBlindedActive(active);
      setBlindedProgressLabel(progressLabel);
    },
    [],
  );

  const handleExitBlindedTrial = () => {
    exitTrialRef.current?.();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B18]">
      <TopNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        recordedTrialCount={localTrials.length}
        isBlindedTrialActive={isBlindedActive}
        blindedProgressLabel={blindedProgressLabel}
        onExitBlindedTrial={handleExitBlindedTrial}
      />

      <main className="pb-16">
        {activeTab === 'overview' && (
          <OverviewView
            onNavigateTab={handleSelectTab}
            onOpenFaultLine={handleOpenFaultLine}
          />
        )}

        {activeTab === 'experiment' && (
          <ExperimentRunner
            onSaveTrial={handleSaveTrial}
            onBlindedStateChange={handleBlindedStateChange}
            onExitRef={exitTrialRef}
            onOpenDashboard={() => handleSelectTab('dashboard')}
          />
        )}

        {activeTab === 'solutions' && (
          <SolutionsLabView
            activeFaultLine={activeFaultLine}
            onSelectFaultLine={handleOpenFaultLine}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            localTrials={localTrials}
            onClearLocalTrials={handleClearLocalTrials}
            onLaunchExperiment={() => handleSelectTab('experiment')}
          />
        )}
      </main>
    </div>
  );
};

export default App;

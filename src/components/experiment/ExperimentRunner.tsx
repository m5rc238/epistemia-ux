import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getPaperById } from '../../data/papers';
import { createDemoSession, createParticipantSession } from '../../lib/randomization';
import { scoreTrial } from '../../lib/scoring';
import {
  CategoricalDecision,
  CorrectionType,
  SessionPlan,
  SummaryCondition,
  TrialRecord,
} from '../../types/epistemia';
import { AppraisalForm } from './AppraisalForm';
import { ExperimentSetup } from './ExperimentSetup';
import { PaperReader } from './PaperReader';
import { SessionDebrief } from './SessionDebrief';
import { SummaryPanel } from './SummaryPanel';

interface ExperimentRunnerProps {
  onSaveTrial: (trial: TrialRecord) => void;
  onBlindedStateChange: (active: boolean, progressLabel?: string) => void;
  onExitRef?: React.MutableRefObject<(() => void) | null>;
  onOpenDashboard: () => void;
}

export const ExperimentRunner: React.FC<ExperimentRunnerProps> = ({
  onSaveTrial,
  onBlindedStateChange,
  onExitRef,
  onOpenDashboard,
}) => {
  const [session, setSession] = useState<SessionPlan | null>(null);
  const [trialIndex, setTrialIndex] = useState<number>(0);
  const [stage, setStage] = useState<'initial' | 'revision'>('initial');
  const [recordDemoTrials, setRecordDemoTrials] = useState<boolean>(true);
  const [completedTrials, setCompletedTrials] = useState<TrialRecord[]>([]);
  const [showDebrief, setShowDebrief] = useState<boolean>(false);

  // Per-trial stage data & quiet telemetry
  const [preScore, setPreScore] = useState<number>(5);
  const [preConfidence, setPreConfidence] = useState<number>(75);
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | null>(null);
  const [highlightToken, setHighlightToken] = useState<number>(0);
  const [passageLinkClicks, setPassageLinkClicks] = useState<number>(0);
  const [decisivePassageInspected, setDecisivePassageInspected] = useState<boolean>(false);
  const [reinspectedAfterCorrection, setReinspectedAfterCorrection] = useState<boolean>(false);

  const stageStartedAtRef = useRef<number>(Date.now());
  const initialReadingTimeMsRef = useRef<number>(0);

  const resetTrialTelemetry = useCallback(() => {
    setHighlightedSectionId(null);
    setHighlightToken(0);
    setPassageLinkClicks(0);
    setDecisivePassageInspected(false);
    setReinspectedAfterCorrection(false);
    stageStartedAtRef.current = Date.now();
    initialReadingTimeMsRef.current = 0;
  }, []);

  const exitSession = useCallback(() => {
    setSession(null);
    setTrialIndex(0);
    setStage('initial');
    setCompletedTrials([]);
    setShowDebrief(false);
    onBlindedStateChange(false, undefined);
  }, [onBlindedStateChange]);

  useEffect(() => {
    if (onExitRef) {
      onExitRef.current = exitSession;
    }
  }, [onExitRef, exitSession]);

  // Keep TopNav informed when a blinded participant trial is active
  useEffect(() => {
    if (!session || showDebrief || session.protocol === 'demo_single') {
      onBlindedStateChange(false, undefined);
      return;
    }
    const total = session.trials.length;
    const stageName =
      stage === 'initial' ? 'Stage 1: Initial Appraisal' : 'Stage 2: Post-Notice Revision';
    onBlindedStateChange(true, `Trial ${trialIndex + 1} of ${total} · ${stageName}`);
  }, [session, showDebrief, trialIndex, stage, onBlindedStateChange]);

  const handleStartBlinded = (protocol: 'mixed_2trial' | 'single_trial') => {
    const newSession = createParticipantSession(protocol);
    setSession(newSession);
    setTrialIndex(0);
    setStage('initial');
    setCompletedTrials([]);
    setShowDebrief(false);
    resetTrialTelemetry();
  };

  const handleStartDemo = (config: {
    paperId: string;
    summaryCondition: SummaryCondition;
    correctionType: CorrectionType;
    recordToDashboard: boolean;
  }) => {
    const newSession = createDemoSession(
      config.paperId,
      config.summaryCondition,
      config.correctionType,
    );
    setRecordDemoTrials(config.recordToDashboard);
    setSession(newSession);
    setTrialIndex(0);
    setStage('initial');
    setCompletedTrials([]);
    setShowDebrief(false);
    resetTrialTelemetry();
  };

  const handleInspectDecisive = useCallback(() => {
    setDecisivePassageInspected(true);
  }, []);

  const handlePostCorrectionInspect = useCallback(() => {
    setReinspectedAfterCorrection(true);
  }, []);

  if (!session) {
    return (
      <ExperimentSetup
        onStartBlinded={handleStartBlinded}
        onStartDemo={handleStartDemo}
      />
    );
  }

  if (showDebrief) {
    return (
      <SessionDebrief
        trials={completedTrials}
        onRunAnother={exitSession}
        onOpenDashboard={onOpenDashboard}
      />
    );
  }

  const activeConfig = session.trials[trialIndex];
  const paper = getPaperById(activeConfig.paperId);
  const correctionNotice = paper.corrections[activeConfig.correctionType];
  const isDemo = activeConfig.mode === 'demo';

  const handleClickDecisiveAnchor = () => {
    setHighlightedSectionId(paper.decisiveSectionId);
    setHighlightToken((t) => t + 1);
    setPassageLinkClicks((c) => c + 1);
    setDecisivePassageInspected(true);
    if (stage === 'revision') {
      setReinspectedAfterCorrection(true);
    }
  };

  const handleSubmitInitial = (endorsement: number, confidence: number) => {
    initialReadingTimeMsRef.current = Math.max(500, Date.now() - stageStartedAtRef.current);
    setPreScore(endorsement);
    setPreConfidence(confidence);
    setStage('revision');
    stageStartedAtRef.current = Date.now();
  };

  const handleSubmitRevision = (data: {
    postEndorsement: number;
    postConfidence: number;
    categoricalChoice: CategoricalDecision;
    rationale: string;
  }) => {
    const revisionReadingTimeMs = Math.max(500, Date.now() - stageStartedAtRef.current);
    const scored = scoreTrial({
      correctionType: activeConfig.correctionType,
      preEndorsement: preScore,
      postEndorsement: data.postEndorsement,
      categoricalChoice: data.categoricalChoice,
    });

    const record: TrialRecord = {
      id: `trial-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      sessionId: session.sessionId,
      trialIndex: activeConfig.trialIndex,
      totalTrials: activeConfig.totalTrials,
      mode: activeConfig.mode,
      isSimulated: false,
      paperId: paper.id,
      paperTitle: paper.title,
      summaryCondition: activeConfig.summaryCondition,
      correctionType: activeConfig.correctionType,
      preEndorsement: preScore,
      postEndorsement: data.postEndorsement,
      deltaEndorsement: scored.deltaEndorsement,
      preConfidence,
      postConfidence: data.postConfidence,
      categoricalChoice: data.categoricalChoice,
      appropriate: scored.appropriate,
      classification: scored.classification,
      initialReadingTimeMs: initialReadingTimeMsRef.current,
      revisionReadingTimeMs,
      passageLinkClicks,
      decisivePassageInspected,
      reinspectedAfterCorrection,
      rationale: data.rationale,
      timestamp: new Date().toISOString(),
    };

    if (!isDemo || recordDemoTrials) {
      onSaveTrial(record);
    }

    const updatedCompleted = [...completedTrials, record];
    setCompletedTrials(updatedCompleted);

    if (trialIndex + 1 < session.trials.length) {
      setTrialIndex(trialIndex + 1);
      setStage('initial');
      resetTrialTelemetry();
    } else {
      setShowDebrief(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-5 sm:px-6">
      {/* Sub-header for Demo Mode (or subtle trial indicator) */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-[#57534E]">
          <span className="rounded border border-[#E6E1D6] bg-white px-2.5 py-1 font-mono-tech font-medium text-[#1C1B18]">
            Paper {trialIndex + 1} of {session.trials.length}
          </span>
          <span className="rounded border border-[#E6E1D6] bg-white px-2.5 py-1 font-medium text-[#57534E]">
            {stage === 'initial'
              ? 'Step 1: Read Brief & Manuscript → Rate Claim'
              : 'Step 2: Review Published Notice → Reassess Claim'}
          </span>
        </div>

        {isDemo && (
          <div className="flex items-center gap-2">
            <span className="rounded border border-[#FEF3C7] bg-[#FFFBEB] px-2.5 py-1 font-mono-tech text-[11px] font-medium text-[#92400E]">
              DEMO: {activeConfig.summaryCondition} × {activeConfig.correctionType}
            </span>
            <button
              type="button"
              onClick={exitSession}
              className="rounded border border-[#E6E1D6] bg-white px-2.5 py-1 text-xs font-medium text-[#57534E] hover:text-[#1C1B18]"
            >
              Change Setup
            </button>
          </div>
        )}
      </div>

      {/* Dual-Pane Workspace */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Full Structured Source Paper (7 cols) */}
        <div className="lg:col-span-7">
          <PaperReader
            key={`${paper.id}-${trialIndex}`}
            paper={paper}
            highlightedSectionId={highlightedSectionId}
            highlightToken={highlightToken}
            correctedSectionId={stage === 'revision' ? correctionNotice.targetSectionId : null}
            stage={stage}
            onInspectDecisivePassage={handleInspectDecisive}
            onPostCorrectionInspect={handlePostCorrectionInspect}
          />
        </div>

        {/* Right: AI Summary + Appraisal Form (5 cols) */}
        <div className="space-y-4 lg:col-span-5">
          <SummaryPanel
            paper={paper}
            condition={activeConfig.summaryCondition}
            decisivePassageInspected={decisivePassageInspected}
            onClickDecisiveAnchor={handleClickDecisiveAnchor}
            showConditionLabel={isDemo}
          />

          <AppraisalForm
            key={`${paper.id}-${trialIndex}-${stage}`}
            centralClaim={paper.centralClaim}
            stage={stage}
            correctionNotice={stage === 'revision' ? correctionNotice : undefined}
            initialEndorsement={preScore}
            initialConfidence={preConfidence}
            onSubmitInitial={handleSubmitInitial}
            onSubmitRevision={handleSubmitRevision}
          />
        </div>
      </div>
    </div>
  );
};

export type AppTab = 'overview' | 'experiment' | 'solutions' | 'dashboard';

export type SummaryCondition = 'conventional' | 'epistemic';
export type CorrectionType = 'decisive' | 'non_decisive';
export type CategoricalDecision = 'revise' | 'retain' | 'uncertain';

export type ErrorClassification =
  | 'appropriate_revision'
  | 'appropriate_retention'
  | 'epistemic_inertia'
  | 'blanket_skepticism'
  | 'over_abstention';

export type FaultLineId =
  | 'grounding'
  | 'parsing'
  | 'experience'
  | 'motivation'
  | 'causality'
  | 'metacognition'
  | 'value';

export interface PaperDataTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface PaperSection {
  id: string;
  heading: string;
  paragraphs: string[];
  isDecisive?: boolean;
  dataTable?: PaperDataTable;
}

export interface CorrectionNotice {
  noticeId: string;
  publishedDate: string;
  targetSectionId: string;
  title: string;
  body: string;
  explanationForDebrief: string;
}

export interface PaperStimulus {
  id: string;
  domain: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  centralClaim: string;
  sections: PaperSection[];
  decisiveSectionId: string;
  decisiveQuote: string;
  decisiveWhy: string;
  loadBearingAssumption: string;
  falsificationCondition: string;
  conventionalSummary: {
    lead: string;
    paragraphs: string[];
    keyTakeaways: string[];
  };
  epistemicSummary: {
    lead: string;
    conclusionStatement: string;
    paragraphs: string[];
    decisiveAnchorLabel: string;
    decisiveAnchorNote: string;
  };
  corrections: Record<CorrectionType, CorrectionNotice>;
}

export interface TrialRecord {
  id: string;
  sessionId: string;
  trialIndex: number;
  totalTrials: number;
  mode: 'participant' | 'demo';
  isSimulated?: boolean;
  paperId: string;
  paperTitle: string;
  summaryCondition: SummaryCondition;
  correctionType: CorrectionType;
  preEndorsement: number;
  postEndorsement: number;
  deltaEndorsement: number;
  preConfidence: number;
  postConfidence: number;
  categoricalChoice: CategoricalDecision;
  appropriate: boolean;
  classification: ErrorClassification;
  initialReadingTimeMs: number;
  revisionReadingTimeMs: number;
  passageLinkClicks: number;
  decisivePassageInspected: boolean;
  reinspectedAfterCorrection: boolean;
  rationale: string;
  timestamp: string;
}

export interface ExperimentTrialConfig {
  paperId: string;
  summaryCondition: SummaryCondition;
  correctionType: CorrectionType;
  trialIndex: number;
  totalTrials: number;
  mode: 'participant' | 'demo';
}

export interface SessionPlan {
  sessionId: string;
  protocol: 'mixed_2trial' | 'single_trial' | 'demo_single';
  summaryCondition: SummaryCondition;
  trials: ExperimentTrialConfig[];
}

export interface FaultLineSpec {
  id: FaultLineId;
  number: number;
  title: string;
  humanVsAiMismatch: string;
  proposedIntervention: string;
  evaluationCriterion: string;
  uxPatternName: string;
  citationLabel: string;
  citationUrl: string;
}

export interface CellMetrics {
  summaryCondition: SummaryCondition;
  correctionType: CorrectionType;
  count: number;
  appropriateCount: number;
  appropriateRate: number | null;
  meanPreEndorsement: number | null;
  meanPostEndorsement: number | null;
  meanDeltaEndorsement: number | null;
  medianTotalTimeMs: number | null;
  passageInspectionRate: number | null;
}

export interface ConditionMetrics {
  summaryCondition: SummaryCondition;
  count: number;
  decisiveCount: number;
  nonDecisiveCount: number;
  appropriateRate: number | null;
  decisiveSensitivity: number | null;
  nonDecisiveSpecificity: number | null;
  discriminationIndex: number | null;
  epistemicInertiaRate: number | null;
  blanketSkepticismRate: number | null;
  overAbstentionRate: number | null;
  medianInitialTimeMs: number | null;
  medianRevisionTimeMs: number | null;
  medianTotalTimeMs: number | null;
  meanDeltaDecisive: number | null;
  meanDeltaNonDecisive: number | null;
  passageInspectionRate: number | null;
  reinspectionAfterCorrectionRate: number | null;
}

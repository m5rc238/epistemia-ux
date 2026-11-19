import {
  CategoricalDecision,
  CellMetrics,
  CorrectionType,
  ConditionMetrics,
  ErrorClassification,
  SummaryCondition,
  TrialRecord,
} from '../types/epistemia';

export interface ScoreTrialInput {
  correctionType: CorrectionType;
  preEndorsement: number;
  postEndorsement: number;
  categoricalChoice: CategoricalDecision;
}

export interface ScoreTrialResult {
  deltaEndorsement: number;
  appropriate: boolean;
  classification: ErrorClassification;
}

/**
 * Scores a single appraisal revision trial according to the Epistemia 2x2 protocol.
 * Appropriate revision requires BOTH categorical alignment and numeric endorsement consistency.
 */
export function scoreTrial(input: ScoreTrialInput): ScoreTrialResult {
  const deltaEndorsement = input.postEndorsement - input.preEndorsement;

  if (input.correctionType === 'decisive') {
    const appropriate =
      input.categoricalChoice === 'revise' &&
      (deltaEndorsement <= -2 || input.postEndorsement <= 3);

    if (appropriate) {
      return {
        deltaEndorsement,
        appropriate: true,
        classification: 'appropriate_revision',
      };
    }

    if (input.categoricalChoice === 'uncertain') {
      return {
        deltaEndorsement,
        appropriate: false,
        classification: 'over_abstention',
      };
    }

    return {
      deltaEndorsement,
      appropriate: false,
      classification: 'epistemic_inertia',
    };
  }

  // Non-decisive correction: justified conclusion must be retained without sharp collapse
  const appropriate =
    input.categoricalChoice === 'retain' &&
    deltaEndorsement >= -1 &&
    input.postEndorsement >= 4;

  if (appropriate) {
    return {
      deltaEndorsement,
      appropriate: true,
      classification: 'appropriate_retention',
    };
  }

  if (input.categoricalChoice === 'uncertain') {
    return {
      deltaEndorsement,
      appropriate: false,
      classification: 'over_abstention',
    };
  }

  return {
    deltaEndorsement,
    appropriate: false,
    classification: 'blanket_skepticism',
  };
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

export function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

export function computeCellMetrics(
  trials: TrialRecord[],
  summaryCondition: SummaryCondition,
  correctionType: CorrectionType,
): CellMetrics {
  const subset = trials.filter(
    (t) => t.summaryCondition === summaryCondition && t.correctionType === correctionType,
  );
  const count = subset.length;
  const appropriateCount = subset.filter((t) => t.appropriate).length;

  return {
    summaryCondition,
    correctionType,
    count,
    appropriateCount,
    appropriateRate: count > 0 ? appropriateCount / count : null,
    meanPreEndorsement: mean(subset.map((t) => t.preEndorsement)),
    meanPostEndorsement: mean(subset.map((t) => t.postEndorsement)),
    meanDeltaEndorsement: mean(subset.map((t) => t.deltaEndorsement)),
    medianTotalTimeMs: median(
      subset.map((t) => t.initialReadingTimeMs + t.revisionReadingTimeMs),
    ),
    passageInspectionRate:
      count > 0 ? subset.filter((t) => t.decisivePassageInspected).length / count : null,
  };
}

export function computeConditionMetrics(
  trials: TrialRecord[],
  summaryCondition: SummaryCondition,
): ConditionMetrics {
  const subset = trials.filter((t) => t.summaryCondition === summaryCondition);
  const decisive = subset.filter((t) => t.correctionType === 'decisive');
  const nonDecisive = subset.filter((t) => t.correctionType === 'non_decisive');

  const count = subset.length;
  const decisiveSensitivity =
    decisive.length > 0
      ? decisive.filter((t) => t.appropriate).length / decisive.length
      : null;
  const nonDecisiveSpecificity =
    nonDecisive.length > 0
      ? nonDecisive.filter((t) => t.appropriate).length / nonDecisive.length
      : null;

  const discriminationIndex =
    decisiveSensitivity !== null && nonDecisiveSpecificity !== null
      ? decisiveSensitivity + nonDecisiveSpecificity - 1
      : null;

  return {
    summaryCondition,
    count,
    decisiveCount: decisive.length,
    nonDecisiveCount: nonDecisive.length,
    appropriateRate:
      count > 0 ? subset.filter((t) => t.appropriate).length / count : null,
    decisiveSensitivity,
    nonDecisiveSpecificity,
    discriminationIndex,
    epistemicInertiaRate:
      decisive.length > 0
        ? decisive.filter((t) => t.classification === 'epistemic_inertia').length /
          decisive.length
        : null,
    blanketSkepticismRate:
      nonDecisive.length > 0
        ? nonDecisive.filter((t) => t.classification === 'blanket_skepticism').length /
          nonDecisive.length
        : null,
    overAbstentionRate:
      count > 0
        ? subset.filter((t) => t.classification === 'over_abstention').length / count
        : null,
    medianInitialTimeMs: median(subset.map((t) => t.initialReadingTimeMs)),
    medianRevisionTimeMs: median(subset.map((t) => t.revisionReadingTimeMs)),
    medianTotalTimeMs: median(
      subset.map((t) => t.initialReadingTimeMs + t.revisionReadingTimeMs),
    ),
    meanDeltaDecisive: mean(decisive.map((t) => t.deltaEndorsement)),
    meanDeltaNonDecisive: mean(nonDecisive.map((t) => t.deltaEndorsement)),
    passageInspectionRate:
      count > 0 ? subset.filter((t) => t.decisivePassageInspected).length / count : null,
    reinspectionAfterCorrectionRate:
      count > 0
        ? subset.filter((t) => t.reinspectedAfterCorrection).length / count
        : null,
  };
}

export function formatClassificationLabel(classification: ErrorClassification): string {
  switch (classification) {
    case 'appropriate_revision':
      return 'Appropriate Revision';
    case 'appropriate_retention':
      return 'Appropriate Retention';
    case 'epistemic_inertia':
      return 'Epistemic Inertia';
    case 'blanket_skepticism':
      return 'Blanket Skepticism';
    case 'over_abstention':
      return 'Over-Abstention';
  }
}

export function formatDurationSeconds(ms: number | null): string {
  if (ms === null || Number.isNaN(ms)) return '—';
  return `${Math.round(ms / 1000)}s`;
}

export function formatPercent(rate: number | null): string {
  if (rate === null || Number.isNaN(rate)) return '—';
  return `${Math.round(rate * 100)}%`;
}

import { PAPER_STIMULI } from '../data/papers';
import { CorrectionType, SessionPlan, SummaryCondition } from '../types/epistemia';

function shuffleArray<T>(items: T[], rng: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createSessionId(rng: () => number = Math.random): string {
  const token = Math.floor(rng() * 0xfffff)
    .toString(16)
    .padStart(5, '0');
  return `sess-${Date.now().toString(36)}-${token}`;
}

/**
 * Creates a blinded participant session.
 * - 'mixed_2trial': Holds summary condition constant across 2 distinct papers,
 *   pairing 1 decisive correction with 1 non-decisive correction in randomized order.
 * - 'single_trial': Assigns 1 random paper, 1 summary condition, and 1 correction type.
 */
export function createParticipantSession(
  protocol: 'mixed_2trial' | 'single_trial',
  rng: () => number = Math.random,
): SessionPlan {
  const sessionId = createSessionId(rng);
  const summaryCondition: SummaryCondition =
    rng() < 0.5 ? 'conventional' : 'epistemic';
  const shuffledPapers = shuffleArray(PAPER_STIMULI, rng);

  if (protocol === 'single_trial') {
    const correctionType: CorrectionType = rng() < 0.5 ? 'decisive' : 'non_decisive';
    return {
      sessionId,
      protocol,
      summaryCondition,
      trials: [
        {
          paperId: shuffledPapers[0].id,
          summaryCondition,
          correctionType,
          trialIndex: 0,
          totalTrials: 1,
          mode: 'participant',
        },
      ],
    };
  }

  const correctionOrder = shuffleArray<CorrectionType>(
    ['decisive', 'non_decisive'],
    rng,
  );

  return {
    sessionId,
    protocol,
    summaryCondition,
    trials: [
      {
        paperId: shuffledPapers[0].id,
        summaryCondition,
        correctionType: correctionOrder[0],
        trialIndex: 0,
        totalTrials: 2,
        mode: 'participant',
      },
      {
        paperId: shuffledPapers[1].id,
        summaryCondition,
        correctionType: correctionOrder[1],
        trialIndex: 1,
        totalTrials: 2,
        mode: 'participant',
      },
    ],
  };
}

export function createDemoSession(
  paperId: string,
  summaryCondition: SummaryCondition,
  correctionType: CorrectionType,
): SessionPlan {
  return {
    sessionId: createSessionId(),
    protocol: 'demo_single',
    summaryCondition,
    trials: [
      {
        paperId,
        summaryCondition,
        correctionType,
        trialIndex: 0,
        totalTrials: 1,
        mode: 'demo',
      },
    ],
  };
}

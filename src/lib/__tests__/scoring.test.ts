import { describe, expect, it } from 'vitest';
import { PAPER_STIMULI } from '../../data/papers';
import { SIMULATED_REFERENCE_PILOT } from '../../data/referencePilotData';
import { createParticipantSession } from '../randomization';
import { computeCellMetrics, computeConditionMetrics, scoreTrial } from '../scoring';
import { trialsToCsv } from '../storage';
import { TrialRecord } from '../../types/epistemia';

describe('scoreTrial', () => {
  it('classifies decisive revision with sufficient downward shift as appropriate_revision', () => {
    const res = scoreTrial({
      correctionType: 'decisive',
      preEndorsement: 6,
      postEndorsement: 2,
      categoricalChoice: 'revise',
    });
    expect(res.appropriate).toBe(true);
    expect(res.deltaEndorsement).toBe(-4);
    expect(res.classification).toBe('appropriate_revision');
  });

  it('classifies decisive correction that leaves endorsement high or retains claim as epistemic_inertia', () => {
    const retained = scoreTrial({
      correctionType: 'decisive',
      preEndorsement: 6,
      postEndorsement: 5,
      categoricalChoice: 'retain',
    });
    expect(retained.appropriate).toBe(false);
    expect(retained.classification).toBe('epistemic_inertia');

    const shallowRevise = scoreTrial({
      correctionType: 'decisive',
      preEndorsement: 6,
      postEndorsement: 5,
      categoricalChoice: 'revise',
    });
    expect(shallowRevise.appropriate).toBe(false);
    expect(shallowRevise.classification).toBe('epistemic_inertia');
  });

  it('classifies uncertain response on decisive or non_decisive as over_abstention', () => {
    const decisiveUncertain = scoreTrial({
      correctionType: 'decisive',
      preEndorsement: 6,
      postEndorsement: 4,
      categoricalChoice: 'uncertain',
    });
    expect(decisiveUncertain.appropriate).toBe(false);
    expect(decisiveUncertain.classification).toBe('over_abstention');

    const nonDecisiveUncertain = scoreTrial({
      correctionType: 'non_decisive',
      preEndorsement: 6,
      postEndorsement: 5,
      categoricalChoice: 'uncertain',
    });
    expect(nonDecisiveUncertain.appropriate).toBe(false);
    expect(nonDecisiveUncertain.classification).toBe('over_abstention');
  });

  it('classifies non_decisive retention with preserved endorsement as appropriate_retention', () => {
    const res = scoreTrial({
      correctionType: 'non_decisive',
      preEndorsement: 6,
      postEndorsement: 6,
      categoricalChoice: 'retain',
    });
    expect(res.appropriate).toBe(true);
    expect(res.deltaEndorsement).toBe(0);
    expect(res.classification).toBe('appropriate_retention');
  });

  it('classifies revising away a justified claim after an irrelevant erratum as blanket_skepticism', () => {
    const res = scoreTrial({
      correctionType: 'non_decisive',
      preEndorsement: 6,
      postEndorsement: 3,
      categoricalChoice: 'revise',
    });
    expect(res.appropriate).toBe(false);
    expect(res.classification).toBe('blanket_skepticism');
  });
});

describe('computeConditionMetrics', () => {
  it('computes sensitivity, specificity, Youden J discrimination index, and medians accurately', () => {
    const conv = computeConditionMetrics(SIMULATED_REFERENCE_PILOT, 'conventional');
    const epist = computeConditionMetrics(SIMULATED_REFERENCE_PILOT, 'epistemic');

    expect(conv.count).toBe(12);
    expect(conv.decisiveSensitivity).toBeCloseTo(2 / 6, 4);
    expect(conv.nonDecisiveSpecificity).toBeCloseTo(5 / 6, 4);
    expect(conv.discriminationIndex).toBeCloseTo(2 / 6 + 5 / 6 - 1, 4);

    expect(epist.count).toBe(12);
    expect(epist.decisiveSensitivity).toBeCloseTo(5 / 6, 4);
    expect(epist.nonDecisiveSpecificity).toBeCloseTo(5 / 6, 4);
    expect(epist.discriminationIndex).toBeCloseTo(5 / 6 + 5 / 6 - 1, 4);

    const cellEpDec = computeCellMetrics(SIMULATED_REFERENCE_PILOT, 'epistemic', 'decisive');
    expect(cellEpDec.count).toBe(6);
    expect(cellEpDec.appropriateCount).toBe(5);
  });
});

describe('createParticipantSession', () => {
  it('assigns 2 distinct papers, 1 decisive + 1 non_decisive, and constant summaryCondition in mixed_2trial mode', () => {
    for (let i = 0; i < 20; i += 1) {
      const session = createParticipantSession('mixed_2trial');
      expect(session.trials).toHaveLength(2);
      expect(session.trials[0].paperId).not.toBe(session.trials[1].paperId);
      expect(session.trials[0].summaryCondition).toBe(session.summaryCondition);
      expect(session.trials[1].summaryCondition).toBe(session.summaryCondition);

      const types = new Set(session.trials.map((t) => t.correctionType));
      expect(types.has('decisive')).toBe(true);
      expect(types.has('non_decisive')).toBe(true);
    }
  });
});

describe('experimental stimulus invariants', () => {
  it('matches decisive and non_decisive correction word lengths tightly across all papers', () => {
    for (const paper of PAPER_STIMULI) {
      const decWords = paper.corrections.decisive.body.trim().split(/\s+/).length;
      const nonWords = paper.corrections.non_decisive.body.trim().split(/\s+/).length;
      expect(Math.abs(decWords - nonWords)).toBeLessThanOrEqual(8);
    }
  });
});

describe('trialsToCsv', () => {
  it('escapes commas, double quotes, and newlines properly per RFC-4180', () => {
    const sample: TrialRecord = {
      ...SIMULATED_REFERENCE_PILOT[0],
      rationale: 'Said "effect holds", then\nrevised later.',
    };
    const csv = trialsToCsv([sample]);
    const lines = csv.split('\r\n');
    expect(lines[0]).toContain('summaryCondition');
    expect(csv).toContain('"Said ""effect holds"", then\nrevised later."');
  });
});

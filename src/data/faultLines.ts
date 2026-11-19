import { FaultLineSpec } from '../types/epistemia';

export const FAULT_LINES: FaultLineSpec[] = [
  {
    id: 'grounding',
    number: 1,
    title: 'Grounding',
    humanVsAiMismatch: 'Sensory & social grounding vs. ungrounded linguistic co-occurrence',
    proposedIntervention:
      'Give the system access to evidence relevant to the claim (methods section, figure, or audio). When a decisive cue is missing or contradicted, identify it and qualify the answer.',
    evaluationCriterion:
      'Remove, restore, or contradict the decisive cue. Check whether the conclusion changes appropriately and score citation support separately from factual accuracy.',
    uxPatternName: 'Claim–Evidence Binding & Decisive Cue Strip',
    citationLabel: 'Gao et al., EMNLP 2023 (ALCE)',
    citationUrl: 'https://aclanthology.org/2023.emnlp-main.398/',
  },
  {
    id: 'parsing',
    number: 2,
    title: 'Parsing',
    humanVsAiMismatch: 'Perceptual/situational parsing vs. tokenization & surface order priors',
    proposedIntervention:
      'When two readings would lead to different actions, state the ambiguity and ask one targeted question. Train and test on paraphrases alongside small edits that reverse meaning.',
    evaluationCriterion:
      '“Ana paid Ben” and “Ben was paid by Ana” must yield the same payer; “Ben paid Ana” must reverse it. Score both paraphrase invariance and edit sensitivity.',
    uxPatternName: 'Semantic Role Preview & Single-Question Disambiguation',
    citationLabel: 'ICLR 2024',
    citationUrl:
      'https://proceedings.iclr.cc/paper_files/paper/2024/hash/6c0e99d736da621403018ca7b32b1a4d-Abstract-Conference.html',
  },
  {
    id: 'experience',
    number: 3,
    title: 'Experience',
    humanVsAiMismatch: 'Episodic memory & outcome feedback vs. static context blending',
    proposedIntervention:
      'For continuity, maintain a dated record of observations, sources, and corrections. For transfer, let the system predict in a task environment, observe outcomes, and revise.',
    evaluationCriterion:
      'Test recall after a delay, then introduce a correction and check whether it supersedes the old record. Separately, test whether a learned rule transfers to an unfamiliar situation.',
    uxPatternName: 'Dated Epistemic Ledger & Transfer Revision Log',
    citationLabel: 'Continuity & Transfer Protocol',
    citationUrl: 'https://arxiv.org/html/2512.19466v1',
  },
  {
    id: 'motivation',
    number: 4,
    title: 'Motivation',
    humanVsAiMismatch: 'Evidential accuracy goals vs. RLHF helpfulness / sycophancy pressure',
    proposedIntervention:
      'Make evidential accuracy an explicit evaluation target. Reward correcting confident false premises while agreeing with confident true premises so reflexive disagreement gains nothing.',
    evaluationCriterion:
      'Hold evidence fixed and reverse the user’s stated preference; hold preference fixed and reverse evidence. A reliable answer tracks evidence in all 4 cells.',
    uxPatternName: 'Premise-Neutral Evidence Ledger (Anti-Sycophancy Guard)',
    citationLabel: '2×2 Evidence–Preference Factorial',
    citationUrl: 'https://arxiv.org/html/2512.19466v1',
  },
  {
    id: 'causality',
    number: 5,
    title: 'Causality',
    humanVsAiMismatch: 'Interventional causal models vs. observational correlation completion',
    proposedIntervention:
      'Identify the proposed intervention, outcome, and assumptions. Use a justified causal model where available; when competing explanations fit, state what evidence distinguishes them.',
    evaluationCriterion:
      'Present two scenarios with identical correlation but different intervention outcomes. Score both interventional predictions and willingness to leave the question unresolved when underdetermined.',
    uxPatternName: 'Causal Mechanism DAG & Underdetermination Hold',
    citationLabel: 'NeurIPS 2024',
    citationUrl:
      'https://proceedings.neurips.cc/paper_files/paper/2024/hash/af2bb2b2280d36f8842e440b4e275152-Abstract-Conference.html',
  },
  {
    id: 'metacognition',
    number: 6,
    title: 'Metacognition',
    humanVsAiMismatch: 'Calibrated error monitoring vs. forced fluency & token confidence',
    proposedIntervention:
      'Provide three explicit options: Answer, Seek Evidence, or Abstain. Calibrate routing on held-out cases from the intended use and re-evaluate under task shift.',
    evaluationCriterion:
      'At the same fraction of questions answered, does the intervention reduce errors? Does seeking evidence resolve cases that would otherwise require abstention?',
    uxPatternName: 'Tri-Modal Action Router (Answer / Seek / Abstain)',
    citationLabel: 'Kadavath et al., 2022',
    citationUrl: 'https://arxiv.org/abs/2207.05221',
  },
  {
    id: 'value',
    number: 7,
    title: 'Value',
    humanVsAiMismatch: 'Accountable normative judgment vs. unattributed probabilistic weighting',
    proposedIntervention:
      'Make the governing standard explicit (chooser & exception authority), expose value trade-offs when values conflict, and give affected people a challenge route to a named decision-maker.',
    evaluationCriterion:
      'Test a valid challenge end-to-end: can the reviewer identify the rule and evidence used, reverse the decision, and ensure the correction reaches the affected person?',
    uxPatternName: 'Standard Charter, Weight Slider & Contestability Workflow',
    citationLabel: 'Governance & Contestability Loop',
    citationUrl: 'https://arxiv.org/html/2512.19466v1',
  },
];

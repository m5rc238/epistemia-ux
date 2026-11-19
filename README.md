# Epistemia UX — Experimental Pilot & 7-Fault-Line Design Lab

An interactive research workbench operationalizing the seven epistemological fault lines and the concept of **epistemia** (*linguistic plausibility substituting for epistemic evaluation*, Quattrociocchi, Capraro & Perc, [arXiv:2512.19466](https://arxiv.org/html/2512.19466v1)).

## What Is Inside

1. **2×2 AI-Assisted Paper Appraisal Pilot (`Paper Appraisal Pilot`)**
   - Randomizes readers across **Summary Interface** (`Conventional Fluent Summary` vs. `Epistemic-Scaffolded Summary`) and **Post-Publication Erratum** (`Decisive` vs. `Non-Decisive`).
   - Both conditions present the identical initial conclusion and full manuscript access (`3` controlled mini-papers across Chronobiology, Learning Analytics, and Urban Policy).
   - Measures **Appropriate Revision**:
     - *Decisive Sensitivity*: weakening/revising when the load-bearing assumption is falsified.
     - *Non-Decisive Specificity*: retaining justified trust when an equally prominent erratum changes only an irrelevant detail (ruling out blanket skepticism).
   - Logs initial reading time, revision latency, decisive-passage anchor clicks, and written rationales to `localStorage`.

2. **7 Fault Lines UX Solutions Lab (`7 Fault Lines UX Lab`)**
   - Interactive before/after prototypes with live counterfactual perturbation controls for all 7 fault lines:
     1. **Grounding** — Claim–Evidence Binding & Decisive Cue Strip
     2. **Parsing** — Semantic Role Preview & Single-Question Disambiguation
     3. **Experience** — Dated Epistemic Ledger & Transfer Revision Log
     4. **Motivation** — Premise-Neutral Evidence Ledger (2×2 Anti-Sycophancy Matrix)
     5. **Causality** — Causal Mechanism DAG & Underdetermination Hold
     6. **Metacognition** — Tri-Modal Action Router (`Answer` / `Seek Evidence` / `Abstain`)
     7. **Value** — Standard Charter, Weight Slider & Contestability Workflow

3. **Researcher Dashboard (`Researcher Dashboard`)**
   - Aggregates 2×2 sensitivity, specificity, Youden's *J* discrimination index, and reading-time trade-offs with custom SVG charts, toggleable simulated reference pilot data (`n = 24`), and RFC-4180 CSV / JSON export.

## Local Commands

```bash
npm install
npm run typecheck
npm test
npm run dev
npm run build
```

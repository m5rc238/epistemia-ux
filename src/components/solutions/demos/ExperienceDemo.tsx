import React, { useState } from 'react';
import { Calendar, CheckCircle2, History, Play, RefreshCw } from 'lucide-react';
import { FaultLineSpec } from '../../../types/epistemia';
import { FaultLineShell, ScoreCheckItem } from '../FaultLineShell';

type ExperienceSubTab = 'continuity' | 'transfer';
type TimelineStep = 1 | 2 | 3 | 4;

export const ExperienceDemo: React.FC<{ spec: FaultLineSpec }> = ({ spec }) => {
  const [subTab, setSubTab] = useState<ExperienceSubTab>('continuity');
  const [timelineStep, setTimelineStep] = useState<TimelineStep>(4);
  const [simRun, setSimRun] = useState<'initial' | 'observed' | 'transferred'>('transferred');

  const controls = (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border border-[#E6E1D6] bg-white p-1">
        <button
          type="button"
          onClick={() => setSubTab('continuity')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            subTab === 'continuity'
              ? 'bg-[#0F6B6B] text-white'
              : 'text-[#57534E] hover:text-[#1C1B18]'
          }`}
        >
          Part A: Continuity &amp; Supersession Ledger
        </button>
        <button
          type="button"
          onClick={() => setSubTab('transfer')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            subTab === 'transfer'
              ? 'bg-[#0F6B6B] text-white'
              : 'text-[#57534E] hover:text-[#1C1B18]'
          }`}
        >
          Part B: Simulator Feedback &amp; Transfer
        </button>
      </div>

      {subTab === 'continuity' ? (
        <div className="grid gap-2 sm:grid-cols-4">
          {(
            [
              { step: 1, date: 'Day 1', label: 'Initial Sensor Reading (+0.2°C)' },
              { step: 2, date: 'Day 14', label: 'Delayed Recall Check' },
              { step: 3, date: 'Day 15', label: 'Technician Correction (+1.4°C)' },
              { step: 4, date: 'Day 30', label: 'Post-Correction Audit Query' },
            ] as const
          ).map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setTimelineStep(item.step)}
              className={`rounded-lg border p-2.5 text-left transition-all ${
                timelineStep === item.step
                  ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
                  : 'border-[#E6E1D6] bg-white/75 hover:bg-white'
              }`}
            >
              <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
                {item.date}
              </div>
              <div className="mt-0.5 text-xs font-medium text-[#1C1B18]">{item.label}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {(
            [
              {
                id: 'initial',
                label: '1. Predict on Unfamiliar Wet Asphalt',
                sub: 'Prior dry-road rule: 18m stop',
              },
              {
                id: 'observed',
                label: '2. Observe Outcome & Update Friction Rule',
                sub: 'Simulator skid = 31m (overshoot)',
              },
              {
                id: 'transferred',
                label: '3. Transfer to New Rainy Exit Curve',
                sub: 'Test adapted rule on novel scenario',
              },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSimRun(item.id)}
              className={`rounded-lg border px-3 py-2 text-left transition-all ${
                simRun === item.id
                  ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
                  : 'border-[#E6E1D6] bg-white/75 hover:bg-white'
              }`}
            >
              <div className="text-xs font-semibold text-[#1C1B18]">{item.label}</div>
              <div className="text-[11px] text-[#57534E]">{item.sub}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const conventionalContent =
    subTab === 'continuity' ? (
      <div className="space-y-3">
        <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5 text-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#57534E]">
            <History className="h-4 w-4 text-[#C2410C]" />
            Unstructured Context Memory (Blended)
          </div>
          <p className="mt-2 text-[#1C1B18]">
            {timelineStep <= 2
              ? '“Cold-chain Probe B offset is +0.2°C.”'
              : timelineStep === 3
                ? '“Notes mention Probe B is +0.2°C and also +1.4°C after calibration.”'
                : '“Probe B calibration offset has been recorded as +0.2°C (or roughly +0.8°C on average across logs).”'}
          </p>
        </div>
        <p className="text-xs leading-relaxed text-[#57534E]">
          Without dated provenance and explicit supersession status, older high-frequency notes
          continue competing with the Day 15 calibration correction at Day 30.
        </p>
      </div>
    ) : (
      <div className="space-y-3">
        <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5 text-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#57534E]">
            <Play className="h-4 w-4 text-[#C2410C]" />
            Static Pattern Replay (No Feedback Revision)
          </div>
          <p className="mt-2 text-[#1C1B18]">
            {simRun === 'initial' && 'Predicted stopping distance: 18 meters (replays dry-road training text).'}
            {simRun === 'observed' && 'Observed 31m skid — logged in chat, but underlying decision policy unchanged.'}
            {simRun === 'transferred' &&
              'On novel rainy exit curve: still predicts 18 meters from memorized pattern prior → overshoots safety barrier.'}
          </p>
        </div>
      </div>
    );

  const epistemicContent =
    subTab === 'continuity' ? (
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F6B6B]">
          <Calendar className="h-4 w-4" />
          Dated Epistemic Ledger (Probe B Offset)
        </div>

        <div className="space-y-2">
          <div
            className={`rounded-lg border p-3 text-xs ${
              timelineStep >= 3
                ? 'border-[#E6E1D6] bg-[#FAF8F4] opacity-70'
                : 'border-[#0F6B6B]/30 bg-[#E8F4F4]/45'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-tech font-semibold text-[#1C1B18]">
                2026-10-01 (Day 1) · Initial Reading: +0.2°C
              </span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono-tech text-[10px] font-semibold ${
                  timelineStep >= 3
                    ? 'bg-[#FEE2E2] text-[#B91C1C] line-through'
                    : 'bg-[#0F6B6B] text-white'
                }`}
              >
                {timelineStep >= 3 ? 'SUPERSEDED' : 'ACTIVE'}
              </span>
            </div>
            <div className="mt-1 text-[#57534E]">Source: Automated boot log #102</div>
          </div>

          {timelineStep >= 3 && (
            <div className="rounded-lg border border-[#0F6B6B]/40 bg-[#E8F4F4]/55 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech font-semibold text-[#0F6B6B]">
                  2026-10-15 (Day 15) · Recalibrated Offset: +1.4°C
                </span>
                <span className="rounded bg-[#0F6B6B] px-1.5 py-0.5 font-mono-tech text-[10px] font-semibold text-white">
                  ACTIVE RECORD
                </span>
              </div>
              <div className="mt-1 text-[#1C1B18]">
                Source: Signed Lab Bench Calibration #418 · Supersedes Day 1 boot log #102.
              </div>
            </div>
          )}

          {timelineStep === 4 && (
            <div className="rounded-md border border-[#0F6B6B]/25 bg-white p-2.5 text-xs text-[#1C1B18]">
              <CheckCircle2 className="mr-1.5 inline h-3.5 w-3.5 text-[#0F6B6B]" />
              <strong>Day 30 Query Answer:</strong> Use <strong>+1.4°C</strong> (per Bench Log #418;
              Day 1 value +0.2°C archived as superseded).
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F6B6B]">
          <RefreshCw className="h-4 w-4" />
          Predict → Observe Outcome → Transfer Loop
        </div>
        <div className="space-y-2 text-xs">
          <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
            <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#57534E]">
              Trial 1 Prediction vs. Outcome
            </div>
            <div className="mt-1 text-[#1C1B18]">
              Predicted <strong>18m</strong> → Simulator Outcome:{' '}
              <strong className="text-[#B91C1C]">31m skid (+13m error)</strong>
            </div>
          </div>

          {simRun !== 'initial' && (
            <div className="rounded-lg border border-[#B45309]/35 bg-[#FEF3C7]/45 p-3">
              <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#B45309]">
                Hypothesis Revision
              </div>
              <div className="mt-1 text-[#1C1B18]">
                Updated friction multiplier under standing water: μ = 0.72 → 0.41 (×1.72 stopping
                distance).
              </div>
            </div>
          )}

          {simRun === 'transferred' && (
            <div className="rounded-lg border border-[#0F6B6B]/40 bg-[#E8F4F4]/55 p-3">
              <div className="font-mono-tech text-[10px] font-semibold uppercase text-[#0F6B6B]">
                Unfamiliar Scenario Transfer (Rainy Exit Curve)
              </div>
              <div className="mt-1 text-[#1C1B18]">
                <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-[#0F6B6B]" />
                Applies updated μ = 0.41 → initiates braking at <strong>34m</strong> (clears
                barrier safely).
              </div>
            </div>
          )}
        </div>
      </div>
    );

  const checks: ScoreCheckItem[] =
    subTab === 'continuity'
      ? [
          {
            label: 'Delayed Recall + Correction Supersession',
            conventionalPass: timelineStep <= 2,
            conventionalNote:
              timelineStep <= 2
                ? 'Recalls Day 1 before correction'
                : 'FAILS — blends superseded +0.2°C into Day 30 answer',
            epistemicPass: true,
            epistemicNote:
              timelineStep >= 3
                ? 'PASS — Day 15 record cleanly supersedes Day 1'
                : 'PASS — dated Day 1 baseline tracked',
          },
          {
            label: 'Audit Lineage Preservation',
            conventionalPass: false,
            conventionalNote: 'FAILS — loses which source overrode which',
            epistemicPass: true,
            epistemicNote: 'PASS — timestamps + source IDs preserved',
          },
        ]
      : [
          {
            label: 'Outcome-Driven Belief Update',
            conventionalPass: false,
            conventionalNote: 'FAILS — chat log does not update rule',
            epistemicPass: simRun !== 'initial',
            epistemicNote:
              simRun === 'initial'
                ? 'Run step 2 to observe outcome'
                : 'PASS — revised friction coefficient from error',
          },
          {
            label: 'Transfer to Unfamiliar Situation',
            conventionalPass: false,
            conventionalNote: 'FAILS — repeats 18m dry-road rule and overshoots',
            epistemicPass: simRun === 'transferred',
            epistemicNote:
              simRun === 'transferred'
                ? 'PASS — safely transfers 34m braking policy'
                : 'Click step 3 to test transfer',
          },
        ];

  return (
    <FaultLineShell
      spec={spec}
      controls={controls}
      conventionalContent={conventionalContent}
      epistemicContent={epistemicContent}
      checks={checks}
    />
  );
};

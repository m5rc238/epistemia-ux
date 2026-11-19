import React, { useState } from 'react';
import { GitBranch, PauseCircle, ShieldCheck } from 'lucide-react';
import { FaultLineSpec } from '../../../types/epistemia';
import { FaultLineShell, ScoreCheckItem } from '../FaultLineShell';

type CausalWorld = 'direct' | 'confounder' | 'underdetermined';

export const CausalityDemo: React.FC<{ spec: FaultLineSpec }> = ({ spec }) => {
  const [world, setWorld] = useState<CausalWorld>('underdetermined');

  const controls = (
    <div className="space-y-2">
      <div className="text-xs text-[#57534E]">
        All three worlds exhibit the <strong>exact same observational correlation (r = +0.74)</strong>{' '}
        between ICU Telemetry Alert Volume and 30-day Mortality:
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {(
          [
            {
              id: 'direct',
              title: '1. Direct Mechanism Specified',
              desc: 'Randomized alert-suppression trial confirms Alert Fatigue → Delay → Mortality',
            },
            {
              id: 'confounder',
              title: '2. Confounder Mechanism Specified',
              desc: 'APACHE-II Severity stratifies both Alerts & Mortality; suppression shows null effect',
            },
            {
              id: 'underdetermined',
              title: '3. Observational Data Only',
              desc: 'Only r = +0.74 reported; no randomization or severity stratification provided',
            },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setWorld(item.id)}
            className={`rounded-lg border p-3 text-left transition-all ${
              world === item.id
                ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
                : 'border-[#E6E1D6] bg-white/75 hover:bg-white'
            }`}
          >
            <div className="text-xs font-semibold text-[#1C1B18]">{item.title}</div>
            <div className="mt-0.5 text-[11px] text-[#57534E]">{item.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const conventionalContent = (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5 text-sm leading-relaxed text-[#1C1B18]">
        <div className="mb-1 text-xs font-semibold text-[#C2410C]">
          Observational Pattern-Completion Reply
        </div>
        <p>
          “Because telemetry alerts strongly correlate with mortality (r = +0.74), muting
          non-critical alerts will substantially reduce ICU mortality rates.”
        </p>
      </div>
      <div className="rounded-md border border-[#E6E1D6] bg-white p-3 text-xs text-[#57534E]">
        Conflates observational correlation (<code className="font-mono-tech">P(Y|X)</code>) with
        interventional expectation (<code className="font-mono-tech">P(Y|do(X))</code>)—failing
        both when a shared confounder drives the correlation and when the mechanism is
        underdetermined.
      </div>
    </div>
  );

  const epistemicContent = (
    <div className="space-y-3">
      {/* Structured Causal Spec */}
      <div className="grid gap-2 rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3 text-xs sm:grid-cols-3">
        <div>
          <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">Intervention</div>
          <div className="mt-0.5 font-semibold text-[#1C1B18]">do(Filter Alerts)</div>
        </div>
        <div>
          <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">Outcome</div>
          <div className="mt-0.5 font-semibold text-[#1C1B18]">30-Day Mortality</div>
        </div>
        <div>
          <div className="font-mono-tech text-[10px] uppercase text-[#8A8478]">Observation</div>
          <div className="mt-0.5 font-mono-tech font-semibold text-[#0F6B6B]">r = +0.74</div>
        </div>
      </div>

      {/* Inline Causal DAG SVG */}
      <div className="rounded-lg border border-[#E6E1D6] bg-white p-3">
        <div className="mb-2 flex items-center gap-1.5 font-mono-tech text-[10px] font-semibold uppercase text-[#57534E]">
          <GitBranch className="h-3.5 w-3.5 text-[#0F6B6B]" />
          Causal Graph Model ({world === 'underdetermined' ? 'Competing Models' : 'Identified DAG'})
        </div>
        <svg viewBox="0 0 360 110" className="h-24 w-full">
          <defs>
            <marker id="arrow-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0F6B6B" />
            </marker>
            <marker id="arrow-ochre" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#B45309" />
            </marker>
          </defs>

          {/* Confounder Node */}
          <rect
            x="125"
            y="8"
            width="110"
            height="28"
            rx="5"
            fill={world === 'confounder' ? '#FEF3C7' : '#FAF8F4'}
            stroke={world === 'confounder' ? '#B45309' : '#D6D0C4'}
          />
          <text x="180" y="26" textAnchor="middle" fontSize="10" fill="#1C1B18" fontWeight="600">
            Acuity (Confounder)
          </text>

          {/* Alerts Node */}
          <rect x="20" y="70" width="110" height="28" rx="5" fill="#E8F4F4" stroke="#0F6B6B" />
          <text x="75" y="88" textAnchor="middle" fontSize="10" fill="#0F6B6B" fontWeight="600">
            Telemetry Alerts (X)
          </text>

          {/* Mortality Node */}
          <rect x="230" y="70" width="110" height="28" rx="5" fill="#FAF8F4" stroke="#1C1B18" />
          <text x="285" y="88" textAnchor="middle" fontSize="10" fill="#1C1B18" fontWeight="600">
            Mortality (Y)
          </text>

          {/* Direct Edge X -> Y */}
          {(world === 'direct' || world === 'underdetermined') && (
            <line
              x1="130"
              y1="84"
              x2="224"
              y2="84"
              stroke="#0F6B6B"
              strokeWidth="2"
              strokeDasharray={world === 'underdetermined' ? '4 3' : undefined}
              markerEnd="url(#arrow-teal)"
            />
          )}

          {/* Confounder Edges U -> X and U -> Y */}
          {(world === 'confounder' || world === 'underdetermined') && (
            <>
              <line
                x1="150"
                y1="36"
                x2="92"
                y2="67"
                stroke="#B45309"
                strokeWidth="2"
                strokeDasharray={world === 'underdetermined' ? '4 3' : undefined}
                markerEnd="url(#arrow-ochre)"
              />
              <line
                x1="210"
                y1="36"
                x2="268"
                y2="67"
                stroke="#B45309"
                strokeWidth="2"
                strokeDasharray={world === 'underdetermined' ? '4 3' : undefined}
                markerEnd="url(#arrow-ochre)"
              />
            </>
          )}
        </svg>
      </div>

      {/* Prediction or Underdetermination Hold */}
      {world === 'underdetermined' ? (
        <div className="rounded-lg border border-[#B45309]/40 bg-[#FEF3C7]/45 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#B45309]">
            <PauseCircle className="h-4 w-4" />
            Underdetermination Hold — Refuses Causal Leap
          </div>
          <p className="mt-1 leading-relaxed text-[#1C1B18]">
            Both mechanisms produce <code className="font-mono-tech">r = +0.74</code>. Prediction
            withheld until discriminating evidence is obtained: run a{' '}
            <strong>unit-randomized alert-filtering trial</strong> or adjust for baseline APACHE-II
            acuity.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-[#0F6B6B]/30 bg-[#E8F4F4]/45 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#0F6B6B]">
            <ShieldCheck className="h-4 w-4" />
            Identified Interventional Prediction: do(Filter Alerts)
          </div>
          <p className="mt-1 leading-relaxed text-[#1C1B18]">
            {world === 'direct'
              ? 'Because causal path X → Y is verified experimentally, filtering nuisance alerts is predicted to lower mortality.'
              : 'Because Acuity confounds X and Y with no direct X → Y arrow, muting alerts does NOT reduce mortality (Δ ≈ 0) and risks hiding early warning signals.'}
          </p>
        </div>
      )}
    </div>
  );

  const checks: ScoreCheckItem[] = [
    {
      label: 'Interventional Prediction Under Specified Mechanism',
      conventionalPass: world === 'direct',
      conventionalNote:
        world === 'direct'
          ? 'Matches by luck when direct effect exists'
          : world === 'confounder'
            ? 'FAILS — predicts false benefit under confounding'
            : 'N/A — guesses without mechanism',
      epistemicPass: true,
      epistemicNote:
        world === 'direct'
          ? 'PASS — predicts reduction from X → Y'
          : world === 'confounder'
            ? 'PASS — predicts null do(X) effect'
            : 'PASS — defers until mechanism identified',
    },
    {
      label: 'Appropriate Underdetermination Hold (When Correlation Only)',
      conventionalPass: false,
      conventionalNote: 'FAILS — overclaims causal benefit from r = +0.74 alone',
      epistemicPass: true,
      epistemicNote:
        world === 'underdetermined'
          ? 'PASS — holds decision & names discriminating trial'
          : 'PASS — resolves hold once mechanism is specified',
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

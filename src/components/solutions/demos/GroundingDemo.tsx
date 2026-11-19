import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, FileSearch, Link2, XCircle } from 'lucide-react';
import { FaultLineSpec } from '../../../types/epistemia';
import { FaultLineShell, ScoreCheckItem } from '../FaultLineShell';

type CueState = 'full' | 'missing' | 'contradicted';

export const GroundingDemo: React.FC<{ spec: FaultLineSpec }> = ({ spec }) => {
  const [cueState, setCueState] = useState<CueState>('full');

  const controls = (
    <div className="flex flex-wrap items-center gap-2">
      {(
        [
          {
            id: 'full',
            label: '1. Full Methods & Fig. 2 Present',
            desc: 'Sham-controlled arm intact (-14 mmHg)',
          },
          {
            id: 'missing',
            label: '2. Remove Decisive Control Cue',
            desc: 'Sham arm & Fig. 2b stripped from source',
          },
          {
            id: 'contradicted',
            label: '3. Contradict with Null Replication',
            desc: 'Fig. 2c shows sham arm also dropped -13 mmHg',
          },
        ] as const
      ).map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setCueState(opt.id)}
          className={`rounded-lg border px-3 py-2 text-left transition-all ${
            cueState === opt.id
              ? 'border-[#0F6B6B] bg-white ring-1 ring-[#0F6B6B]'
              : 'border-[#E6E1D6] bg-white/70 hover:bg-white'
          }`}
        >
          <div className="text-xs font-semibold text-[#1C1B18]">{opt.label}</div>
          <div className="text-[11px] text-[#57534E]">{opt.desc}</div>
        </button>
      ))}
    </div>
  );

  const conventionalContent = (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3.5 text-sm leading-relaxed text-[#1C1B18]">
        <p className="font-medium">
          Summary Response: “Compound Omega-X lowers systolic blood pressure by 14 mmHg relative
          to control (Methods §2; Fig. 2).”
        </p>
        <p className="mt-2 text-xs text-[#57534E]">
          Confidence remains consistently fluent regardless of source perturbations because
          citations are emitted as unverified text tokens rather than live passage bindings.
        </p>
      </div>
      <div className="rounded-md border border-[#E6E1D6] bg-white p-3 text-xs text-[#57534E]">
        <span className="font-mono-tech text-[10px] font-semibold uppercase text-[#8A8478]">
          Active Evidence Access:
        </span>{' '}
        {cueState === 'full'
          ? 'Unlinked prose blob (matches expected surface claim by chance).'
          : cueState === 'missing'
            ? 'Still cites “Fig. 2” despite decisive control data being absent — phantom grounding.'
            : 'Still asserts -14 mmHg treatment efficacy even though Fig. 2c contradicts it.'}
      </div>
    </div>
  );

  const epistemicContent = (
    <div className="space-y-3">
      {/* Dynamic Claim Status Card */}
      <div
        className={`rounded-lg border p-3.5 ${
          cueState === 'full'
            ? 'border-[#0F6B6B]/30 bg-[#E8F4F4]/45'
            : cueState === 'missing'
              ? 'border-[#B45309]/40 bg-[#FEF3C7]/50'
              : 'border-[#B91C1C]/40 bg-[#FEF2F2]/60'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold uppercase">
            {cueState === 'full' && (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0F6B6B]" />
                <span className="text-[#0F6B6B]">Claim Status: Grounded &amp; Qualified</span>
              </>
            )}
            {cueState === 'missing' && (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-[#B45309]" />
                <span className="text-[#B45309]">Claim Status: Qualified — Decisive Cue Missing</span>
              </>
            )}
            {cueState === 'contradicted' && (
              <>
                <XCircle className="h-3.5 w-3.5 text-[#B91C1C]" />
                <span className="text-[#B91C1C]">Claim Status: Revised — Contradicted by Fig. 2c</span>
              </>
            )}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[#1C1B18]">
          {cueState === 'full' &&
            'Omega-X reduced systolic BP by 14 mmHg (95% CI [9, 19]) compared with sham placebo in §2.1 & Fig. 2b.'}
          {cueState === 'missing' &&
            'Cannot verify causal BP reduction: the open-label Omega-X arm dropped 14 mmHg, but the decisive randomized sham-control cue is missing from the provided excerpt.'}
          {cueState === 'contradicted' &&
            'Original causal claim is NOT supported: Fig. 2c shows the sham-placebo arm also fell 13 mmHg (between-arm difference -1 mmHg, p = 0.72).'}
        </p>
      </div>

      {/* Claim-Evidence Binding Inspector */}
      <div className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-3">
        <div className="mb-2 flex items-center gap-1.5 font-mono-tech text-[10px] font-semibold uppercase text-[#57534E]">
          <FileSearch className="h-3.5 w-3.5 text-[#0F6B6B]" />
          Bound Evidence Slots
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between rounded border border-[#E6E1D6] bg-white px-2.5 py-1.5">
            <span className="inline-flex items-center gap-1.5 text-[#1C1B18]">
              <Link2 className="h-3 w-3 text-[#0F6B6B]" />
              Methods §2.1 · Treatment Arm
            </span>
            <span className="font-mono-tech text-[11px] text-[#0F6B6B]">
              Verified (-14 mmHg)
            </span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#E6E1D6] bg-white px-2.5 py-1.5">
            <span className="inline-flex items-center gap-1.5 text-[#1C1B18]">
              <Link2 className="h-3 w-3 text-[#0F6B6B]" />
              Fig. 2b/c · Decisive Sham Control
            </span>
            <span
              className={`font-mono-tech text-[11px] font-medium ${
                cueState === 'full'
                  ? 'text-[#0F6B6B]'
                  : cueState === 'missing'
                    ? 'text-[#B45309]'
                    : 'text-[#B91C1C]'
              }`}
            >
              {cueState === 'full'
                ? 'Verified (0 mmHg sham)'
                : cueState === 'missing'
                  ? 'MISSING CUE'
                  : 'CONTRADICTED (-13 mmHg sham)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const checks: ScoreCheckItem[] = [
    {
      label: 'Citation Support (Does cited passage actually entail claim?)',
      conventionalPass: cueState === 'full',
      conventionalNote:
        cueState === 'full'
          ? 'Happens to match when intact'
          : 'FAILS — cites phantom/contradicted Fig. 2',
      epistemicPass: true,
      epistemicNote:
        cueState === 'full'
          ? 'PASS — binds claim to §2.1 + Fig. 2b'
          : cueState === 'missing'
            ? 'PASS — flags missing control cue explicitly'
            : 'PASS — cites Fig. 2c contradiction',
    },
    {
      label: 'Factual Accuracy (Does conclusion shift with decisive cue?)',
      conventionalPass: cueState === 'full',
      conventionalNote:
        cueState === 'full'
          ? 'Correct on unperturbed baseline'
          : 'FAILS — uncalibrated static assertion',
      epistemicPass: true,
      epistemicNote:
        cueState === 'full'
          ? 'PASS — affirms -14 mmHg effect'
          : cueState === 'missing'
            ? 'PASS — withholds causal attribution'
            : 'PASS — reverses conclusion to null (-1 mmHg)',
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

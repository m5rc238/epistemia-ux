import React, { useEffect, useRef } from 'react';
import { BookOpen, FileWarning } from 'lucide-react';
import { PaperStimulus } from '../../types/epistemia';

interface PaperReaderProps {
  paper: PaperStimulus;
  highlightedSectionId: string | null;
  highlightToken: number;
  correctedSectionId: string | null;
  stage: 'initial' | 'revision';
  onInspectDecisivePassage: () => void;
  onPostCorrectionInspect: () => void;
}

export const PaperReader: React.FC<PaperReaderProps> = ({
  paper,
  highlightedSectionId,
  highlightToken,
  correctedSectionId,
  stage,
  onInspectDecisivePassage,
  onPostCorrectionInspect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll smoothly to highlighted section whenever anchor button is clicked
  useEffect(() => {
    if (!highlightedSectionId) return;
    const el = sectionRefs.current[highlightedSectionId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedSectionId, highlightToken]);

  // Observe whether the decisive passage enters the reader viewport
  useEffect(() => {
    const decisiveEl = sectionRefs.current[paper.decisiveSectionId];
    if (!decisiveEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            onInspectDecisivePassage();
          }
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: [0.35],
      },
    );

    observer.observe(decisiveEl);
    return () => observer.disconnect();
  }, [paper.id, paper.decisiveSectionId, onInspectDecisivePassage]);

  const handleReaderInteraction = () => {
    if (stage === 'revision') {
      onPostCorrectionInspect();
    }
  };

  return (
    <article
      ref={scrollContainerRef}
      onScroll={handleReaderInteraction}
      onClick={handleReaderInteraction}
      className="editorial-scroll flex h-full max-h-[78vh] flex-col overflow-y-auto rounded-xl border border-[#E6E1D6] bg-white shadow-[0_1px_3px_rgba(28,27,24,0.04)]"
    >
      {/* Journal Masthead */}
      <div className="border-b border-[#E6E1D6] bg-[#FAF8F4]/75 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8A8478]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#57534E]">
            <BookOpen className="h-3.5 w-3.5 text-[#0F6B6B]" />
            {paper.journal} · {paper.year}
          </span>
          <span className="font-mono-tech text-[11px]">DOI: {paper.doi}</span>
        </div>
        <h2 className="mt-2 font-serif-display text-xl font-semibold leading-snug text-[#1C1B18] sm:text-2xl">
          {paper.title}
        </h2>
        <p className="mt-1.5 text-xs font-medium text-[#57534E]">{paper.authors}</p>
        <div className="mt-2 inline-block rounded border border-[#E6E1D6] bg-white px-2 py-0.5 font-mono-tech text-[10px] uppercase tracking-wide text-[#57534E]">
          {paper.domain}
        </div>
      </div>

      {/* Paper Body */}
      <div className="space-y-6 px-6 py-6">
        {/* Abstract */}
        <section className="rounded-lg border border-[#E6E1D6] bg-[#FAF8F4] p-4">
          <h3 className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#8A8478]">
            Abstract
          </h3>
          <p className="mt-1.5 text-[14px] leading-[1.65] text-[#1C1B18]">{paper.abstract}</p>
        </section>

        {/* Numbered Sections */}
        {paper.sections.map((section) => {
          const isHighlighted = highlightedSectionId === section.id;
          const isCorrectedTarget = stage === 'revision' && correctedSectionId === section.id;

          return (
            <section
              key={`${paper.id}-${section.id}-${isHighlighted ? highlightToken : 'base'}`}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              onClick={() => {
                if (section.id === paper.decisiveSectionId) {
                  onInspectDecisivePassage();
                }
              }}
              className={`rounded-lg border px-4 py-3.5 transition-all ${
                isHighlighted
                  ? 'animate-passage-flash border-[#0F6B6B] ring-1 ring-[#0F6B6B]/40'
                  : isCorrectedTarget
                    ? 'border-[#D97706]/50 bg-[#FFFBEB]/40'
                    : 'border-transparent hover:border-[#E6E1D6]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif-display text-lg font-medium text-[#1C1B18]">
                  {section.heading}
                </h3>
                <div className="flex items-center gap-1.5">
                  {isHighlighted && (
                    <span className="rounded bg-[#0F6B6B] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-white">
                      Linked Evidence Passage
                    </span>
                  )}
                  {isCorrectedTarget && (
                    <span className="inline-flex items-center gap-1 rounded border border-[#D97706]/40 bg-[#FEF3C7] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-[#92400E]">
                      <FileWarning className="h-3 w-3" />
                      Referenced by Erratum
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-2 space-y-3 text-[14.5px] leading-[1.7] text-[#302E2A]">
                {section.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {section.dataTable && (
                <div className="mt-4 overflow-hidden rounded-lg border border-[#E6E1D6] bg-[#FAF8F4]">
                  <div className="border-b border-[#E6E1D6] bg-[#F3EFE7]/75 px-3 py-2 text-xs font-medium text-[#57534E]">
                    {section.dataTable.caption}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E6E1D6] text-[11px] font-semibold text-[#57534E]">
                          {section.dataTable.headers.map((h) => (
                            <th key={h} className="px-3 py-2">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E1D6] bg-white font-mono-tech text-[11px] text-[#1C1B18]">
                        {section.dataTable.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-3 py-2 ${cIdx === 0 ? 'font-sans font-medium' : ''}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
};

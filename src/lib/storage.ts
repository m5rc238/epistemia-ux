import { TrialRecord } from '../types/epistemia';

export const TRIALS_STORAGE_KEY = 'epistemia-ux:trials:v1';

export function loadStoredTrials(): TrialRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(TRIALS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is TrialRecord =>
        Boolean(item) &&
        typeof item.id === 'string' &&
        typeof item.paperId === 'string' &&
        (item.summaryCondition === 'conventional' ||
          item.summaryCondition === 'epistemic') &&
        (item.correctionType === 'decisive' ||
          item.correctionType === 'non_decisive'),
    );
  } catch {
    return [];
  }
}

export function saveStoredTrials(trials: TrialRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(TRIALS_STORAGE_KEY, JSON.stringify(trials));
  } catch {
    // Ignore storage quota issues in restricted browsers
  }
}

export function clearStoredTrials(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(TRIALS_STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }
}

export function escapeCsvField(value: string | number | boolean): string {
  const str = String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const CSV_HEADERS = [
  'id',
  'sessionId',
  'trialIndex',
  'totalTrials',
  'mode',
  'isSimulated',
  'paperId',
  'paperTitle',
  'summaryCondition',
  'correctionType',
  'preEndorsement',
  'postEndorsement',
  'deltaEndorsement',
  'preConfidence',
  'postConfidence',
  'categoricalChoice',
  'appropriate',
  'classification',
  'initialReadingTimeMs',
  'revisionReadingTimeMs',
  'passageLinkClicks',
  'decisivePassageInspected',
  'reinspectedAfterCorrection',
  'rationale',
  'timestamp',
] as const;

export function trialsToCsv(trials: TrialRecord[]): string {
  const headerRow = CSV_HEADERS.join(',');
  const rows = trials.map((t) =>
    [
      t.id,
      t.sessionId,
      t.trialIndex,
      t.totalTrials,
      t.mode,
      Boolean(t.isSimulated),
      t.paperId,
      t.paperTitle,
      t.summaryCondition,
      t.correctionType,
      t.preEndorsement,
      t.postEndorsement,
      t.deltaEndorsement,
      t.preConfidence,
      t.postConfidence,
      t.categoricalChoice,
      t.appropriate,
      t.classification,
      t.initialReadingTimeMs,
      t.revisionReadingTimeMs,
      t.passageLinkClicks,
      t.decisivePassageInspected,
      t.reinspectedAfterCorrection,
      t.rationale,
      t.timestamp,
    ]
      .map(escapeCsvField)
      .join(','),
  );
  return [headerRow, ...rows].join('\r\n');
}

export function downloadTextFile(
  filename: string,
  content: string,
  mimeType: string,
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

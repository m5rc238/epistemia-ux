import { PaperStimulus } from '../types/epistemia';

export const PAPER_STIMULI: PaperStimulus[] = [
  {
    id: 'sleep-lenses',
    domain: 'Chronobiology & Clinical Nursing',
    title:
      'Evening Blue-Light Filtering Lenses and Sleep-Onset Latency in Shift-Working Nurses: A Randomized Crossover Trial',
    authors: 'M. Varga, H. Lindqvist, D. Chaturvedi & P. Moreau',
    journal: 'Journal of Applied Chronobiology',
    year: 2026,
    doi: '10.1016/j.jac.2026.04.012',
    abstract:
      'Rotating-shift hospital nurses frequently experience delayed daytime recovery sleep following night shifts due to morning commute light exposure. In a 4-week randomized two-period crossover trial across three hospitals (n = 88), wearing amber blue-light filtering lenses for 2 hours prior to scheduled daytime sleep reduced actigraphy-measured sleep-onset latency by 18.4 minutes compared with matched clear placebo lenses.',
    centralClaim:
      'Wearing amber blue-light filtering lenses for 2 hours before daytime recovery sleep meaningfully reduces sleep-onset latency (by ~18 minutes) compared with clear placebo lenses.',
    sections: [
      {
        id: '§1.1',
        heading: '§1.1 Background & Rationale',
        paragraphs: [
          'Melanopsin-expressing retinal ganglion cells peak in sensitivity near 480 nm and suppress endogenous melatonin secretion when shift workers commute home under daylight after overnight hospital duty. Prolonged circadian phase delay contributes to fragmented recovery sleep and elevated clinical fatigue.',
          'Prior observational studies of spectral-filtering eyewear reported subjective sleep gains, yet open-label designs could not separate optical melanopsin protection from bedtime expectancy or behavioral wind-down routines.',
        ],
      },
      {
        id: '§2.1',
        heading: '§2.1 Crossover Protocol & Participant Allocation',
        paragraphs: [
          'We enrolled 88 full-time acute-care nurses working consecutive 12-hour night rotations at hospitals in Basel and Lyon (mean age 34.2 years, 81% female). Participants were randomized 1:1 to either an amber-first or clear-placebo-first sequence across two 14-day intervention periods separated by a 7-day washout.',
          'All frames were identical wraparound shells; lenses were labeled only with coded batch tags. Nurses were instructed to don their assigned eyewear 2 hours before planned daytime sleep onset and maintain their usual bedroom environment and pre-sleep routines throughout both periods.',
        ],
        dataTable: {
          caption: 'Table 1. Primary Crossover Outcomes (n = 88 completers, 14 nights per period)',
          headers: ['Outcome Measure', 'Amber Lenses', 'Clear Placebo', 'Paired Difference [95% CI]', 'p-value'],
          rows: [
            ['Sleep-onset latency (min)', '21.3 (SD 9.4)', '39.7 (SD 12.1)', '-18.4 [-25.6, -11.2]', '< 0.001'],
            ['Total daytime sleep (min)', '374 (SD 48)', '351 (SD 53)', '+23 [+7, +39]', '0.006'],
            ['Karolinska sleepiness (1–9)', '4.1 (SD 1.2)', '5.3 (SD 1.4)', '-1.2 [-1.7, -0.7]', '< 0.001'],
          ],
        },
      },
      {
        id: '§3.1',
        heading: '§3.1 Primary Actigraphy Analysis & Causal Attribution',
        isDecisive: true,
        paragraphs: [
          'In the linear mixed-effects crossover model adjusting for period, sequence, and hospital site, amber lenses reduced wrist-actigraphy sleep-onset latency by 18.4 minutes (95% CI [11.2, 25.6], p < 0.001) relative to clear placebo lenses. Sequence-by-treatment interaction was non-significant (p = 0.42).',
          'Because within-subject crossover designs compare each nurse against their own baseline across identical hospital schedules, attributing the 18.4-minute reduction specifically to 480 nm optical filtering depends critically on the assumption that no unrecorded co-interventions or bedroom light-blocking aids differed systematically between the amber and clear periods.',
        ],
      },
      {
        id: '§4.1',
        heading: '§4.1 Practical Implications',
        paragraphs: [
          'If replicated over longer rotation blocks, distributing standardized amber lenses in hospital wellness programs represents an inexpensive, non-pharmacological countermeasure for acute post-shift insomnia without sedative carryover.',
        ],
      },
    ],
    decisiveSectionId: '§3.1',
    decisiveQuote:
      'Attributing the 18.4-minute reduction specifically to 480 nm optical filtering depends critically on the assumption that no unrecorded co-interventions or bedroom light-blocking aids differed systematically between the amber and clear periods.',
    decisiveWhy:
      'The 18.4-minute benefit only isolates blue-light filtering if both crossover periods shared identical bedroom sleep conditions apart from lens tint.',
    loadBearingAssumption:
      'Neither crossover period introduced systematic auxiliary sleep aids (such as blackout masks) or unblinding differentials that coincided with the amber-lens assignment.',
    falsificationCondition:
      'If participants in the amber period disproportionately used another sleep-promoting aid or experienced a period-specific co-intervention, the 18.4-minute latency gap cannot be attributed to blue-light filtering.',
    conventionalSummary: {
      lead: 'A 4-week randomized crossover trial (n = 88) demonstrates that wearing amber blue-light filtering lenses for 2 hours before daytime recovery sleep meaningfully reduces sleep-onset latency by 18.4 minutes compared with clear placebo lenses.',
      paragraphs: [
        'Varga and colleagues randomized acute-care night-shift nurses across three hospitals in Basel and Lyon to wear either amber filtering eyewear or visually matched clear wraparound frames in two 14-day periods separated by a 7-day washout. Wrist actigraphy confirmed that nurses fell asleep 18.4 minutes faster (95% CI [11.2, 25.6], p < 0.001) and slept 23 minutes longer during the amber phase.',
        'Participants also reported lower post-wake sleepiness on the Karolinska scale without sequence interaction effects. The authors conclude that targeted pre-sleep spectral filtering offers a practical, drug-free intervention for hospital shift-work recovery.',
      ],
      keyTakeaways: [
        '18.4-minute reduction in actigraphy sleep-onset latency (p < 0.001) with amber vs. clear lenses.',
        '+23 minutes of additional daytime recovery sleep and lower subjective fatigue.',
        'Randomized two-period crossover design across 88 shift-working hospital nurses.',
      ],
    },
    epistemicSummary: {
      lead: 'A 4-week randomized crossover trial (n = 88) reports that wearing amber blue-light filtering lenses for 2 hours before daytime recovery sleep reduces sleep-onset latency by 18.4 minutes compared with clear placebo lenses.',
      conclusionStatement:
        'Amber lenses reduced actigraphy sleep-onset latency by 18.4 minutes (95% CI [11.2, 25.6], p < 0.001) and increased total daytime sleep by 23 minutes across 88 shift-working nurses.',
      paragraphs: [
        'Nurses in Basel and Lyon alternated between 14-day blocks wearing amber lenses and clear placebo lenses with a 7-day washout, keeping pre-sleep timing and bedroom environments constant by protocol.',
        'While the within-subject statistical difference is strong, causal attribution to blue-light optical filtering rests directly on the symmetry of conditions across both crossover periods.',
      ],
      decisiveAnchorLabel: 'Inspect §3.1 Decisive Evidence Passage',
      decisiveAnchorNote:
        'Links the 18.4-minute crossover estimate to the assumption of balanced co-interventions across periods.',
    },
    corrections: {
      decisive: {
        noticeId: 'ERR-2026-0412-A',
        publishedDate: '2026-05-03',
        targetSectionId: '§3.1',
        title: 'Published Correction Notice — Co-Intervention Audit',
        body: 'Post-publication pharmacy and supply audit revealed that 64% (28 of 44) of participants randomized to the amber-first sequence received complimentary blackout eye masks from unit wellness kits during their amber-lens fortnight only. Re-estimating the linear mixed-effects model with eye-mask usage included as a time-varying covariate reduces the sleep-onset latency advantage of amber lenses from 18.4 minutes to 2.1 minutes (95% CI [-4.8, 9.0], p = 0.54).',
        explanationForDebrief:
          'This correction is DECISIVE: it directly breaks the load-bearing assumption in §3.1 (comparable co-interventions across crossover periods). Controlling for the blackout eye masks eliminates the 18.4-minute effect entirely (2.1 min, p = 0.54), requiring revision of the conclusion.',
      },
      non_decisive: {
        noticeId: 'ERR-2026-0412-B',
        publishedDate: '2026-05-03',
        targetSectionId: '§2.1',
        title: 'Published Correction Notice — Baseline Demographics Audit',
        body: 'Post-publication data-entry audit revealed that a spreadsheet import column shift in Table 2 misreported participants’ mean nursing tenure as 7.4 years (SD 3.1) rather than the verified 8.1 years (SD 3.3), and transposed the site labels for Lyon clinics B and C. Re-running the primary linear mixed-effects crossover model confirms the sleep-onset latency reduction of 18.4 minutes (95% CI [11.2, 25.6], p < 0.001) remains completely unchanged.',
        explanationForDebrief:
          'This correction is NON-DECISIVE: correcting baseline nursing tenure (7.4 vs. 8.1 years) and transposing two clinic sub-labels leaves the randomized within-subject crossover estimate (18.4 min, p < 0.001) wholly intact. The justified conclusion should be retained.',
      },
    },
  },
  {
    id: 'socratic-hints',
    domain: 'Educational Psychology & Learning Analytics',
    title:
      'Structured Socratic Hints Outperform Direct Worked Solutions for Long-Term Retention in Introductory Statistics',
    authors: 'C. Okafor & S. Lindholm',
    journal: 'Learning Analytics Quarterly',
    year: 2026,
    doi: '10.1145/laq.2026.0188',
    abstract:
      'Digital homework platforms increasingly offer step-by-step worked solutions when students stall, raising concern that immediate answer exposure encourages passive mimicry. In a semester-long classroom field experiment (n = 251 undergraduates), learners randomized to Socratic hint-scaffolding scored 14.2 percentage points higher on an optional 4-week delayed transfer exam than peers receiving direct worked solutions.',
    centralClaim:
      'Socratic hint-scaffolding produces substantially higher 4-week delayed transfer exam scores (+14.2 percentage points) than direct worked solutions in introductory statistics.',
    sections: [
      {
        id: '§1.1',
        heading: '§1.1 Desirable Difficulties in Digital Tutoring',
        paragraphs: [
          'Cognitive load and desirable-difficulty theories make opposing predictions for novice statistics learners: worked examples reduce extraneous search, whereas generative hints prompt effortful retrieval of hypothesis-testing schemas.',
          'Previous laboratory evaluations measured same-day posttests. Whether generative hint-scaffolding sustains transfer advantages across a 4-week delay in authentic undergraduate courses remains contested.',
        ],
      },
      {
        id: '§2.1',
        heading: '§2.1 Course Setting & Practice Modules',
        paragraphs: [
          'We randomized 251 undergraduates enrolled in Introductory Quantitative Reasoning across 12 weekly online practice modules. Students in the Worked-Solution arm received an annotated step-by-step solution immediately after an incorrect attempt; students in the Socratic-Hint arm received up to three diagnostic questions prompting them to identify the test statistic, degrees of freedom, and null distribution before verification.',
          'Baseline quantitative SAT/ACT math scores and prior midterm grades were balanced across both arms at randomization (mean midterm 71.4% vs. 71.8%, p = 0.84).',
        ],
      },
      {
        id: '§2.3',
        heading: '§2.3 Delayed Transfer Assessment & Sample Composition',
        isDecisive: true,
        paragraphs: [
          'Four weeks after the final module, students were invited to sit an optional 20-item ungraded transfer exam featuring novel experimental vignettes in exchange for 2% extra course credit. Overall, 186 of 251 enrolled students (74.1% pooled retention) completed the delayed assessment.',
          'Among delayed-exam completers, the Socratic-Hint arm achieved a mean transfer score of 78.6% (SD 11.4) compared with 64.4% (SD 13.8) in the Worked-Solution arm—a +14.2 percentage-point advantage (Cohen’s d = 0.68, p = 0.002). Interpreting this completer contrast as a causal benefit of Socratic hints assumes non-differential attrition: that completion rates and academic ability of students opting into the optional 4-week exam did not systematically diverge between conditions.',
        ],
        dataTable: {
          caption: 'Table 1. Optional 4-Week Delayed Transfer Exam Results (n = 186 completers)',
          headers: ['Measure', 'Socratic Hints', 'Worked Solutions', 'Difference / Effect', 'p-value'],
          rows: [
            ['Prior midterm (all randomized, n=251)', '71.4%', '71.8%', '-0.4 pp', '0.84'],
            ['Delayed transfer exam (completers)', '78.6% (SD 11.4)', '64.4% (SD 13.8)', '+14.2 pp (d = 0.68)', '0.002'],
            ['Same-week module accuracy', '73.2%', '76.1%', '-2.9 pp', '0.11'],
          ],
        },
      },
      {
        id: '§4.1',
        heading: '§4.1 Pedagogical Recommendations',
        paragraphs: [
          'Course designers should replace default "Show Full Solution" buttons with adaptive Socratic prompts whenever durable conceptual transfer is the instructional goal.',
        ],
      },
    ],
    decisiveSectionId: '§2.3',
    decisiveQuote:
      'Interpreting this completer contrast as a causal benefit of Socratic hints assumes non-differential attrition: that completion rates and academic ability of students opting into the optional 4-week exam did not systematically diverge between conditions.',
    decisiveWhy:
      'Because the 4-week exam was optional (74.1% overall participation), differential dropout of struggling students from one arm would artificially inflate that arm’s completer average.',
    loadBearingAssumption:
      'Participation in the optional 4-week delayed transfer exam was balanced across arms and uncorrelated with student baseline ability within each condition.',
    falsificationCondition:
      'If fewer or disproportionately higher-achieving students from the Socratic-Hint arm opted into the optional delayed exam, selection bias could explain the +14.2 percentage-point gap.',
    conventionalSummary: {
      lead: 'A semester-long randomized field experiment (n = 251) shows that Socratic hint-scaffolding yields a substantial +14.2 percentage-point improvement on a 4-week delayed statistics transfer exam compared with direct worked solutions.',
      paragraphs: [
        'Okafor and Lindholm assigned undergraduates across 12 weekly online statistics modules to receive either full worked solutions or three-step Socratic diagnostic hints following errors. Although baseline midterm grades and immediate practice accuracy were virtually identical between groups, students in the Socratic condition dramatically outperformed peers four weeks later (78.6% vs. 64.4%, Cohen’s d = 0.68, p = 0.002).',
        'Across 186 delayed-exam participants (74.1% retention), generative scaffolding fostered deeper conceptual retention of hypothesis-testing schemas. The authors advise educational platforms to replace direct solution reveals with structured Socratic prompts.',
      ],
      keyTakeaways: [
        '+14.2 percentage-point gain on 4-week delayed transfer problems (78.6% vs. 64.4%, p = 0.002).',
        'Large effect size (Cohen’s d = 0.68) despite matched baseline midterm performance.',
        'Supports desirable-difficulty theory over immediate worked-example exposure.',
      ],
    },
    epistemicSummary: {
      lead: 'A semester-long randomized field experiment (n = 251) reports that Socratic hint-scaffolding produces a +14.2 percentage-point higher score on a 4-week delayed statistics transfer exam than direct worked solutions.',
      conclusionStatement:
        'Among 186 completers (74.1% pooled retention), Socratic-Hint students scored 78.6% vs. 64.4% for Worked-Solution students (d = 0.68, p = 0.002).',
      paragraphs: [
        'Baseline midterm grades were balanced at randomization (71.4% vs. 71.8%), and students completed 12 weekly practice modules before taking an optional 20-item delayed transfer exam for extra credit.',
        'Because the 4-week transfer exam was optional and pooled retention was 74.1%, the validity of the +14.2 pp causal estimate relies on whether attrition was symmetric across the two arms.',
      ],
      decisiveAnchorLabel: 'Inspect §2.3 Decisive Evidence Passage',
      decisiveAnchorNote:
        'Links the +14.2 pp completer score gap to the non-differential attrition assumption on the optional exam.',
    },
    corrections: {
      decisive: {
        noticeId: 'ERR-2026-0188-A',
        publishedDate: '2026-06-11',
        targetSectionId: '§2.3',
        title: 'Published Correction Notice — Arm-Level Retention Audit',
        body: 'Disaggregated LMS access logs obtained during archival verification show that 4-week follow-up retention differed sharply by condition: 89% (112/126) in the worked-solution arm versus 59% (74/125) in the Socratic-hint arm. Socratic non-completers had substantially lower prior midterm scores (mean 52.1% vs. 74.8% for completers). Under inverse-probability-weighted and intention-to-treat sensitivity analyses, the delayed transfer advantage shrinks from +14.2 percentage points to +1.8 points (p = 0.61).',
        explanationForDebrief:
          'This correction is DECISIVE: severe differential attrition (59% vs. 89% retention) caused lower-performing Socratic students to drop out before the optional exam. Correcting for this selection bias collapses the effect from +14.2 pp to +1.8 pp (p = 0.61).',
      },
      non_decisive: {
        noticeId: 'ERR-2026-0188-B',
        publishedDate: '2026-06-11',
        targetSectionId: '§2.1',
        title: 'Published Correction Notice — Module Itemization & Software Version',
        body: 'Curriculum packaging verification indicates that two practice modules listed in Section 2.1 actually delivered 11 graded items plus 1 unscored warm-up prompt rather than 12 graded items, and summary models were executed in R 4.4.1 rather than R 4.3.2 as stated. Re-checking the primary trial dataset confirms that arm completion counts, participant baseline covariates, and the delayed transfer exam advantage (+14.2 percentage points, p = 0.002) remain unchanged.',
        explanationForDebrief:
          'This correction is NON-DECISIVE: clarifying that two modules had 11 graded + 1 warm-up item and noting the R patch version does not alter arm retention, baseline balance, or the +14.2 pp transfer advantage.',
      },
    },
  },
  {
    id: 'curbside-pricing',
    domain: 'Urban Mobility & Public Policy',
    title:
      'Dynamic Curbside Delivery Pricing Cuts Peak Commercial Double-Parking in Dense Retail Corridors',
    authors: 'R. Mendes, K. Sato & L. Al-Mansoor',
    journal: 'Urban Mobility & Policy',
    year: 2026,
    doi: '10.1080/ump.2026.0934',
    abstract:
      'Unregulated commercial loading zones create chronic double-parking bottlenecks in dense retail districts. Evaluating a municipal 16-week pilot across 28 matched urban corridors via difference-in-differences estimation, peak-hour dynamic curbside pricing reduced commercial double-parking minutes per block-hour by 31.2% (p < 0.001) without measurable spillover onto adjacent residential side streets.',
    centralClaim:
      'Peak-hour dynamic curbside delivery pricing reduced commercial double-parking by 31.2% across treated retail corridors without shifting congestion to adjacent blocks.',
    sections: [
      {
        id: '§1.1',
        heading: '§1.1 Urban Freight Curb Congestion',
        paragraphs: [
          'Last-mile parcel vans frequently double-park in active travel lanes when flat-rate loading bays remain occupied by long-dwell deliveries. Cities increasingly consider demand-responsive curb pricing to accelerate bay turnover during peak retail windows.',
        ],
      },
      {
        id: '§2.2',
        heading: '§2.2 Dynamic Pricing Pilot & Corridor Matching',
        paragraphs: [
          'Between March and June, the municipality piloted dynamic loading-zone tariffs on 14 commercial retail corridors, escalating from an off-peak base rate (€1.50/30 min)* up to €4.80/30 min whenever block-level occupancy sensors exceeded 85%. Fourteen propensity-matched control corridors retained fixed €1.50/30 min signage.',
          'Overhead traffic cameras recorded commercial double-parking duration, loading-bay turnover, and adjacent side-street blocking across an 8-week pre-pilot baseline and the 16-week intervention window.',
        ],
      },
      {
        id: '§3.2',
        heading: '§3.2 Difference-in-Differences & Spillover Analysis',
        isDecisive: true,
        paragraphs: [
          'Comparing treated versus matched control corridors over 16 weeks, peak commercial double-parking fell by 31.2% (95% CI [-39.4%, -23.0%], p < 0.001), from 14.1 to 9.7 double-parking minutes per block-hour, while average loading dwell time shortened by 11 minutes. Adjacent residential side-street blocking changed by a non-significant +1.4% (p = 0.67).',
          'Because treated corridors were selected through municipal pilot rollout rather than block-level randomization, attributing the 31.2% drop to dynamic price incentives requires the parallel-trends and unchanged-enforcement assumption: specifically, that no concurrent municipal parking enforcement surges, citation sweeps, or street closures occurred selectively on treated corridors during the 16-week pilot.',
        ],
        dataTable: {
          caption: 'Table 1. Difference-in-Differences Curbside Outcomes (14 Treated vs. 14 Control Corridors)',
          headers: ['Indicator (Peak 08:00–18:00)', 'Pre-Pilot Mean', 'Pilot Mean', 'DiD Estimate [95% CI]', 'p-value'],
          rows: [
            ['Double-parking (min / block-hr)', '14.1', '9.7', '-31.2% [-39.4%, -23.0%]', '< 0.001'],
            ['Mean bay dwell duration (min)', '29.4', '18.3', '-11.1 min [-14.8, -7.4]', '< 0.001'],
            ['Adjacent block spillover (%)', '3.2%', '3.4%', '+1.4% [-5.1%, +7.9%]', '0.67'],
          ],
        },
      },
      {
        id: '§4.1',
        heading: '§4.1 Policy Outlook',
        paragraphs: [
          'Price-responsive curb management appears to align delivery arrival timing with curb availability while avoiding enforcement-heavy policing overhead.',
        ],
      },
    ],
    decisiveSectionId: '§3.2',
    decisiveQuote:
      'Attributing the 31.2% drop to dynamic price incentives requires the parallel-trends and unchanged-enforcement assumption: specifically, that no concurrent municipal parking enforcement surges, citation sweeps, or street closures occurred selectively on treated corridors.',
    decisiveWhy:
      'In a quasi-experimental municipal pilot, selective increases in citation patrols on treated blocks would confound dynamic pricing with heightened enforcement deterrence.',
    loadBearingAssumption:
      'Municipal parking enforcement intensity and patrol frequency remained constant and comparable between the 14 treated corridors and 14 control corridors during the 16-week pilot.',
    falsificationCondition:
      'If treated corridors received increased citation sweeps or targeted automated enforcement alongside dynamic pricing, the double-parking reduction could reflect policing rather than tariff responsiveness.',
    conventionalSummary: {
      lead: 'A 16-week difference-in-differences evaluation of 28 urban retail corridors finds that peak-hour dynamic curbside pricing reduced commercial double-parking by 31.2% without displacing congestion onto adjacent side streets.',
      paragraphs: [
        'Mendes, Sato, and Al-Mansoor tracked overhead traffic video across 14 retail corridors using sensor-triggered tariffs (rising up to €4.80 per 30 minutes above 85% occupancy) and 14 matched flat-rate control corridors. Treated corridors cut peak double-parking duration from 14.1 to 9.7 minutes per block-hour (-31.2%, p < 0.001) and reduced average bay dwell times by 11.1 minutes.',
        'Side-street spillover remained negligible (+1.4%, p = 0.67). The study concludes that demand-responsive curb tariffs effectively alleviate last-mile freight bottlenecks without relying on heavier policing.',
      ],
      keyTakeaways: [
        '31.2% reduction in peak commercial double-parking across 14 treated retail corridors (p < 0.001).',
        'Loading-bay dwell duration dropped by 11.1 minutes; no significant adjacent-block spillover (+1.4%).',
        'Supports sensor-driven dynamic pricing as a low-enforcement curb management strategy.',
      ],
    },
    epistemicSummary: {
      lead: 'A 16-week difference-in-differences evaluation across 28 urban corridors reports that peak-hour dynamic curbside pricing reduced commercial double-parking by 31.2% without adjacent-block spillover.',
      conclusionStatement:
        'Treated corridors showed a -31.2% DiD reduction in double-parking minutes per block-hour (p < 0.001) and +1.4% non-significant side-street spillover (p = 0.67).',
      paragraphs: [
        'Sensor-linked tariffs escalated up to €4.80/30 min when bay occupancy exceeded 85%, while 14 matched control corridors kept fixed tariffs across an 8-week baseline and 16-week pilot.',
        'Because this was a non-randomized municipal rollout, causal credit to dynamic pricing relies directly on enforcement schedules remaining unchanged across treated and control corridors.',
      ],
      decisiveAnchorLabel: 'Inspect §3.2 Decisive Evidence Passage',
      decisiveAnchorNote:
        'Links the -31.2% DiD policy estimate to the unchanged-enforcement assumption across corridors.',
    },
    corrections: {
      decisive: {
        noticeId: 'ERR-2026-0934-A',
        publishedDate: '2026-07-19',
        targetSectionId: '§3.2',
        title: 'Published Correction Notice — Municipal Enforcement Log Audit',
        body: 'Cross-referencing municipal enforcement records revealed that automated license-plate citation vans tripled daily patrol frequency on 11 of the 14 treated retail corridors during the exact 16-week dynamic-pricing window, while patrol schedules on control corridors stayed constant. Re-analyzing the 3 treated corridors that did not receive intensified citation sweeps yields a statistically non-significant change in commercial double-parking of -4.6% (95% CI [-17.8%, +8.6%], p = 0.49).',
        explanationForDebrief:
          'This correction is DECISIVE: tripled citation patrol sweeps coincided directly with dynamic pricing on 11/14 treated corridors, violating §3.2’s unchanged-enforcement assumption. In unpatrolled treated corridors, the effect vanishes (-4.6%, p = 0.49).',
      },
      non_decisive: {
        noticeId: 'ERR-2026-0934-B',
        publishedDate: '2026-07-19',
        targetSectionId: '§2.2',
        title: 'Published Correction Notice — Tariff Footnote & Figure Caption',
        body: 'Municipal tariff schedule review indicates that the footnote in Section 2.2 misstated the pre-intervention off-peak base loading rate as €1.50 per 30 minutes rather than the verified €1.60 per 30 minutes, and the Figure 2 caption omitted the parenthetical “(weekday hours 08:00–18:00)” although plotted data already reflected weekday hours. Re-running the difference-in-differences estimator confirms the double-parking reduction (-31.2%, p < 0.001) and spillover check remain unchanged.',
        explanationForDebrief:
          'This correction is NON-DECISIVE: a €0.10 typo in the historical base-rate footnote and an omitted figure caption label leave the DiD estimate (-31.2%, p < 0.001) and enforcement symmetry untouched. The conclusion should be retained.',
      },
    },
  },
];

export function getPaperById(paperId: string): PaperStimulus {
  return PAPER_STIMULI.find((p) => p.id === paperId) ?? PAPER_STIMULI[0];
}

// Shared (client-safe) analysis types, validation and deterministic fallback.
import { QUESTIONS, SECTION_LABELS, type Section } from "@/data/questions";
import { RECOMMENDATIONS } from "@/data/recommendations";
import type { Answers, ScoreResult } from "./scoring";

export interface AnalysisRecommendation {
  competency: string;
  identified_gap: string;
  reason: string;
  practice_activity: string;
  next_action: string;
}
export interface Analysis {
  performance_summary: string;
  identified_strengths: string[];
  identified_weaknesses: string[];
  recurring_error_patterns: string[];
  recommendations: AnalysisRecommendation[];
  next_step: string;
}
export interface AnalysisResult { source: "ai" | "fallback"; analysis: Analysis }

const str = (v: unknown, max = 600): string | null =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;
const strArr = (v: unknown, max = 6): string[] =>
  Array.isArray(v) ? v.map((x) => str(x, 300)).filter((x): x is string => !!x).slice(0, max) : [];

const banned = /\b(will pass|will fail|guarantee|garantiert|official score|listening|speaking|writing|hören|sprechen|schreiben)\b/i;

/** Validates raw AI output against the learner's actual incorrect competencies. Returns null when unusable. */
export function validateAnalysis(raw: unknown, score: ScoreResult): Analysis | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const summary = str(r["performance_summary"], 900);
  const nextStep = str(r["next_step"], 400);
  if (!summary || !nextStep || banned.test(summary) || banned.test(nextStep)) return null;

  const wrong = score.incorrectCompetencies.map((c) => c.toLowerCase());
  const seen = new Set<string>();
  const recs: AnalysisRecommendation[] = [];
  for (const item of (Array.isArray(r["recommendations"]) ? (r["recommendations"] as unknown[]) : [])) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const competency = str(o["competency"], 120);
    const rec = {
      competency: competency ?? "",
      identified_gap: str(o["identified_gap"]) ?? "",
      reason: str(o["reason"]) ?? "",
      practice_activity: str(o["practice_activity"]) ?? "",
      next_action: str(o["next_action"]) ?? "",
    };
    if (!competency || Object.values(rec).some((v) => !v)) continue;
    const key = competency.toLowerCase();
    // Must map to a competency the learner actually got wrong.
    if (!wrong.includes(key) || seen.has(key)) continue;
    if (Object.values(rec).some((v) => banned.test(v))) continue;
    seen.add(key);
    recs.push(rec);
    if (recs.length === 3) break;
  }
  if (wrong.length > 0 && recs.length === 0) return null;

  return {
    performance_summary: summary,
    identified_strengths: strArr(r["identified_strengths"]),
    identified_weaknesses: strArr(r["identified_weaknesses"]),
    recurring_error_patterns: strArr(r["recurring_error_patterns"]),
    recommendations: recs,
    next_step: nextStep,
  };
}

const skillNames = (score: ScoreResult, test: (p: number) => boolean) =>
  (Object.keys(score.skills) as Section[]).filter((s) => test(score.skills[s].percentage)).map((s) => SECTION_LABELS[s]);

/** Rule-based report built only from the learner's incorrect answers. */
export function buildFallback(score: ScoreResult, _answers?: Answers): Analysis {
  const wrongQs = QUESTIONS.filter((q) => score.incorrectQuestionIds.includes(q.question_id));
  // Prioritise sections with the lowest score.
  wrongQs.sort((a, b) => score.skills[a.section].percentage - score.skills[b.section].percentage);
  const seen = new Set<string>();
  const recs: AnalysisRecommendation[] = [];
  for (const q of wrongQs) {
    if (seen.has(q.recommendation_id) || recs.length === 3) continue;
    seen.add(q.recommendation_id);
    const r = RECOMMENDATIONS[q.recommendation_id];
    if (!r) continue;
    recs.push({
      competency: q.competency_tag,
      identified_gap: `Question ${q.question_id.slice(1)} (${SECTION_LABELS[q.section]}) was answered incorrectly.`,
      reason: q.explanation,
      practice_activity: r["practice_activity"],
      next_action: r["next_action"],
    });
  }
  const strengths = skillNames(score, (p) => p >= 80);
  const weak = skillNames(score, (p) => p < 60);
  const summary =
    wrongQs.length === 0
      ? "You answered every question correctly across vocabulary, grammar and reading."
      : `You answered ${score.totalCorrect} of ${score.totalQuestions} questions correctly.` +
        (strengths.length ? ` ${strengths.join(" and ")} ${strengths.length > 1 ? "are" : "is a"} relative strength${strengths.length > 1 ? "s" : ""}.` : "") +
        (weak.length ? ` ${weak.join(" and ")} need${weak.length > 1 ? "" : "s"} the most attention.` : "");
  return {
    performance_summary: summary,
    identified_strengths: strengths,
    identified_weaknesses: score.incorrectCompetencies.slice(0, 5),
    recurring_error_patterns: [],
    recommendations: recs,
    next_step:
      score.readiness === "READY"
        ? "Continue with a full mock evaluation to test all four exam skills."
        : "Practise the areas above, then retake this check before booking a full mock evaluation.",
  };
}

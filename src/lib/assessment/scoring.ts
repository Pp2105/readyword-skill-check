import { QUESTIONS, type OptionKey, type Question, type Section } from "@/data/questions";

export type Answers = Record<string, OptionKey | undefined>;
export type Readiness = "READY" | "NEEDS_TARGETED_PRACTICE" | "MORE_PREPARATION_NEEDED";

export interface SkillScore { correct: number; total: number; percentage: number }
export interface ScoreResult {
  totalCorrect: number;
  totalQuestions: number;
  overallPercentage: number;
  skills: Record<Section, SkillScore>;
  incorrectQuestionIds: string[];
  incorrectCompetencies: string[];
  readiness: Readiness;
}

const pct = (c: number, t: number) => (t === 0 ? 0 : (c / t) * 100);

export function classify(overall: number, skills: Record<Section, SkillScore>): Readiness {
  if (overall < 60) return "MORE_PREPARATION_NEEDED";
  const allSkills = Object.values(skills).every((s) => s.percentage >= 60);
  if (overall >= 75 && allSkills) return "READY";
  return "NEEDS_TARGETED_PRACTICE";
}

export function scoreAssessment(answers: Answers, questions: Question[] = QUESTIONS): ScoreResult {
  const skills: Record<Section, SkillScore> = {
    vocabulary: { correct: 0, total: 0, percentage: 0 },
    grammar: { correct: 0, total: 0, percentage: 0 },
    reading: { correct: 0, total: 0, percentage: 0 },
  };
  const incorrect: Question[] = [];
  for (const q of questions) {
    skills[q.section].total += 1;
    if (answers[q.question_id] === q.correct_answer) skills[q.section].correct += 1;
    else incorrect.push(q);
  }
  for (const s of Object.values(skills)) s.percentage = pct(s.correct, s.total);
  const totalCorrect = questions.length - incorrect.length;
  const overallPercentage = pct(totalCorrect, questions.length);
  return {
    totalCorrect,
    totalQuestions: questions.length,
    overallPercentage,
    skills,
    incorrectQuestionIds: incorrect.map((q) => q.question_id),
    incorrectCompetencies: [...new Set(incorrect.map((q) => q.competency_tag))],
    readiness: classify(overallPercentage, skills),
  };
}

export const READINESS_COPY: Record<Readiness, { label: string; interpretation: string; nextStep: string }> = {
  READY: {
    label: "Ready",
    interpretation: "You demonstrate a strong foundation across the three assessed areas.",
    nextStep: "Proceed to Globio's full mock evaluations to assess broader examination performance.",
  },
  NEEDS_TARGETED_PRACTICE: {
    label: "Needs targeted practice",
    interpretation: "You demonstrate foundational knowledge but have identifiable areas requiring improvement.",
    nextStep: "Practise the identified weaknesses and reassess before proceeding to a full mock evaluation.",
  },
  MORE_PREPARATION_NEEDED: {
    label: "More preparation needed",
    interpretation: "You need to strengthen foundational A1 competencies.",
    nextStep: "Revisit the relevant learning materials, practise fundamental concepts and repeat the diagnostic later.",
  },
};

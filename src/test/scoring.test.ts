import { describe, expect, it } from "vitest";
import { QUESTIONS, type OptionKey } from "@/data/questions";
import { scoreAssessment } from "@/lib/assessment/scoring";

const wrong = (k: OptionKey): OptionKey => (k === "A" ? "B" : "A");
function answers(correct: { vocabulary: number; grammar: number; reading: number }) {
  const left = { ...correct };
  return Object.fromEntries(QUESTIONS.map((q) => {
    const ok = left[q.section] > 0; if (ok) left[q.section] -= 1;
    return [q.question_id, ok ? q.correct_answer : wrong(q.correct_answer)];
  }));
}

describe("readiness rules", () => {
  it("15/15 is READY", () => expect(scoreAssessment(answers({ vocabulary: 5, grammar: 5, reading: 5 })).readiness).toBe("READY"));
  it("Case B 4/3/4 = 73.3% is NEEDS_TARGETED_PRACTICE", () => {
    const r = scoreAssessment(answers({ vocabulary: 4, grammar: 3, reading: 4 }));
    expect(r.totalCorrect).toBe(11);
    expect(r.readiness).toBe("NEEDS_TARGETED_PRACTICE");
  });
  it("12/15 with all skills >= 3 is READY", () => expect(scoreAssessment(answers({ vocabulary: 4, grammar: 4, reading: 4 })).readiness).toBe("READY"));
  it("80% with one skill at 2/5 is NEEDS_TARGETED_PRACTICE", () => expect(scoreAssessment(answers({ vocabulary: 5, grammar: 5, reading: 2 })).readiness).toBe("NEEDS_TARGETED_PRACTICE"));
  it("below 60% is MORE_PREPARATION_NEEDED", () => expect(scoreAssessment(answers({ vocabulary: 3, grammar: 3, reading: 2 })).readiness).toBe("MORE_PREPARATION_NEEDED"));
});

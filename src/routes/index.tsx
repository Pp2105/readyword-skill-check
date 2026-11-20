import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QUESTIONS, SECTION_LABELS, type OptionKey, type Section } from "@/data/questions";
import { scoreAssessment, READINESS_COPY, type Answers, type ScoreResult } from "@/lib/assessment/scoring";
import { buildFallback, type Analysis } from "@/lib/assessment/analysis";
import logo from "@/assets/globio-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "German A1 Foundation Check | Globio" },
      { name: "description", content: "Take Globio's free 15-question German A1 diagnostic on vocabulary, grammar and reading." },
      { property: "og:title", content: "German A1 Foundation Check | Globio" },
      { property: "og:description", content: "Check your German A1 vocabulary, grammar and reading in about 5–10 minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Step = "intro" | Section | "review" | "results";
const SECTIONS: Section[] = ["vocabulary", "grammar", "reading"];
const KEYS: OptionKey[] = ["A", "B", "C", "D"];

function Index() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<{ score: ScoreResult; analysis: Analysis } | null>(null);
  const go = (s: Step) => { setStep(s); window.scrollTo({ top: 0 }); };
  const submit = () => {
    const score = scoreAssessment(answers);
    setResult({ score, analysis: buildFallback(score, answers) });
    go("results");
  };
  const restart = () => { setAnswers({}); setResult(null); go("intro"); };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <img src={logo.url} alt="Globio" className="h-8 w-8" />
          <span className="font-semibold">Globio · German A1 Foundation Check</span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        {step === "intro" && <Intro onStart={() => go("vocabulary")} />}
        {SECTIONS.map((s, i) => step === s && (
          <SectionScreen key={s} section={s} index={i} answers={answers}
            onAnswer={(id, k) => setAnswers((a) => ({ ...a, [id]: k }))}
            onBack={() => go(i === 0 ? "intro" : SECTIONS[i - 1] ?? "intro")}
            onNext={() => go(SECTIONS[i + 1] ?? "review")} />
        ))}
        {step === "review" && <Review answers={answers} onEdit={go} onSubmit={submit} />}
        {step === "results" && result && <Results {...result} onRestart={restart} />}
      </main>
    </div>
  );
}

function Btn({ children, variant = "primary", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const cls = variant === "primary"
    ? "bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40"
    : "border border-border bg-card hover:bg-secondary";
  return <button {...p} className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${cls}`}>{children}</button>;
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Are your German A1 foundations ready?</h1>
      <p className="text-muted-foreground">A short diagnostic of 15 questions covering vocabulary, grammar and reading. It takes about 5–10 minutes and shows where to focus next.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {SECTIONS.map((s) => (
          <div key={s} className="rounded-xl border border-border bg-card p-4">
            <div className="font-semibold">{SECTION_LABELS[s]}</div>
            <div className="text-sm text-muted-foreground">5 questions</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">This check covers three skills only. It is not an official exam result and does not assess listening, speaking or writing.</p>
      <Btn onClick={onStart}>Start the check</Btn>
    </section>
  );
}

function SectionScreen({ section, index, answers, onAnswer, onBack, onNext }: {
  section: Section; index: number; answers: Answers;
  onAnswer: (id: string, k: OptionKey) => void; onBack: () => void; onNext: () => void;
}) {
  const qs = QUESTIONS.filter((q) => q.section === section);
  const done = qs.every((q) => answers[q.question_id]);
  return (
    <section className="space-y-6">
      <div>
        <div className="text-sm font-medium text-muted-foreground">Section {index + 1} of 3</div>
        <h2 className="text-2xl font-bold text-primary">{SECTION_LABELS[section]}</h2>
        <div className="mt-3 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-accent" style={{ width: `${((index + 1) / 3) * 100}%` }} /></div>
      </div>
      {qs.map((q) => (
        <fieldset key={q.question_id} className="rounded-xl border border-border bg-card p-5">
          {q.passage && <p className="mb-3 whitespace-pre-line rounded-lg bg-secondary p-3 text-sm">{q.passage}</p>}
          <legend className="sr-only">Question {q.question_id.slice(1)}</legend>
          <p className="mb-3 font-medium">{q.question_id.slice(1)}. {q.question_text}</p>
          <div className="grid gap-2">
            {KEYS.map((k) => {
              const sel = answers[q.question_id] === k;
              return (
                <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${sel ? "border-primary bg-secondary" : "border-border"}`}>
                  <input type="radio" name={q.question_id} checked={sel} onChange={() => onAnswer(q.question_id, k)} className="accent-primary" />
                  <span className="font-semibold">{k}.</span> {q.options[k]}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
      <div className="flex justify-between">
        <Btn variant="ghost" onClick={onBack}>Back</Btn>
        <Btn onClick={onNext} disabled={!done}>{index === 2 ? "Review answers" : "Next section"}</Btn>
      </div>
    </section>
  );
}

function Review({ answers, onEdit, onSubmit }: { answers: Answers; onEdit: (s: Step) => void; onSubmit: () => void }) {
  const all = QUESTIONS.every((q) => answers[q.question_id]);
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Review your answers</h2>
      {SECTIONS.map((s) => (
        <div key={s} className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold">{SECTION_LABELS[s]}</span>
            <button className="text-sm font-medium text-primary underline" onClick={() => onEdit(s)}>Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUESTIONS.filter((q) => q.section === s).map((q) => (
              <span key={q.question_id} className="rounded-md bg-secondary px-2 py-1 text-sm">Q{q.question_id.slice(1)}: {answers[q.question_id] ?? "—"}</span>
            ))}
          </div>
        </div>
      ))}
      <Btn onClick={onSubmit} disabled={!all}>Submit assessment</Btn>
    </section>
  );
}

function Results({ score, analysis, onRestart }: { score: ScoreResult; analysis: Analysis; onRestart: () => void }) {
  const copy = READINESS_COPY[score.readiness];
  const badge = score.readiness === "READY" ? "bg-success" : score.readiness === "NEEDS_TARGETED_PRACTICE" ? "bg-warning" : "bg-destructive";
  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-primary p-6 text-primary-foreground">
        <div className="text-sm opacity-80">Your result</div>
        <div className="text-4xl font-bold" data-testid="overall">{score.totalCorrect}/{score.totalQuestions} · {Math.round(score.overallPercentage)}%</div>
        <span data-testid="readiness" className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold text-primary-foreground ${badge}`}>{copy.label}</span>
        <p className="mt-3 text-sm">{copy.interpretation}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {SECTIONS.map((s) => {
          const k = score.skills[s];
          return (
            <div key={s} className="rounded-xl border border-border bg-card p-4">
              <div className="font-semibold">{SECTION_LABELS[s]}</div>
              <div className="text-2xl font-bold text-primary">{k.correct}/{k.total}</div>
              <div className="mt-2 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-accent" style={{ width: `${k.percentage}%` }} /></div>
              <div className="mt-1 text-sm text-muted-foreground">{Math.round(k.percentage)}%</div>
            </div>
          );
        })}
      </div>
      <p>{analysis.performance_summary}</p>
      {analysis.recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-primary">Recommended practice</h3>
          {analysis.recommendations.map((r) => (
            <div key={r.competency} className="rounded-xl border border-border bg-card p-4 text-sm">
              <div className="font-semibold">{r.competency}</div>
              <p className="mt-1 text-muted-foreground">{r.identified_gap} {r.reason}</p>
              <p className="mt-2"><span className="font-medium">Practice:</span> {r.practice_activity}</p>
              <p><span className="font-medium">Next:</span> {r.next_action}</p>
            </div>
          ))}
        </div>
      )}
      <div className="rounded-xl border border-accent bg-card p-4 text-sm"><span className="font-semibold">Next step: </span>{copy.nextStep}</div>
      <a href="https://globio.ai/german-mock-test/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90">Explore Globio full mock evaluations</a>
      <Btn variant="ghost" onClick={onRestart}>Retake the check</Btn>
    </section>
  );
}

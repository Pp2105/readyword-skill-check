# GloReady — German A1 Foundation Check

GloReady is a short diagnostic for learners preparing for German A1 exams. It helps learners understand their foundational performance in **Vocabulary, Grammar, and Reading**, identify areas to practise, and decide on a useful next step.

**Live application:** https://readyword-skill-check.lovable.app

> GloReady is a practice diagnostic, not an official Goethe or ÖSD exam, certification, or pass predictor. It assesses three areas only; Listening, Speaking, and Writing are not assessed.

## V1 features

- 15 multiple-choice questions: 5 Vocabulary, 5 Grammar, and 5 Reading.
- Section-by-section assessment with answer review and editing.
- Equal-weight scoring: 1 point per correct answer, with no negative marking.
- Section scores and an overall result.
- Three readiness categories using transparent, provisional thresholds.
- Up to three deterministic practice recommendations based on incorrect answers and their associated competencies.
- Retake option and a link to Globio's broader mock evaluations.

## Readiness logic

Each question is worth 1 point. The overall percentage is calculated as:

`(Correct answers ÷ 15) × 100`

| Category | Rule |
|---|---|
| **Ready** | Overall score is at least 75%, and each assessed section is at least 3/5 (60%). |
| **Needs Targeted Practice** | Overall score is 60–74.99%, or it is at least 75% but one or more sections are below 3/5. |
| **More Preparation Needed** | Overall score is below 60%. |

These are provisional GloReady diagnostic thresholds, not official Goethe or ÖSD grading criteria.

## Recommendation approach

Recommendations are generated using deterministic, competency-based rules. Incorrect answers are mapped to their competency tags and corresponding practice suggestions. The three most relevant gaps are prioritized, with lower-performing sections considered first. Runtime AI is not enabled in V1.

## Tech stack

- React and TypeScript
- TanStack Start / Router
- Vite
- Tailwind CSS
- Vitest for scoring tests
- Lovable for development and project synchronization

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/Pp2105/readyword-skill-check.git
cd readyword-skill-check
npm install
npm run dev
```

Run the scoring tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

## Environment configuration

Do not commit `.env` files or secrets. If local environment variables are required, create a local `.env` file using the variable names required by the relevant integration and keep it untracked. Use Lovable's Secrets/environment settings for deployed environments.

## Product scope and limitations

V1 is intentionally limited to a 15-question diagnostic across Vocabulary, Grammar, and Reading. It does not assess Listening, Speaking, or Writing and must not be interpreted as a prediction of official exam performance. Broader mock evaluations are the recommended next step for learners who want to assess additional exam skills.

## Project

Built with [Lovable](https://lovable.dev). The connected Lovable project syncs code changes with this GitHub repository.

// Approved question bank (source of truth). Do not change wording, options or answers.
export type Section = "vocabulary" | "grammar" | "reading";
export type OptionKey = "A" | "B" | "C" | "D";

export interface Question {
  question_id: string;
  section: Section;
  passage?: string;
  question_text: string;
  options: Record<OptionKey, string>;
  correct_answer: OptionKey;
  competency_tag: string;
  explanation: string;
  recommendation_id: string;
  difficulty_level: "A1";
}

export const SECTION_LABELS: Record<Section, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
};

export const QUESTIONS: Question[] = [
  {
    question_id: "Q1", section: "vocabulary",
    question_text: 'You are at a train station. What does "der Bahnhof" mean?',
    options: { A: "Hospital", B: "Railway station", C: "School", D: "Restaurant" },
    correct_answer: "B", competency_tag: "Everyday vocabulary – Places and transport",
    explanation: '"Der Bahnhof" is the railway station – where trains arrive and depart.',
    recommendation_id: "REC_PLACES_TRANSPORT", difficulty_level: "A1",
  },
  {
    question_id: "Q2", section: "vocabulary",
    question_text: 'You are buying groceries. What does "das Brot" mean?',
    options: { A: "Milk", B: "Bread", C: "Cheese", D: "Water" },
    correct_answer: "B", competency_tag: "Food and shopping vocabulary",
    explanation: '"Das Brot" means bread. Milk is "die Milch", cheese "der Käse", water "das Wasser".',
    recommendation_id: "REC_FOOD_SHOPPING", difficulty_level: "A1",
  },
  {
    question_id: "Q3", section: "vocabulary",
    question_text: 'Your German class starts at "halb acht". What time does it start?',
    options: { A: "7:00", B: "7:30", C: "8:00", D: "8:30" },
    correct_answer: "B", competency_tag: "Time expressions",
    explanation: '"Halb acht" means half an hour before eight – 7:30. German counts "halb" towards the next hour.',
    recommendation_id: "REC_TIME", difficulty_level: "A1",
  },
  {
    question_id: "Q4", section: "vocabulary",
    question_text: "You are sick and need medicine. Where should you go?",
    options: { A: "Die Schule", B: "Die Apotheke", C: "Der Bahnhof", D: "Das Kino" },
    correct_answer: "B", competency_tag: "Places and everyday services",
    explanation: '"Die Apotheke" is the pharmacy, where you buy medicine.',
    recommendation_id: "REC_SERVICES", difficulty_level: "A1",
  },
  {
    question_id: "Q5", section: "vocabulary",
    question_text: "Meine Mutter arbeitet in einer Schule. Sie unterrichtet Kinder. Sie ist ______.",
    options: { A: "Ärztin", B: "Lehrerin", C: "Verkäuferin", D: "Köchin" },
    correct_answer: "B", competency_tag: "Professions and contextual vocabulary",
    explanation: 'Someone who teaches children at a school is a teacher – "Lehrerin" (female form).',
    recommendation_id: "REC_PROFESSIONS", difficulty_level: "A1",
  },
  {
    question_id: "Q6", section: "grammar",
    question_text: "Complete the sentence: _____ Sonne scheint heute.",
    options: { A: "Der", B: "Die", C: "Das", D: "Den" },
    correct_answer: "B", competency_tag: "Definite articles and grammatical gender",
    explanation: '"Sonne" is feminine, so the nominative article is "die".',
    recommendation_id: "REC_ARTICLES", difficulty_level: "A1",
  },
  {
    question_id: "Q7", section: "grammar",
    question_text: "Complete the sentence: Ich _____ aus Indien.",
    options: { A: "kommen", B: "kommst", C: "komme", D: "kommt" },
    correct_answer: "C", competency_tag: "Present-tense verb conjugation",
    explanation: 'With "ich", regular present-tense verbs end in -e: "ich komme".',
    recommendation_id: "REC_CONJUGATION", difficulty_level: "A1",
  },
  {
    question_id: "Q8", section: "grammar",
    question_text: "Which sentence is grammatically correct?",
    options: { A: "Ich Deutsch spreche.", B: "Deutsch ich spreche.", C: "Ich spreche Deutsch.", D: "Spreche Deutsch ich." },
    correct_answer: "C", competency_tag: "Basic German sentence structure",
    explanation: "In a German statement the conjugated verb stands in second position: Ich spreche Deutsch.",
    recommendation_id: "REC_WORD_ORDER", difficulty_level: "A1",
  },
  {
    question_id: "Q9", section: "grammar",
    question_text: "Complete the sentence: Ich habe _____ Auto.",
    options: { A: "nicht", B: "kein", C: "keine", D: "keinen" },
    correct_answer: "B", competency_tag: "Negation – kein and nicht",
    explanation: 'Nouns with an indefinite article are negated with "kein". "Auto" is neuter (das Auto), so: kein Auto.',
    recommendation_id: "REC_NEGATION", difficulty_level: "A1",
  },
  {
    question_id: "Q10", section: "grammar",
    question_text: "Complete the sentence: Ich fahre _____ dem Bus zur Schule.",
    options: { A: "auf", B: "mit", C: "in", D: "an" },
    correct_answer: "B", competency_tag: "Prepositions and dative usage",
    explanation: 'Means of transport use "mit" + dative: mit dem Bus.',
    recommendation_id: "REC_PREPOSITIONS", difficulty_level: "A1",
  },
  {
    question_id: "Q11", section: "reading",
    passage: "Hallo Lisa,\nich feiere am Samstag meinen Geburtstag. Kannst du um 18 Uhr kommen? Wir essen zusammen und hören Musik.\nLiebe Grüße,\nAnna",
    question_text: "Warum schreibt Anna Lisa?",
    options: { A: "Sie möchte Lisa zum Geburtstag einladen.", B: "Sie möchte Geld leihen.", C: "Sie möchte ein Treffen absagen.", D: "Sie möchte Lisa besuchen." },
    correct_answer: "A", competency_tag: "Understanding the main idea of a message",
    explanation: 'Anna celebrates her birthday and asks "Kannst du um 18 Uhr kommen?" – she is inviting Lisa.',
    recommendation_id: "REC_MAIN_IDEA", difficulty_level: "A1",
  },
  {
    question_id: "Q12", section: "reading",
    passage: "DEUTSCHKURSE IN MÜNCHEN\nAnfänger A1\nMontag und Mittwoch\n10:00–11:30 Uhr\nPreis: 50 Euro pro Monat",
    question_text: "An welchen Tagen findet der Deutschkurs statt?",
    options: { A: "Dienstag und Donnerstag", B: "Montag und Mittwoch", C: "Freitag und Samstag", D: "Samstag und Sonntag" },
    correct_answer: "B", competency_tag: "Extracting specific information",
    explanation: 'The notice states "Montag und Mittwoch".',
    recommendation_id: "REC_SPECIFIC_INFO", difficulty_level: "A1",
  },
  {
    question_id: "Q13", section: "reading",
    passage: "WOHNUNG ZU VERMIETEN!\nEine kleine Wohnung in Berlin.\nDrei Zimmer, Küche und Bad.\nMiete: 600 Euro pro Monat.\nKontakt: 0123456789",
    question_text: "Wie viele Zimmer hat die Wohnung?",
    options: { A: "Ein Zimmer", B: "Zwei Zimmer", C: "Drei Zimmer", D: "Vier Zimmer" },
    correct_answer: "C", competency_tag: "Understanding advertisements",
    explanation: 'The advertisement says "Drei Zimmer" – three rooms.',
    recommendation_id: "REC_ADVERTS", difficulty_level: "A1",
  },
  {
    question_id: "Q14", section: "reading",
    passage: "SUPERMARKT MÜLLER\nMontag–Freitag: 08:00–20:00 Uhr\nSamstag: 09:00–18:00 Uhr\nSonntag: Geschlossen",
    question_text: "Wann ist der Supermarkt geschlossen?",
    options: { A: "Montag", B: "Mittwoch", C: "Samstag", D: "Sonntag" },
    correct_answer: "D", competency_tag: "Understanding public notices and opening hours",
    explanation: '"Sonntag: Geschlossen" – the supermarket is closed on Sunday.',
    recommendation_id: "REC_NOTICES", difficulty_level: "A1",
  },
  {
    question_id: "Q15", section: "reading",
    passage: "INFORMATION FÜR KUNDEN\nAm Samstag gibt es 10% Rabatt auf Obst und Gemüse.\nDer Rabatt gilt nur am Samstag.",
    question_text: "Auf welche Produkte gibt es Rabatt?",
    options: { A: "Brot und Milch", B: "Obst und Gemüse", C: "Fleisch und Fisch", D: "Kaffee und Tee" },
    correct_answer: "B", competency_tag: "Understanding conditions and specific information",
    explanation: 'The discount applies to "Obst und Gemüse" (fruit and vegetables).',
    recommendation_id: "REC_CONDITIONS", difficulty_level: "A1",
  },
];

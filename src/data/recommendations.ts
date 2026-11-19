// Deterministic fallback recommendations keyed by recommendation_id.
export interface Recommendation {
  competency: string;
  practice_activity: string;
  next_action: string;
}

export const RECOMMENDATIONS: Record<string, Recommendation> = {
  REC_PLACES_TRANSPORT: { competency: "Everyday vocabulary – Places and transport", practice_activity: "Make flashcards for 15 common places (Bahnhof, Flughafen, Bushaltestelle…) with their articles.", next_action: "Review them daily for a week, then describe your route to class in German." },
  REC_FOOD_SHOPPING: { competency: "Food and shopping vocabulary", practice_activity: "Write a German shopping list of 15 items with articles and say each aloud.", next_action: "Role-play a short supermarket conversation." },
  REC_TIME: { competency: "Time expressions", practice_activity: "Practise reading clock times aloud, focusing on halb, Viertel vor and Viertel nach.", next_action: "Write your daily schedule using informal German times." },
  REC_SERVICES: { competency: "Places and everyday services", practice_activity: "Match everyday needs to places (Medikamente → Apotheke, Geld → Bank, Brief → Post).", next_action: "Quiz yourself with 10 'Where do you go if…?' situations." },
  REC_PROFESSIONS: { competency: "Professions and contextual vocabulary", practice_activity: "Learn 15 professions in both male and female forms (Lehrer/Lehrerin) with a workplace for each.", next_action: "Describe what three family members do for work." },
  REC_ARTICLES: { competency: "Definite articles and grammatical gender", practice_activity: "Always learn nouns with der/die/das; colour-code flashcards by gender.", next_action: "Sort 30 common A1 nouns by gender and check your answers." },
  REC_CONJUGATION: { competency: "Present-tense verb conjugation", practice_activity: "Write full present-tense tables for 10 regular verbs (ich komme, du kommst…).", next_action: "Do short daily conjugation drills, saying each form aloud." },
  REC_WORD_ORDER: { competency: "Basic German sentence structure", practice_activity: "Build sentences from word cards, keeping the verb in position two.", next_action: "Rewrite 10 sentences starting with a time word (Heute spreche ich…)." },
  REC_NEGATION: { competency: "Negation – kein and nicht", practice_activity: "Practise the rule: kein replaces ein/no article before nouns; nicht negates verbs and adjectives.", next_action: "Negate 15 mixed sentences and check which form each needs." },
  REC_PREPOSITIONS: { competency: "Prepositions and dative usage", practice_activity: "Memorise mit + dative with transport: mit dem Bus, mit der Bahn, mit dem Auto.", next_action: "Describe how you travel to five places using mit." },
  REC_MAIN_IDEA: { competency: "Understanding the main idea of a message", practice_activity: "Read short German messages and summarise the writer's purpose in one sentence.", next_action: "Practise with A1 Lesen Teil 1 style messages." },
  REC_SPECIFIC_INFO: { competency: "Extracting specific information", practice_activity: "Scan short notices for days, times and prices before reading in detail.", next_action: "Practise with timetables and course listings." },
  REC_ADVERTS: { competency: "Understanding advertisements", practice_activity: "Read apartment and product adverts and note key facts (rooms, price, contact).", next_action: "Answer three detail questions per advert." },
  REC_NOTICES: { competency: "Understanding public notices and opening hours", practice_activity: "Read opening-hour signs and learn key words: geöffnet, geschlossen, Ruhetag.", next_action: "Answer 'When is it open/closed?' for five real German signs." },
  REC_CONDITIONS: { competency: "Understanding conditions and specific information", practice_activity: "Read short announcements and underline what, when and for whom an offer applies.", next_action: "Practise with supermarket and shop announcements." },
};

import { quizQuestions } from './quiz-questions';
import { gradeConfig, opportunityAreaContent, opportunityAreaOrder, resultsCopy, type GradeKey } from './quiz-results-copy';

export interface QuizResult {
  id: string;
  score: number;
  maxScore: number;
  grade: GradeKey;
  gradeLabel: string;
  gradeColor: string;
  estimatedHoursPerWeek: { min: number; max: number };
  estimatedMonthlyImpact: { min: number; max: number };
  opportunityAreas: {
    name: string;
    level: 'low' | 'moderate' | 'high' | 'very_high';
    score: number;
    description: string;
    firstStep: string;
  }[];
  topAreas: string[];
  resultsCopy: string;
  answers: Record<number, string | string[]>;
  businessType: string;
  teamSize: string;
  aiFamiliarity: string;
}

export interface QuizSubmission extends QuizResult {
  contact: {
    firstName: string;
    email: string;
    businessName?: string;
  };
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  createdAt: string;
}

const SCORE_MAX = 60;

const getOptionPoints = (questionId: number, value: string): number => {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (!question) return 0;
  const option = question.options.find((item) => item.value === value);
  if (!option) return 0;
  return option.points;
};

const getOptionLabel = (questionId: number, value: string): string => {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (!question) return '';
  const option = question.options.find((item) => item.value === value);
  return option?.label ?? '';
};

const normalizeInverseScore = (points: number): number => 6 - points;

const roundToNearest = (value: number, step = 5): number => Math.round(value / step) * step;

const getEstimatedHours = (rawScore: number): { min: number; max: number } => {
  if (rawScore <= 8) return { min: 3, max: 5 };
  if (rawScore <= 12) return { min: 6, max: 10 };
  if (rawScore <= 16) return { min: 11, max: 18 };
  return { min: 19, max: 25 };
};

const getLevel = (score: number, max: number): 'low' | 'moderate' | 'high' | 'very_high' => {
  if (max === 5) {
    if (score <= 1) return 'low';
    if (score <= 2) return 'moderate';
    if (score <= 4) return 'high';
    return 'very_high';
  }
  if (score <= 4) return 'low';
  if (score <= 6) return 'moderate';
  if (score <= 8) return 'high';
  return 'very_high';
};

const getGradeFromScore = (score: number): GradeKey => {
  if (score <= 20) return 'low';
  if (score <= 35) return 'moderate';
  if (score <= 48) return 'high';
  return 'very_high';
};

const getAreaMax = (area: keyof typeof opportunityAreaContent): number => {
  if (area === 'communication' || area === 'admin') return 10;
  return 5;
};

const normalizeAnswers = (answers: Record<number, string | string[]>): Record<number, string | string[]> => {
  const normalized: Record<number, string | string[]> = {};
  for (const question of quizQuestions) {
    const answer = answers[question.id];
    if (!answer) continue;
    normalized[question.id] = answer;
  }
  return normalized;
};

export const calculateQuizResult = (
  answers: Record<number, string | string[]>,
  id = 'pending'
): QuizResult => {
  const safeAnswers = normalizeAnswers(answers);
  let weightedScore = 0;
  let maxWeightedScore = 0;

  for (const question of quizQuestions) {
    const maxQuestionScore = question.multiSelect
      ? question.options.length * question.weight
      : 5 * question.weight;
    maxWeightedScore += maxQuestionScore;

    const answer = safeAnswers[question.id];
    if (!answer) continue;

    if (question.multiSelect) {
      const selected = Array.isArray(answer) ? answer : [answer];
      weightedScore += selected.length * question.weight;
      continue;
    }

    const points = getOptionPoints(question.id, answer as string);
    const normalizedPoints = question.inverseScoring ? normalizeInverseScore(points) : points;
    weightedScore += normalizedPoints * question.weight;
  }

  const scaledScore = Math.round((weightedScore / maxWeightedScore) * SCORE_MAX);
  const grade = getGradeFromScore(scaledScore);
  const gradeMeta = gradeConfig[grade];

  const rawQ3 = getOptionPoints(3, safeAnswers[3] as string);
  const rawQ4 = getOptionPoints(4, safeAnswers[4] as string);
  const rawQ5 = getOptionPoints(5, safeAnswers[5] as string);
  const rawQ8 = getOptionPoints(8, safeAnswers[8] as string);
  const combinedRaw = rawQ3 + rawQ4 + rawQ5 + rawQ8;

  const estimatedHours = getEstimatedHours(combinedRaw);
  const estimatedMonthlyImpact = {
    min: roundToNearest(estimatedHours.min * 50 * 4.3, 5),
    max: roundToNearest(estimatedHours.max * 50 * 4.3, 5),
  };

  const communicationScore = rawQ3 + getOptionPoints(7, safeAnswers[7] as string);
  const adminScore = rawQ5 + rawQ8;
  const contentScore = rawQ4;
  const documentationScore = Array.isArray(safeAnswers[6])
    ? safeAnswers[6].length
    : safeAnswers[6]
      ? 1
      : 0;

  const areaScores = {
    communication: communicationScore,
    admin: adminScore,
    content: contentScore,
    documentation: documentationScore,
  };

  const opportunityAreas = opportunityAreaOrder.map((key) => {
    const area = opportunityAreaContent[key];
    const score = areaScores[key];
    const max = getAreaMax(key);
    const level = getLevel(score, max);

    return {
      name: area.name,
      level,
      score,
      description: area.description,
      firstStep: area.firstStep,
    };
  });

  const topAreas = [...opportunityAreas]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((area) => area.name);

  const businessType = getOptionLabel(1, safeAnswers[1] as string) || 'Not specified';
  const teamSize = getOptionLabel(2, safeAnswers[2] as string) || 'Not specified';
  const aiFamiliarity = getOptionLabel(10, safeAnswers[10] as string) || 'Not specified';

  return {
    id,
    score: scaledScore,
    maxScore: SCORE_MAX,
    grade,
    gradeLabel: gradeMeta.label,
    gradeColor: gradeMeta.color,
    estimatedHoursPerWeek: estimatedHours,
    estimatedMonthlyImpact,
    opportunityAreas,
    topAreas,
    resultsCopy: resultsCopy[grade],
    answers: safeAnswers,
    businessType,
    teamSize,
    aiFamiliarity,
  };
};

export const quizDisclaimer =
  'This assessment provides estimates based on your self-reported answers. Actual results will vary based on your specific business, team, and implementation. The AI Opportunity Score is a directional tool designed to help you identify areas of potential improvement — not a guarantee of specific savings. AI assists with tasks but does not replace professional judgment, leadership, or strategy.';

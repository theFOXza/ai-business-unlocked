export interface QuizQuestionOption {
  label: string;
  value: 'a' | 'b' | 'c' | 'd' | 'e';
  points: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  category:
    | 'context'
    | 'communication'
    | 'content'
    | 'admin'
    | 'documentation'
    | 'followup'
    | 'repetition'
    | 'motivation'
    | 'familiarity';
  multiSelect?: boolean;
  inverseScoring?: boolean;
  weight: number;
  options: QuizQuestionOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'What type of business do you run?',
    category: 'context',
    weight: 1,
    options: [
      { label: 'Service-based (landscaping, salon, plumbing, consulting, etc.)', value: 'a', points: 1 },
      { label: 'Retail or e-commerce', value: 'b', points: 2 },
      { label: 'Restaurant or food service', value: 'c', points: 3 },
      { label: 'Professional services (law, accounting, real estate, etc.)', value: 'd', points: 4 },
      { label: 'Other', value: 'e', points: 5 },
    ],
  },
  {
    id: 2,
    text: 'How many people work in your business (including you)?',
    category: 'context',
    weight: 1.5,
    options: [
      { label: 'Just me', value: 'a', points: 1 },
      { label: '2–5', value: 'b', points: 2 },
      { label: '6–15', value: 'c', points: 3 },
      { label: '16–50', value: 'd', points: 4 },
      { label: '50+', value: 'e', points: 5 },
    ],
  },
  {
    id: 3,
    text: 'How much time per week does your team spend writing emails, replies, or follow-ups?',
    category: 'communication',
    weight: 2,
    options: [
      { label: 'Less than 1 hour', value: 'a', points: 1 },
      { label: '1–3 hours', value: 'b', points: 2 },
      { label: '4–8 hours', value: 'c', points: 3 },
      { label: '9–15 hours', value: 'd', points: 4 },
      { label: '16+ hours', value: 'e', points: 5 },
    ],
  },
  {
    id: 4,
    text: 'How often does someone in your business create social media posts, ads, or marketing content?',
    category: 'content',
    weight: 1.5,
    options: [
      { label: 'Rarely or never', value: 'a', points: 1 },
      { label: 'A few times a month', value: 'b', points: 2 },
      { label: 'Weekly', value: 'c', points: 3 },
      { label: 'Several times a week', value: 'd', points: 4 },
      { label: 'Daily', value: 'e', points: 5 },
    ],
  },
  {
    id: 5,
    text: 'How much time per week goes into scheduling, admin, or paperwork?',
    category: 'admin',
    weight: 2,
    options: [
      { label: 'Less than 1 hour', value: 'a', points: 1 },
      { label: '1–3 hours', value: 'b', points: 2 },
      { label: '4–8 hours', value: 'c', points: 3 },
      { label: '9–15 hours', value: 'd', points: 4 },
      { label: '16+ hours', value: 'e', points: 5 },
    ],
  },
  {
    id: 6,
    text: 'Does your business regularly create any of the following? (select all that apply)',
    category: 'documentation',
    weight: 1,
    multiSelect: true,
    options: [
      { label: 'Proposals or quotes', value: 'a', points: 1 },
      { label: 'Job descriptions or hiring posts', value: 'b', points: 1 },
      { label: 'SOPs or training materials', value: 'c', points: 1 },
      { label: 'Reports or summaries', value: 'd', points: 1 },
      { label: 'Customer review responses', value: 'e', points: 1 },
    ],
  },
  {
    id: 7,
    text: 'How do you currently handle customer follow-up after a sale or service?',
    category: 'followup',
    weight: 1.5,
    options: [
      { label: "We don't really follow up", value: 'a', points: 1 },
      { label: 'Manually — someone sends emails/texts one by one', value: 'b', points: 2 },
      { label: 'We have a basic system but it takes time', value: 'c', points: 3 },
      { label: 'We have an automated system already', value: 'd', points: 4 },
      { label: 'Not sure', value: 'e', points: 5 },
    ],
  },
  {
    id: 8,
    text: 'How often do you or your team repeat the same type of task with minor variations?',
    category: 'repetition',
    weight: 2,
    options: [
      { label: 'Rarely', value: 'a', points: 1 },
      { label: 'A few times a week', value: 'b', points: 2 },
      { label: 'Daily', value: 'c', points: 3 },
      { label: 'Multiple times a day', value: 'd', points: 4 },
      { label: "It's most of what we do", value: 'e', points: 5 },
    ],
  },
  {
    id: 9,
    text: 'If you could get back 10 hours a week, what would you do with that time?',
    category: 'motivation',
    weight: 1,
    options: [
      { label: 'Focus on sales and revenue', value: 'a', points: 1 },
      { label: 'Spend time on strategy and growth', value: 'b', points: 2 },
      { label: 'Reduce stress and work-life balance', value: 'c', points: 3 },
      { label: 'Train or develop my team', value: 'd', points: 4 },
      { label: 'All of the above', value: 'e', points: 5 },
    ],
  },
  {
    id: 10,
    text: 'How familiar are you with AI tools like ChatGPT?',
    category: 'familiarity',
    weight: 1,
    inverseScoring: true,
    options: [
      { label: 'Never heard of it', value: 'a', points: 1 },
      { label: 'Heard of it, never tried it', value: 'b', points: 2 },
      { label: 'Tried it once or twice', value: 'c', points: 3 },
      { label: 'Use it occasionally', value: 'd', points: 4 },
      { label: 'Use it regularly', value: 'e', points: 5 },
    ],
  },
];

export const quizQuestionCount = quizQuestions.length;

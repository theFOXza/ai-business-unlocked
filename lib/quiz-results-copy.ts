export type GradeKey = 'low' | 'moderate' | 'high' | 'very_high';

export const gradeConfig: Record<GradeKey, { label: string; color: string }> = {
  low: {
    label: 'Low AI Opportunity',
    color: 'var(--color-success)',
  },
  moderate: {
    label: 'Moderate AI Opportunity',
    color: '#eab308',
  },
  high: {
    label: 'High AI Opportunity',
    color: 'var(--color-accent)',
  },
  very_high: {
    label: 'Very High AI Opportunity',
    color: '#ef4444',
  },
};

export const resultsCopy: Record<GradeKey, string> = {
  low:
    'Your business is already running lean — nice work. But even efficient operations have pockets where AI could tighten up communication, speed up content, or handle the small stuff that adds up. Your full snapshot shows exactly where.',
  moderate:
    'Your team is spending a solid chunk of time on repetitive tasks that AI can assist with — emails, follow-ups, content, admin. The opportunity is real, and your full snapshot breaks down exactly where it’s concentrated.',
  high:
    "There’s a significant amount of time being spent on work that AI tools can handle faster and more consistently. This isn’t about replacing anyone — it’s about freeing your team for the work that actually moves the needle.",
  very_high:
    "Your business has one of the highest opportunity scores we’ve seen. There’s a massive amount of repetitive, process-driven work happening that AI could assist with. The good news: this is fixable, and it doesn’t require a tech background.",
};

export type OpportunityAreaKey = 'communication' | 'admin' | 'content' | 'documentation';

export const opportunityAreaContent: Record<
  OpportunityAreaKey,
  { name: string; description: string; firstStep: string }
> = {
  communication: {
    name: 'Customer Communication',
    description:
      'When customer messages pile up, response time slips and follow-ups get missed. AI can draft replies, follow-ups, and FAQs so your team responds faster and more consistently without starting from scratch each time.',
    firstStep: 'Start by using AI to draft customer follow-up emails and routine replies.',
  },
  admin: {
    name: 'Admin & Process Efficiency',
    description:
      'Scheduling, paperwork, and repeated admin tasks quietly consume hours every week. AI can turn your most common workflows into reusable templates and checklists so tasks move faster with fewer errors.',
    firstStep: 'Start by using AI to create templates for your most repeated tasks.',
  },
  content: {
    name: 'Marketing & Content Creation',
    description:
      'Consistent marketing content is hard to keep up with and often falls to the bottom of the list. AI can help you batch-create posts, ads, and campaign ideas so marketing stays active without a huge time lift.',
    firstStep: 'Start by using AI to batch-create a week of social posts in one sitting.',
  },
  documentation: {
    name: 'Documentation & Training',
    description:
      'When knowledge lives only in people’s heads, training takes longer and quality varies. AI can help turn your processes into SOPs, training guides, and summaries so new hires ramp faster and work stays consistent.',
    firstStep: 'Start by using AI to generate SOPs for your most common processes.',
  },
};

export const opportunityAreaOrder: OpportunityAreaKey[] = [
  'communication',
  'admin',
  'content',
  'documentation',
];

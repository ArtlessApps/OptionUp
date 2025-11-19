export type ScreenType =
  | 'hook'
  | 'definition'
  | 'analogy'
  | 'interactive_example'
  | 'key_terms'
  | 'multiple_choice'
  | 'calculation'
  | 'scenario'
  | 'summary_cards'
  | 'celebration';

export interface BaseScreen {
  screen_type: ScreenType;
  xp_reward?: number;
}

export interface HookScreen extends BaseScreen {
  screen_type: 'hook';
  visual: string;
  headline: string;
  text: string;
}

export interface DefinitionScreen extends BaseScreen {
  screen_type: 'definition';
  headline: string;
  text: string;
  visual: string;
  highlight_words?: string[];
}

export interface AnalogyScreen extends BaseScreen {
  screen_type: 'analogy';
  headline: string;
  text: string;
  interactive: 'tap_to_reveal';
  reveal_sections: Array<{
    label: string;
  }>;
}

export interface KeyTermsScreen extends BaseScreen {
  screen_type: 'key_terms';
  headline: string;
  cards: Array<{
    term: string;
    definition: string;
    example: string;
  }>;
}

export interface MultipleChoiceScreen extends BaseScreen {
  screen_type: 'multiple_choice';
  question: string;
  options: string[];
  correct: number;
  xp_reward: number;
  explanation_correct: string;
  explanation_wrong: string;
}

export interface ScenarioScreen extends BaseScreen {
  screen_type: 'scenario';
  question: string;
  options: string[];
  correct: number;
  xp_reward: number;
  explanation_correct: string;
  explanation_wrong: string;
}

export interface CalculationScreen extends BaseScreen {
  screen_type: 'calculation';
  headline: string;
  question: string;
  answer: string;
  xp_reward: number;
  explanation: string;
  teaching_point?: string;
}

export type InteractiveType =
  | 'theta_decay'
  | 'delta_simulator'
  | 'pl_diagram'
  | 'spread_calculator'
  | 'greeks_dashboard'
  | 'iron_condor_builder'
  | 'generic';

export interface InteractiveExampleScreen extends BaseScreen {
  screen_type: 'interactive_example';
  headline: string;
  description: string;
  interactive_type?: InteractiveType;
  inputs: Array<{
    label: string;
    name?: string;
    type?: 'slider' | 'toggle' | 'text' | 'dropdown' | 'number';
    min?: number;
    max?: number;
    step?: number;
    value: number | string | boolean;
    options?: (string | number)[];
    locked?: boolean;
  }>;
  outputs: Array<{
    label: string;
    value: string;
    calculation?: string;
    format?: string;
    highlight?: boolean;
    note?: string;
  }>;
  teaching_points: string[];
  chartConfig?: {
    showGrid?: boolean;
    animationDuration?: number;
    height?: number;
    stockPriceRange?: [number, number];
    showBreakeven?: boolean;
    showMaxProfitLoss?: boolean;
  };
}

export interface SummaryCardsScreen extends BaseScreen {
  screen_type: 'summary_cards';
  headline: string;
  cards: Array<{
    front: string;
    back: string;
  }>;
}

export interface CelebrationScreen extends BaseScreen {
  screen_type: 'celebration';
  xp_earned: number;
  total_xp: number;
  badge: string;
  badge_description: string;
  streak_bonus: boolean;
  next_lesson_preview: {
    title: string;
    description: string;
    unlock_status: string;
  };
  celebration_message: string;
}

export type Screen =
  | HookScreen
  | DefinitionScreen
  | AnalogyScreen
  | KeyTermsScreen
  | MultipleChoiceScreen
  | CalculationScreen
  | InteractiveExampleScreen
  | ScenarioScreen
  | SummaryCardsScreen
  | CelebrationScreen;

export interface Lesson {
  lesson_id: string;
  title: string;
  estimated_time: string;
  total_xp?: number;
  badge?: string;
  screens: Screen[];
}

export interface LessonMetadata {
  id: string;
  moduleNumber: number;
  lessonNumber: number;
  title: string;
  estimatedTime: string;
  totalXP: number;
  badge?: string;
  filePath: string;
  isCompleted: boolean;
  earnedXP: number;
}

export interface ModuleMetadata {
  moduleNumber: number;
  title: string;
  lessons: LessonMetadata[];
  totalLessons: number;
  completedLessons: number;
}

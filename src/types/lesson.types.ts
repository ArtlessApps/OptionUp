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
  | ScenarioScreen
  | SummaryCardsScreen
  | CelebrationScreen;

export interface Lesson {
  lesson_id: string;
  title: string;
  estimated_time: string;
  screens: Screen[];
}

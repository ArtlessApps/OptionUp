import { MultipleChoiceScreen } from './MultipleChoiceScreen';
import type { ScenarioScreen as ScenarioScreenType, MultipleChoiceScreen as MultipleChoiceScreenType } from '../../types/lesson.types';

interface ScenarioScreenProps {
  data: ScenarioScreenType;
  onContinue: () => void;
  onXPEarned: (xp: number) => void;
}

// Scenario screen is just a styled version of multiple choice
// In the future, we could add visual stock charts or price movements
export function ScenarioScreen(props: ScenarioScreenProps) {
  // Cast scenario data to multiple choice format since they share the same structure
  const mcData: MultipleChoiceScreenType = {
    ...props.data,
    screen_type: 'multiple_choice',
  };
  
  return <MultipleChoiceScreen {...props} data={mcData} />;
}

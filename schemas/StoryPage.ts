interface StoryPageOption {
  optionText: string;
  optionLink: string;
}

interface CharacterData {
  name?: string;
  profession?: string;
  photoUrl?: string;
  attributes: { label: string; value: number }[];
  skills: string[];
  items: string[];
}

interface StoryPageIllustration {
  name: string;
  description: string;
  size?: 'small' | 'medium' | 'large' | 'full';
}

export interface StoryPage {
  id: string;
  pageNumber: number;
  text: string;
  pageOptions: StoryPageOption[];
  title?: string;
  warning?: string;
  illustration?: StoryPageIllustration;
  characterData?: CharacterData;
}

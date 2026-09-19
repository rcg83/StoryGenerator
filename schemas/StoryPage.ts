export interface StoryPageOption {
  optionText: string;
  optionLink: string;
}

export interface CharacterData {
  name?: string;
  profession?: string;
  photoUrl?: string;
  attributes: { label: string; value: number }[];
  skills: string[];
  items: string[];
}

export interface StoryPageIllustration {
  name: string;
  description: string;
}

export interface StoryPage {
  id: string;
  pageNumber: number;
  text: string;
  pageOptions: StoryPageOption[];
  title?: string;
  illustration?: StoryPageIllustration;
  characterData?: CharacterData;
}

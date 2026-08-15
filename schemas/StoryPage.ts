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

export interface MapData {
  backgroundImage: string;
  userPosition: { col: number; row: number };
  targetPosition: { col: number; row: number };
}

export interface StoryPage {
  id: string;
  pageNumber: number;
  text: string;
  pageOptions: StoryPageOption[];
  title?: string;
  illustration?: string;
  characterData?: CharacterData;
  mapData?: MapData;
}

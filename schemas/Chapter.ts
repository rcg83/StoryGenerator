import type { StorySpread } from './StorySpread';

export interface Chapter {
  storyId: string;
  chapterNumber: number;
  id: string;
  titleEn: string;
  titleEs: string;
  startPageId: string;
  cover?: { subtitle: string; coverImage?: string };
  spreads: StorySpread[];
  spreadIds: string[];
}

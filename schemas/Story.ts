import type { StorySpread } from './StorySpread';

export interface Story {
  id: string;
  titleEn: string;
  titleEs: string;
  startPageId: string;
  spreads: StorySpread[],
  spreadIds: string[],
  cover?: { subtitle: string; coverImage?: string }
}
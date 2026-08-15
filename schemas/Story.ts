import type { StorySpread } from './StorySpread';

export interface Story {
  id: string;
  title: string;
  startPageId: string;
  spreads: StorySpread[],
  spreadIds: string[],
  cover?: { title: string; subtitle: string; coverImage?: string }
}
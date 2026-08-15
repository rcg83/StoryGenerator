import type { StoryPage } from './StoryPage';

export interface StorySpread {
  id: string;
  leftPage: StoryPage;
  rightPage: StoryPage;
  type?: string;
}
